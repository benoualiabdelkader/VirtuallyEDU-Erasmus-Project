import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      const onboarded = localStorage.getItem('baseera_onboarded')
      if (onboarded !== 'true') {
        navigate('/onboarding', { replace: true })
        return
      }
      const user = localStorage.getItem('baseera_user')
      navigate(user ? '/home' : '/login', { replace: true })
    }, 1500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col min-h-dvh w-full bg-primary-container text-on-primary justify-between items-center px-margin py-space-xl select-none">
      <div className="w-full h-8 opacity-0" />

      <div className="flex flex-col items-center justify-center text-center my-auto animate-fade-in">
        <div className="w-20 h-20 mb-space-md flex items-center justify-center">
          <svg
            aria-label="Baseera Lens Logo"
            className="w-20 h-20 text-on-primary"
            fill="none"
            viewBox="0 0 80 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 18C23.6 18 10.4 29.8 6 40C10.4 50.2 23.6 62 40 62C56.4 62 69.6 50.2 74 40C69.6 29.8 56.4 18 40 18Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.5"
            />
            <circle cx="40" cy="40" r="13" stroke="currentColor" strokeWidth="3.5" />
            <circle cx="40" cy="40" r="5" fill="currentColor" />
          </svg>
        </div>

        <h1 className="font-serif font-bold text-headline-lg text-on-primary tracking-tight mb-1">
          Baseera
        </h1>
        <p className="text-body-md text-on-primary/80 tracking-normal max-w-xs font-medium">
          Digital Literacy &amp; Critical Evaluation
        </p>
      </div>

      <div className="flex flex-col items-center justify-center pb-space-lg">
        <div className="w-7 h-7 flex items-center justify-center">
          <svg
            className="animate-spin w-6 h-6 text-on-primary/30"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 13.5911 2.37126 15.0954 3.03155 16.428"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
          </svg>
        </div>
        <span className="sr-only">Initializing application...</span>
      </div>
    </div>
  )
}
