import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const privacyRisks = [
  { id: 'face', label: 'Face Detected', detail: 'Biometric data visible', action: 'Blur Face', icon: 'face', status: 'detected', pos: { top: '18%', left: '35%', w: '30%', h: '30%' } },
  { id: 'location', label: 'Location Tag', detail: 'GPS metadata embedded', action: 'Remove Tag', icon: 'location_on', status: 'detected', pos: { top: '70%', left: '10%', w: '25%', h: '12%' } },
  { id: 'text', label: 'Personal Text', detail: 'Phone number visible', action: 'Mask Text', icon: 'text_fields', status: 'detected', pos: { top: '50%', left: '55%', w: '35%', h: '14%' } },
]

export default function PrivacyScreen() {
  const navigate = useNavigate()
  const [mitigated, setMitigated] = useState<string[]>([])

  const handleMitigate = (id: string) => {
    setMitigated((prev) => [...prev, id])
  }

  const remaining = privacyRisks.filter((r) => !mitigated.includes(r.id))

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in">
      {/* Header */}
      <header className="px-space-xs pt-safe flex items-center h-16 gap-space-xs bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <button
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
          onClick={() => navigate(-1)}
          aria-label="Go Back"
        >
          <span className="material-symbols-outlined text-[24px] text-on-surface">arrow_back</span>
        </button>
        <h1 className="font-bold text-headline-sm text-on-surface tracking-tight">Privacy Inspection</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 px-margin pt-4 flex flex-col gap-space-lg">

        {/* Status banner */}
        <div className={`flex items-center gap-2 rounded-xl px-space-md py-3 ${
          remaining.length === 0 ? 'bg-tertiary-fixed/40' : 'bg-error-container'
        }`}>
          <span
            className={`material-symbols-outlined text-[20px] ${remaining.length === 0 ? 'text-tertiary' : 'text-error'}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {remaining.length === 0 ? 'verified_user' : 'privacy_tip'}
          </span>
          <p className="text-body-md font-semibold text-on-surface">
            {remaining.length === 0
              ? 'All risks mitigated — safe to post!'
              : `${remaining.length} privacy risk${remaining.length !== 1 ? 's' : ''} detected`}
          </p>
        </div>

        {/* Mock image preview with overlay boxes */}
        <section>
          <h3 className="font-bold text-body-md-bold text-on-surface mb-2">Content Preview</h3>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-surface-container-high shadow-md">
            {/* Placeholder image with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-container via-surface-container to-secondary-fixed flex items-center justify-center">
              <div className="flex flex-col items-center gap-2 opacity-30">
                <span className="material-symbols-outlined text-[48px] text-on-surface-variant">image</span>
                <span className="text-caption-lg text-on-surface-variant">Content image preview</span>
              </div>
            </div>

            {/* Silhouette figures */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 300">
              <ellipse cx="160" cy="120" rx="40" ry="50" fill="#8a1538" />
              <ellipse cx="160" cy="200" rx="60" ry="70" fill="#8a1538" />
              <rect x="30" y="220" width="120" height="30" rx="4" fill="#635d5d" />
              <rect x="220" y="165" width="140" height="25" rx="4" fill="#635d5d" />
            </svg>

            {/* Detection overlays */}
            {privacyRisks.map((risk) => {
              const isMitigated = mitigated.includes(risk.id)
              return (
                <div
                  key={risk.id}
                  className={`absolute border-2 rounded transition-all duration-300 ${
                    isMitigated
                      ? 'border-tertiary-container bg-tertiary-fixed/20 opacity-50'
                      : 'border-error bg-error/10 animate-pulse'
                  }`}
                  style={{
                    top: risk.pos.top,
                    left: risk.pos.left,
                    width: risk.pos.w,
                    height: risk.pos.h,
                  }}
                >
                  <div className={`absolute -top-5 left-0 text-[9px] font-bold uppercase tracking-wider px-1 rounded whitespace-nowrap ${
                    isMitigated ? 'text-tertiary bg-tertiary-fixed/50' : 'text-error bg-error-container'
                  }`}>
                    {isMitigated ? '✓ Masked' : risk.label}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Risk list */}
        <section>
          <h3 className="font-bold text-body-md-bold text-on-surface mb-3">Detected Privacy Risks</h3>
          <div className="flex flex-col gap-2">
            {privacyRisks.map((risk) => {
              const isMitigated = mitigated.includes(risk.id)
              return (
                <div
                  key={risk.id}
                  className={`rounded-xl p-space-md flex items-center gap-space-md transition-all ${
                    isMitigated ? 'bg-surface-container-low opacity-60' : 'bg-surface-container-low shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isMitigated ? 'bg-tertiary-fixed' : 'bg-error-container'
                  }`}>
                    <span
                      className={`material-symbols-outlined text-[20px] ${isMitigated ? 'text-tertiary' : 'text-error'}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isMitigated ? 'check_circle' : risk.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-body-md-bold text-on-surface">{risk.label}</p>
                    <p className="text-caption-sm text-secondary">{risk.detail}</p>
                  </div>
                  {isMitigated ? (
                    <span className="text-caption-sm text-tertiary font-bold bg-tertiary-fixed px-2.5 py-1 rounded-full whitespace-nowrap">
                      Auto-Removed
                    </span>
                  ) : (
                    <button
                      className="shrink-0 text-caption-sm font-bold bg-primary-container text-on-primary px-3 py-1.5 rounded-full hover:bg-primary active:scale-95 transition-all whitespace-nowrap"
                      onClick={() => handleMitigate(risk.id)}
                    >
                      {risk.action}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Continue button */}
        <button
          className="btn-primary mt-2"
          onClick={() => navigate('/home')}
          id="btn-continue-post"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {remaining.length === 0 ? 'check_circle' : 'warning'}
          </span>
          {remaining.length === 0 ? 'Continue to Post' : `Continue with ${remaining.length} Risk${remaining.length !== 1 ? 's' : ''}`}
        </button>

      </main>

      <BottomNav active="privacy" />
    </div>
  )
}
