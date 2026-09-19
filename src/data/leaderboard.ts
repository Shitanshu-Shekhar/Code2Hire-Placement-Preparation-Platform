export interface LeaderboardEntry {
  rank: number
  name: string
  initials: string
  score: number
  problemsSolved: number
  streak: number
  rating: number
  badge: 'gold' | 'silver' | 'bronze' | 'none'
  isCurrentUser: boolean
  college?: string
  change: number // rank change, positive means moved up
}

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: 'Arjun Verma', initials: 'AV', score: 9820, problemsSolved: 2140, streak: 67, rating: 2105, badge: 'gold', isCurrentUser: false, college: 'IIT Delhi', change: 0 },
  { rank: 2, name: 'Priya Sharma', initials: 'PS', score: 9540, problemsSolved: 2010, streak: 45, rating: 2042, badge: 'silver', isCurrentUser: false, college: 'IIT Bombay', change: 1 },
  { rank: 3, name: 'Rahul Gupta', initials: 'RG', score: 9310, problemsSolved: 1980, streak: 52, rating: 1980, badge: 'bronze', isCurrentUser: false, college: 'IIT Kanpur', change: -1 },
  { rank: 4, name: 'Sneha Patel', initials: 'SP', score: 8890, problemsSolved: 1870, streak: 38, rating: 1920, badge: 'none', isCurrentUser: false, college: 'NIT Trichy', change: 2 },
  { rank: 5, name: 'Vikram Singh', initials: 'VS', score: 8720, problemsSolved: 1830, streak: 29, rating: 1895, badge: 'none', isCurrentUser: false, college: 'IIT Madras', change: 0 },
  { rank: 6, name: 'Ananya Mishra', initials: 'AM', score: 8450, problemsSolved: 1760, streak: 41, rating: 1860, badge: 'none', isCurrentUser: false, college: 'BITS Pilani', change: 3 },
  { rank: 7, name: 'Karthik Nair', initials: 'KN', score: 8210, problemsSolved: 1720, streak: 33, rating: 1835, badge: 'none', isCurrentUser: false, college: 'IIT Kharagpur', change: -2 },
  { rank: 8, name: 'Divya Reddy', initials: 'DR', score: 7980, problemsSolved: 1680, streak: 27, rating: 1810, badge: 'none', isCurrentUser: false, college: 'NIT Warangal', change: 1 },
  { rank: 9, name: 'Amit Joshi', initials: 'AJ', score: 7750, problemsSolved: 1650, streak: 35, rating: 1785, badge: 'none', isCurrentUser: false, college: 'IIT Roorkee', change: -1 },
  { rank: 10, name: 'Riya Agrawal', initials: 'RA', score: 7520, problemsSolved: 1590, streak: 22, rating: 1760, badge: 'none', isCurrentUser: false, college: 'IIIT Hyderabad', change: 0 },
  { rank: 11, name: 'Manish Kumar', initials: 'MK', score: 7340, problemsSolved: 1540, streak: 19, rating: 1740, badge: 'none', isCurrentUser: false, college: 'NIT Surathkal', change: 2 },
  { rank: 12, name: 'Shitanshu Kumar', initials: 'SK', score: 6890, problemsSolved: 1418, streak: 23, rating: 1712, badge: 'none', isCurrentUser: true, college: 'Your College', change: 4 },
  { rank: 13, name: 'Pooja Iyer', initials: 'PI', score: 6720, problemsSolved: 1380, streak: 18, rating: 1690, badge: 'none', isCurrentUser: false, college: 'VIT Vellore', change: -1 },
  { rank: 14, name: 'Rohan Mehta', initials: 'RM', score: 6540, problemsSolved: 1340, streak: 15, rating: 1665, badge: 'none', isCurrentUser: false, college: 'DTU Delhi', change: 0 },
  { rank: 15, name: 'Kavita Das', initials: 'KD', score: 6380, problemsSolved: 1290, streak: 21, rating: 1640, badge: 'none', isCurrentUser: false, college: 'NIT Rourkela', change: -3 },
  { rank: 16, name: 'Saurabh Tiwari', initials: 'ST', score: 6190, problemsSolved: 1250, streak: 12, rating: 1615, badge: 'none', isCurrentUser: false, college: 'MNNIT Allahabad', change: 1 },
  { rank: 17, name: 'Nidhi Saxena', initials: 'NS', score: 6020, problemsSolved: 1210, streak: 16, rating: 1590, badge: 'none', isCurrentUser: false, college: 'IIIT Bangalore', change: 0 },
  { rank: 18, name: 'Aditya Rao', initials: 'AR', score: 5870, problemsSolved: 1180, streak: 14, rating: 1565, badge: 'none', isCurrentUser: false, college: 'PES University', change: -2 },
  { rank: 19, name: 'Shruti Menon', initials: 'SM', score: 5710, problemsSolved: 1140, streak: 9, rating: 1540, badge: 'none', isCurrentUser: false, college: 'SRM Chennai', change: 1 },
  { rank: 20, name: 'Deepak Chauhan', initials: 'DC', score: 5550, problemsSolved: 1100, streak: 11, rating: 1515, badge: 'none', isCurrentUser: false, college: 'NIT Jaipur', change: 0 },
]
