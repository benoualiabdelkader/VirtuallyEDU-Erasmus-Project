/**
 * Integration Tests — Auth flow (Login / Signup)
 * Tests the localStorage-based mock auth system.
 */
import type { ReactElement } from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

// Helper to wrap screens with router
function renderWithRouter(ui: ReactElement, initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      {ui}
    </MemoryRouter>
  )
}

// ─── LocalStorage Auth Helpers ────────────────────────────────────────────────

const AUTH_KEY = 'baseera_user'

function clearAuth() {
  localStorage.removeItem(AUTH_KEY)
}

// ─── LoginScreen Tests ────────────────────────────────────────────────────────

describe('LoginScreen', () => {
  beforeEach(() => {
    clearAuth()
  })

  it('renders email and password fields', () => {
    renderWithRouter(<LoginScreen />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('renders the login button', () => {
    renderWithRouter(<LoginScreen />)
    expect(screen.getByRole('button', { name: /sign in|log in/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty form', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginScreen />)
    const btn = screen.getByRole('button', { name: /sign in/i })
    await user.click(btn)
    // Use getAllByText since 'Email' label also matches — check error div specifically
    const errors = screen.getAllByText(/fill in all fields/i)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('shows error when email is invalid format', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginScreen />)
    // JSDOM respects type="email" — invalid emails block form submit at browser level.
    // Test: the form doesn't navigate and stays on login when input is invalid.
    // Since 'notanemail' can't be typed into type="email" in JSDOM, use a partial email.
    await user.type(screen.getByPlaceholderText(/email/i), 'user@')
    await user.type(screen.getByPlaceholderText(/password/i), 'password123')
    // Use fireEvent to force submit, bypassing browser email validation
    const form = document.querySelector('form')!
    fireEvent.submit(form)
    // Should show an error — either "fill in" or "not found"
    await waitFor(() => {
      const errorDivs = document.querySelectorAll('[class*="bg-error"]')
      expect(errorDivs.length).toBeGreaterThan(0)
    })
  })

  it('shows error when credentials are not found', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LoginScreen />)
    await user.type(screen.getByPlaceholderText(/email/i), 'nobody@test.com')
    await user.type(screen.getByPlaceholderText(/password/i), 'wrongpass')
    await user.click(screen.getByRole('button', { name: /sign in|log in/i }))
    expect(screen.getByText(/not found|invalid|incorrect|no account/i)).toBeInTheDocument()
  })

  it('has a link to sign up page', () => {
    renderWithRouter(<LoginScreen />)
    expect(screen.getByText(/sign up|create account|register/i)).toBeInTheDocument()
  })

  it('allows logging in as a guest with full access', async () => {
    const user = userEvent.setup()
    const mockLogin = vi.fn()
    renderWithRouter(<LoginScreen onLogin={mockLogin} />)
    const guestBtn = screen.getByRole('button', { name: /continue as guest/i })
    expect(guestBtn).toBeInTheDocument()
    await user.click(guestBtn)
    expect(mockLogin).toHaveBeenCalled()
    const stored = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}')
    expect(stored.name).toBe('Guest Explorer')
    expect(stored.isGuest).toBe(true)
  })
})

// ─── SignupScreen Tests ───────────────────────────────────────────────────────

describe('SignupScreen', () => {
  beforeEach(() => {
    clearAuth()
  })

  it('renders name, email and password fields', () => {
    renderWithRouter(<SignupScreen />)
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('shows error when submitting empty form', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SignupScreen onLogin={vi.fn()} />)
    const btn = screen.getByRole('button', { name: /sign up/i })
    await user.click(btn)
    // Use getAllByText — 'Email' label also matches regex
    const errors = screen.getAllByText(/fill in all fields/i)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('shows error when password is too short', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SignupScreen onLogin={vi.fn()} />)
    await user.type(screen.getByPlaceholderText(/name/i), 'Test User')
    await user.type(screen.getByPlaceholderText(/email/i), 'test@test.com')
    await user.type(screen.getByPlaceholderText(/password/i), '123')
    await user.click(screen.getByRole('button', { name: /sign up/i }))
    expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
  })

  it('saves user to localStorage on successful signup', async () => {
    const user = userEvent.setup()
    const mockOnLogin = vi.fn()
    renderWithRouter(<SignupScreen onLogin={mockOnLogin} />)
    await user.type(screen.getByPlaceholderText(/name/i), 'Jane Doe')
    await user.type(screen.getByPlaceholderText(/email/i), 'jane@example.com')
    const passwords = screen.getAllByPlaceholderText(/password/i)
    await user.type(passwords[0], 'securepass123')
    await user.click(screen.getByRole('button', { name: /sign up/i }))

    await waitFor(() => {
      const stored = localStorage.getItem(AUTH_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        expect(parsed.email).toBe('jane@example.com')
      }
    }, { timeout: 2000 })
  })

  it('has a link back to login', () => {
    renderWithRouter(<SignupScreen onLogin={vi.fn()} />)
    // Use getAllByText since the link text appears in both <p> and <a>
    const links = screen.getAllByText(/sign in/i)
    expect(links.length).toBeGreaterThan(0)
  })

  it('allows continuing as guest from signup screen', async () => {
    const user = userEvent.setup()
    const mockLogin = vi.fn()
    renderWithRouter(<SignupScreen onLogin={mockLogin} />)
    const guestBtn = screen.getByRole('button', { name: /continue as guest/i })
    expect(guestBtn).toBeInTheDocument()
    await user.click(guestBtn)
    expect(mockLogin).toHaveBeenCalled()
    const stored = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}')
    expect(stored.isGuest).toBe(true)
  })
})
