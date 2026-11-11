import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import ShareScreen from './screens/ShareScreen'
import ProcessingScreen from './screens/ProcessingScreen'
import ResultScreen from './screens/ResultScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import ReportsScreen from './screens/ReportsScreen'
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen'

function ProtectedRoute({ authenticated, children }: { authenticated: boolean; children: ReactNode }) {
  if (!authenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function getInitialAuth(): boolean {
  if (typeof window === 'undefined') return false
  if (!localStorage.getItem('baseera_cleared_v1')) {
    localStorage.removeItem('baseera_users')
    localStorage.removeItem('baseera_user')
    localStorage.setItem('baseera_cleared_v1', 'true')
  }
  return !!localStorage.getItem('baseera_user')
}

export default function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(getInitialAuth)

  const handleLogin = () => setAuthenticated(true)
  const handleLogout = () => {
    localStorage.removeItem('baseera_user')
    setAuthenticated(false)
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route
            path="/onboarding"
            element={<OnboardingScreen onComplete={() => {
              localStorage.setItem('baseera_onboarded', 'true')
            }} />}
          />
          <Route path="/login" element={!authenticated ? <LoginScreen onLogin={handleLogin} /> : <Navigate to="/home" replace />} />
          <Route path="/signup" element={!authenticated ? <SignupScreen onLogin={handleLogin} /> : <Navigate to="/home" replace />} />
          
          <Route path="/home" element={<ProtectedRoute authenticated={authenticated}><HomeScreen onLogout={handleLogout} /></ProtectedRoute>} />
          <Route path="/share" element={<ProtectedRoute authenticated={authenticated}><ShareScreen /></ProtectedRoute>} />
          <Route path="/processing" element={<ProtectedRoute authenticated={authenticated}><ProcessingScreen /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute authenticated={authenticated}><ResultScreen /></ProtectedRoute>} />
          <Route path="/privacy" element={<ProtectedRoute authenticated={authenticated}><PrivacyScreen /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute authenticated={authenticated}><ReportsScreen /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
