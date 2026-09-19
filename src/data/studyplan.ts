export interface StudyTask {
  id: number
  time: string
  title: string
  description: string
  duration: string
  type: 'concept' | 'problem' | 'revision' | 'contest' | 'mock'
  topic: string
  completed: boolean
}

export interface StudyDay {
  day: string
  date: string
  tasks: StudyTask[]
}

export const studyWeek: StudyDay[] = [
  {
    day: 'Monday', date: 'Sep 15',
    tasks: [
      { id: 1, time: '09:00', title: 'Graph BFS Patterns', description: 'Learn BFS traversal and level-order patterns', duration: '35 min', type: 'concept', topic: 'Graphs', completed: true },
      { id: 2, time: '10:00', title: 'Number of Islands', description: 'Amazon · Medium · BFS/DFS', duration: '35 min', type: 'problem', topic: 'Graphs', completed: true },
      { id: 3, time: '14:00', title: 'Clone Graph', description: 'Meta · Medium · Graph cloning', duration: '30 min', type: 'problem', topic: 'Graphs', completed: false },
      { id: 4, time: '18:30', title: 'DP Foundations', description: 'House Robber pattern', duration: '30 min', type: 'concept', topic: 'DP', completed: false },
      { id: 5, time: '19:15', title: 'Spaced Revision', description: 'Review graphs & recursion', duration: '20 min', type: 'revision', topic: 'Mixed', completed: false },
    ]
  },
  {
    day: 'Tuesday', date: 'Sep 16',
    tasks: [
      { id: 6, time: '09:00', title: 'Graph DFS Deep Dive', description: 'Backtracking with DFS patterns', duration: '40 min', type: 'concept', topic: 'Graphs', completed: false },
      { id: 7, time: '10:00', title: 'Course Schedule', description: 'Amazon · Medium · Topological sort', duration: '35 min', type: 'problem', topic: 'Graphs', completed: false },
      { id: 8, time: '14:00', title: 'Word Ladder', description: 'Amazon · Hard · BFS shortest path', duration: '45 min', type: 'problem', topic: 'Graphs', completed: false },
      { id: 9, time: '18:30', title: 'Coin Change', description: 'Goldman Sachs · Medium · DP', duration: '30 min', type: 'problem', topic: 'DP', completed: false },
      { id: 10, time: '19:30', title: 'Daily Revision', description: 'Review today\'s problems', duration: '15 min', type: 'revision', topic: 'Mixed', completed: false },
    ]
  },
  {
    day: 'Wednesday', date: 'Sep 17',
    tasks: [
      { id: 11, time: '09:00', title: 'DP on Sequences', description: 'LIS, LCS patterns', duration: '40 min', type: 'concept', topic: 'DP', completed: false },
      { id: 12, time: '10:00', title: 'Longest Increasing Subsequence', description: 'Microsoft · Medium', duration: '35 min', type: 'problem', topic: 'DP', completed: false },
      { id: 13, time: '14:00', title: 'Edit Distance', description: 'Google · Medium · Classic DP', duration: '40 min', type: 'problem', topic: 'DP', completed: false },
      { id: 14, time: '18:30', title: 'Graph Revision', description: 'Review week\'s graph problems', duration: '25 min', type: 'revision', topic: 'Graphs', completed: false },
    ]
  },
  {
    day: 'Thursday', date: 'Sep 18',
    tasks: [
      { id: 15, time: '09:00', title: 'Tree Traversals Review', description: 'Inorder, preorder, postorder patterns', duration: '30 min', type: 'concept', topic: 'Trees', completed: false },
      { id: 16, time: '10:00', title: 'Validate BST', description: 'Amazon · Medium', duration: '30 min', type: 'problem', topic: 'Trees', completed: false },
      { id: 17, time: '14:00', title: 'Serialize Binary Tree', description: 'Amazon · Hard', duration: '45 min', type: 'problem', topic: 'Trees', completed: false },
      { id: 18, time: '18:00', title: 'Mock OA Session', description: 'Timed 90-min mock assessment', duration: '90 min', type: 'mock', topic: 'Mixed', completed: false },
    ]
  },
  {
    day: 'Friday', date: 'Sep 19',
    tasks: [
      { id: 19, time: '09:00', title: 'Sliding Window Patterns', description: 'Fixed and variable window techniques', duration: '35 min', type: 'concept', topic: 'Arrays', completed: false },
      { id: 20, time: '10:00', title: 'Minimum Window Substring', description: 'Meta · Hard', duration: '45 min', type: 'problem', topic: 'Strings', completed: false },
      { id: 21, time: '14:00', title: 'Sliding Window Maximum', description: 'Amazon · Hard', duration: '40 min', type: 'problem', topic: 'Arrays', completed: false },
      { id: 22, time: '18:30', title: 'Weekly Revision', description: 'Review all problems from this week', duration: '30 min', type: 'revision', topic: 'Mixed', completed: false },
    ]
  },
  {
    day: 'Saturday', date: 'Sep 20',
    tasks: [
      { id: 23, time: '10:00', title: 'Codeforces Round #1021', description: 'Live contest · Div 2', duration: '135 min', type: 'contest', topic: 'Mixed', completed: false },
      { id: 24, time: '14:00', title: 'Contest Review', description: 'Analyze mistakes and upsolve', duration: '45 min', type: 'revision', topic: 'Mixed', completed: false },
      { id: 25, time: '16:00', title: 'Weak Topic Practice', description: 'Focus on lowest-score topics', duration: '40 min', type: 'problem', topic: 'Graphs', completed: false },
    ]
  },
  {
    day: 'Sunday', date: 'Sep 21',
    tasks: [
      { id: 26, time: '10:00', title: 'LeetCode Weekly 437', description: 'Live contest', duration: '90 min', type: 'contest', topic: 'Mixed', completed: false },
      { id: 27, time: '14:00', title: 'System Design Basics', description: 'URL shortener design', duration: '45 min', type: 'concept', topic: 'Design', completed: false },
      { id: 28, time: '16:00', title: 'Week Retrospective', description: 'Plan next week based on progress', duration: '20 min', type: 'revision', topic: 'Mixed', completed: false },
    ]
  },
]

export const weeklyGoals = [
  { label: 'Problems solved', current: 2, target: 14, color: '#7B61FF' },
  { label: 'Study hours', current: 1.5, target: 12, color: '#4F8CFF' },
  { label: 'Concepts learned', current: 1, target: 5, color: '#32C997' },
  { label: 'Contests attempted', current: 0, target: 2, color: '#FFB457' },
]
