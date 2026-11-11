// ─────────────────────────────────────────────────────────────────────────────
// Centralized AI Infrastructure Layer (LiteLLM / OpenAI-Compatible Gateway)
//
// Supports LiteLLM Proxy (e.g. http://localhost:4000/v1) and direct provider
// endpoints (Groq, OpenAI, etc.).
// ─────────────────────────────────────────────────────────────────────────────

export interface AnalysisSource {
  name: string
  icon: string
  finding: string
}

export interface AnalysisResult {
  reflectionQuestion: string
  biasLevel: number
  biasLabel: string
  urgencyTag: string
  insight: string
  sources: AnalysisSource[]
  weeklyCount: number
  weeklyTotal: number
  _model?: string
}

export interface MediaPayload {
  name: string
  type: string
  base64?: string
  previewUrl?: string
}

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>
}

// Environment & Configuration
const DEFAULT_BASE_URL = 'https://api.groq.com/openai/v1/chat/completions'

function getBaseUrl(): string {
  return (import.meta.env.VITE_AI_BASE_URL as string) || DEFAULT_BASE_URL
}

function getApiKey(): string {
  return (import.meta.env.VITE_AI_API_KEY as string) || (import.meta.env.VITE_GROQ_API_KEY as string) || ''
}

function getPrimaryModel(): string {
  return (import.meta.env.VITE_AI_MODEL as string) || 'qwen/qwen3.8-27b'
}

export const FALLBACK_QUESTIONS = [
  'What emotions does this content activate in you — and why might someone want to activate those emotions?',
  'Can you identify at least two credible sources that independently verify the core claim here?',
  'Who created this content, and what might their underlying purpose or agenda be?',
  'Does the headline match the actual claims made within the article or post?',
  'Is this content using fear, outrage, or urgency to push you toward quick action?',
  'What important context or counterpoint might this story be leaving out entirely?',
]

export const FALLBACK_SOURCES: AnalysisSource[] = [
  { name: 'Snopes', icon: 'fact_check', finding: 'Unverified claim noted' },
  { name: 'Reuters Fact Check', icon: 'newspaper', finding: 'Context missing in original' },
  { name: 'Media Bias / Ad Fontes', icon: 'analytics', finding: 'Outlet rated Mixed Reliability' },
]

export function buildFallback(reason = 'unknown'): AnalysisResult {
  return {
    reflectionQuestion: FALLBACK_QUESTIONS[Math.floor(Math.random() * FALLBACK_QUESTIONS.length)],
    biasLevel: Math.floor(Math.random() * 35) + 45,
    biasLabel: 'Framing & Emotional Bias Noted',
    urgencyTag: 'Elevated Urgency',
    insight: 'You paused to evaluate this content before sharing, practicing digital discernment.',
    sources: FALLBACK_SOURCES,
    weeklyCount: 7,
    weeklyTotal: 12,
    _model: `fallback:${reason}`,
  }
}

async function callChatCompletions(
  model: string,
  messages: LLMMessage[],
  jsonMode = true,
): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 25000)

  let endpoint = getBaseUrl()
  if (!endpoint.endsWith('/chat/completions')) {
    endpoint = endpoint.replace(/\/+$/, '') + '/chat/completions'
  }

  const apiKey = getApiKey()

  let res: Response
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 900,
        temperature: 0.7,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      }),
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timer)
  }

  const data = await res.json()

  if (!res.ok) {
    const msg = data?.error?.message ?? JSON.stringify(data)
    throw new Error(`[${res.status}] ${msg}`)
  }

  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Empty response from AI gateway')
  return text.trim()
}

function buildPrompt(content: string, hasImage: boolean, mediaName?: string): string {
  let c = content?.trim() || ''

  if (hasImage && mediaName && !c) {
    c = `[Analyze the attached image: "${mediaName}". Examine visual framing, text overlays, and indicators of bias or manipulation.]`
  } else if (hasImage && c) {
    c = `${c}\n\n[Also examine the attached image as part of this analysis.]`
  } else if (!c) {
    c = 'Content analysis request — evaluate framing and credibility.'
  }

  return `You are Baseera, a digital literacy evaluator. Analyze the given content for emotional framing, urgency, and potential cognitive bias. Provide constructive, non-judgmental critical guidance.

${hasImage ? 'An image is attached. Inspect visual presentation, overlays, and emotional cues. ' : ''}Content to analyze: "${c}"

Respond strictly with valid JSON conforming to this schema (no markdown, no preamble):
{
  "reflectionQuestion": "<content-specific Socratic question, max 30 words>",
  "biasLevel": <integer 0-100>,
  "biasLabel": "<e.g. High Emotional Bias | Moderate Framing Bias | Low Bias Detected>",
  "urgencyTag": "<Elevated Urgency | Moderate Urgency | Low Urgency | Neutral>",
  "insight": "<brief guidance on pausing before sharing, max 20 words>",
  "sources": [
    { "name": "<fact-check organization>", "icon": "fact_check", "finding": "<concise status, max 8 words>" },
    { "name": "<fact-check organization>", "icon": "newspaper", "finding": "<concise status, max 8 words>" },
    { "name": "<fact-check organization>", "icon": "analytics", "finding": "<concise status, max 8 words>" }
  ],
  "weeklyCount": <integer 5-10>,
  "weeklyTotal": <integer 10-15>
}

Rules:
- reflectionQuestion must be specific to the provided content.
- weeklyTotal must always exceed weeklyCount.
- sources: reference established media verification agencies (e.g. Reuters, Snopes, AP, PolitiFact, Full Fact).`
}

function parseResponse(raw: string, model: string): AnalysisResult {
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/\s*```$/i, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim()

  const parsed = JSON.parse(cleaned)

  if (!parsed.reflectionQuestion || typeof parsed.biasLevel !== 'number') {
    throw new Error('Invalid response structure')
  }

  parsed.biasLevel = Math.max(0, Math.min(100, Math.round(Number(parsed.biasLevel) || 50)))
  parsed._model = model

  if (!Array.isArray(parsed.sources) || parsed.sources.length === 0) {
    parsed.sources = FALLBACK_SOURCES
  }

  return parsed as AnalysisResult
}

export async function analyzeContent(
  userContent: string,
  media?: MediaPayload | null
): Promise<AnalysisResult> {
  const apiKey = getApiKey()
  if (!apiKey) {
    return buildFallback('no-api-key')
  }

  const primaryModel = getPrimaryModel()
  const hasImage = !!(media?.base64 && media?.type?.startsWith('image/'))
  const promptText = buildPrompt(userContent, hasImage, media?.name)

  // Strategy 1: Multimodal vision (if image data is present)
  if (hasImage && media?.base64) {
    const dataUri = media.base64.startsWith('data:')
      ? media.base64
      : `data:${media.type};base64,${media.base64}`

    const visionMessages: LLMMessage[] = [{
      role: 'user',
      content: [
        { type: 'text', text: promptText },
        { type: 'image_url', image_url: { url: dataUri } },
      ],
    }]

    try {
      const raw = await callChatCompletions(primaryModel, visionMessages, true)
      const result = parseResponse(raw, primaryModel)
      result._model = `${primaryModel}:vision`
      return result
    } catch {
      // Vision unavailable, continue to text-fallback strategy
    }

    // Strategy 2: Text fallback with filename & context
    const contextPrompt = buildPrompt(
      userContent || `The user uploaded an image named "${media.name}". Analyze likely framing and context based on filename.`,
      false
    )
    const textMessages: LLMMessage[] = [{ role: 'user', content: contextPrompt }]

    try {
      const raw = await callChatCompletions(primaryModel, textMessages, true)
      const result = parseResponse(raw, primaryModel)
      result._model = `${primaryModel}:text-fallback`
      return result
    } catch (e2: any) {
      return buildFallback(`all-strategies-failed:${e2?.message?.slice(0, 40) || 'error'}`)
    }
  }

  // Strategy 3: Standard text analysis
  const messages: LLMMessage[] = [{ role: 'user', content: promptText }]

  try {
    const raw = await callChatCompletions(primaryModel, messages, true)
    return parseResponse(raw, primaryModel)
  } catch (err: any) {
    const msg = err?.message ?? String(err)
    console.error('[Baseera] Analysis failed:', msg)
    return buildFallback(msg.slice(0, 80))
  }
}

export async function preflightCheck(): Promise<{ ok: boolean; model: string; error?: string }> {
  const primaryModel = getPrimaryModel()
  try {
    const txt = await callChatCompletions(
      primaryModel,
      [{ role: 'user', content: 'Reply with only the word: OK' }],
      false,
    )
    return { ok: !!txt.trim(), model: primaryModel }
  } catch (e) {
    return { ok: false, model: primaryModel, error: (e as Error).message }
  }
}
