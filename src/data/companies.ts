export interface CompanyQuestion {
  id: number
  title: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  frequency: number // 1-5
  solved: boolean
}

export interface Company {
  name: string
  short: string
  color: string
  gradient: string
  totalQuestions: number
  easy: number
  medium: number
  hard: number
  questions: CompanyQuestion[]
}

export const companies: Company[] = [
  {
    name: 'Amazon', short: 'AMZ', color: '#FF9900', gradient: 'linear-gradient(135deg, #FF9900, #FF6600)',
    totalQuestions: 64, easy: 18, medium: 34, hard: 12,
    questions: [
      { id: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', frequency: 5, solved: true },
      { id: 2, title: 'Number of Islands', topic: 'Graphs', difficulty: 'Medium', frequency: 5, solved: false },
      { id: 3, title: 'LRU Cache', topic: 'Design', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 4, title: 'Merge Intervals', topic: 'Arrays', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 5, title: 'Word Ladder', topic: 'Graphs', difficulty: 'Hard', frequency: 4, solved: false },
      { id: 6, title: 'Trapping Rain Water', topic: 'Arrays', difficulty: 'Hard', frequency: 4, solved: true },
      { id: 7, title: 'Course Schedule', topic: 'Graphs', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 8, title: 'Min Stack', topic: 'Design', difficulty: 'Medium', frequency: 3, solved: true },
      { id: 9, title: 'Reverse Linked List', topic: 'Linked List', difficulty: 'Easy', frequency: 3, solved: true },
      { id: 10, title: 'Validate BST', topic: 'Trees', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 11, title: 'Sliding Window Maximum', topic: 'Arrays', difficulty: 'Hard', frequency: 3, solved: false },
      { id: 12, title: 'Serialize Binary Tree', topic: 'Trees', difficulty: 'Hard', frequency: 3, solved: false },
      { id: 63, title: 'Container With Most Water', topic: 'Arrays', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 64, title: 'Rotting Oranges', topic: 'Graphs', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 65, title: 'Search in Rotated Sorted Array', topic: 'Binary Search', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 66, title: 'Daily Temperatures', topic: 'Stack & Queue', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 67, title: 'Word Search', topic: 'Backtracking', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 68, title: 'Kth Smallest Element in a BST', topic: 'Trees', difficulty: 'Medium', frequency: 3, solved: true },
    ]
  },
  {
    name: 'Google', short: 'GGL', color: '#4285F4', gradient: 'linear-gradient(135deg, #4285F4, #34A853)',
    totalQuestions: 72, easy: 14, medium: 40, hard: 18,
    questions: [
      { id: 13, title: 'Longest Substring Without Repeating', topic: 'Strings', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 14, title: 'Median of Two Sorted Arrays', topic: 'Binary Search', difficulty: 'Hard', frequency: 5, solved: false },
      { id: 15, title: 'Regular Expression Matching', topic: 'DP', difficulty: 'Hard', frequency: 4, solved: false },
      { id: 16, title: 'Next Permutation', topic: 'Arrays', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 17, title: 'Word Search II', topic: 'Trie', difficulty: 'Hard', frequency: 4, solved: false },
      { id: 18, title: 'Valid Parentheses', topic: 'Strings', difficulty: 'Easy', frequency: 3, solved: true },
      { id: 19, title: 'Merge K Sorted Lists', topic: 'Linked List', difficulty: 'Hard', frequency: 4, solved: false },
      { id: 20, title: 'Alien Dictionary', topic: 'Graphs', difficulty: 'Hard', frequency: 3, solved: false },
      { id: 21, title: 'Snapshot Array', topic: 'Design', difficulty: 'Medium', frequency: 3, solved: true },
      { id: 22, title: 'Decode Ways', topic: 'DP', difficulty: 'Medium', frequency: 3, solved: false },
      { id: 69, title: 'Network Delay Time', topic: 'Graphs', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 70, title: 'Koko Eating Bananas', topic: 'Binary Search', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 71, title: 'Decode String', topic: 'Stack & Queue', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 72, title: 'Find Median from Data Stream', topic: 'Heap', difficulty: 'Hard', frequency: 4, solved: false },
      { id: 73, title: 'N-Queens', topic: 'Backtracking', difficulty: 'Hard', frequency: 3, solved: false },
      { id: 74, title: 'Invert Binary Tree', topic: 'Trees', difficulty: 'Easy', frequency: 4, solved: true },
    ]
  },
  {
    name: 'Microsoft', short: 'MST', color: '#00A4EF', gradient: 'linear-gradient(135deg, #00A4EF, #7FBA00)',
    totalQuestions: 52, easy: 16, medium: 26, hard: 10,
    questions: [
      { id: 23, title: 'Add Two Numbers', topic: 'Linked List', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 24, title: 'Spiral Matrix', topic: 'Arrays', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 25, title: 'Group Anagrams', topic: 'Strings', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 26, title: 'Binary Tree Zigzag Level', topic: 'Trees', difficulty: 'Medium', frequency: 3, solved: false },
      { id: 27, title: 'Set Matrix Zeroes', topic: 'Arrays', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 28, title: 'Reverse Words in String', topic: 'Strings', difficulty: 'Medium', frequency: 3, solved: true },
      { id: 29, title: 'Copy List with Random Pointer', topic: 'Linked List', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 30, title: 'Find Minimum in Rotated Sorted Array', topic: 'Binary Search', difficulty: 'Medium', frequency: 3, solved: true },
      { id: 75, title: 'Permutations', topic: 'Backtracking', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 76, title: 'Balanced Binary Tree', topic: 'Trees', difficulty: 'Easy', frequency: 3, solved: true },
      { id: 77, title: 'Longest Increasing Subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 78, title: 'Evaluate Reverse Polish Notation', topic: 'Stack & Queue', difficulty: 'Medium', frequency: 3, solved: true },
    ]
  },
  {
    name: 'Meta', short: 'MTA', color: '#0668E1', gradient: 'linear-gradient(135deg, #0668E1, #833AB4)',
    totalQuestions: 58, easy: 12, medium: 34, hard: 12,
    questions: [
      { id: 31, title: 'Valid Palindrome', topic: 'Strings', difficulty: 'Easy', frequency: 5, solved: true },
      { id: 32, title: 'Clone Graph', topic: 'Graphs', difficulty: 'Medium', frequency: 5, solved: false },
      { id: 33, title: 'Subarray Sum Equals K', topic: 'Arrays', difficulty: 'Medium', frequency: 5, solved: false },
      { id: 34, title: 'Diameter of Binary Tree', topic: 'Trees', difficulty: 'Easy', frequency: 4, solved: true },
      { id: 35, title: 'Lowest Common Ancestor', topic: 'Trees', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 36, title: 'Target Sum', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 37, title: 'Top K Frequent Elements', topic: 'Heap', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 38, title: 'Binary Tree Right Side View', topic: 'Trees', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 79, title: 'Subsets', topic: 'Backtracking', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 80, title: 'Pow(x, n)', topic: 'Math', difficulty: 'Medium', frequency: 3, solved: true },
      { id: 81, title: 'Palindromic Substrings', topic: 'Strings', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 82, title: 'Kth Largest Element in an Array', topic: 'Heap', difficulty: 'Medium', frequency: 4, solved: true },
    ]
  },
  {
    name: 'Apple', short: 'APL', color: '#A2AAAD', gradient: 'linear-gradient(135deg, #A2AAAD, #555555)',
    totalQuestions: 38, easy: 12, medium: 18, hard: 8,
    questions: [
      { id: 39, title: '3Sum', topic: 'Arrays', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 40, title: 'Contains Duplicate', topic: 'Arrays', difficulty: 'Easy', frequency: 4, solved: true },
      { id: 41, title: 'Merge Two Sorted Lists', topic: 'Linked List', difficulty: 'Easy', frequency: 4, solved: true },
      { id: 42, title: 'Climbing Stairs', topic: 'Dynamic Programming', difficulty: 'Easy', frequency: 4, solved: true },
      { id: 43, title: 'Longest Common Prefix', topic: 'Strings', difficulty: 'Easy', frequency: 3, solved: true },
      { id: 44, title: 'Spiral Matrix', topic: 'Arrays', difficulty: 'Medium', frequency: 3, solved: false },
      { id: 83, title: 'Subtree of Another Tree', topic: 'Trees', difficulty: 'Easy', frequency: 3, solved: true },
      { id: 84, title: 'Combination Sum', topic: 'Backtracking', difficulty: 'Medium', frequency: 3, solved: true },
    ]
  },
  {
    name: 'Netflix', short: 'NFX', color: '#E50914', gradient: 'linear-gradient(135deg, #E50914, #B81D24)',
    totalQuestions: 32, easy: 6, medium: 18, hard: 8,
    questions: [
      { id: 45, title: 'Design Search Autocomplete', topic: 'Design', difficulty: 'Hard', frequency: 5, solved: false },
      { id: 46, title: 'Time Based Key-Value Store', topic: 'Binary Search', difficulty: 'Medium', frequency: 5, solved: false },
      { id: 47, title: 'Top K Frequent Elements', topic: 'Heap', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 48, title: 'Find Median from Data Stream', topic: 'Heap', difficulty: 'Hard', frequency: 4, solved: false },
      { id: 49, title: 'LRU Cache', topic: 'Design', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 50, title: 'Word Break', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 3, solved: false },
      { id: 85, title: 'Trapping Rain Water', topic: 'Arrays', difficulty: 'Hard', frequency: 3, solved: true },
    ]
  },
  {
    name: 'Uber', short: 'UBR', color: '#000000', gradient: 'linear-gradient(135deg, #276EF1, #7B61FF)',
    totalQuestions: 36, easy: 8, medium: 20, hard: 8,
    questions: [
      { id: 51, title: 'Design Hit Counter', topic: 'Design', difficulty: 'Medium', frequency: 5, solved: true },
      { id: 52, title: 'Cheapest Flights Within K Stops', topic: 'Graphs', difficulty: 'Medium', frequency: 5, solved: false },
      { id: 53, title: 'Task Scheduler', topic: 'Heap', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 54, title: 'Word Break', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 55, title: 'Number of Islands', topic: 'Graphs', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 56, title: 'Course Schedule II', topic: 'Graphs', difficulty: 'Medium', frequency: 3, solved: false },
      { id: 86, title: 'Rotting Oranges', topic: 'Graphs', difficulty: 'Medium', frequency: 4, solved: true },
    ]
  },
  {
    name: 'Goldman Sachs', short: 'GS', color: '#6AABDD', gradient: 'linear-gradient(135deg, #6AABDD, #003A70)',
    totalQuestions: 34, easy: 10, medium: 18, hard: 6,
    questions: [
      { id: 57, title: 'Best Time to Buy and Sell Stock', topic: 'Arrays', difficulty: 'Easy', frequency: 5, solved: true },
      { id: 58, title: 'Rotate Image', topic: 'Arrays', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 59, title: 'Coin Change', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 5, solved: false },
      { id: 60, title: 'Coin Change II', topic: 'Dynamic Programming', difficulty: 'Medium', frequency: 4, solved: false },
      { id: 61, title: 'Maximum Subarray', topic: 'Arrays', difficulty: 'Medium', frequency: 4, solved: true },
      { id: 62, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', frequency: 4, solved: true },
      { id: 87, title: 'Daily Temperatures', topic: 'Stack & Queue', difficulty: 'Medium', frequency: 3, solved: true },
    ]
  },
]
