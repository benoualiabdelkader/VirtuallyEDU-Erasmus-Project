import '@testing-library/jest-dom'

// Mock import.meta.env for all tests
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_GROQ_API_KEY: 'test-groq-key-mock',
    VITE_GEMINI_API_KEY: 'test-gemini-key-mock',
    MODE: 'test',
    DEV: false,
    PROD: false,
  },
  writable: true,
})

// Mock fetch globally
global.fetch = vi.fn()

// Silence console.warn/info during tests (keep errors)
beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})
