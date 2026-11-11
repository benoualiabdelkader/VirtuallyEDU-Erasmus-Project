/**
 * Unit Tests — analysisStore (src/store.ts)
 * Tests all state management operations in isolation.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { analysisStore } from '../store'
import type { AnalysisResult } from '../services/gemini'

const MOCK_RESULT: AnalysisResult = {
  reflectionQuestion: 'Is this content using fear to drive action?',
  biasLevel: 72,
  biasLabel: 'High Emotional Bias',
  urgencyTag: 'Elevated Urgency',
  insight: 'You paused to reflect — excellent digital habit.',
  sources: [
    { name: 'Snopes', icon: '🔍', finding: 'Claim unverified' },
    { name: 'PolitiFact', icon: '📰', finding: 'Mostly False' },
    { name: 'Reuters Fact Check', icon: '📊', finding: 'Missing context' },
  ],
  weeklyCount: 7,
  weeklyTotal: 12,
  _model: 'qwen/qwen3.8-27b',
}

describe('analysisStore', () => {
  beforeEach(() => {
    analysisStore.clear()
  })

  // ── Content ──────────────────────────────────────────────────────────────
  describe('content state', () => {
    it('starts empty', () => {
      expect(analysisStore.getContent()).toBe('')
    })

    it('stores and retrieves text content', () => {
      analysisStore.setContent('This is a viral tweet about vaccines.')
      expect(analysisStore.getContent()).toBe('This is a viral tweet about vaccines.')
    })

    it('overwrites previous content', () => {
      analysisStore.setContent('First content')
      analysisStore.setContent('Second content')
      expect(analysisStore.getContent()).toBe('Second content')
    })

    it('handles empty string', () => {
      analysisStore.setContent('something')
      analysisStore.setContent('')
      expect(analysisStore.getContent()).toBe('')
    })
  })

  // ── Media ─────────────────────────────────────────────────────────────────
  describe('media state', () => {
    it('starts as null', () => {
      expect(analysisStore.getMedia()).toBeNull()
    })

    it('stores image media attachment', () => {
      const media = {
        name: 'screenshot.png',
        type: 'image/png',
        size: 204800,
        previewUrl: 'blob:http://localhost/abc123',
        base64: 'data:image/png;base64,iVBORw0KG==',
      }
      analysisStore.setMedia(media)
      expect(analysisStore.getMedia()).toEqual(media)
    })

    it('can clear media by setting null', () => {
      analysisStore.setMedia({ name: 'img.jpg', type: 'image/jpeg', size: 100 })
      analysisStore.setMedia(null)
      expect(analysisStore.getMedia()).toBeNull()
    })

    it('stores media without optional fields', () => {
      const minimal = { name: 'file.png', type: 'image/png', size: 512 }
      analysisStore.setMedia(minimal)
      const stored = analysisStore.getMedia()
      expect(stored?.name).toBe('file.png')
      expect(stored?.previewUrl).toBeUndefined()
      expect(stored?.base64).toBeUndefined()
    })
  })

  // ── Result ────────────────────────────────────────────────────────────────
  describe('result state', () => {
    it('starts as null', () => {
      expect(analysisStore.getResult()).toBeNull()
    })

    it('stores and retrieves an analysis result', () => {
      analysisStore.setResult(MOCK_RESULT)
      expect(analysisStore.getResult()).toEqual(MOCK_RESULT)
    })

    it('stores biasLevel of 0', () => {
      analysisStore.setResult({ ...MOCK_RESULT, biasLevel: 0 })
      expect(analysisStore.getResult()?.biasLevel).toBe(0)
    })

    it('stores biasLevel of 100', () => {
      analysisStore.setResult({ ...MOCK_RESULT, biasLevel: 100 })
      expect(analysisStore.getResult()?.biasLevel).toBe(100)
    })
  })

  // ── Clear ─────────────────────────────────────────────────────────────────
  describe('clear()', () => {
    it('resets all state to initial values', () => {
      analysisStore.setContent('some content')
      analysisStore.setMedia({ name: 'img.png', type: 'image/png', size: 100 })
      analysisStore.setResult(MOCK_RESULT)

      analysisStore.clear()

      expect(analysisStore.getContent()).toBe('')
      expect(analysisStore.getMedia()).toBeNull()
      expect(analysisStore.getResult()).toBeNull()
    })
  })

  // ── Observations ───────────────────────────────────────────────────────────
  describe('observations state', () => {
    beforeEach(() => {
      analysisStore.clearObservations()
    })

    it('starts with empty observations list', () => {
      expect(analysisStore.getObservations()).toEqual([])
    })

    it('adds and retrieves an observation', () => {
      const obs = analysisStore.addObservation({
        title: 'Test Article',
        tag: 'High Bias',
        tagColor: 'bg-primary',
        time: 'Just now',
        source: 'Web',
        result: MOCK_RESULT,
        content: 'Test content',
      })

      expect(obs).not.toBeNull()
      expect(obs?.title).toBe('Test Article')
      const all = analysisStore.getObservations()
      expect(all.length).toBe(1)
      expect(all[0].title).toBe('Test Article')
    })

    it('clears observations when clearObservations is called', () => {
      analysisStore.addObservation({
        title: 'Item 1',
        tag: 'Neutral',
        tagColor: 'bg-tertiary',
        time: 'Today',
        source: 'Social',
        result: MOCK_RESULT,
        content: 'Content 1',
      })
      expect(analysisStore.getObservations().length).toBe(1)

      analysisStore.clearObservations()
      expect(analysisStore.getObservations()).toEqual([])
    })
  })
})

