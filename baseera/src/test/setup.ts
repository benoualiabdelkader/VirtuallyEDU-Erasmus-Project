import '@testing-library/jest-dom/vitest'
import { vi, beforeEach, afterEach } from 'vitest'

// Mock import.meta.env for all tests
Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_AI_API_KEY: 'test-ai-key-mock',
    VITE_AI_BASE_URL: 'https://api.groq.com/openai/v1/chat/completions',
    VITE_AI_MODEL: 'qwen/qwen3.8-27b',
    VITE_GROQ_API_KEY: 'test-groq-key-mock',
    VITE_GEMINI_API_KEY: 'test-gemini-key-mock',
    MODE: 'test',
    DEV: false,
    PROD: false,
  },
  writable: true,
})

// Mock fetch globally
globalThis.fetch = vi.fn()

// Silence console.warn/info during tests (keep errors)
beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'info').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.clearAllMocks()
})

