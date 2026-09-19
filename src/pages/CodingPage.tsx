import { useState } from 'react'
import { Code2, CheckCircle, XCircle, Clock, Zap, TrendingUp, ExternalLink, Search, RefreshCw, Award, CheckCircle2, UserCheck, Flame } from 'lucide-react'
import { recentSubmissions as defaultSubmissions, languageStats, dailyActivity } from '../data/coding'
import { SectionTitle } from '../components/SectionTitle'
import { ScoreRing } from '../components/ScoreRing'
import { useUser } from '../context/UserContext'
import { getLeetCodeUrl } from '../utils/leetcode'

export function CodingPage() {
  const { user, stats, trackLeetCode, isTrackingLoading } = useUser()
  const [inputVal, setInputVal] = useState(user?.leetcodeUsername || '')
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError: boolean } | null>(null)

  const maxActivity = Math.max(...dailyActivity)

  const easyPct = stats.easyTotal ? Math.round((stats.easySolved / stats.easyTotal) * 100) : 0
  const medPct = stats.mediumTotal ? Math.round((stats.mediumSolved / stats.mediumTotal) * 100) : 0
  const hardPct = stats.hardTotal ? Math.round((stats.hardSolved / stats.hardTotal) * 100) : 0

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    setStatusMsg(null)
    const res = await trackLeetCode(inputVal.trim())
    if (res.success && res.data) {
      setStatusMsg({
        text: `Successfully synced LeetCode profile @${res.data.username}! Solved ${res.data.totalSolved} problems.`,
        isError: false,
      })
    } else {
      setStatusMsg({
        text: res.error || 'Could not find LeetCode profile. Please check the username or link.',
        isError: true,
      })
    }
  }

  const lc = user?.leetcodeData
  const hasRealSubmissions = lc?.recentSubmissions && lc.recentSubmissions.length > 0

  return (
    <div className="page-coding">
      <SectionTitle eyebrow="MY CODING JOURNEY" title="Coding Overview" />
      <p className="muted" style={{ marginBottom: 20 }}>
        Real-time LeetCode student account tracking, live verified submissions, and dynamic readiness score
      </p>

      {/* LeetCode Tracking & Verification Card */}
      <div className="leetcode-tracker-card">
        <div className="leetcode-tracker-glow" />
        <div className="leetcode-tracker-top">
          <div className="leetcode-tracker-title">
            <div className="leetcode-logo-badge">LC</div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: 16, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                Track Student LeetCode Account
                {lc && (
                  <span className="leetcode-tag">
                    <CheckCircle2 size={11} /> Verified
                  </span>
                )}
              </h3>
              <p style={{ margin: 0, fontSize: 12, color: '#8994aa' }}>
                Enter your LeetCode username or profile link (e.g. <code>https://leetcode.com/u/shitanshu</code> or <code>neal_wu</code>)
              </p>
            </div>
          </div>

          {lc && (
            <button
              onClick={() => handleTrackSubmit({ preventDefault: () => {} } as any)}
              disabled={isTrackingLoading}
              className="leetcode-submit-btn"
              style={{ background: '#22293a', color: '#b9c4d9', border: '1px solid #33405c' }}
              title="Refresh latest stats from LeetCode"
            >
              <RefreshCw size={13} className={isTrackingLoading ? 'spin' : ''} />
              {isTrackingLoading ? 'Syncing...' : 'Re-sync'}
            </button>
          )}
        </div>

        <form className="leetcode-tracker-form" onSubmit={handleTrackSubmit}>
          <input
            type="text"
            className="leetcode-input"
            placeholder="e.g. https://leetcode.com/u/neal_wu or Shitanshu"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="leetcode-submit-btn" disabled={isTrackingLoading}>
            {isTrackingLoading ? (
              <>
                <RefreshCw size={14} className="spin" />
                Syncing LeetCode...
              </>
            ) : (
              <>
                <UserCheck size={14} />
                Track Profile
              </>
            )}
          </button>
        </form>

        {statusMsg && (
          <div className={statusMsg.isError ? 'leetcode-err-msg' : 'leetcode-tag'} style={{ marginTop: 12, display: 'inline-flex' }}>
            {statusMsg.text}
          </div>
        )}

        {lc && (
          <div className="leetcode-verified-banner">
            <div className="leetcode-user-info">
              <img src={lc.avatar || 'https://assets.leetcode.com/users/default_avatar.jpg'} alt={lc.username} className="leetcode-avatar" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong style={{ color: '#fff', fontSize: 14 }}>{lc.realName || lc.username}</strong>
                  <a href={lc.profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#f9a93b', fontSize: 12, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                    @{lc.username} <ExternalLink size={10} />
                  </a>
                </div>
                <div className="leetcode-sync-time">
                  Global Rank: #{lc.ranking?.toLocaleString() || 'N/A'} · Verified on LeetCode
                </div>
              </div>
            </div>

            <div className="leetcode-chips">
              <div className="leetcode-chip-item">
                <span>Total Solved</span>
                <strong style={{ color: '#32C997' }}>{lc.totalSolved}</strong>
              </div>
              <div className="leetcode-chip-item">
                <span>Contest Rating</span>
                <strong style={{ color: '#f9a93b' }}>{lc.contestRating ? lc.contestRating : 'Unrated'}</strong>
              </div>
              {lc.topPercentage !== null && lc.topPercentage !== undefined && (
                <div className="leetcode-chip-item">
                  <span>Top Percentile</span>
                  <strong style={{ color: '#7B61FF' }}>Top {lc.topPercentage}%</strong>
                </div>
              )}
              <div className="leetcode-chip-item">
                <span>Readiness</span>
                <strong style={{ color: '#fff' }}>{lc.readinessScore}/100</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="coding-stats-grid">
        <div className="coding-stat-card accent">
          <div className="coding-stat-icon"><Code2 size={20} /></div>
          <div>
            <span>Total Solved</span>
            <h2>{stats.totalSolved.toLocaleString()}</h2>
            <small>{stats.isLeetCodeSynced ? 'Verified on LeetCode' : `of ${(stats.easyTotal + stats.mediumTotal + stats.hardTotal).toLocaleString()} platform questions`}</small>
          </div>
        </div>
        <div className="coding-stat-card">
          <div className="coding-stat-icon green"><CheckCircle size={20} /></div>
          <div>
            <span>Accuracy Rate</span>
            <h2>{stats.acceptanceRate}%</h2>
            <small>{stats.isLeetCodeSynced ? 'LeetCode acceptance rate' : 'active practice score'}</small>
          </div>
        </div>
        <div className="coding-stat-card">
          <div className="coding-stat-icon orange"><Zap size={20} /></div>
          <div>
            <span>Current Streak</span>
            <h2>{stats.streak} days</h2>
            <small>Active preparation</small>
          </div>
        </div>
        <div className="coding-stat-card">
          <div className="coding-stat-icon blue"><TrendingUp size={20} /></div>
          <div>
            <span>Readiness Score</span>
            <h2>{stats.score}/100</h2>
            <small>{stats.isLeetCodeSynced ? 'Calculated from LeetCode' : 'Dynamic benchmark'}</small>
          </div>
        </div>
      </div>

      <div className="coding-mid-grid">
        {/* Difficulty breakdown */}
        <div className="card coding-diff-card">
          <h3>Difficulty Breakdown</h3>
          <div className="coding-diff-rings">
            <div className="coding-diff-item">
              <ScoreRing value={easyPct} size={72} stroke={7} label="easy" />
              <div>
                <strong className="diff-easy">Easy</strong>
                <span>{stats.easySolved}{stats.isLeetCodeSynced ? ' solved' : `/${stats.easyTotal}`}</span>
              </div>
            </div>
            <div className="coding-diff-item">
              <ScoreRing value={medPct} size={72} stroke={7} label="medium" />
              <div>
                <strong className="diff-medium">Medium</strong>
                <span>{stats.mediumSolved}{stats.isLeetCodeSynced ? ' solved' : `/${stats.mediumTotal}`}</span>
              </div>
            </div>
            <div className="coding-diff-item">
              <ScoreRing value={hardPct} size={72} stroke={7} label="hard" />
              <div>
                <strong className="diff-hard">Hard</strong>
                <span>{stats.hardSolved}{stats.isLeetCodeSynced ? ' solved' : `/${stats.hardTotal}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Language breakdown */}
        <div className="card coding-lang-card">
          <h3>Languages Used</h3>
          <div className="coding-langs">
            {languageStats.map(lang => (
              <div className="coding-lang-row" key={lang.name}>
                <div className="coding-lang-info">
                  <div className="coding-lang-dot" style={{ background: lang.color }} />
                  <span>{lang.name}</span>
                  <small>{lang.submissions.toLocaleString()} submissions</small>
                </div>
                <div className="coding-lang-bar">
                  <div style={{ width: `${lang.percent}%`, background: lang.color }} />
                </div>
                <strong>{lang.percent}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity chart */}
      <div className="card coding-activity-card">
        <h3>Daily Activity (Last 30 Days)</h3>
        <div className="coding-activity-chart">
          {dailyActivity.map((val, i) => (
            <div className="coding-bar-col" key={i}>
              <div
                className="coding-bar"
                style={{ height: `${(val / maxActivity) * 100}%` }}
              />
              {i % 5 === 0 && <span className="coding-bar-label">{i + 1}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent submissions */}
      <div className="card coding-submissions-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>
            {hasRealSubmissions ? `Verified LeetCode Submissions (@${lc?.username})` : 'Recent Problems & Submissions'}
          </h3>
          {hasRealSubmissions && (
            <span className="leetcode-tag">
              <CheckCircle2 size={10} /> Live from LeetCode
            </span>
          )}
        </div>

        <div className="coding-submissions">
          <div className="submission-header">
            <span className="sub-title">Problem & LeetCode Link</span>
            <span className="sub-lang">Language</span>
            <span className="sub-status">Status</span>
            <span className="sub-time">Submitted</span>
          </div>

          {hasRealSubmissions ? (
            lc!.recentSubmissions!.map((sub, idx) => (
              <div className={`submission-row status-${sub.status.toLowerCase().replace(/\s+/g, '-')}`} key={idx}>
                <span className="sub-title">
                  <a
                    href={sub.url || getLeetCodeUrl(sub.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-title-link"
                    title={`Open "${sub.title}" on LeetCode`}
                  >
                    <span>{sub.title}</span>
                    <ExternalLink size={11} className="pt-ext-icon" />
                  </a>
                </span>
                <span className="sub-lang">{sub.language}</span>
                <span className="sub-status">
                  {sub.status === 'Accepted' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {sub.status}
                </span>
                <span className="sub-time">
                  <Clock size={10} /> {new Date(sub.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))
          ) : (
            defaultSubmissions.map(sub => (
              <div className={`submission-row status-${sub.status.toLowerCase().replace(' ', '-')}`} key={sub.id}>
                <span className="sub-title">
                  <a
                    href={getLeetCodeUrl(sub.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-title-link"
                    title={`Open "${sub.title}" directly on LeetCode`}
                  >
                    <span>{sub.title}</span>
                    <ExternalLink size={11} className="pt-ext-icon" />
                  </a>
                </span>
                <span className="sub-lang">{sub.language}</span>
                <span className="sub-status">
                  {sub.status === 'Accepted' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {sub.status}
                </span>
                <span className="sub-time"><Clock size={10} /> {sub.submittedAt}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
