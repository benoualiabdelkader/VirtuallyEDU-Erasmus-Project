import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthService } from '../services/authService'

export default function LoginScreen({ onLogin }: { onLogin?: () => void }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    const res = AuthService.login(email, password)
    if (res.success) {
      onLogin?.()
      navigate('/home')
    } else {
      setError(res.error || 'Invalid credentials')
    }
  }

  const handleGuestAccess = () => {
    AuthService.createGuestSession()
    onLogin?.()
    navigate('/home')
  }

  return (
    <div className="flex flex-col min-h-dvh w-full bg-surface animate-fade-in p-margin justify-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center mx-auto mb-6 shadow-md shadow-primary-container/20">
        <svg className="w-8 h-8 text-on-primary" fill="none" viewBox="0 0 80 80">
          <path d="M40 18C23.6 18 10.4 29.8 6 40C10.4 50.2 23.6 62 40 62C56.4 62 69.6 50.2 74 40C69.6 29.8 56.4 18 40 18Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
          <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="5" />
          <circle cx="40" cy="40" r="4" fill="currentColor" />
        </svg>
      </div>
      
      <h1 className="text-headline-md font-serif font-bold text-on-surface text-center mb-2">Welcome Back</h1>
      <p className="text-body-md text-secondary text-center mb-6">Sign in or explore Baseera instantly</p>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4" autoComplete="off">
        {error && <div className="p-3 bg-error/10 text-error rounded-xl text-caption-lg">{error}</div>}
        
        <div>
          <label className="text-caption-lg font-bold text-on-surface mb-1.5 block">Email</label>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 rounded-2xl border-2 border-outline-variant px-4 text-body-md text-on-surface bg-surface focus:border-primary-container outline-none transition-colors"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label className="text-caption-lg font-bold text-on-surface mb-1.5 block">Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 rounded-2xl border-2 border-outline-variant px-4 text-body-md text-on-surface bg-surface focus:border-primary-container outline-none transition-colors"
            placeholder="Enter your password"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full h-12 rounded-2xl bg-primary text-on-primary font-bold text-body-md mt-2 shadow-sm hover:bg-primary/90 transition-colors"
        >
          Sign In
        </button>
      </form>

      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-outline-variant"></div>
        <span className="flex-shrink mx-4 text-caption-sm text-secondary uppercase font-semibold">Or</span>
        <div className="flex-grow border-t border-outline-variant"></div>
      </div>

      <button 
        type="button"
        onClick={handleGuestAccess}
        className="w-full h-12 rounded-2xl bg-surface-container-high text-on-surface font-bold text-body-md hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-outline-variant/30"
      >
        <span className="material-symbols-outlined text-[20px]">explore</span>
        Continue as Guest
      </button>
      
      <p className="text-center text-body-md text-secondary mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary-container font-bold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
