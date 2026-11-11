import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analysisStore } from '../store'
import type { AnalysisResult } from '../services/gemini'

const PAUSE_SECONDS = 20

const DEFAULT_RESULT: AnalysisResult = {
  reflectionQuestion: 'What emotions does this content activate in you — and why might someone want to activate those emotions?',
  biasLevel: 65,
  biasLabel: 'Moderate Framing Bias',
  urgencyTag: 'Elevated Urgency',
  insight: 'You paused to evaluate this content before sharing, practicing digital discernment.',
  sources: [
    { name: 'Snopes', icon: 'fact_check', finding: 'Unverified claim noted' },
    { name: 'Reuters Fact Check', icon: 'newspaper', finding: 'Context missing in original' },
    { name: 'Media Bias / Ad Fontes', icon: 'analytics', finding: 'Outlet rated Mixed Reliability' },
  ],
  weeklyCount: 7,
  weeklyTotal: 12,
}

export default function ResultScreen() {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(PAUSE_SECONDS)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [result] = useState<AnalysisResult>(() => analysisStore.getResult() || DEFAULT_RESULT)
  const media = analysisStore.getMedia()

  useEffect(() => {
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(t)
  }, [countdown])

  const getBiasColor = (level: number) => {
    if (level >= 70) return 'text-primary font-bold'
    if (level >= 40) return 'text-surface-tint font-bold'
    return 'text-tertiary-container font-bold'
  }

  const modelStr = result._model ?? ''
  const isFallback = modelStr.startsWith('fallback')
  const isTextFallback = modelStr.includes(':text-fallback')
  const isImage = !!(media?.previewUrl)

  let badgeIcon = 'tune'
  let badgeLabel = 'Analyzed via Baseera AI Provider'
  let bgClass = 'bg-surface-container-low'
  let textClass = 'text-secondary'
  let subLabel = ''

  if (isFallback) {
    badgeIcon = 'warning'
    badgeLabel = 'Demo Mode — Offline Fallback'
    bgClass = 'bg-error/10'
    textClass = 'text-error'
    subLabel = 'Simulated baseline result'
  } else if (isTextFallback) {
    badgeIcon = 'article'
    badgeLabel = 'Text Analysis Mode'
    subLabel = 'Evaluated via filename and textual context'
  } else if (isImage) {
    badgeIcon = 'image'
    badgeLabel = 'Multimodal Vision Analysis'
  }

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in">
      <header className="px-space-xs flex items-center h-16 gap-space-xs bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] justify-between">
        <div className="flex items-center gap-space-xs">
          <button
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            <span className="material-symbols-outlined text-[24px] text-on-surface">arrow_back</span>
          </button>
          <h1 className="font-bold text-headline-sm text-on-surface tracking-tight">Analysis Result</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-margin pb-8 pt-4 flex flex-col gap-space-md">
        <div className="flex flex-wrap items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full self-start ${bgClass}`}>
            <span className="material-symbols-outlined text-[16px]">{badgeIcon}</span>
            <span className={`text-caption-sm font-semibold ${textClass}`}>{badgeLabel}</span>
          </div>
          {subLabel && (
            <span className="text-caption-sm text-secondary bg-surface-container-low px-2.5 py-1 rounded-full w-full sm:w-auto">
              {subLabel}
            </span>
          )}
        </div>

        {media && (
          <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-3 border border-outline-variant/40 shadow-sm">
            {media.previewUrl ? (
              <img
                src={media.previewUrl}
                alt={media.name}
                className="w-16 h-16 rounded-lg object-cover bg-black/10 shrink-0 border border-outline-variant/30"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center shrink-0 text-primary-container">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="text-caption-sm text-secondary uppercase tracking-wider font-semibold">Analyzed Media</span>
              <p className="font-bold text-body-md text-on-surface truncate">{media.name}</p>
            </div>
          </div>
        )}

        <section className="bg-surface-container-low rounded-xl p-space-md shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">psychology_alt</span>
              <span className="text-caption-lg text-on-surface font-semibold">Emotional Bias Scale</span>
            </div>
            <span className="text-caption-sm text-primary-container font-bold uppercase tracking-wider bg-primary-fixed px-2 py-0.5 rounded-full whitespace-nowrap">
              {result.urgencyTag}
            </span>
          </div>
          <div className="relative w-full h-3 rounded-full bg-gradient-to-r from-secondary-fixed via-primary-fixed to-primary-container my-2">
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-700"
              style={{ left: `${Math.min(97, Math.max(3, result.biasLevel))}%` }}
            >
              <div className="w-4 h-4 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center ring-2 ring-primary">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-caption-sm text-secondary">Low Bias</span>
            <span className={`text-caption-lg ${getBiasColor(result.biasLevel)}`}>
              {result.biasLevel}% — {result.biasLabel}
            </span>
            <span className="text-caption-sm text-secondary">High Bias</span>
          </div>
        </section>

        <section className="bg-primary-container rounded-2xl p-space-md text-on-primary shadow-sm relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-on-primary/80 text-[20px]">help_outline</span>
              <h3 className="font-bold text-caption-lg uppercase tracking-wider text-on-primary/80">
                Critical Reflection Prompt
              </h3>
            </div>
            <p className="font-serif font-bold text-headline-sm text-on-primary leading-snug">
              &ldquo;{result.reflectionQuestion}&rdquo;
            </p>
          </div>
        </section>

        <section className="card p-space-md flex items-center gap-space-md">
          <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" className="text-secondary-container" strokeWidth="4" />
              <circle
                cx="24" cy="24" r="20"
                fill="none"
                stroke="currentColor"
                className="text-primary-container transition-all duration-1000"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - countdown / PAUSE_SECONDS)}
              />
            </svg>
            <span className="font-bold text-body-md text-primary-container">{countdown}</span>
          </div>
          <div>
            <h4 className="font-bold text-body-md text-on-surface">
              {countdown > 0 ? `Pause for ${countdown}s` : 'Reflection Period Completed'}
            </h4>
            <p className="text-caption-sm text-secondary mt-0.5">
              {countdown > 0
                ? 'Consider the question above before acting on or sharing this post.'
                : 'Pause completed — ready to proceed with conscious discernment.'}
            </p>
          </div>
        </section>

        <div className="bg-secondary-container rounded-xl px-space-md py-space-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[20px]">insights</span>
          <p className="text-caption-lg text-on-surface font-medium flex-1">
            {result.insight}{' '}
            (<strong className="text-primary-container">{result.weeklyCount}</strong> of{' '}
            <strong className="text-primary-container">{result.weeklyTotal}</strong> evaluations this week)
          </p>
        </div>

        <section className="bg-surface-container-low rounded-xl overflow-hidden shadow-sm">
          <button
            className="w-full p-space-md flex items-center justify-between"
            onClick={() => setSourcesOpen(!sourcesOpen)}
            aria-expanded={sourcesOpen}
            id="sources-toggle"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-container text-[18px]">verified</span>
              <span className="font-bold text-body-md text-on-surface">Verification References</span>
            </div>
            <span
              className="material-symbols-outlined text-secondary text-[20px] transition-transform duration-200"
              style={{ transform: sourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              expand_more
            </span>
          </button>
          {sourcesOpen && (
            <div className="flex flex-col divide-y divide-surface-container-high animate-fade-in">
              {result.sources.map((src, i) => (
                <div key={i} className="flex items-center gap-space-sm px-space-md py-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px] text-primary-container">
                      {src.icon && src.icon.length > 2 ? src.icon : 'fact_check'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-body-md text-on-surface">{src.name}</p>
                    <p className="text-caption-sm text-secondary truncate">{src.finding}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex flex-col gap-3 pt-1">
          <button
            className="btn-primary"
            onClick={() => navigate('/home')}
            id="btn-learn-more"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            Return to Dashboard
          </button>
          <button
            className="btn-outline"
            onClick={() => { analysisStore.clear(); navigate('/home') }}
            id="btn-dismiss"
          >
            Dismiss
          </button>
        </div>

      </main>
    </div>
  )
}
