import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import { problems, type Problem } from '../data/practice'

export interface LeetCodeStats {
  username: string
  realName?: string
  avatar?: string
  ranking?: number
  reputation?: number
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  totalSubmissions?: number
  acceptanceRate: number
  contestRating?: number | null
  contestGlobalRanking?: number | null
  contestAttended?: number
  topPercentage?: number | null
  readinessScore: number
  recentSubmissions?: Array<{
    title: string
    titleSlug: string
    url: string
    status: string
    language: string
    timestamp: string
  }>
  profileUrl: string
  lastSynced: string
}

export interface UserProfile {
  name: string
  email: string
  targetCompany: string
  avatarInitials: string
  leetcodeUsername?: string
  leetcodeData?: LeetCodeStats | null
}

export interface UserStats {
  totalSolved: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  acceptanceRate: number
  streak: number
  score: number
  ranking?: number
  contestRating?: number | null
  isLeetCodeSynced?: boolean
}

interface UserContextType {
  user: UserProfile | null
  login: (name?: string, email?: string) => void
  signup: (name: string, email: string, targetCompany?: string) => void
  logout: () => void
  solvedIds: Set<number>
  toggleSolved: (id: number) => void
  isSolved: (id: number) => boolean
  starredIds: Set<number>
  toggleStar: (id: number) => void
  isStarred: (id: number) => boolean
  completedTasks: Set<number>
  toggleTask: (id: number) => void
  stats: UserStats
  trackLeetCode: (usernameOrUrl: string) => Promise<{ success: boolean; data?: LeetCodeStats; error?: string }>
  isTrackingLoading: boolean
}

const UserContext = createContext<UserContextType | null>(null)

export function getInitials(name: string): string {
  if (!name || !name.trim()) return 'U'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function cleanLeetCodeUsername(input: string): string {
  if (!input || typeof input !== 'string') return ''
  try {
    let cleaned = decodeURIComponent(input).trim().replace(/\/+$/, '')
    const urlMatch = cleaned.match(/(?:leetcode\.com\/(?:u\/)?|@)?([a-zA-Z0-9_\-]+)$/i)
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1]
    }
    return cleaned
  } catch {
    return input.trim()
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('c2h_user')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
    return null
  })

  const [isTrackingLoading, setIsTrackingLoading] = useState(false)

  // Solved problems IDs
  const [solvedIds, setSolvedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('c2h_solved_problems')
      if (saved) return new Set(JSON.parse(saved))
    } catch (e) {
      console.error(e)
    }
    return new Set(problems.filter(p => p.solved).map(p => p.id))
  })

  // Starred problems IDs
  const [starredIds, setStarredIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('c2h_starred_problems')
      if (saved) return new Set(JSON.parse(saved))
    } catch (e) {
      console.error(e)
    }
    return new Set(problems.filter(p => p.starred).map(p => p.id))
  })

  // Completed study tasks
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('c2h_study_tasks')
      if (saved) return new Set(JSON.parse(saved))
    } catch (e) {
      console.error(e)
    }
    return new Set([1, 2])
  })

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('c2h_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('c2h_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('c2h_solved_problems', JSON.stringify(Array.from(solvedIds)))
  }, [solvedIds])

  useEffect(() => {
    localStorage.setItem('c2h_starred_problems', JSON.stringify(Array.from(starredIds)))
  }, [starredIds])

  useEffect(() => {
    localStorage.setItem('c2h_study_tasks', JSON.stringify(Array.from(completedTasks)))
  }, [completedTasks])

  const signup = (name: string, email: string, targetCompany = 'Amazon') => {
    const trimmedName = name.trim() || 'New Coder'
    const newUser: UserProfile = {
      name: trimmedName,
      email: email.trim(),
      targetCompany,
      avatarInitials: getInitials(trimmedName),
      leetcodeUsername: '',
      leetcodeData: null,
    }
    setUser(newUser)
    localStorage.setItem('c2h_user', JSON.stringify(newUser))

    // Sync with backend
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmedName, email: email.trim(), targetCompany }),
    }).catch(err => console.warn('Could not sync student with backend:', err))
  }

  const login = (name?: string, email?: string) => {
    let finalName = name?.trim()
    if (!finalName && email) {
      const prefix = email.split('@')[0]
      finalName = prefix.charAt(0).toUpperCase() + prefix.slice(1)
    }
    if (!finalName) {
      try {
        const saved = localStorage.getItem('c2h_user')
        if (saved) {
          const parsed = JSON.parse(saved)
          if (parsed.name) finalName = parsed.name
        }
      } catch (e) {}
    }
    const loggedUser: UserProfile = {
      name: finalName || 'Code2Hire Student',
      email: email?.trim() || 'student@code2hire.com',
      targetCompany: 'Amazon',
      avatarInitials: getInitials(finalName || 'CS'),
      leetcodeUsername: '',
      leetcodeData: null,
    }
    setUser(loggedUser)
    localStorage.setItem('c2h_user', JSON.stringify(loggedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('c2h_user')
  }

  const toggleSolved = (id: number) => {
    setSolvedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const isSolved = (id: number) => solvedIds.has(id)

  const toggleStar = (id: number) => {
    setStarredIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const isStarred = (id: number) => starredIds.has(id)

  const toggleTask = (id: number) => {
    setCompletedTasks(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Live LeetCode account tracking
  const trackLeetCode = async (usernameOrUrl: string) => {
    const cleanUsername = cleanLeetCodeUsername(usernameOrUrl)
    if (!cleanUsername) {
      return { success: false, error: 'Please enter a valid LeetCode username or profile link.' }
    }

    setIsTrackingLoading(true)
    try {
      let lcStats: LeetCodeStats | null = null
      let errorMessage = ''

      // 1. Primary Attempt: fetch from local API endpoint
      try {
        const res = await fetch(`/api/leetcode/${encodeURIComponent(cleanUsername)}`)
        const text = await res.text()
        let data: any = null
        if (text && text.trim().length > 0) {
          try {
            data = JSON.parse(text)
          } catch {
            // response was not JSON (e.g. proxy ECONNREFUSED)
          }
        }

        if (res.ok && data && !data.error && data.username) {
          lcStats = data
        } else if (data?.error) {
          errorMessage = data.error
        }
      } catch (err) {
        console.warn('Local API endpoint failed or unreachable, checking fallback:', err)
      }

      // 2. Secondary Attempt: fallback to public LeetCode API if local server was offline or returned empty
      if (!lcStats) {
        try {
          const fallbackRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(cleanUsername)}`)
          const fallbackText = await fallbackRes.text()
          let fallbackData: any = null
          if (fallbackText && fallbackText.trim().length > 0) {
            try {
              fallbackData = JSON.parse(fallbackText)
            } catch {}
          }

          if (fallbackRes.ok && fallbackData && fallbackData.totalSolved !== undefined) {
            const totalSolved = Number(fallbackData.totalSolved) || 0
            const easySolved = Number(fallbackData.easySolved) || 0
            const mediumSolved = Number(fallbackData.mediumSolved) || 0
            const hardSolved = Number(fallbackData.hardSolved) || 0
            const totalSubmissions = Number(fallbackData.totalSubmissions?.[0]?.submissions) || totalSolved

            const readinessScore = Math.min(
              99,
              Math.max(
                35,
                Math.round(
                  35 +
                    Math.min(easySolved, 100) * 0.15 +
                    Math.min(mediumSolved, 150) * 0.25 +
                    Math.min(hardSolved, 50) * 0.4
                )
              )
            )

            lcStats = {
              username: cleanUsername,
              realName: cleanUsername,
              avatar: 'https://assets.leetcode.com/users/default_avatar.jpg',
              ranking: fallbackData.ranking || 0,
              reputation: fallbackData.reputation || 0,
              totalSolved,
              easySolved,
              mediumSolved,
              hardSolved,
              totalSubmissions,
              acceptanceRate: totalSubmissions > 0 ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1)) : 82.5,
              contestRating: null,
              contestGlobalRanking: null,
              contestAttended: 0,
              topPercentage: null,
              readinessScore,
              recentSubmissions: (fallbackData.recentSubmissions || []).map((s: any) => ({
                title: s.title,
                titleSlug: s.titleSlug,
                url: `https://leetcode.com/problems/${s.titleSlug}/`,
                status: s.statusDisplay || 'Accepted',
                language: s.lang || 'Code',
                timestamp: s.timestamp ? new Date(parseInt(s.timestamp) * 1000).toISOString() : new Date().toISOString()
              })),
              profileUrl: `https://leetcode.com/u/${cleanUsername}/`,
              lastSynced: new Date().toISOString(),
            }
          }
        } catch (fallbackErr) {
          console.warn('Fallback LeetCode API also failed:', fallbackErr)
        }
      }

      if (!lcStats) {
        setIsTrackingLoading(false)
        return {
          success: false,
          error: errorMessage || `Could not fetch LeetCode profile for "${cleanUsername}". Please verify the username exists.`
        }
      }

      // Update user state
      setUser(prev => {
        if (!prev) return null
        const updated: UserProfile = {
          ...prev,
          leetcodeUsername: lcStats!.username,
          leetcodeData: lcStats!,
        }
        localStorage.setItem('c2h_user', JSON.stringify(updated))
        return updated
      })

      // Sync with backend student record (fire-and-forget)
      if (user) {
        fetch('/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            targetCompany: user.targetCompany,
            leetcodeUsername: lcStats.username,
          }),
        }).catch(err => console.warn('Could not sync with backend:', err))
      }

      setIsTrackingLoading(false)
      return { success: true, data: lcStats }
    } catch (err: any) {
      setIsTrackingLoading(false)
      return { success: false, error: err.message || 'Error fetching LeetCode profile.' }
    }
  }

  // Dynamic user stats (combining real LeetCode data if linked, otherwise active practice stats)
  const stats: UserStats = useMemo(() => {
    let easyTotal = 0
    let mediumTotal = 0
    let hardTotal = 0

    problems.forEach(p => {
      if (p.difficulty === 'Easy') easyTotal++
      else if (p.difficulty === 'Medium') mediumTotal++
      else if (p.difficulty === 'Hard') hardTotal++
    })

    const lc = user?.leetcodeData

    if (lc) {
      return {
        totalSolved: lc.totalSolved,
        easySolved: lc.easySolved,
        easyTotal: Math.max(easyTotal, lc.easySolved),
        mediumSolved: lc.mediumSolved,
        mediumTotal: Math.max(mediumTotal, lc.mediumSolved),
        hardSolved: lc.hardSolved,
        hardTotal: Math.max(hardTotal, lc.hardSolved),
        acceptanceRate: lc.acceptanceRate,
        streak: 26,
        score: lc.readinessScore,
        ranking: lc.ranking,
        contestRating: lc.contestRating,
        isLeetCodeSynced: true,
      }
    }

    // Active practice platform metrics
    let easySolved = 0
    let mediumSolved = 0
    let hardSolved = 0

    problems.forEach(p => {
      const solved = solvedIds.has(p.id)
      if (p.difficulty === 'Easy' && solved) easySolved++
      else if (p.difficulty === 'Medium' && solved) mediumSolved++
      else if (p.difficulty === 'Hard' && solved) hardSolved++
    })

    const totalSolved = solvedIds.size
    const percent = problems.length > 0 ? Math.round((totalSolved / problems.length) * 100) : 0
    const calculatedScore = Math.min(98, Math.max(30, Math.round(60 + percent * 0.35)))
    const acceptanceRate = Math.min(96, Math.max(68, Math.round(85 + easySolved * 0.4 - hardSolved * 0.2)))

    return {
      totalSolved,
      easySolved,
      easyTotal,
      mediumSolved,
      mediumTotal,
      hardSolved,
      hardTotal,
      acceptanceRate,
      streak: 23,
      score: calculatedScore,
      isLeetCodeSynced: false,
    }
  }, [solvedIds, user?.leetcodeData])

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        solvedIds,
        toggleSolved,
        isSolved,
        starredIds,
        toggleStar,
        isStarred,
        completedTasks,
        toggleTask,
        stats,
        trackLeetCode,
        isTrackingLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
