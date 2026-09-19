import { useState } from 'react'
import { Trophy, Medal, Flame, TrendingUp, TrendingDown, Minus, Crown, Code2 } from 'lucide-react'
import { leaderboardData } from '../data/leaderboard'
import { SectionTitle } from '../components/SectionTitle'
import { useUser } from '../context/UserContext'

export function LeaderboardPage() {
  const { user, stats } = useUser()
  const [tab, setTab] = useState<'global' | 'friends' | 'college'>('global')

  const top3 = leaderboardData.slice(0, 3)

  const currentUserName = user?.name || 'Your Account'
  const currentUserInitials = user?.avatarInitials || 'ME'
  const currentUserSolved = stats.totalSolved

  return (
    <div className="page-leaderboard">
      <SectionTitle eyebrow="COMPETITIVE RANKINGS" title="Leaderboard" />
      <p className="muted" style={{ marginBottom: 24 }}>See how you stack up against other coders preparing for placements</p>

      {/* Tab selector */}
      <div className="lb-tabs">
        <button className={tab === 'global' ? 'active' : ''} onClick={() => setTab('global')}>
          <Trophy size={14} /> Global
        </button>
        <button className={tab === 'friends' ? 'active' : ''} onClick={() => setTab('friends')}>
          <Code2 size={14} /> Friends
        </button>
        <button className={tab === 'college' ? 'active' : ''} onClick={() => setTab('college')}>
          <Medal size={14} /> College
        </button>
      </div>

      {/* Top 3 podium */}
      <div className="lb-podium">
        {[top3[1], top3[0], top3[2]].map((entry, i) => {
          const podiumOrder = [2, 1, 3]
          const rank = podiumOrder[i]
          const heights = ['120px', '155px', '100px']
          const badgeColors = ['#C0C0C0', '#FFD700', '#CD7F32']
          return (
            <div className={`lb-podium-item rank-${rank}`} key={entry.name}>
              <div className="lb-podium-avatar">
                {rank === 1 && <Crown size={18} className="lb-crown" />}
                <div className="avatar lb-avatar" style={{
                  background: rank === 1 ? 'linear-gradient(135deg, #FFD700, #FF8C00)' :
                    rank === 2 ? 'linear-gradient(135deg, #C0C0C0, #808080)' :
                      'linear-gradient(135deg, #CD7F32, #8B4513)'
                }}>
                  {entry.initials}
                </div>
              </div>
              <strong>{entry.name}</strong>
              <span className="lb-podium-score">{entry.score.toLocaleString()} pts</span>
              <div className="lb-podium-bar" style={{ height: heights[i], background: badgeColors[i] + '22', borderColor: badgeColors[i] + '44' }}>
                <span className="lb-podium-rank">#{rank}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Your rank highlight */}
      <div className="lb-your-rank">
        <div className="lb-your-rank-left">
          <div className="avatar">{currentUserInitials}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <strong>{currentUserName}</strong>
              {user?.leetcodeData && (
                <span className="leetcode-tag">
                  LeetCode: @{user.leetcodeData.username}
                </span>
              )}
            </div>
            <span>Rank #12 · {currentUserSolved} problems solved {user?.leetcodeData ? `· LeetCode Rank #${user.leetcodeData.ranking?.toLocaleString()}` : ''}</span>
          </div>
        </div>
        <div className="lb-your-rank-right">
          <div className="lb-change positive">
            <TrendingUp size={14} />
            <span>↑ 4 this week</span>
          </div>
        </div>
      </div>

      {/* Full table */}
      <div className="lb-table">
        <div className="lb-table-header">
          <span className="lb-rank">Rank</span>
          <span className="lb-name">Name</span>
          <span className="lb-college">College</span>
          <span className="lb-score">Score</span>
          <span className="lb-solved">Solved</span>
          <span className="lb-streak">Streak</span>
          <span className="lb-rating">Rating</span>
          <span className="lb-change-col">Change</span>
        </div>
        {leaderboardData.map(entry => {
          const isUser = entry.isCurrentUser
          const displayName = isUser ? currentUserName : entry.name
          const displayInitials = isUser ? currentUserInitials : entry.initials
          const displaySolved = isUser ? currentUserSolved : entry.problemsSolved

          return (
            <div className={`lb-table-row ${isUser ? 'current-user' : ''} ${entry.badge !== 'none' ? 'badge-' + entry.badge : ''}`} key={entry.rank}>
              <span className="lb-rank">
                {entry.badge === 'gold' && <span className="lb-medal gold">🥇</span>}
                {entry.badge === 'silver' && <span className="lb-medal">🥈</span>}
                {entry.badge === 'bronze' && <span className="lb-medal">🥉</span>}
                {entry.badge === 'none' && <span className="lb-rank-num">{entry.rank}</span>}
              </span>
              <span className="lb-name">
                <div className="avatar avatar-sm lb-table-avatar">{displayInitials}</div>
                <div>
                  <strong>{displayName}</strong>
                  {isUser && <span className="lb-you-badge">You</span>}
                </div>
              </span>
              <span className="lb-college">{isUser ? (user ? `${user.targetCompany} Aspirant` : 'Your College') : entry.college}</span>
              <span className="lb-score">{entry.score.toLocaleString()}</span>
              <span className="lb-solved">{displaySolved.toLocaleString()}</span>
              <span className="lb-streak"><Flame size={11} /> {isUser ? stats.streak : entry.streak}</span>
              <span className="lb-rating">{entry.rating}</span>
              <span className={`lb-change-col ${entry.change > 0 ? 'positive' : entry.change < 0 ? 'negative' : ''}`}>
                {entry.change > 0 ? <><TrendingUp size={12} /> +{entry.change}</> :
                  entry.change < 0 ? <><TrendingDown size={12} /> {entry.change}</> :
                    <><Minus size={12} /> 0</>}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
