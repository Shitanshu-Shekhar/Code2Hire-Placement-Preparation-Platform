export interface Problem {
  id: number
  title: string
  topic: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  companies: string[]
  acceptance: number
  solved: boolean
  starred: boolean
  leetcodeSlug?: string
}

export const problems: Problem[] = [
  // --- ARRAYS (20) ---
  { id: 1, title: 'Two Sum', topic: 'Arrays', difficulty: 'Easy', companies: ['Amazon', 'Google', 'Meta'], acceptance: 78, solved: true, starred: true },
  { id: 2, title: 'Best Time to Buy and Sell Stock', topic: 'Arrays', difficulty: 'Easy', companies: ['Amazon', 'Goldman Sachs'], acceptance: 72, solved: true, starred: false },
  { id: 3, title: 'Contains Duplicate', topic: 'Arrays', difficulty: 'Easy', companies: ['Apple', 'Microsoft'], acceptance: 81, solved: true, starred: false },
  { id: 4, title: 'Product of Array Except Self', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 65, solved: true, starred: true },
  { id: 5, title: 'Maximum Subarray', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Goldman Sachs'], acceptance: 62, solved: true, starred: false },
  { id: 6, title: 'Merge Intervals', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Google', 'Microsoft'], acceptance: 55, solved: false, starred: true },
  { id: 7, title: '3Sum', topic: 'Arrays', difficulty: 'Medium', companies: ['Apple', 'Amazon'], acceptance: 48, solved: true, starred: false },
  { id: 8, title: 'Trapping Rain Water', topic: 'Arrays', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 38, solved: true, starred: true },
  { id: 9, title: 'Sliding Window Maximum', topic: 'Arrays', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 32, solved: false, starred: false },
  { id: 10, title: 'First Missing Positive', topic: 'Arrays', difficulty: 'Hard', companies: ['Google', 'Microsoft'], acceptance: 28, solved: false, starred: false },
  { id: 46, title: 'Container With Most Water', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 54, solved: true, starred: false },
  { id: 47, title: 'Subarray Sum Equals K', topic: 'Arrays', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 44, solved: false, starred: true },
  { id: 48, title: 'Rotate Image', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 73, solved: true, starred: false },
  { id: 49, title: 'Spiral Matrix', topic: 'Arrays', difficulty: 'Medium', companies: ['Microsoft', 'Apple'], acceptance: 49, solved: false, starred: false },
  { id: 50, title: 'Set Matrix Zeroes', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 53, solved: true, starred: false },
  { id: 51, title: 'Longest Consecutive Sequence', topic: 'Arrays', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 48, solved: false, starred: true },
  { id: 106, title: 'Next Permutation', topic: 'Arrays', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 39, solved: false, starred: true },
  { id: 107, title: 'Sort Colors', topic: 'Arrays', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 63, solved: true, starred: false },
  { id: 108, title: 'Find the Duplicate Number', topic: 'Arrays', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 59, solved: false, starred: false },
  { id: 109, title: 'Majority Element', topic: 'Arrays', difficulty: 'Easy', companies: ['Google', 'Amazon'], acceptance: 64, solved: true, starred: false },

  // --- TWO POINTERS & SLIDING WINDOW (12) ---
  { id: 110, title: 'Valid Palindrome', topic: 'Two Pointers', difficulty: 'Easy', companies: ['Meta', 'Microsoft'], acceptance: 76, solved: true, starred: false },
  { id: 111, title: 'Two Sum II - Input Array Is Sorted', topic: 'Two Pointers', difficulty: 'Medium', companies: ['Amazon', 'Apple'], acceptance: 61, solved: true, starred: false },
  { id: 112, title: '3Sum Closest', topic: 'Two Pointers', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 46, solved: false, starred: false },
  { id: 113, title: 'Move Zeroes', topic: 'Two Pointers', difficulty: 'Easy', companies: ['Meta', 'Amazon'], acceptance: 62, solved: true, starred: false },
  { id: 114, title: 'Remove Duplicates from Sorted Array', topic: 'Two Pointers', difficulty: 'Easy', companies: ['Microsoft', 'Meta'], acceptance: 56, solved: true, starred: false },
  { id: 115, title: 'Longest Substring Without Repeating', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 58, solved: true, starred: true },
  { id: 116, title: 'Longest Repeating Character Replacement', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 54, solved: false, starred: true },
  { id: 117, title: 'Permutation in String', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 44, solved: false, starred: false },
  { id: 118, title: 'Minimum Window Substring', topic: 'Sliding Window', difficulty: 'Hard', companies: ['Meta', 'Google'], acceptance: 29, solved: false, starred: true },
  { id: 119, title: 'Minimum Size Subarray Sum', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Amazon', 'Goldman Sachs'], acceptance: 47, solved: true, starred: false },
  { id: 120, title: 'Fruit Into Baskets', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Google', 'Meta'], acceptance: 44, solved: false, starred: false },
  { id: 121, title: 'Max Consecutive Ones III', topic: 'Sliding Window', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 63, solved: true, starred: false },

  // --- STRINGS (14) ---
  { id: 13, title: 'Group Anagrams', topic: 'Strings', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 61, solved: true, starred: false },
  { id: 15, title: 'Valid Parentheses', topic: 'Strings', difficulty: 'Easy', companies: ['Google', 'Amazon'], acceptance: 82, solved: true, starred: false },
  { id: 16, title: 'Longest Palindromic Substring', topic: 'Strings', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 45, solved: false, starred: false },
  { id: 52, title: 'Valid Anagram', topic: 'Strings', difficulty: 'Easy', companies: ['Amazon', 'Meta'], acceptance: 64, solved: true, starred: false },
  { id: 53, title: 'Encode and Decode Strings', topic: 'Strings', difficulty: 'Medium', companies: ['Google', 'Meta'], acceptance: 46, solved: false, starred: true },
  { id: 54, title: 'Palindromic Substrings', topic: 'Strings', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 68, solved: true, starred: false },
  { id: 55, title: 'String to Integer (atoi)', topic: 'Strings', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 37, solved: false, starred: false },
  { id: 56, title: 'Longest Common Prefix', topic: 'Strings', difficulty: 'Easy', companies: ['Apple', 'Amazon'], acceptance: 71, solved: true, starred: false },
  { id: 122, title: 'Generate Parentheses', topic: 'Strings', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 74, solved: true, starred: true },
  { id: 123, title: 'Multiply Strings', topic: 'Strings', difficulty: 'Medium', companies: ['Meta', 'Microsoft'], acceptance: 40, solved: false, starred: false },
  { id: 124, title: 'Basic Calculator II', topic: 'Strings', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 43, solved: false, starred: true },
  { id: 125, title: 'Word Pattern', topic: 'Strings', difficulty: 'Easy', companies: ['Amazon', 'Uber'], acceptance: 42, solved: true, starred: false },
  { id: 126, title: 'Ransom Note', topic: 'Strings', difficulty: 'Easy', companies: ['Amazon', 'Apple'], acceptance: 61, solved: true, starred: false },
  { id: 127, title: 'Isomorphic Strings', topic: 'Strings', difficulty: 'Easy', companies: ['Google', 'Amazon'], acceptance: 44, solved: true, starred: false },

  // --- LINKED LIST (14) ---
  { id: 17, title: 'Reverse Linked List', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], acceptance: 84, solved: true, starred: false },
  { id: 18, title: 'Merge Two Sorted Lists', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Apple'], acceptance: 79, solved: true, starred: false },
  { id: 19, title: 'Add Two Numbers', topic: 'Linked List', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 56, solved: true, starred: true },
  { id: 20, title: 'Merge K Sorted Lists', topic: 'Linked List', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 35, solved: false, starred: false },
  { id: 57, title: 'Remove Nth Node From End of List', topic: 'Linked List', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 62, solved: true, starred: false },
  { id: 58, title: 'Reorder List', topic: 'Linked List', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 55, solved: false, starred: true },
  { id: 59, title: 'Linked List Cycle', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], acceptance: 78, solved: true, starred: false },
  { id: 60, title: 'Linked List Cycle II', topic: 'Linked List', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 49, solved: false, starred: false },
  { id: 61, title: 'Copy List with Random Pointer', topic: 'Linked List', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 53, solved: false, starred: true },
  { id: 128, title: 'Intersection of Two Linked Lists', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], acceptance: 57, solved: true, starred: false },
  { id: 129, title: 'Palindrome Linked List', topic: 'Linked List', difficulty: 'Easy', companies: ['Amazon', 'Meta'], acceptance: 52, solved: true, starred: false },
  { id: 130, title: 'Reverse Nodes in k-Group', topic: 'Linked List', difficulty: 'Hard', companies: ['Amazon', 'Microsoft'], acceptance: 58, solved: false, starred: true },
  { id: 131, title: 'Rotate List', topic: 'Linked List', difficulty: 'Medium', companies: ['Amazon', 'Bloomberg'], acceptance: 37, solved: false, starred: false },
  { id: 132, title: 'Sort List', topic: 'Linked List', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 56, solved: false, starred: false },

  // --- BINARY SEARCH (12) ---
  { id: 83, title: 'Search in Rotated Sorted Array', topic: 'Binary Search', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 40, solved: true, starred: true },
  { id: 84, title: 'Find Minimum in Rotated Sorted Array', topic: 'Binary Search', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 50, solved: true, starred: false },
  { id: 85, title: 'Median of Two Sorted Arrays', topic: 'Binary Search', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 41, solved: false, starred: true },
  { id: 86, title: 'Time Based Key-Value Store', topic: 'Binary Search', difficulty: 'Medium', companies: ['Netflix', 'Google'], acceptance: 51, solved: false, starred: true },
  { id: 87, title: 'Koko Eating Bananas', topic: 'Binary Search', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 52, solved: true, starred: false },
  { id: 133, title: 'Binary Search', topic: 'Binary Search', difficulty: 'Easy', companies: ['Google', 'Apple'], acceptance: 58, solved: true, starred: false },
  { id: 134, title: 'Search a 2D Matrix', topic: 'Binary Search', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 50, solved: true, starred: false },
  { id: 135, title: 'Find Peak Element', topic: 'Binary Search', difficulty: 'Medium', companies: ['Google', 'Meta'], acceptance: 46, solved: true, starred: false },
  { id: 136, title: 'Capacity To Ship Packages Within D Days', topic: 'Binary Search', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 69, solved: false, starred: true },
  { id: 137, title: 'Single Element in a Sorted Array', topic: 'Binary Search', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 59, solved: false, starred: false },
  { id: 138, title: 'Split Array Largest Sum', topic: 'Binary Search', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 55, solved: false, starred: true },
  { id: 139, title: 'First and Last Position of Element in Sorted Array', topic: 'Binary Search', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 44, solved: true, starred: false },

  // --- TREES & BST (18) ---
  { id: 22, title: 'Validate BST', topic: 'Trees', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 52, solved: true, starred: false },
  { id: 23, title: 'Binary Tree Level Order', topic: 'Trees', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 62, solved: true, starred: false },
  { id: 24, title: 'Maximum Depth of Binary Tree', topic: 'Trees', difficulty: 'Easy', companies: ['Amazon', 'Google'], acceptance: 85, solved: true, starred: false },
  { id: 25, title: 'Serialize Binary Tree', topic: 'Trees', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 30, solved: false, starred: true },
  { id: 26, title: 'Binary Tree Zigzag Level', topic: 'Trees', difficulty: 'Medium', companies: ['Microsoft', 'Meta'], acceptance: 50, solved: false, starred: false },
  { id: 27, title: 'Lowest Common Ancestor', topic: 'Trees', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 56, solved: true, starred: false },
  { id: 62, title: 'Invert Binary Tree', topic: 'Trees', difficulty: 'Easy', companies: ['Google', 'Amazon'], acceptance: 89, solved: true, starred: false },
  { id: 63, title: 'Subtree of Another Tree', topic: 'Trees', difficulty: 'Easy', companies: ['Amazon', 'Meta'], acceptance: 67, solved: true, starred: false },
  { id: 64, title: 'Diameter of Binary Tree', topic: 'Trees', difficulty: 'Easy', companies: ['Meta', 'Amazon'], acceptance: 75, solved: true, starred: false },
  { id: 65, title: 'Balanced Binary Tree', topic: 'Trees', difficulty: 'Easy', companies: ['Amazon', 'Google'], acceptance: 72, solved: true, starred: false },
  { id: 66, title: 'Same Tree', topic: 'Trees', difficulty: 'Easy', companies: ['Amazon', 'Microsoft'], acceptance: 82, solved: true, starred: false },
  { id: 67, title: 'Binary Tree Right Side View', topic: 'Trees', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 63, solved: false, starred: true },
  { id: 68, title: 'Construct Binary Tree from Preorder and Inorder', topic: 'Trees', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 62, solved: false, starred: false },
  { id: 69, title: 'Kth Smallest Element in a BST', topic: 'Trees', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 71, solved: true, starred: false },
  { id: 70, title: 'Lowest Common Ancestor of BST', topic: 'Trees', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 63, solved: true, starred: false },
  { id: 140, title: 'Binary Tree Maximum Path Sum', topic: 'Trees', difficulty: 'Hard', companies: ['Meta', 'Google', 'Amazon'], acceptance: 39, solved: false, starred: true },
  { id: 141, title: 'Count Complete Tree Nodes', topic: 'Trees', difficulty: 'Easy', companies: ['Google', 'Amazon'], acceptance: 64, solved: true, starred: false },
  { id: 142, title: 'Populating Next Right Pointers in Each Node', topic: 'Trees', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 62, solved: false, starred: false },

  // --- GRAPHS (16) ---
  { id: 28, title: 'Number of Islands', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 53, solved: false, starred: true },
  { id: 29, title: 'Course Schedule', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 48, solved: false, starred: false },
  { id: 30, title: 'Clone Graph', topic: 'Graphs', difficulty: 'Medium', companies: ['Meta', 'Google'], acceptance: 51, solved: false, starred: false },
  { id: 31, title: 'Word Ladder', topic: 'Graphs', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 25, solved: false, starred: true },
  { id: 32, title: 'Pacific Atlantic Water Flow', topic: 'Graphs', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 46, solved: false, starred: false },
  { id: 71, title: 'Course Schedule II', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 49, solved: false, starred: true },
  { id: 72, title: 'Number of Connected Components', topic: 'Graphs', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 62, solved: false, starred: false },
  { id: 73, title: 'Graph Valid Tree', topic: 'Graphs', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 47, solved: false, starred: false },
  { id: 74, title: 'Rotting Oranges', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 54, solved: true, starred: true },
  { id: 75, title: 'Network Delay Time', topic: 'Graphs', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 53, solved: false, starred: false },
  { id: 76, title: 'Cheapest Flights Within K Stops', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 39, solved: false, starred: true },
  { id: 77, title: 'Alien Dictionary', topic: 'Graphs', difficulty: 'Hard', companies: ['Google', 'Meta'], acceptance: 35, solved: false, starred: true },
  { id: 143, title: 'Surrounded Regions', topic: 'Graphs', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 39, solved: false, starred: false },
  { id: 144, title: 'Redundant Connection', topic: 'Graphs', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 63, solved: true, starred: false },
  { id: 145, title: 'Is Graph Bipartite', topic: 'Graphs', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 55, solved: false, starred: false },
  { id: 146, title: 'Accounts Merge', topic: 'Graphs', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 57, solved: false, starred: true },

  // --- DYNAMIC PROGRAMMING (18) ---
  { id: 33, title: 'Climbing Stairs', topic: 'Dynamic Programming', difficulty: 'Easy', companies: ['Amazon', 'Apple'], acceptance: 82, solved: true, starred: false },
  { id: 34, title: 'House Robber', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 60, solved: false, starred: true },
  { id: 35, title: 'Coin Change', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Goldman Sachs', 'Amazon'], acceptance: 45, solved: false, starred: false },
  { id: 36, title: 'Longest Common Subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 50, solved: false, starred: false },
  { id: 37, title: 'Unique Paths', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Meta', 'Google'], acceptance: 63, solved: true, starred: false },
  { id: 38, title: 'Word Break', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Uber', 'Amazon'], acceptance: 44, solved: false, starred: true },
  { id: 39, title: 'Edit Distance', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 38, solved: false, starred: false },
  { id: 40, title: 'Longest Increasing Subsequence', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Microsoft', 'Google'], acceptance: 47, solved: false, starred: false },
  { id: 78, title: 'Maximum Product Subarray', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 35, solved: false, starred: true },
  { id: 79, title: 'Partition Equal Subset Sum', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 47, solved: false, starred: false },
  { id: 80, title: 'Target Sum', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 46, solved: false, starred: false },
  { id: 81, title: 'Interleaving String', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 39, solved: false, starred: true },
  { id: 82, title: 'Coin Change II', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Goldman Sachs'], acceptance: 62, solved: false, starred: false },
  { id: 147, title: 'House Robber II', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 42, solved: false, starred: false },
  { id: 148, title: 'Decode Ways', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Meta', 'Google'], acceptance: 34, solved: false, starred: true },
  { id: 149, title: 'Regular Expression Matching', topic: 'Dynamic Programming', difficulty: 'Hard', companies: ['Google', 'Meta'], acceptance: 28, solved: false, starred: true },
  { id: 150, title: 'Best Time to Buy Stock with Cooldown', topic: 'Dynamic Programming', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 58, solved: false, starred: false },
  { id: 151, title: 'Burst Balloons', topic: 'Dynamic Programming', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 59, solved: false, starred: true },

  // --- STACK & QUEUE (10) ---
  { id: 88, title: 'Daily Temperatures', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 66, solved: true, starred: true },
  { id: 89, title: 'Evaluate Reverse Polish Notation', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 51, solved: true, starred: false },
  { id: 90, title: 'Largest Rectangle in Histogram', topic: 'Stack & Queue', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 44, solved: false, starred: true },
  { id: 91, title: 'Decode String', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 59, solved: true, starred: false },
  { id: 152, title: 'Min Stack', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 67, solved: true, starred: false },
  { id: 153, title: 'Asteroid Collision', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Amazon', 'Uber'], acceptance: 45, solved: false, starred: false },
  { id: 154, title: 'Implement Queue using Stacks', topic: 'Stack & Queue', difficulty: 'Easy', companies: ['Amazon', 'Apple'], acceptance: 66, solved: true, starred: false },
  { id: 155, title: 'Next Greater Element I', topic: 'Stack & Queue', difficulty: 'Easy', companies: ['Meta', 'Amazon'], acceptance: 72, solved: true, starred: false },
  { id: 156, title: 'Online Stock Span', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 66, solved: false, starred: true },
  { id: 157, title: '132 Pattern', topic: 'Stack & Queue', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 33, solved: false, starred: false },

  // --- HEAP / PRIORITY QUEUE (8) ---
  { id: 92, title: 'Kth Largest Element in an Array', topic: 'Heap', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 67, solved: true, starred: false },
  { id: 93, title: 'Top K Frequent Elements', topic: 'Heap', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 63, solved: true, starred: true },
  { id: 94, title: 'Find Median from Data Stream', topic: 'Heap', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 51, solved: false, starred: true },
  { id: 95, title: 'Task Scheduler', topic: 'Heap', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 59, solved: false, starred: false },
  { id: 158, title: 'Last Stone Weight', topic: 'Heap', difficulty: 'Easy', companies: ['Amazon', 'Apple'], acceptance: 65, solved: true, starred: false },
  { id: 159, title: 'K Closest Points to Origin', topic: 'Heap', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 66, solved: true, starred: false },
  { id: 160, title: 'Design Twitter', topic: 'Heap', difficulty: 'Medium', companies: ['Twitter', 'Amazon'], acceptance: 39, solved: false, starred: true },
  { id: 161, title: 'Reorganize String', topic: 'Heap', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 54, solved: false, starred: false },

  // --- BACKTRACKING (10) ---
  { id: 96, title: 'Word Search', topic: 'Backtracking', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 42, solved: true, starred: true },
  { id: 97, title: 'Combination Sum', topic: 'Backtracking', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 71, solved: true, starred: false },
  { id: 98, title: 'Combination Sum II', topic: 'Backtracking', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 54, solved: false, starred: false },
  { id: 99, title: 'Permutations', topic: 'Backtracking', difficulty: 'Medium', companies: ['Microsoft', 'Amazon'], acceptance: 78, solved: true, starred: false },
  { id: 100, title: 'Subsets', topic: 'Backtracking', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 77, solved: true, starred: false },
  { id: 101, title: 'Subsets II', topic: 'Backtracking', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 57, solved: false, starred: false },
  { id: 102, title: 'Letter Combinations of a Phone Number', topic: 'Backtracking', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 60, solved: true, starred: false },
  { id: 103, title: 'Palindrome Partitioning', topic: 'Backtracking', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 67, solved: false, starred: true },
  { id: 104, title: 'N-Queens', topic: 'Backtracking', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 68, solved: false, starred: true },
  { id: 162, title: 'Sudoku Solver', topic: 'Backtracking', difficulty: 'Hard', companies: ['Google', 'Uber'], acceptance: 60, solved: false, starred: true },

  // --- TRIE (5) ---
  { id: 44, title: 'Implement Trie', topic: 'Trie', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 58, solved: true, starred: false },
  { id: 45, title: 'Word Search II', topic: 'Trie', difficulty: 'Hard', companies: ['Google', 'Amazon'], acceptance: 24, solved: false, starred: false },
  { id: 163, title: 'Design Add and Search Words Data Structure', topic: 'Trie', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 44, solved: false, starred: true },
  { id: 164, title: 'Maximum XOR of Two Numbers in an Array', topic: 'Trie', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 54, solved: false, starred: false },
  { id: 165, title: 'Replace Words', topic: 'Trie', difficulty: 'Medium', companies: ['Uber', 'Amazon'], acceptance: 65, solved: true, starred: false },

  // --- GREEDY & INTERVALS (8) ---
  { id: 166, title: 'Jump Game', topic: 'Greedy', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 39, solved: true, starred: false },
  { id: 167, title: 'Jump Game II', topic: 'Greedy', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 45, solved: false, starred: true },
  { id: 168, title: 'Gas Station', topic: 'Greedy', difficulty: 'Medium', companies: ['Amazon', 'Google'], acceptance: 46, solved: false, starred: false },
  { id: 169, title: 'Hand of Straights', topic: 'Greedy', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 57, solved: true, starred: false },
  { id: 170, title: 'Insert Interval', topic: 'Greedy', difficulty: 'Medium', companies: ['Google', 'Meta'], acceptance: 41, solved: true, starred: true },
  { id: 171, title: 'Non-overlapping Intervals', topic: 'Greedy', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 54, solved: false, starred: false },
  { id: 172, title: 'Minimum Number of Arrows to Burst Balloons', topic: 'Greedy', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 58, solved: false, starred: false },
  { id: 173, title: 'Candy', topic: 'Greedy', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 43, solved: false, starred: true },

  // --- DESIGN (6) ---
  { id: 21, title: 'LRU Cache', topic: 'Design', difficulty: 'Medium', companies: ['Amazon', 'Meta'], acceptance: 42, solved: true, starred: true },
  { id: 41, title: 'Min Stack', topic: 'Design', difficulty: 'Medium', companies: ['Amazon', 'Microsoft'], acceptance: 67, solved: true, starred: false },
  { id: 42, title: 'Design Hit Counter', topic: 'Design', difficulty: 'Medium', companies: ['Uber', 'Google'], acceptance: 54, solved: true, starred: false },
  { id: 43, title: 'Design Search Autocomplete', topic: 'Design', difficulty: 'Hard', companies: ['Netflix', 'Google'], acceptance: 28, solved: false, starred: true },
  { id: 174, title: 'LFU Cache', topic: 'Design', difficulty: 'Hard', companies: ['Amazon', 'Google'], acceptance: 45, solved: false, starred: true },
  { id: 175, title: 'Snapshot Array', topic: 'Design', difficulty: 'Medium', companies: ['Google', 'Amazon'], acceptance: 37, solved: false, starred: false },

  // --- MATH & BIT MANIPULATION (7) ---
  { id: 105, title: 'Pow(x, n)', topic: 'Math', difficulty: 'Medium', companies: ['Meta', 'Google'], acceptance: 35, solved: true, starred: false },
  { id: 176, title: 'Single Number', topic: 'Math', difficulty: 'Easy', companies: ['Amazon', 'Google'], acceptance: 73, solved: true, starred: false },
  { id: 177, title: 'Number of 1 Bits', topic: 'Math', difficulty: 'Easy', companies: ['Microsoft', 'Apple'], acceptance: 71, solved: true, starred: false },
  { id: 178, title: 'Counting Bits', topic: 'Math', difficulty: 'Easy', companies: ['Amazon', 'Meta'], acceptance: 78, solved: true, starred: false },
  { id: 179, title: 'Reverse Bits', topic: 'Math', difficulty: 'Easy', companies: ['Apple', 'Amazon'], acceptance: 59, solved: true, starred: false },
  { id: 180, title: 'Missing Number', topic: 'Math', difficulty: 'Easy', companies: ['Microsoft', 'Amazon'], acceptance: 67, solved: true, starred: false },
  { id: 181, title: 'Sum of Two Integers', topic: 'Math', difficulty: 'Medium', companies: ['Meta', 'Amazon'], acceptance: 51, solved: false, starred: true },
]

export const rawTopics = [
  { name: 'All Topics', icon: '📋' },
  { name: 'Arrays', icon: '📊' },
  { name: 'Two Pointers', icon: '👉' },
  { name: 'Sliding Window', icon: '🪟' },
  { name: 'Strings', icon: '🔤' },
  { name: 'Linked List', icon: '🔗' },
  { name: 'Binary Search', icon: '🔍' },
  { name: 'Trees', icon: '🌳' },
  { name: 'Graphs', icon: '🕸️' },
  { name: 'Dynamic Programming', icon: '💡' },
  { name: 'Stack & Queue', icon: '📚' },
  { name: 'Heap', icon: '⛰️' },
  { name: 'Backtracking', icon: '🔄' },
  { name: 'Trie', icon: '🔠' },
  { name: 'Greedy', icon: '🎯' },
  { name: 'Design', icon: '🏗️' },
  { name: 'Math', icon: '🔢' },
]

export const topics = rawTopics.map(t => ({
  ...t,
  count: t.name === 'All Topics' ? problems.length : problems.filter(p => p.topic === t.name).length,
}))

export function getTopicProgress(topicName: string, solvedSet?: Set<number>) {
  const isProblemSolved = (p: Problem) => solvedSet ? solvedSet.has(p.id) : p.solved
  if (topicName === 'All Topics') {
    const solved = problems.filter(isProblemSolved).length
    return { solved, total: problems.length, percent: Math.round((solved / problems.length) * 100) }
  }
  const topicProblems = problems.filter(p => p.topic === topicName)
  const solved = topicProblems.filter(isProblemSolved).length
  return {
    solved,
    total: topicProblems.length,
    percent: topicProblems.length ? Math.round((solved / topicProblems.length) * 100) : 0,
  }
}
