import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeContent } from '../services/gemini'
import { analysisStore } from '../store'

const TEXT_STATUS_MESSAGES = [
  'Initializing content evaluation...',
  'Analyzing syntax and framing...',
  'Evaluating source indicators...',
  'Detecting cognitive and emotional bias...',
  'Synthesizing evaluation metrics...',
  'Preparing reflection response...',
]

const IMAGE_STATUS_MESSAGES = [
  'Initializing multimodal inspection...',
  'Analyzing visual layout and cues...',
  'Evaluating text overlays and context...',
  'Evaluating framing and tone...',
  'Synthesizing evaluation metrics...',
  'Preparing reflection response...',
]

export default function ProcessingScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const circumference = 2 * Math.PI * 44
  const progressRef = useRef(0)
  const doneRef = useRef(false)

  const media = analysisStore.getMedia()
  const hasImage = !!(media?.base64 && media?.type?.startsWith('image/'))
  const statusMessages = hasImage ? IMAGE_STATUS_MESSAGES : TEXT_STATUS_MESSAGES

  useEffect(() => {
    const content = analysisStore.getContent() || 'Social media content evaluation'
    const mediaData = analysisStore.getMedia()

    analyzeContent(content, mediaData)
      .then((result) => {
        analysisStore.setResult(result)

        const tagColor =
          result.biasLevel >= 70
            ? 'bg-primary'
            : result.biasLevel >= 40
            ? 'bg-surface-tint'
            : 'bg-tertiary-container'
        const title =
          mediaData?.name || (content.length > 40 ? content.slice(0, 40) + '...' : content) || 'Analyzed Content'
        const source = mediaData
          ? mediaData.type.startsWith('image/')
            ? 'Image Analysis'
            : 'Uploaded Media'
          : 'Direct Input'

        analysisStore.addObservation({
          title,
          tag: result.biasLabel,
          tagColor,
          time: 'Just now',
          source,
          img: mediaData?.previewUrl || mediaData?.base64,
          result,
          content,
          media: mediaData,
        })

        progressRef.current = 100
        setProgress(100)
        doneRef.current = true
      })
      .catch((err) => {
        console.error('[Processing] Analysis error:', err)
        setError('Analysis could not be completed. Please verify service configuration.')
      })

    const start = Date.now()
    const MIN_DURATION = hasImage ? 2500 : 1800
    const animInterval = setInterval(() => {
      const elapsed = Date.now() - start
      const apiDone = doneRef.current

      const naturalPct = Math.min(90, Math.round((elapsed / MIN_DURATION) * 90))
      const pct = apiDone ? 100 : naturalPct

      progressRef.current = pct
      setProgress(pct)

      if (pct >= 100) {
        clearInterval(animInterval)
        setTimeout(() => navigate('/result', { replace: true }), 250)
      }
    }, 40)

    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length)
    }, 450)

    return () => {
      clearInterval(animInterval)
      clearInterval(statusInterval)
    }
  }, [navigate, hasImage, statusMessages])

  const strokeDashoffset = circumference - (progress / 100) * circumference

  if (error) {
    return (
      <div className="flex flex-col min-h-dvh w-full bg-primary-container items-center justify-center px-margin gap-4">
        <div className="w-16 h-16 rounded-2xl bg-error-container flex items-center justify-center">
          <span className="material-symbols-outlined text-error text-[32px]">error</span>
        </div>
        <p className="font-bold text-headline-sm text-on-primary text-center">Analysis Failed</p>
        <p className="text-body-md text-on-primary/80 text-center max-w-xs">{error}</p>
        <button
          onClick={() => navigate('/share', { replace: true })}
          className="mt-4 px-6 py-2.5 rounded-2xl bg-on-primary text-primary-container font-bold text-body-md hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-dvh w-full bg-primary-container items-center justify-center px-margin select-none relative overflow-hidden">
      <div className="flex flex-col items-center gap-6 text-center z-10">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />
          </svg>

          <div className="flex flex-col items-center gap-1">
            <svg className="w-9 h-9 text-on-primary mb-0.5" fill="none" viewBox="0 0 80 80">
              <path
                d="M40 18C23.6 18 10.4 29.8 6 40C10.4 50.2 23.6 62 40 62C56.4 62 69.6 50.2 74 40C69.6 29.8 56.4 18 40 18Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />
              <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="5" />
              <circle cx="40" cy="40" r="4" fill="currentColor" />
            </svg>
            <span className="font-serif font-bold text-headline-md text-on-primary">{progress}%</span>
          </div>
        </div>

        <div className="min-h-[24px]">
          <p key={statusIndex} className="text-body-md text-on-primary/90 font-medium animate-fade-in">
            {statusMessages[statusIndex]}
          </p>
        </div>

        <p className="text-caption-sm text-on-primary/60 max-w-[260px]">
          Baseera Analysis Gateway · Automated Content Evaluation
        </p>
      </div>
    </div>
  )
}
