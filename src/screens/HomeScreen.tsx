import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { analysisStore, type Observation } from '../store'


export default function HomeScreen({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate()
  const [observations] = useState<Observation[]>(() => analysisStore.getObservations())
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const userJson = localStorage.getItem('baseera_user')
  const user = userJson ? JSON.parse(userJson) : { name: 'Guest' }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('baseera_user')
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in">
      {/* Header */}
      <header className="px-margin pt-12 pb-4 bg-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center">
              <svg className="w-5 h-5 text-on-primary" fill="none" viewBox="0 0 80 80">
                <path d="M40 18C23.6 18 10.4 29.8 6 40C10.4 50.2 23.6 62 40 62C56.4 62 69.6 50.2 74 40C69.6 29.8 56.4 18 40 18Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="5" />
                <circle cx="40" cy="40" r="4" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="text-caption-lg text-secondary">{greeting},</p>
              <h1 className="font-bold text-body-md-bold text-on-surface">{user.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center relative hover:bg-error/10 hover:text-error transition-colors"
              aria-label="Logout"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
            <button
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center relative"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[22px] text-on-surface">notifications</span>
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-24 px-margin flex flex-col gap-5">

        {/* Hero CTA Card */}
        <section className="rounded-3xl bg-primary-container p-5 relative overflow-hidden shadow-sm border border-primary/20">
          <div className="relative z-10">
            <p className="text-caption-lg text-on-primary/70 font-semibold uppercase tracking-widest mb-1">Content Evaluation</p>
            <h2 className="font-serif font-bold text-headline-md text-on-primary mb-1 leading-snug">
              Analyze Content<br />with Confidence
            </h2>
            <p className="text-body-md text-on-primary/80 mb-4 max-w-[220px]">
              Uncover hidden bias and verify sources before you share.
            </p>
            <button
              className="flex items-center gap-2 bg-on-primary text-primary-container font-bold text-body-md-bold px-4 py-2.5 rounded-2xl shadow-sm hover:bg-primary-fixed transition-colors active:scale-[0.97]"
              onClick={() => navigate('/share')}
              id="cta-analyze"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>link</span>
              Paste Link or Media
            </button>
          </div>
        </section>

        {/* Weekly Summary */}
        <section className="card p-space-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-body-md-bold text-on-surface">Weekly Summary</h3>
            <span className="text-caption-lg text-secondary">Past 7 days</span>
          </div>
          <div className="grid grid-cols-2 gap-space-xs">
            {/* Content Checked */}
            <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between">
              <span className="text-caption-sm text-secondary">Content Checked</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif font-bold text-headline-md text-primary-container">12</span>
                <span className="text-caption-sm text-secondary">items</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-tertiary-container">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                <span className="text-caption-sm font-semibold">+4 vs last week</span>
              </div>
            </div>
            {/* Cognitive Habit */}
            <div className="bg-surface-container-low rounded-xl p-space-sm flex flex-col justify-between">
              <span className="text-caption-sm text-secondary">Cognitive Habit</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif font-bold text-headline-md text-primary-container">88%</span>
                <span className="text-caption-sm text-secondary">score</span>
              </div>
              <div className="w-full bg-secondary-container rounded-full h-1.5 mt-2.5 overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Essential Tools */}
        <section>
          <h3 className="font-bold text-body-md-bold text-on-surface mb-3">Essential Tools</h3>
          <div className="grid grid-cols-2 gap-space-sm">
            <button
              className="card p-space-md flex flex-col justify-between gap-space-sm transition-colors active:bg-surface-container-low text-left"
              onClick={() => navigate('/privacy')}
              id="tool-privacy"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
              </div>
              <div>
                <h4 className="font-bold text-body-md-bold text-on-surface">Privacy Scan</h4>
                <p className="text-caption-sm text-secondary mt-0.5">Inspect tracking &amp; data exposure</p>
              </div>
            </button>
            <button
              className="card p-space-md flex flex-col justify-between gap-space-sm transition-colors active:bg-surface-container-low text-left"
              onClick={() => navigate('/reports')}
              id="tool-reports"
            >
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-lg bg-secondary-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
              </div>
              <div>
                <h4 className="font-bold text-body-md-bold text-on-surface">Fact History</h4>
                <p className="text-caption-sm text-secondary mt-0.5">Revisit verified claims &amp; evidence</p>
              </div>
            </button>
          </div>
        </section>

        {/* Recent Observations */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-body-md-bold text-on-surface">Recent Observations</h3>
            {observations.length > 0 && (
              <button
                className="text-caption-lg text-primary-container font-semibold"
                onClick={() => navigate('/reports')}
              >
                View All
              </button>
            )}
          </div>

          {observations.length === 0 ? (
            <div className="bg-surface-container-low rounded-2xl p-6 text-center flex flex-col items-center gap-3 border border-outline-variant/30">
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[24px]">visibility_off</span>
              </div>
              <div>
                <p className="font-bold text-body-md text-on-surface">No recent observations yet</p>
                <p className="text-caption-sm text-secondary mt-1">
                  Analyze an image, post, or link to see your critical observations here.
                </p>
              </div>
              <button
                onClick={() => navigate('/share')}
                className="mt-1 px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-body-sm shadow-sm active:scale-95 transition-transform"
              >
                Analyze Content
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {observations.slice(0, 5).map((obs) => (
                <button
                  key={obs.id}
                  className="bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm w-full text-left active:bg-surface-container-high transition-colors"
                  onClick={() => {
                    analysisStore.setResult(obs.result)
                    analysisStore.setContent(obs.content)
                    if (obs.media) analysisStore.setMedia(obs.media)
                    navigate('/result')
                  }}
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-container-high flex items-center justify-center">
                    {obs.img ? (
                      <img
                        className="w-full h-full object-cover"
                        src={obs.img}
                        alt={obs.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-[24px] text-secondary">
                        article
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block w-2 h-2 rounded-full ${obs.tagColor}`} />
                      <span className="text-caption-sm text-secondary uppercase tracking-wider">{obs.tag}</span>
                    </div>
                    <p className="font-bold text-body-md-bold text-on-surface truncate mt-0.5">{obs.title}</p>
                    <span className="text-caption-sm text-secondary">{obs.time} · {obs.source}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav active="home" />
    </div>
  )
}
