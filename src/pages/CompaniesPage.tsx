import { useState } from 'react'
import { Search, ChevronRight, Check, Star, Filter, ExternalLink } from 'lucide-react'
import { companies, type Company } from '../data/companies'
import { problems } from '../data/practice'
import { SectionTitle } from '../components/SectionTitle'
import { useUser } from '../context/UserContext'
import { getLeetCodeUrl } from '../utils/leetcode'

export function CompaniesPage() {
  const { isSolved, toggleSolved } = useUser()
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState<string>('All')
  const [topicFilter, setTopicFilter] = useState<string>('All')

  const getQuestionId = (qTitle: string, qId: number) => {
    const matched = problems.find(p => p.title.toLowerCase() === qTitle.toLowerCase())
    return matched ? matched.id : 1000 + qId
  }

  const filteredQuestions = selectedCompany?.questions.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase())
    const matchDiff = diffFilter === 'All' || q.difficulty === diffFilter
    const matchTopic = topicFilter === 'All' || q.topic === topicFilter
    return matchSearch && matchDiff && matchTopic
  }) ?? []

  const allTopics = selectedCompany
    ? Array.from(new Set(selectedCompany.questions.map(q => q.topic)))
    : []

  if (selectedCompany) {
    const currentSolvedCount = selectedCompany.questions.filter(q => isSolved(getQuestionId(q.title, q.id))).length

    return (
      <div className="page-companies">
        <button className="back-button" onClick={() => setSelectedCompany(null)}>
          ← Back to companies
        </button>
        <div className="company-detail-header">
          <div className="company-detail-icon" style={{ background: selectedCompany.gradient }}>
            {selectedCompany.short}
          </div>
          <div>
            <h1>{selectedCompany.name}</h1>
            <p className="muted">{selectedCompany.totalQuestions} curated questions · Updated weekly</p>
          </div>
        </div>

        <div className="company-stats-row">
          <div className="company-stat easy"><span>{selectedCompany.easy}</span> Easy</div>
          <div className="company-stat medium"><span>{selectedCompany.medium}</span> Medium</div>
          <div className="company-stat hard"><span>{selectedCompany.hard}</span> Hard</div>
          <div className="company-stat solved">
            <span>{currentSolvedCount}</span> Solved
          </div>
        </div>

        <div className="company-filters">
          <div className="search-input">
            <Search size={14} />
            <input
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <Filter size={13} />
            <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)}>
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <select value={topicFilter} onChange={e => setTopicFilter(e.target.value)}>
              <option>All</option>
              {allTopics.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="question-list">
          <div className="question-header-row">
            <span className="q-status">Status</span>
            <span className="q-title">Title & LeetCode Link</span>
            <span className="q-topic">Topic</span>
            <span className="q-diff">Difficulty</span>
            <span className="q-freq">Frequency</span>
          </div>
          {filteredQuestions.map(q => {
            const qId = getQuestionId(q.title, q.id)
            const solved = isSolved(qId)
            const leetcodeUrl = getLeetCodeUrl(q.title)

            return (
              <div className={`question-row ${solved ? 'solved' : ''}`} key={q.id}>
                <span className="q-status">
                  <button
                    className="status-toggle-btn"
                    onClick={() => toggleSolved(qId)}
                    title={solved ? 'Click to mark unsolved' : 'Click to mark solved'}
                  >
                    {solved ? <Check size={14} className="q-check" /> : <span className="q-circle" />}
                  </button>
                </span>
                <span className="q-title">
                  <a
                    href={leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-title-link"
                    title={`Open "${q.title}" on LeetCode`}
                  >
                    <span>{q.title}</span>
                    <ExternalLink size={12} className="pt-ext-icon" />
                  </a>
                </span>
                <span className="q-topic"><span className="topic-chip">{q.topic}</span></span>
                <span className={`q-diff diff-${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
                <span className="q-freq">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} className={i < q.frequency ? 'star-filled' : 'star-empty'} />
                  ))}
                </span>
              </div>
            )
          })}
          {filteredQuestions.length === 0 && (
            <div className="empty-state">No questions match your filters</div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="page-companies">
      <SectionTitle eyebrow="COMPANY-WISE PREPARATION" title="Choose your target company" />
      <p className="muted" style={{ marginBottom: 24 }}>Curated questions from top tech companies, ranked by interview frequency</p>

      <div className="company-grid">
        {companies.map(company => {
          const solvedCount = company.questions.filter(q => isSolved(getQuestionId(q.title, q.id))).length
          const totalQ = company.questions.length
          const pct = totalQ > 0 ? Math.round((solvedCount / totalQ) * 100) : 0

          return (
            <div
              className="company-card"
              key={company.name}
              onClick={() => setSelectedCompany(company)}
            >
              <div className="company-card-top">
                <div className="company-logo" style={{ background: company.gradient }}>
                  {company.short}
                </div>
                <ChevronRight size={16} className="company-arrow" />
              </div>
              <h3>{company.name}</h3>
              <p>{company.totalQuestions} questions curated</p>
              <div className="company-diff-row">
                <span className="diff-badge easy">{company.easy} Easy</span>
                <span className="diff-badge medium">{company.medium} Med</span>
                <span className="diff-badge hard">{company.hard} Hard</span>
              </div>
              <div className="company-progress">
                <div className="company-progress-bar">
                  <div style={{ width: `${pct}%`, background: company.color }} />
                </div>
                <span>{solvedCount}/{totalQ}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
