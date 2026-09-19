import { useState } from 'react'
import { Code2, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'

interface Props {
  onLogin: (name?: string, email?: string) => void
  onSwitch: () => void
}

export function LoginPage({ onLogin, onSwitch }: Props) {
  const savedUser = (() => {
    try {
      const raw = localStorage.getItem('c2h_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })()

  const [email, setEmail] = useState(savedUser?.email || '')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [focused, setFocused] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const name = savedUser && savedUser.email === email ? savedUser.name : undefined
    setTimeout(() => onLogin(name, email), 600)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg-orb auth-orb-1" />
      <div className="auth-bg-orb auth-orb-2" />
      <div className="auth-bg-orb auth-orb-3" />
      <div className="auth-grid-overlay" />

      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-brand">
            <div className="brand-mark"><img src="/logo.png" alt="Code2Hire Logo" className="brand-logo" /></div>
            <span>code<span>2</span>hire</span>
          </div>
          <div className="auth-hero-content">
            <div className="auth-pill"><Sparkles size={12} /> AI-POWERED PLACEMENT PREP</div>
            <h1>Crack your dream<br />company <em>interview.</em></h1>
            <p>Smart coding preparation tailored to your target company. Practice curated questions, compete in contests, and track your progress.</p>
            <div className="auth-stats-row">
              <div className="auth-stat"><strong>50K+</strong><span>Students</span></div>
              <div className="auth-stat-divider" />
              <div className="auth-stat"><strong>2,500+</strong><span>Problems</span></div>
              <div className="auth-stat-divider" />
              <div className="auth-stat"><strong>92%</strong><span>Placement Rate</span></div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-form-header">
              <h2>Welcome back</h2>
              <p>Sign in to continue your preparation</p>
            </div>

            <div className={`auth-field ${focused === 'email' ? 'focused' : ''} ${email ? 'has-value' : ''}`}>
              <Mail size={16} className="auth-field-icon" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                id="login-email"
              />
            </div>

            <div className={`auth-field ${focused === 'password' ? 'focused' : ''} ${password ? 'has-value' : ''}`}>
              <Lock size={16} className="auth-field-icon" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused('')}
                id="login-password"
              />
              <button type="button" className="auth-eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <div className="auth-extras">
              <label className="auth-remember">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <button type="button" className="auth-forgot">Forgot password?</button>
            </div>

            <button type="submit" className={`auth-submit ${loading ? 'loading' : ''}`} id="login-submit">
              {loading ? <span className="auth-spinner" /> : <>Sign in <ArrowRight size={16} /></>}
            </button>

            <div className="auth-divider"><span>or continue with</span></div>

            <div className="auth-socials">
              <button type="button" className="auth-social" onClick={handleSubmit}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button type="button" className="auth-social" onClick={handleSubmit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </button>
            </div>

            <p className="auth-switch">
              Don't have an account? <button type="button" onClick={onSwitch}>Sign up</button>
            </p>
          </form>
        </div>
      </div>
      <footer className="auth-footer">
        <p>Created by Shitu</p>
      </footer>
    </div>
  )
}
