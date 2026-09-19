import { Flame, TrendingUp, Target, Award } from 'lucide-react'
import { weeklyActivity, weekDays, months, submissionTrend, ratingHistory, topicBreakdown, difficultyBreakdown, streakData, languageBreakdown } from '../data/analytics'
import { SectionTitle } from '../components/SectionTitle'

const heatColors = ['#1a1f35', '#1f2956', '#2d3a8c', '#5b4fc7', '#8a7dff']

export function AnalyticsPage() {
  const maxSubmission = Math.max(...submissionTrend.map(s => s.count))
  const maxRating = Math.max(...ratingHistory.map(r => r.rating))
  const minRating = Math.min(...ratingHistory.map(r => r.rating))
  const ratingRange = maxRating - minRating || 1

  return (
    <div className="page-analytics">
      <SectionTitle eyebrow="CODING ANALYTICS" title="Your Performance Insights" />
      <p className="muted" style={{ marginBottom: 24 }}>Deep dive into your coding patterns, strengths, and growth trajectory</p>

      {/* Streak & stats row */}
      <div className="analytics-top-grid">
        <div className="analytics-stat-card fire">
          <Flame size={22} />
          <div>
            <h2>{streakData.current}</h2>
            <span>Day Streak</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <Award size={22} />
          <div>
            <h2>{streakData.longest}</h2>
            <span>Best Streak</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <TrendingUp size={22} />
          <div>
            <h2>{streakData.thisMonth}</h2>
            <span>Active Days (Month)</span>
          </div>
        </div>
        <div className="analytics-stat-card">
          <Target size={22} />
          <div>
            <h2>{streakData.totalDays}</h2>
            <span>Total Active Days</span>
          </div>
        </div>
      </div>

      <div className="analytics-mid-grid">
        {/* Activity heatmap */}
        <div className="card analytics-heatmap-card">
          <h3>Activity Heatmap</h3>
          <div className="heatmap-container">
            <div className="heatmap-days">
              {weekDays.map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="heatmap-grid">
              {weeklyActivity.map((week, wi) => (
                <div className="heatmap-col" key={wi}>
                  {week.map((val, di) => (
                    <div
                      className="heatmap-cell"
                      key={di}
                      style={{ background: heatColors[Math.min(val, 4)] }}
                      title={`${val} submissions`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="heatmap-months">
              {months.map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            {heatColors.map((c, i) => <div key={i} style={{ background: c }} />)}
            <span>More</span>
          </div>
        </div>

        {/* Topic breakdown */}
        <div className="card analytics-topics-card">
          <h3>Topic Mastery</h3>
          <div className="analytics-topics">
            {topicBreakdown.map(topic => {
              const pct = Math.round((topic.solved / topic.total) * 100)
              return (
                <div className="analytics-topic-row" key={topic.name}>
                  <span className="at-name">{topic.name}</span>
                  <div className="at-bar">
                    <div style={{ width: `${pct}%`, background: topic.color }} />
                  </div>
                  <span className="at-count">{topic.solved}/{topic.total}</span>
                  <span className="at-pct" style={{ color: topic.color }}>{pct}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="analytics-bottom-grid">
        {/* Submission trend */}
        <div className="card analytics-trend-card">
          <h3>Submission Trend</h3>
          <div className="trend-chart">
            {submissionTrend.map(s => (
              <div className="trend-bar-col" key={s.month}>
                <div className="trend-bar" style={{ height: `${(s.count / maxSubmission) * 100}%` }}>
                  <span className="trend-value">{s.count}</span>
                </div>
                <span className="trend-label">{s.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating progression */}
        <div className="card analytics-rating-card">
          <h3>Rating Progression</h3>
          <div className="rating-chart">
            <svg viewBox="0 0 600 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ratingGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7B61FF" stopOpacity=".3" />
                  <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M${ratingHistory.map((p, i) => {
                  const x = (i / (ratingHistory.length - 1)) * 600
                  const y = 140 - ((p.rating - minRating) / ratingRange) * 120
                  return `${x},${y}`
                }).join(' L')} L600,150 L0,150 Z`}
                fill="url(#ratingGrad)"
              />
              <path
                d={`M${ratingHistory.map((p, i) => {
                  const x = (i / (ratingHistory.length - 1)) * 600
                  const y = 140 - ((p.rating - minRating) / ratingRange) * 120
                  return `${x},${y}`
                }).join(' L')}`}
                fill="none" stroke="#8a7dff" strokeWidth="3"
              />
              {ratingHistory.map((p, i) => {
                const x = (i / (ratingHistory.length - 1)) * 600
                const y = 140 - ((p.rating - minRating) / ratingRange) * 120
                return <circle key={i} cx={x} cy={y} r="4" fill="#a99cff" stroke="#151c2e" strokeWidth="2" />
              })}
            </svg>
            <div className="rating-labels">
              {ratingHistory.map(p => <span key={p.date}>{p.date}</span>)}
            </div>
            <div className="rating-current">
              <strong>{ratingHistory[ratingHistory.length - 1].rating}</strong>
              <span>Current Rating</span>
            </div>
          </div>
        </div>

        {/* Difficulty split */}
        <div className="card analytics-diff-card">
          <h3>Difficulty Distribution</h3>
          <div className="analytics-diff-bars">
            <div className="analytics-diff-row">
              <span className="diff-easy">Easy</span>
              <div className="analytics-diff-bar">
                <div style={{ width: `${(difficultyBreakdown.easy.solved / difficultyBreakdown.easy.total) * 100}%`, background: '#32C997' }} />
              </div>
              <span>{difficultyBreakdown.easy.solved}/{difficultyBreakdown.easy.total}</span>
            </div>
            <div className="analytics-diff-row">
              <span className="diff-medium">Medium</span>
              <div className="analytics-diff-bar">
                <div style={{ width: `${(difficultyBreakdown.medium.solved / difficultyBreakdown.medium.total) * 100}%`, background: '#FFB457' }} />
              </div>
              <span>{difficultyBreakdown.medium.solved}/{difficultyBreakdown.medium.total}</span>
            </div>
            <div className="analytics-diff-row">
              <span className="diff-hard">Hard</span>
              <div className="analytics-diff-bar">
                <div style={{ width: `${(difficultyBreakdown.hard.solved / difficultyBreakdown.hard.total) * 100}%`, background: '#FF7B6B' }} />
              </div>
              <span>{difficultyBreakdown.hard.solved}/{difficultyBreakdown.hard.total}</span>
            </div>
          </div>

          <h3 style={{ marginTop: 24 }}>Language Split</h3>
          <div className="analytics-lang-pills">
            {languageBreakdown.map(l => (
              <div className="analytics-lang-pill" key={l.name}>
                <div className="lang-pill-dot" style={{ background: l.color }} />
                <span>{l.name}</span>
                <strong>{l.percent}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
