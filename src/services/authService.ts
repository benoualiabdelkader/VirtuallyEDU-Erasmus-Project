/**
 * Centralized Authentication Service
 *
 * Manages user authentication state, local session persistence, and guest profiles.
 */

export interface UserProfile {
  name: string
  email: string
  isGuest?: boolean
  createdAt: string
}

export interface StoredCredentials extends UserProfile {
  password?: string
}

const STORAGE_KEY_USER = 'baseera_user'
const STORAGE_KEY_USERS = 'baseera_users'
const STORAGE_KEY_ONBOARDED = 'baseera_onboarded'

export const AuthService = {
  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  },

  isOnboarded(): boolean {
    return localStorage.getItem(STORAGE_KEY_ONBOARDED) === 'true'
  },

  setOnboarded(): void {
    localStorage.setItem(STORAGE_KEY_ONBOARDED, 'true')
  },

  login(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    try {
      const users: StoredCredentials[] = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]')
      const matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

      if (matched) {
        const { password: _, ...profile } = matched
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile))
        return { success: true, user: profile }
      }
      return { success: false, error: 'Invalid email or password' }
    } catch {
      return { success: false, error: 'Authentication service error' }
    }
  },

  signup(name: string, email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' }
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' }
    }

    try {
      const users: StoredCredentials[] = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || '[]')
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
      if (exists) {
        return { success: false, error: 'Account with this email already exists' }
      }

      const newUser: StoredCredentials = {
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users))

      const { password: _, ...profile } = newUser
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile))
      return { success: true, user: profile }
    } catch {
      return { success: false, error: 'Registration service error' }
    }
  },

  createGuestSession(): UserProfile {
    const guestUser: UserProfile = {
      name: 'Guest Explorer',
      email: 'guest@baseera.app',
      isGuest: true,
      createdAt: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(guestUser))
    return guestUser
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEY_USER)
  },
}
