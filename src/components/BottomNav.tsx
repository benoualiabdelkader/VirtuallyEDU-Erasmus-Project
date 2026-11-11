import { useNavigate } from 'react-router-dom'

interface BottomNavProps {
  active: 'home' | 'analyze' | 'privacy' | 'reports'
}

const tabs = [
  { id: 'home', label: 'Home', icon: 'home', path: '/home' },
  { id: 'analyze', label: 'Analyze', icon: 'document_scanner', path: '/share' },
  { id: 'privacy', label: 'Privacy', icon: 'shield', path: '/privacy' },
  { id: 'reports', label: 'Reports', icon: 'monitoring', path: '/reports' },
] as const

export default function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] z-50 bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-around items-center h-16 px-space-xs">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => navigate(tab.path)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span className="text-caption-lg mt-0.5">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
