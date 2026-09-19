import { useState } from 'react'
import { Search, Check, BookmarkPlus, Bookmark, Filter, ExternalLink } from 'lucide-react'
import { problems, topics } from '../data/practice'
import { SectionTitle } from '../components/SectionTitle'
import { useUser } from '../context/UserContext'
import { getLeetCodeUrl } from '../utils/leetcode'

export function PracticePage() {
  const { isSolved, toggleSolved, isStarred, toggleStar } = useUser()
  const [selectedTopic, setSelectedTopic] = useState('All Topics')
  const [diffFilter, setDiffFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [showSolved, setShowSolved] = useState<'all' | 'solved' | 'unsolved'>('all')

  const getTopicProgress = (topicName: string) => {
    if (topicName === 'All Topics') {
      const solved = problems.filter(p => isSolved(p.id)).length
      return { solved, total: problems.length, percent: Math.round((solved / problems.length) * 100) }
    }
    const topicProblems = problems.filter(p => p.topic === topicName)
    const solved = topicProblems.filter(p => isSolved(p.id)).length
    return { solved, total: topicProblems.length, percent: topicProblems.length ? Math.round((solved / topicProblems.length) * 100) : 0 }
  }

  const filtered = problems.filter(p => {
    const solved = isSolved(p.id)
    const matchTopic = selectedTopic === 'All Topics' || p.topic === selectedTopic
    const matchDiff = diffFilter === 'All' || p.difficulty === diffFilter
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchSolved = showSolved === 'all' || (showSolved === 'solved' ? solved : !solved)
    return matchTopic && matchDiff && matchSearch && matchSolved
  })

  const globalProgress = getTopicProgress('All Topics')

  return (
    <div className="page-practice">
      <SectionTitle eyebrow="PRACTICE ARENA" title="Practice Problems" />
      <p className="muted" style={{ marginBottom: 24 }}>
        {globalProgress.solved} of {globalProgress.total} problems solved ({globalProgress.percent}%)
      </p>

      <div className="practice-layout">
        {/* Topic sidebar */}
        <div className="practice-topics">
          <h4>Topics</h4>
          {topics.map(topic => {
            const prog = getTopicProgress(topic.name)
            return (
              <button
                key={topic.name}
                className={`practice-topic-btn ${selectedTopic === topic.name ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic.name)}
              >
                <span className="topic-emoji">{topic.icon}</span>
                <span className="topic-btn-name">{topic.name}</span>
                {topic.name !== 'All Topics' && (
                  <span className="topic-btn-count">{prog.solved}/{prog.total}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Main content */}
        <div className="practice-main">
          {/* Topic progress bar */}
          {selectedTopic !== 'All Topics' && (
            <div className="practice-topic-progress-card">
              <div className="practice-topic-info">
                <h3>{selectedTopic}</h3>
                <span>{getTopicProgress(selectedTopic).solved} / {getTopicProgress(selectedTopic).total} solved</span>
              </div>
              <div className="practice-progress-bar">
                <div style={{ width: `${getTopicProgress(selectedTopic).percent}%` }} />
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="practice-filters">
            <div className="search-input">
              <Search size={14} />
              <input
                placeholder="Search problems..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Filter size={13} />
              <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)}>
                <option value="All">All Difficulties</option>
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <select value={showSolved} onChange={e => setShowSolved(e.target.value as any)}>
                <option value="all">All Status</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>
          </div>

          {/* Problem list */}
          <div className="problem-table">
            <div className="problem-table-header">
              <span className="pt-status">Status</span>
              <span className="pt-title">Title & LeetCode Link</span>
              <span className="pt-topic">Topic</span>
              <span className="pt-diff">Difficulty</span>
              <span className="pt-accept">Acceptance</span>
              <span className="pt-companies">Companies</span>
              <span className="pt-star">Save</span>
            </div>
            {filtered.map(problem => {
              const solved = isSolved(problem.id)
              const starred = isStarred(problem.id)
              const leetcodeUrl = getLeetCodeUrl(problem.title)

              return (
                <div className={`problem-table-row ${solved ? 'solved' : ''}`} key={problem.id}>
                  <span className="pt-status">
                    <button
                      className="status-toggle-btn"
                      onClick={() => toggleSolved(problem.id)}
                      title={solved ? 'Click to mark unsolved' : 'Click to mark solved'}
                    >
                      {solved ? <Check size={14} className="q-check" /> : <span className="q-circle" />}
                    </button>
                  </span>
                  <span className="pt-title">
                    <a
                      href={leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-title-link"
                      title={`Open "${problem.title}" on LeetCode`}
                    >
                      <span>{problem.title}</span>
                      <ExternalLink size={12} className="pt-ext-icon" />
                    </a>
                  </span>
                  <span className="pt-topic"><span className="topic-chip">{problem.topic}</span></span>
                  <span className={`pt-diff diff-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
                  <span className="pt-accept">{problem.acceptance}%</span>
                  <span className="pt-companies">
                    {problem.companies.slice(0, 2).map(c => (
                      <span className="company-mini-chip" key={c}>{c}</span>
                    ))}
                  </span>
                  <span className="pt-star">
                    <button className="star-btn" onClick={() => toggleStar(problem.id)}>
                      {starred ? <Bookmark size={14} className="star-filled" /> : <BookmarkPlus size={14} />}
                    </button>
                  </span>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="empty-state">No problems match your filters</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
