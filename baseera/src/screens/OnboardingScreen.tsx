import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface OnboardingScreenProps {
  onComplete: () => void
}

const slides = [
  {
    icon: (
      <svg className="w-20 h-20 text-primary-container" fill="none" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="3" strokeDasharray="8 4" />
        <path d="M40 22v18l10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="40" cy="40" r="4" fill="currentColor" />
      </svg>
    ),
    title: 'Share with Intention',
    subtitle: 'Pause Before You Post',
    description: 'Baseera helps you slow down and reflect before sharing content. Every share is a choice — make it a conscious one.',
    accent: 'bg-primary-fixed/40',
  },
  {
    icon: (
      <svg className="w-20 h-20 text-primary-container" fill="none" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="20" width="52" height="40" rx="6" stroke="currentColor" strokeWidth="3" />
        <path d="M26 36h28M26 44h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="58" cy="22" r="8" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
        <path d="M55 22l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Content & Bias Evaluation',
    subtitle: 'Evaluate Context & Framing',
    description: 'Inspect emotional triggers, framing indicators, and source context to support informed, critical discernment.',
    accent: 'bg-secondary-container',
  },
  {
    icon: (
      <svg className="w-20 h-20 text-primary-container" fill="none" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 14L52 26H68V58H12V26H28L40 14Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 46c0-4.42 3.58-8 8-8s8 3.58 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="40" cy="46" r="4" fill="currentColor" />
        <path d="M28 58V46M52 58V46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    title: 'Cultivate Critical Thinking',
    subtitle: 'Build Lasting Habits',
    description: 'Track your digital literacy growth weekly. Baseera rewards your discernment and builds your resistance to misinformation.',
    accent: 'bg-tertiary-fixed/30',
  },
]

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      onComplete()
      localStorage.setItem('baseera_onboarded', 'true')
      navigate('/signup', { replace: true })
    }
  }

  const handleSkip = () => {
    onComplete()
    localStorage.setItem('baseera_onboarded', 'true')
    navigate('/signup', { replace: true })
  }

  const slide = slides[current]
  const isLast = current === slides.length - 1

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in">
      {/* Skip */}
      <div className="flex justify-end px-margin pt-4">
        <button
          className="text-secondary font-semibold text-body-md px-3 py-2 rounded-full hover:bg-surface-container-high transition-colors"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-margin text-center"
        key={current}
        style={{ animation: 'slideUp 0.4s ease-out forwards' }}
      >
        {/* Illustration */}
        <div className={`w-36 h-36 rounded-3xl ${slide.accent} flex items-center justify-center mb-8`}>
          {slide.icon}
        </div>

        {/* Text */}
        <p className="text-caption-lg text-primary-container font-bold uppercase tracking-widest mb-2">
          {slide.subtitle}
        </p>
        <h2 className="font-serif text-headline-lg text-on-surface mb-4 leading-tight">
          {slide.title}
        </h2>
        <p className="text-body-lg text-secondary max-w-xs leading-relaxed">
          {slide.description}
        </p>
      </div>

      {/* Bottom controls */}
      <div className="px-margin pb-10 flex flex-col items-center gap-5">
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-primary-container'
                  : 'w-2 bg-secondary-container'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next / Get Started button */}
        <button
          className="btn-primary"
          onClick={handleNext}
        >
          {isLast ? 'Get Started' : 'Next'}
          <span className="material-symbols-outlined text-[20px]">
            {isLast ? 'rocket_launch' : 'arrow_forward'}
          </span>
        </button>
      </div>
    </div>
  )
}
