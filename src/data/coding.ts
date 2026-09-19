export interface Submission {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  language: string
  status: 'Accepted' | 'Wrong Answer' | 'TLE' | 'Runtime Error'
  runtime: string
  memory: string
  submittedAt: string
  topic: string
}

export const recentSubmissions: Submission[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', language: 'C++', status: 'Accepted', runtime: '4ms', memory: '10.2 MB', submittedAt: '2 hours ago', topic: 'Arrays' },
  { id: 2, title: 'LRU Cache', difficulty: 'Medium', language: 'C++', status: 'Accepted', runtime: '72ms', memory: '46.8 MB', submittedAt: '5 hours ago', topic: 'Design' },
  { id: 3, title: 'Number of Islands', difficulty: 'Medium', language: 'Python', status: 'Wrong Answer', runtime: '-', memory: '-', submittedAt: '8 hours ago', topic: 'Graphs' },
  { id: 4, title: 'Valid Parentheses', difficulty: 'Easy', language: 'C++', status: 'Accepted', runtime: '0ms', memory: '6.4 MB', submittedAt: '1 day ago', topic: 'Strings' },
  { id: 5, title: 'Trapping Rain Water', difficulty: 'Hard', language: 'C++', status: 'Accepted', runtime: '8ms', memory: '18.2 MB', submittedAt: '1 day ago', topic: 'Arrays' },
  { id: 6, title: 'Course Schedule', difficulty: 'Medium', language: 'Python', status: 'TLE', runtime: '-', memory: '-', submittedAt: '2 days ago', topic: 'Graphs' },
  { id: 7, title: 'Best Time to Buy Stock', difficulty: 'Easy', language: 'C++', status: 'Accepted', runtime: '4ms', memory: '13.4 MB', submittedAt: '2 days ago', topic: 'Arrays' },
  { id: 8, title: 'Merge K Sorted Lists', difficulty: 'Hard', language: 'C++', status: 'Runtime Error', runtime: '-', memory: '-', submittedAt: '3 days ago', topic: 'Linked List' },
  { id: 9, title: 'Group Anagrams', difficulty: 'Medium', language: 'Python', status: 'Accepted', runtime: '88ms', memory: '20.1 MB', submittedAt: '3 days ago', topic: 'Strings' },
  { id: 10, title: 'Product of Array Except Self', difficulty: 'Medium', language: 'C++', status: 'Accepted', runtime: '12ms', memory: '24.5 MB', submittedAt: '4 days ago', topic: 'Arrays' },
  { id: 11, title: 'Climbing Stairs', difficulty: 'Easy', language: 'Java', status: 'Accepted', runtime: '0ms', memory: '5.8 MB', submittedAt: '4 days ago', topic: 'DP' },
  { id: 12, title: 'Serialize Binary Tree', difficulty: 'Hard', language: 'C++', status: 'Wrong Answer', runtime: '-', memory: '-', submittedAt: '5 days ago', topic: 'Trees' },
]

export const codingStats = {
  totalSolved: 1418,
  totalAttempted: 1520,
  acceptanceRate: 93.3,
  totalSubmissions: 3840,
  easySolved: 420,
  easyTotal: 480,
  mediumSolved: 780,
  mediumTotal: 950,
  hardSolved: 218,
  hardTotal: 390,
}

export const languageStats = [
  { name: 'C++', submissions: 2074, percent: 54, color: '#00599C' },
  { name: 'Python', submissions: 1075, percent: 28, color: '#3776AB' },
  { name: 'Java', submissions: 461, percent: 12, color: '#ED8B00' },
  { name: 'JavaScript', submissions: 230, percent: 6, color: '#F7DF1E' },
]

export const dailyActivity = [3, 5, 2, 7, 4, 6, 3, 8, 2, 5, 4, 6, 3, 7, 5, 4, 8, 3, 6, 2, 5, 7, 4, 3, 6, 8, 2, 5, 4, 3]
