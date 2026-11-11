/**
 * Lightweight in-memory store that bridges the Processing → Result screens.
 * (No Redux/Zustand needed for this MVP; a simple module-level singleton works.)
 */
import type { AnalysisResult } from './services/gemini'

export interface MediaAttachment {
  name: string
  type: string
  size: number
  previewUrl?: string
  base64?: string
}

export interface Observation {
  id: string
  title: string
  tag: string
  tagColor: string
  time: string
  timestamp: number
  source: string
  img?: string
  result: AnalysisResult
  content: string
  media?: MediaAttachment | null
}

let _result: AnalysisResult | null = null
let _content: string = ''
let _media: MediaAttachment | null = null

export const analysisStore = {
  setContent(content: string) { _content = content },
  getContent() { return _content },

  setMedia(media: MediaAttachment | null) { _media = media },
  getMedia(): MediaAttachment | null { return _media },

  setResult(result: AnalysisResult) { _result = result },
  getResult(): AnalysisResult | null { return _result },

  getObservations(): Observation[] {
    try {
      const raw = localStorage.getItem('baseera_observations')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  },

  addObservation(obs: Omit<Observation, 'id' | 'timestamp'>): Observation | null {
    try {
      const list = this.getObservations()
      const newObs: Observation = {
        ...obs,
        id: String(Date.now()),
        timestamp: Date.now(),
      }
      const updated = [newObs, ...list].slice(0, 20)
      localStorage.setItem('baseera_observations', JSON.stringify(updated))
      return newObs
    } catch {
      return null
    }
  },

  clearObservations() {
    try {
      localStorage.removeItem('baseera_observations')
    } catch {
      // ignore
    }
  },

  clear() {
    _result = null
    _content = ''
    _media = null
  },
}

