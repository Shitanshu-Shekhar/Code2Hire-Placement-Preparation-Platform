import { useMemo, useState, useEffect, type ReactNode } from 'react'
import { Bell, BookOpen, Bot, CalendarDays, Check, ChevronDown, CircleHelp, Code2, Flame, Gauge, GraduationCap, LayoutDashboard, LineChart, Menu, MoreHorizontal, Play, Search, Settings, Sparkles, Target, Trophy, X, Zap, LogOut, ExternalLink } from 'lucide-react'
import { plan, profile, readinessTrend, topicScores } from './data/dashboard'
import { contests as staticContests, fetchLiveContests, formatContestDateTime, formatContestRelative } from './data/contests'
import { ScoreRing } from './components/ScoreRing'
import { SectionTitle } from './components/SectionTitle'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { CompaniesPage } from './pages/CompaniesPage'
import { ContestsPage } from './pages/ContestsPage'
import { PracticePage } from './pages/PracticePage'
import { StudyPlanPage } from './pages/StudyPlanPage'
import { CodingPage } from './pages/CodingPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { LeaderboardPage } from './pages/LeaderboardPage'
import { useUser } from './context/UserContext'
import { getLeetCodeUrl } from './utils/leetcode'

const nav = [
  ['Dashboard', LayoutDashboard], ['My Coding', Code2], ['Contests', Trophy], ['Companies', Target],
  ['Practice', BookOpen], ['Analytics', LineChart], ['Study plan', CalendarDays], ['Leaderboard', GraduationCap],
]

type AuthPage = 'login' | 'signup' | 'app'

function App() {
  const { user, login, signup, logout, stats, completedTasks, toggleTask } = useUser()
  const [authPage, setAuthPage] = useState<AuthPage>(() => user ? 'app' : 'login')
  const [active, setActive] = useState('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState<string | null>(null)
  const [liveContests, setLiveContests] = useState(staticContests)

  useEffect(() => {
    fetchLiveContests().then(data => {
      if (data && data.length > 0) {
        setLiveContests(data)
      }
    })
  }, [])

  const completion = useMemo(() => {
    return Math.round((completedTasks.size / Math.max(1, plan.length)) * 100)
  }, [completedTasks])

  // Auth pages: If no authenticated user, show signup/login
  if (!user || authPage !== 'app') {
    if (authPage === 'login') {
      return (
        <LoginPage
          onLogin={(name, email) => {
            login(name, email)
            setAuthPage('app')
          }}
          onSwitch={() => setAuthPage('signup')}
        />
      )
    }
    return (
      <SignupPage
        onSignup={(name, email) => {
          signup(name, email)
          setAuthPage('app')
        }}
        onSwitch={() => setAuthPage('login')}
      />
    )
  }

  const userName = user.name
  const userFirstName = userName.split(' ')[0]
  const userInitials = user.avatarInitials
  const userCompany = user.targetCompany || 'Amazon'

  // Render active page content
  const renderPage = () => {
    switch (active) {
      case 'My Coding': return <CodingPage />
      case 'Contests': return <ContestsPage />
      case 'Companies': return <CompaniesPage />
      case 'Practice': return <PracticePage />
      case 'Analytics': return <AnalyticsPage />
      case 'Study plan': return <StudyPlanPage />
      case 'Leaderboard': return <LeaderboardPage />
      default: return renderDashboard()
    }
  }

  function renderDashboard() {
    return (
      <>
        <section className="welcome-row">
          <div>
            <p className="eyebrow">ACTIVE SESSION</p>
            <h1>Good morning, {userFirstName} <span>✦</span></h1>
            <p className="subcopy">Targeting {userCompany}. Let's make today count with live tracking.</p>
          </div>
          <button className="primary-button" onClick={() => setModal('simulator')}>
            <Sparkles size={17} /> Explore what-if plan
          </button>
        </section>

        <section className="hero-card">
          <div className="hero-glow" />
          <div className="hero-copy">
            <div className="pill"><Target size={13} /> TARGETING {userCompany.toUpperCase()}</div>
            <h2>Your next best move is <em>Graphs.</em></h2>
            <p>Improve graph patterns before the Codeforces round. It's your biggest preparation lever this week.</p>
            <div className="hero-actions">
              <a
                href={getLeetCodeUrl('Number of Islands')}
                target="_blank"
                rel="noopener noreferrer"
                className="white-button"
                style={{ textDecoration: 'none' }}
              >
                <Play size={15} fill="currentColor" /> Solve on LeetCode ↗
              </a>
              <button className="ghost-button" onClick={() => setModal('roadmap')}>
                View my roadmap <span>→</span>
              </button>
            </div>
          </div>
          <div className="hero-score">
            <ScoreRing value={stats.score} size={124} stroke={10} />
            <div>
              <b>Preparation score</b>
              <span>+{stats.score - 50} pts active</span>
            </div>
          </div>
        </section>

        <section className="stat-grid">
          <Stat icon={<Code2 />} label="Problems solved" value={stats.totalSolved.toLocaleString()} detail={`${stats.easySolved}E · ${stats.mediumSolved}M · ${stats.hardSolved}H`} trend="up" />
          <Stat
            icon={<Trophy />}
            label="Contest rating"
            value={stats.contestRating ? stats.contestRating.toLocaleString() : (stats.isLeetCodeSynced ? 'Unrated' : '1,712')}
            detail={stats.isLeetCodeSynced ? 'Verified LeetCode rating' : 'Active contest track'}
            trend="up"
          />
          <Stat icon={<Flame />} label="Current streak" value={`${stats.streak} days`} detail="Streak active" hot />
          <Stat icon={<Gauge />} label="Mock OA score" value={`${Math.min(98, stats.score + 10)}%`} detail="Readiness index" trend="up" />
        </section>

        <section className="dashboard-grid">
          <div className="card weaknesses">
            <SectionTitle eyebrow="SKILL INTELLIGENCE" title="Your highest-impact gaps" action={<button className="text-button" onClick={() => setModal('analytics')}>Full analytics <span>→</span></button>} />
            <p className="muted">Focus here to make the fastest progress toward {userCompany}.</p>
            <div className="topic-list">
              {topicScores.slice(2).reverse().map((topic, index) => (
                <div className="topic-row" key={topic.name}>
                  <div className="topic-rank">0{index + 1}</div>
                  <div className="topic-name">
                    <b>{topic.name}</b>
                    <span>{topic.score < 50 ? 'Priority focus' : 'Practice more'}</span>
                  </div>
                  <div className="progress">
                    <i style={{ width: `${topic.score}%`, background: topic.color }} />
                  </div>
                  <strong style={{ color: topic.color }}>{topic.score}%</strong>
                </div>
              ))}
            </div>
            <div className="insight">
              <div className="insight-icon"><Zap size={16} /></div>
              <p><b>Why now?</b> Graphs appear in 28% of {userCompany}'s recent coding rounds and tests your speed.</p>
            </div>
          </div>

          <div className="card plan-card">
            <SectionTitle eyebrow="TODAY'S ROADMAP" title={`${completion}% complete`} action={<button className="calendar-icon" onClick={() => setModal('plan')}><CalendarDays size={17} /></button>} />
            <div className="plan-list">
              {plan.map((task, index) => {
                const isDone = completedTasks.has(index + 1)
                const isProblem = task.title.includes('Number of Islands')
                return (
                  <div className={isDone ? 'plan-item done' : 'plan-item'} key={task.title}>
                    <time>{task.time}</time>
                    <button
                      type="button"
                      className="status-toggle-btn"
                      onClick={() => toggleTask(index + 1)}
                    >
                      {isDone ? <Check size={13} className="q-check" /> : <span className="q-circle" />}
                    </button>
                    <div>
                      <b>{task.title}</b>
                      <small>{task.meta}</small>
                    </div>
                    {isProblem && (
                      <a
                        href={getLeetCodeUrl('Number of Islands')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sp-lc-chip"
                        style={{ marginRight: 6 }}
                        title="Solve on LeetCode"
                      >
                        LeetCode ↗
                      </a>
                    )}
                    <em>{task.duration}</em>
                  </div>
                )
              })}
            </div>
            <button className="full-button" onClick={() => setActive('Study plan')}>
              Open full study plan <span>→</span>
            </button>
          </div>

          <div className="card recommendation">
            <SectionTitle eyebrow="PERSONALIZED FOR YOU" title="Solve this next" />
            <div className="problem-card">
              <div className="problem-top">
                <span className="tag graph">GRAPHS</span>
                <span className="difficulty">Medium</span>
              </div>
              <h3>Number of Islands</h3>
              <p>{userCompany} · Most frequent graph pattern</p>
              <div className="reason">
                <Sparkles size={14} />
                <span>Matches your level and fixes a high-impact gap.</span>
              </div>
              <a
                href={getLeetCodeUrl('Number of Islands')}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-button"
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                Solve on LeetCode ↗
              </a>
            </div>
          </div>

          <div className="card chart-card">
            <SectionTitle eyebrow="TRAJECTORY" title="Readiness trend" action={<div className="trend-badge">↗ {stats.score}% <span>readiness</span></div>} />
            <div className="readiness-chart">
              <svg viewBox="0 0 600 150" preserveAspectRatio="none" aria-label="Preparation score rising">
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#6d5dfc" stopOpacity=".32" />
                    <stop offset="100%" stopColor="#6d5dfc" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,124 L0,112 C70,104 85,100 120,101 S180,94 240,86 S300,74 360,71 S420,63 480,59 S540,40 600,25 L600,150 L0,150 Z" fill="url(#area)" />
                <path d="M0,112 C70,104 85,100 120,101 S180,94 240,86 S300,74 360,71 S420,63 480,59 S540,40 600,25" fill="none" stroke="#8a7dff" strokeWidth="3" />
                <circle cx="600" cy="25" r="5" fill="#a99cff" stroke="#fff" strokeWidth="2" />
              </svg>
              <div className="chart-labels">
                {readinessTrend.map(point => <span key={point.day}>{point.day}</span>)}
              </div>
            </div>
          </div>

          <div className="card contests-card">
            <SectionTitle eyebrow="COMING UP" title="Upcoming contests" action={<button className="text-button" onClick={() => setActive('Contests')}>Calendar <span>→</span></button>} />
            <div className="contest-list">
              {liveContests.slice(0, 2).map(contest => (
                <div className="contest" key={contest.id}>
                  <div className="platform-dot" style={{ background: contest.color }}>
                    {contest.platform[0]}
                  </div>
                  <div>
                    <span className="platform-name">{contest.platform}</span>
                    <b>{contest.name}</b>
                    <small>{formatContestDateTime(contest.startTime)} · {formatContestRelative(contest.startTime)}</small>
                  </div>
                  <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contest-dash-link"
                    title={`Open ${contest.name}`}
                  >
                    Join ↗
                  </a>
                </div>
              ))}
            </div>
            <button className="conflict" onClick={() => setActive('Contests')}>
              <CircleHelp size={16} />
              <span><b>Live contest schedule</b> · View times and countdowns</span>
              <span>→</span>
            </button>
          </div>
        </section>

        <section className="bottom-banner">
          <div className="banner-icon"><Bot size={23} /></div>
          <div>
            <p className="eyebrow">CODE2HIRE COACH</p>
            <b>Ask anything about your placement plan.</b>
            <span>"Should I solve Number of Islands before tomorrow's contest?"</span>
          </div>
          <button onClick={() => setModal('coach')}>Ask coach <span>→</span></button>
        </section>
      </>
    )
  }

  return (
    <div className="app-shell">
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <div className="brand-mark"><img src="/logo.png" alt="Code2Hire Logo" className="brand-logo" /></div>
          <span>code<span>2</span>hire</span>
          <button className="mobile-close" onClick={() => setMenuOpen(false)}><X size={18} /></button>
        </div>
        <div className="workspace">
          <div className="avatar avatar-sm">{userInitials}</div>
          <div>
            <b>{userName}</b>
            <small>{userCompany} roadmap</small>
          </div>
          <ChevronDown size={15} />
        </div>
        <nav>
          {nav.map(([name, Icon]) => (
            <button
              key={name as string}
              className={active === name ? 'nav-item active' : 'nav-item'}
              onClick={() => { setActive(name as string); setMenuOpen(false) }}
            >
              <Icon size={18} />
              <span>{name as string}</span>
              {name === 'Study plan' && <em>{completedTasks.size}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Settings size={18} /><span>Settings</span></button>
          <button className="nav-item" onClick={() => { logout(); setAuthPage('login') }}>
            <LogOut size={18} /><span>Logout</span>
          </button>
          <div className="profile-mini">
            <div className="avatar">{userInitials}</div>
            <div>
              <b>{userFirstName}</b>
              <small>Verified account</small>
            </div>
            <MoreHorizontal size={17} />
          </div>
          <div className="sidebar-footer">
            <p>Created by Shitu</p>
          </div>
        </div>
      </aside>

      <main>
        <header>
          <button className="menu-button" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
          <div className="crumb"><span>Workspace</span><i>/</i><b>{active}</b></div>
          <div className="header-actions">
            <button className="search"><Search size={17} /><span>Search anything</span><kbd>⌘ K</kbd></button>
            <button className="icon-button notification"><Bell size={19} /><i /></button>
            <div className="avatar avatar-header" title={userName}>{userInitials}</div>
          </div>
        </header>
        <div className="content">
          {renderPage()}
        </div>
        <footer className="app-footer">
          <p>Created by Shitu</p>
        </footer>
      </main>

      {modal && <Modal name={modal} onClose={() => setModal(null)} />}
    </div>
  )
}

function Stat({ icon, label, value, detail, trend, hot }: { icon: ReactNode; label: string; value: string; detail: string; trend?: string; hot?: boolean }) {
  return (
    <div className="stat-card">
      <div className={hot ? 'stat-icon hot' : 'stat-icon'}>{icon}</div>
      <div>
        <span>{label}</span>
        <h3>{value}</h3>
        <small className={trend ? 'positive' : ''}>{trend ? '↗ ' : ''}{detail}</small>
      </div>
    </div>
  )
}

function Modal({ name, onClose }: { name: string; onClose: () => void }) {
  const copy: Record<string, [string, string]> = {
    recommendation: ['Recommendation brief', 'Number of Islands is ranked first because it is highly relevant to Amazon, matches your current medium-level ability, and directly targets Graphs — your highest-leverage gap.'],
    roadmap: ['Your preparation roadmap', 'Concentrate on Graphs and Dynamic Programming; next week, deepen Trees and system-design fundamentals.'],
    simulator: ['What-if simulator', 'At 2 hours per day, your estimated progress is +8%. Increasing to 3 hours/day changes the estimate to +14%. These are preparation estimates, not hiring predictions.'],
    analytics: ['Topic intelligence', 'Your highest expected return is Graphs, followed by Dynamic Programming. Focus on one pattern, one timed problem, and one reflection per session.'],
    plan: ['Your study plan', "The plan balances high-priority weaknesses, company relevance, and your contest schedule. Finish any open task to keep tomorrow's plan adaptive."],
    contests: ['Contest intelligence', 'Codeforces Round #1021 overlaps with another round. Based on your goals, we recommend Codeforces and a virtual LeetCode practice later.'],
    coach: ['Code2Hire Coach', "I'd keep the Codeforces round: it tests your speed and exposes weak patterns before your interview window. Schedule a 30-minute review afterward."]
  }
  const [title, body] = copy[name] ?? ['Information', '']
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={18} /></button>
        <div className="modal-spark"><Sparkles size={19} /></div>
        <p className="eyebrow">CODE2HIRE INTELLIGENCE</p>
        <h2>{title}</h2>
        <p>{body}</p>
        <button className="primary-button" onClick={onClose}>Got it <span>→</span></button>
      </div>
    </div>
  )
}

export default App
