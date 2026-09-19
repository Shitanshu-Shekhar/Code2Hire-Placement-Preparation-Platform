import { useState } from 'react'
import { Check, CalendarDays, Clock, BookOpen, Code2, Trophy, Target, Zap, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { studyWeek, weeklyGoals, type StudyTask } from '../data/studyplan'
import { SectionTitle } from '../components/SectionTitle'
import { useUser } from '../context/UserContext'
import { getLeetCodeUrl } from '../utils/leetcode'

const typeIcons: Record<string, any> = {
  concept: BookOpen,
  problem: Code2,
  revision: Target,
  contest: Trophy,
  mock: Zap,
}

const typeColors: Record<string, string> = {
  concept: '#4F8CFF',
  problem: '#7B61FF',
  revision: '#32C997',
  contest: '#FFB457',
  mock: '#FF7B6B',
}

export function StudyPlanPage() {
  const { completedTasks, toggleTask, stats } = useUser()
  const [expandedDay, setExpandedDay] = useState<string>(studyWeek[0].day)

  const totalTasks = studyWeek.reduce((sum, d) => sum + d.tasks.length, 0)
  const completedCount = completedTasks.size
  const overallProgress = Math.round((completedCount / totalTasks) * 100)

  return (
    <div className="page-studyplan">
      <SectionTitle eyebrow="WEEKLY STUDY PLAN" title="Your Personalized Roadmap" />
      <p className="muted" style={{ marginBottom: 24 }}>AI-curated plan based on your target company and skill gaps</p>

      {/* Weekly goals with dynamic progress */}
      <div className="sp-goals-grid">
        {weeklyGoals.map(goal => {
          // Sync with real stats if problems goal
          const currentVal = goal.label.includes('Problem') ? stats.totalSolved : goal.current
          const pct = Math.min(100, Math.round((currentVal / goal.target) * 100))
          return (
            <div className="sp-goal-card" key={goal.label}>
              <div className="sp-goal-header">
                <span>{goal.label}</span>
                <strong style={{ color: goal.color }}>{currentVal}/{goal.target}</strong>
              </div>
              <div className="sp-goal-bar">
                <div style={{ width: `${pct}%`, background: goal.color }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall progress */}
      <div className="sp-overall">
        <div className="sp-overall-info">
          <CalendarDays size={18} />
          <div>
            <strong>Week Progress</strong>
            <span>{completedCount} of {totalTasks} tasks completed</span>
          </div>
        </div>
        <div className="sp-overall-bar">
          <div style={{ width: `${overallProgress}%` }} />
        </div>
        <span className="sp-overall-pct">{overallProgress}%</span>
      </div>

      {/* Day-by-day plan */}
      <div className="sp-days">
        {studyWeek.map(day => {
          const isExpanded = expandedDay === day.day
          const dayCompleted = day.tasks.filter(t => completedTasks.has(t.id)).length
          const dayTotal = day.tasks.length
          return (
            <div className={`sp-day ${isExpanded ? 'expanded' : ''}`} key={day.day}>
              <button className="sp-day-header" onClick={() => setExpandedDay(isExpanded ? '' : day.day)}>
                <div className="sp-day-left">
                  <div className={`sp-day-dot ${dayCompleted === dayTotal ? 'done' : ''}`}>
                    {dayCompleted === dayTotal ? <Check size={10} /> : null}
                  </div>
                  <div>
                    <strong>{day.day}</strong>
                    <span>{day.date}</span>
                  </div>
                </div>
                <div className="sp-day-right">
                  <span className="sp-day-count">{dayCompleted}/{dayTotal}</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {isExpanded && (
                <div className="sp-tasks">
                  {day.tasks.map(task => {
                    const Icon = typeIcons[task.type] || Code2
                    const color = typeColors[task.type] || '#7B61FF'
                    const isDone = completedTasks.has(task.id)
                    const isProblem = task.type === 'problem'

                    return (
                      <div
                        className={`sp-task ${isDone ? 'done' : ''}`}
                        key={task.id}
                      >
                        <div className="sp-task-time">
                          <Clock size={10} />
                          <span>{task.time}</span>
                        </div>
                        <button
                          type="button"
                          className="status-toggle-btn"
                          onClick={() => toggleTask(task.id)}
                          title={isDone ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {isDone ? <Check size={13} className="q-check" /> : <span className="q-circle" />}
                        </button>
                        <div className="sp-task-icon" style={{ background: color + '22', color }}>
                          <Icon size={14} />
                        </div>
                        <div className="sp-task-info">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <strong>{task.title}</strong>
                            {isProblem && (
                              <a
                                href={getLeetCodeUrl(task.title)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sp-ext-link"
                                title={`Open "${task.title}" on LeetCode`}
                                onClick={e => e.stopPropagation()}
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          <span>{task.description}</span>
                        </div>
                        <div className="sp-task-meta">
                          {isProblem && (
                            <a
                              href={getLeetCodeUrl(task.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="sp-lc-chip"
                              onClick={e => e.stopPropagation()}
                            >
                              LeetCode ↗
                            </a>
                          )}
                          <span className="sp-type-badge" style={{ background: color + '22', color }}>{task.type}</span>
                          <span className="sp-duration">{task.duration}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
