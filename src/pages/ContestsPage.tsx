import { useState, useEffect } from 'react'
import { Clock, Users, ExternalLink, Bell, BellOff, CalendarDays, Timer, CheckCircle2, Globe2 } from 'lucide-react'
import { contests as initialContests, fetchLiveContests, getTimeRemaining, formatContestDateTime, formatContestRelative, type Contest } from '../data/contests'
import { SectionTitle } from '../components/SectionTitle'

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [time, setTime] = useState(getTimeRemaining(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (time.total <= 0) return <span className="contest-live-badge">LIVE NOW</span>

  return (
    <div className="countdown">
      <div className="countdown-unit">
        <span className="countdown-num">{String(time.days).padStart(2, '0')}</span>
        <span className="countdown-label">DAYS</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-num">{String(time.hours).padStart(2, '0')}</span>
        <span className="countdown-label">HRS</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-num">{String(time.minutes).padStart(2, '0')}</span>
        <span className="countdown-label">MIN</span>
      </div>
      <span className="countdown-sep">:</span>
      <div className="countdown-unit">
        <span className="countdown-num">{String(time.seconds).padStart(2, '0')}</span>
        <span className="countdown-label">SEC</span>
      </div>
    </div>
  )
}

function getPlatformColor(platform: string) {
  const colors: Record<string, string> = {
    'Codeforces': '#7B61FF',
    'LeetCode': '#F9A93B',
    'CodeChef': '#5B4638',
    'AtCoder': '#00C0EF',
  }
  return colors[platform] || '#7B61FF'
}

export function ContestsPage() {
  const [contestList, setContestList] = useState<Contest[]>(initialContests)
  const [registered, setRegistered] = useState<Set<number>>(
    new Set(initialContests.filter(c => c.registered).map(c => c.id))
  )
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [platformFilter, setPlatformFilter] = useState('All')
  const [isLiveSynced, setIsLiveSynced] = useState(false)

  useEffect(() => {
    fetchLiveContests().then(data => {
      if (data && data.length > 0) {
        setContestList(data)
        setIsLiveSynced(true)
      }
    })
  }, [])

  const toggleRegister = (id: number) => {
    setRegistered(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const platforms = ['All', ...Array.from(new Set(contestList.map(c => c.platform)))]
  const filteredContests = platformFilter === 'All'
    ? contestList
    : contestList.filter(c => c.platform === platformFilter)

  // Next contest (first upcoming chronologically)
  const nextContest = contestList[0]

  return (
    <div className="page-contests">
      <SectionTitle eyebrow="CONTEST HUB" title="Upcoming Coding Contests" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <p className="muted" style={{ margin: 0 }}>
          Real-time schedules with live countdowns across all major platforms
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', background: 'rgba(57, 255, 20, 0.08)', border: '1px solid rgba(57, 255, 20, 0.25)', borderRadius: 20, fontSize: 11, color: '#39ff14' }}>
          <CheckCircle2 size={12} />
          <span>Times verified & displayed in your local timezone (IST)</span>
        </div>
      </div>

      {/* Featured next contest */}
      {nextContest && (
        <div className="contest-featured" style={{ borderColor: getPlatformColor(nextContest.platform) + '44' }}>
          <div className="contest-featured-glow" style={{ background: getPlatformColor(nextContest.platform) }} />
          <div className="contest-featured-left">
            <div className="contest-featured-badge" style={{ background: getPlatformColor(nextContest.platform) }}>
              {nextContest.platformShort}
            </div>
            <div>
              <p className="eyebrow">NEXT CONTEST · {formatContestRelative(nextContest.startTime)}</p>
              <h2>{nextContest.name}</h2>
              <div className="contest-meta-row">
                <span style={{ color: '#fff', fontWeight: 600 }}><CalendarDays size={12} /> {formatContestDateTime(nextContest.startTime)}</span>
                <span><Clock size={12} /> {nextContest.duration}</span>
                <span><Users size={12} /> {nextContest.participants?.toLocaleString()} registered</span>
              </div>
            </div>
          </div>
          <div className="contest-featured-right">
            <CountdownTimer targetDate={nextContest.startTime} />
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {nextContest.url && (
                <a
                  href={nextContest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contest-open-btn"
                  title={`Open ${nextContest.name} in new tab`}
                >
                  <ExternalLink size={13} /> Go to Contest ↗
                </a>
              )}
              <button
                className={`contest-register-btn ${registered.has(nextContest.id) ? 'registered' : ''}`}
                onClick={() => toggleRegister(nextContest.id)}
              >
                {registered.has(nextContest.id) ? <><BellOff size={13} /> Registered</> : <><Bell size={13} /> Register</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="contest-toolbar">
        <div className="contest-filters">
          {platforms.map(p => (
            <button
              key={p}
              className={`contest-filter-btn ${platformFilter === p ? 'active' : ''}`}
              onClick={() => setPlatformFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="contest-view-toggle">
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
            <Timer size={14} /> List
          </button>
          <button className={view === 'calendar' ? 'active' : ''} onClick={() => setView('calendar')}>
            <CalendarDays size={14} /> Schedule
          </button>
        </div>
      </div>

      {/* Contest list or Calendar Schedule view */}
      {view === 'list' ? (
        <div className="contest-grid">
          {filteredContests.map(contest => (
            <div className="contest-card" key={contest.id}>
              <div className="contest-card-header">
                <div className="contest-platform-badge" style={{ background: getPlatformColor(contest.platform) }}>
                  {contest.platformShort}
                </div>
                <span className="contest-platform-name">{contest.platform}</span>
                <span className="contest-relative-pill">{formatContestRelative(contest.startTime)}</span>
                {registered.has(contest.id) && <span className="contest-reg-tag">Registered</span>}
              </div>
              <h3>
                {contest.url ? (
                  <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contest-title-link"
                    title={`Open ${contest.name}`}
                  >
                    {contest.name}
                    <ExternalLink size={12} className="contest-title-icon" />
                  </a>
                ) : (
                  contest.name
                )}
              </h3>
              <div className="contest-card-meta">
                <span style={{ color: '#edf1fb', fontWeight: 600 }}><CalendarDays size={12} /> {formatContestDateTime(contest.startTime)}</span>
                <span><Clock size={12} /> {contest.duration}</span>
                {contest.participants && <span><Users size={12} /> {contest.participants.toLocaleString()}</span>}
              </div>
              <div className="contest-card-timer">
                <CountdownTimer targetDate={contest.startTime} />
              </div>
              <div className="contest-card-actions">
                {contest.url && (
                  <a
                    href={contest.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contest-link-btn"
                    title={`Direct redirect to ${contest.platform} contest`}
                  >
                    <ExternalLink size={12} /> Go to Contest ↗
                  </a>
                )}
                <button
                  className={`contest-register-btn small ${registered.has(contest.id) ? 'registered' : ''}`}
                  onClick={() => toggleRegister(contest.id)}
                >
                  {registered.has(contest.id) ? 'Registered ✓' : 'Register'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="contest-schedule-timeline">
          {filteredContests.map(contest => (
            <div className="schedule-row" key={contest.id}>
              <div className="schedule-time-col">
                <strong>{formatContestDateTime(contest.startTime)}</strong>
                <small>{formatContestRelative(contest.startTime)}</small>
              </div>
              <div className="schedule-platform-col">
                <div className="contest-platform-badge" style={{ background: getPlatformColor(contest.platform) }}>
                  {contest.platformShort}
                </div>
                <span>{contest.platform}</span>
              </div>
              <div className="schedule-info-col">
                <h3>
                  <a href={contest.url} target="_blank" rel="noopener noreferrer" className="contest-title-link">
                    {contest.name} <ExternalLink size={12} className="contest-title-icon" />
                  </a>
                </h3>
                <div className="schedule-submeta">
                  <span><Clock size={12} /> {contest.duration}</span>
                  <span><Users size={12} /> {contest.participants.toLocaleString()} registered</span>
                </div>
              </div>
              <div className="schedule-action-col">
                <CountdownTimer targetDate={contest.startTime} />
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contest-open-btn"
                  style={{ padding: '6px 12px', fontSize: 10 }}
                >
                  Go to Contest ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
