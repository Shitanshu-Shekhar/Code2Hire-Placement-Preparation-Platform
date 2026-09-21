import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

let db;
async function initializeDB() {
  db = await open({
    filename: path.join(dataDir, 'database.sqlite'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS students (
      id TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      targetCompany TEXT,
      leetcodeUsername TEXT,
      score INTEGER,
      streak INTEGER,
      totalSolved INTEGER,
      easySolved INTEGER,
      mediumSolved INTEGER,
      hardSolved INTEGER,
      ranking INTEGER,
      contestRating INTEGER,
      verified BOOLEAN,
      lastSynced TEXT
    )
  `);

  const count = await db.get('SELECT COUNT(*) as count FROM students');
  if (count.count === 0) {
    const initialStudents = [
      {
        id: 'student-1', name: 'Shitanshu Kumar', email: 'shitanshu@example.com', targetCompany: 'Amazon', leetcodeUsername: 'Shitanshu',
        score: 92, streak: 26, totalSolved: 204, easySolved: 64, mediumSolved: 112, hardSolved: 28, ranking: 829943, verified: true, lastSynced: new Date().toISOString()
      },
      {
        id: 'student-2', name: 'Aarav Sharma', email: 'aarav@example.com', targetCompany: 'Google', leetcodeUsername: 'aarav_sharma',
        score: 96, streak: 42, totalSolved: 485, easySolved: 140, mediumSolved: 265, hardSolved: 80, ranking: 12450, verified: true, lastSynced: new Date().toISOString()
      },
      {
        id: 'student-3', name: 'Priya Patel', email: 'priya@example.com', targetCompany: 'Microsoft', leetcodeUsername: 'priya_p',
        score: 89, streak: 19, totalSolved: 312, easySolved: 98, mediumSolved: 174, hardSolved: 40, ranking: 45210, verified: true, lastSynced: new Date().toISOString()
      },
      {
        id: 'student-4', name: 'Rohan Verma', email: 'rohan@example.com', targetCompany: 'Meta', leetcodeUsername: 'rohan_coder',
        score: 85, streak: 15, totalSolved: 240, easySolved: 82, mediumSolved: 130, hardSolved: 28, ranking: 98300, verified: true, lastSynced: new Date().toISOString()
      }
    ];
    for (const s of initialStudents) {
      await db.run(`INSERT INTO students (id, name, email, targetCompany, leetcodeUsername, score, streak, totalSolved, easySolved, mediumSolved, hardSolved, ranking, verified, lastSynced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
      [s.id, s.name, s.email, s.targetCompany, s.leetcodeUsername, s.score, s.streak, s.totalSolved, s.easySolved, s.mediumSolved, s.hardSolved, s.ranking, s.verified ? 1 : 0, s.lastSynced]);
    }
  }
}

initializeDB().catch(err => {
  console.error('Error initializing database:', err);
});

// Extract clean LeetCode username from raw input or full profile URL
function extractLeetCodeUsername(input) {
  if (!input || typeof input !== 'string') return ''
  try {
    let cleaned = decodeURIComponent(input).trim().replace(/\/+$/, '')
    // Matches URLs like https://leetcode.com/u/neal_wu or https://leetcode.com/neal_wu or @neal_wu
    const urlMatch = cleaned.match(/(?:leetcode\.com\/(?:u\/)?|@)?([a-zA-Z0-9_\-]+)$/i)
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1]
    }
    return cleaned
  } catch {
    return input.trim()
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// Real-time LeetCode Profile GraphQL Scraper

app.get('/api/leetcode/*query', async (req, res) => {

  const rawQuery = Array.isArray(req.params.query)
    ? req.params.query.join('/')
    : req.params.query || '';

  const username = extractLeetCodeUsername(rawQuery);

  if (!username) {
    return res.status(400).json({
      error: 'Valid LeetCode username or profile link is required.'
    });
  }

  const query = {
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            ranking
            userAvatar
            reputation
            countryName
            aboutMe
            school
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
        }
        recentSubmissionList(username: $username) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `,
    variables: { username },
  }

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://leetcode.com/',
      },
      body: JSON.stringify(query),
    })

    if (!response.ok) {
      throw new Error(`LeetCode GraphQL responded with status ${response.status}`)
    }

    const text = await response.text()
    let json
    try {
      json = JSON.parse(text)
    } catch {
      throw new Error(`LeetCode returned non-JSON response (status ${response.status})`)
    }

    if (!json || !json.data || !json.data.matchedUser) {
      return res.status(404).json({
        error: `LeetCode user "${username}" was not found. Please double-check the username or link.`,
      })
    }

    const matched = json.data.matchedUser
    const profile = matched.profile || {}
    const acList = matched.submitStats?.acSubmissionNum || []
    const totalList = matched.submitStats?.totalSubmissionNum || []

    const getAcCount = (diff) => {
      const item = acList.find((x) => x.difficulty.toLowerCase() === diff.toLowerCase())
      return item ? item.count : 0
    }

    const getTotalSubmissions = (diff) => {
      const item = totalList.find((x) => x.difficulty.toLowerCase() === diff.toLowerCase())
      return item ? item.submissions : 0
    }

    const totalSolved = getAcCount('All')
    const easySolved = getAcCount('Easy')
    const mediumSolved = getAcCount('Medium')
    const hardSolved = getAcCount('Hard')
    const totalSubmissions = getTotalSubmissions('All')

    const contest = json.data.userContestRanking || null
    const contestRating = contest ? Math.round(contest.rating) : null
    const contestGlobalRanking = contest ? contest.globalRanking : null
    const contestAttended = contest ? contest.attendedContestsCount : 0
    const topPercentage = contest ? parseFloat(contest.topPercentage.toFixed(2)) : null

    const recentSubmissions = (json.data.recentSubmissionList || []).map((sub) => ({
      title: sub.title,
      titleSlug: sub.titleSlug,
      url: `https://leetcode.com/problems/${sub.titleSlug}/`,
      status: sub.statusDisplay === 'Accepted' ? 'Accepted' : sub.statusDisplay,
      language: sub.lang,
      timestamp: new Date(parseInt(sub.timestamp) * 1000).toISOString(),
    }))

    // Calculate accuracy
    const acceptanceRate = totalSubmissions > 0 ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1)) : 85.0

    // Dynamic readiness score (scale 0-100) based on real LeetCode stats
    const readinessScore = Math.min(
      99,
      Math.max(
        30,
        Math.round(
          35 +
            Math.min(easySolved, 100) * 0.15 +
            Math.min(mediumSolved, 150) * 0.25 +
            Math.min(hardSolved, 50) * 0.4 +
            (contestRating ? Math.max(0, contestRating - 1400) * 0.03 : 0)
        )
      )
    )

    const result = {
      username: matched.username,
      realName: profile.realName || matched.username,
      avatar: profile.userAvatar || 'https://assets.leetcode.com/users/default_avatar.jpg',
      ranking: profile.ranking || 0,
      reputation: profile.reputation || 0,
      school: profile.school || '',
      country: profile.countryName || '',
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalSubmissions,
      acceptanceRate,
      contestRating,
      contestGlobalRanking,
      contestAttended,
      topPercentage,
      recentSubmissions,
      readinessScore,
      profileUrl: `https://leetcode.com/u/${matched.username}/`,
      lastSynced: new Date().toISOString(),
    }

    return res.json(result)
  } catch (err) {
    console.error('LeetCode API error:', err)
    return res.status(500).json({
      error: 'Failed to fetch LeetCode data. Please verify the profile exists and try again.',
      details: err.message,
    })
  }
})

// Calculate exact upcoming recurring contest date in UTC
function getNextUtcDayOfWeek(targetDayOfWeek, targetUtcHour, targetUtcMinute) {
  const now = new Date()
  const currentDay = now.getUTCDay()
  let daysToAdd = (targetDayOfWeek - currentDay + 7) % 7

  const target = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + daysToAdd,
      targetUtcHour,
      targetUtcMinute,
      0,
      0
    )
  )

  // If already passed or within 10 minutes, schedule for next week
  if (target.getTime() <= now.getTime() + 10 * 60 * 1000) {
    target.setUTCDate(target.getUTCDate() + 7)
  }

  return target.toISOString()
}

// Real-time Contest Schedules endpoint with accurate UTC timestamps & Codeforces API
app.get('/api/contests', async (req, res) => {
  const contests = []

  // 1. Accurately timed recurring platform contests:
  // LeetCode Weekly: Sunday at 02:30 UTC = 8:00 AM IST
  const lcWeeklyTime = getNextUtcDayOfWeek(0, 2, 30)
  contests.push({
    id: 101,
    platform: 'LeetCode',
    platformShort: 'LC',
    name: 'Weekly Contest 438',
    startTime: lcWeeklyTime,
    duration: '1h 30m',
    durationSeconds: 5400,
    color: '#F9A93B',
    registered: false,
    status: 'upcoming',
    participants: 28400,
    url: 'https://leetcode.com/contest/',
    timezoneNote: 'Sunday 8:00 AM IST (02:30 UTC)',
  })

  // LeetCode Biweekly: Alternate Saturday at 14:30 UTC = 8:00 PM IST
  const lcBiweeklyTime = getNextUtcDayOfWeek(6, 14, 30)
  contests.push({
    id: 102,
    platform: 'LeetCode',
    platformShort: 'LC',
    name: 'Biweekly Contest 153',
    startTime: lcBiweeklyTime,
    duration: '1h 30m',
    durationSeconds: 5400,
    color: '#F9A93B',
    registered: true,
    status: 'upcoming',
    participants: 22600,
    url: 'https://leetcode.com/contest/',
    timezoneNote: 'Saturday 8:00 PM IST (14:30 UTC)',
  })

  // CodeChef Starters: Wednesday at 14:30 UTC = 8:00 PM IST
  const ccStartersTime = getNextUtcDayOfWeek(3, 14, 30)
  contests.push({
    id: 103,
    platform: 'CodeChef',
    platformShort: 'CC',
    name: 'Starters 176 (Div 1-4)',
    startTime: ccStartersTime,
    duration: '2h',
    durationSeconds: 7200,
    color: '#5B4638',
    registered: false,
    status: 'upcoming',
    participants: 14200,
    url: 'https://www.codechef.com/contests',
    timezoneNote: 'Wednesday 8:00 PM IST (14:30 UTC)',
  })

  // AtCoder Beginner Contest: Saturday at 12:00 UTC = 5:30 PM IST (21:00 JST)
  const abcTime = getNextUtcDayOfWeek(6, 12, 0)
  contests.push({
    id: 104,
    platform: 'AtCoder',
    platformShort: 'AC',
    name: 'AtCoder Beginner Contest 391',
    startTime: abcTime,
    duration: '1h 40m',
    durationSeconds: 6000,
    color: '#00C0EF',
    registered: false,
    status: 'upcoming',
    participants: 13900,
    url: 'https://atcoder.jp/contests/',
    timezoneNote: 'Saturday 5:30 PM IST (12:00 UTC / 21:00 JST)',
  })

  // 2. Fetch live Codeforces contests from official API
  try {
    const cfRes = await fetch('https://codeforces.com/api/contest.list?gym=false')
    if (cfRes.ok) {
      const cfData = await cfRes.json()
      if (cfData.status === 'OK' && Array.isArray(cfData.result)) {
        const upcomingCf = cfData.result
          .filter((c) => c.phase === 'BEFORE' || c.phase === 'CODING')
          .slice(-4) // latest 4 scheduled rounds
          .reverse()

        upcomingCf.forEach((c) => {
          const startTimeIso = new Date(c.startTimeSeconds * 1000).toISOString()
          const hours = Math.floor(c.durationSeconds / 3600)
          const mins = Math.floor((c.durationSeconds % 3600) / 60)
          const durationStr = `${hours}h${mins > 0 ? ` ${mins}m` : ''}`

          contests.push({
            id: 2000 + c.id,
            platform: 'Codeforces',
            platformShort: 'CF',
            name: c.name,
            startTime: startTimeIso,
            duration: durationStr,
            durationSeconds: c.durationSeconds,
            color: '#7B61FF',
            registered: false,
            status: c.phase === 'CODING' ? 'live' : 'upcoming',
            participants: 18500,
            url: `https://codeforces.com/contestRegistration/${c.id}`,
            timezoneNote: 'Official Codeforces Schedule',
          })
        })
      }
    }
  } catch (err) {
    console.warn('Could not reach Codeforces API, using default schedule fallback:', err.message)
    // Fallback Codeforces schedule
    const cfTime = getNextUtcDayOfWeek(5, 14, 35) // Friday 8:05 PM IST
    contests.push({
      id: 105,
      platform: 'Codeforces',
      platformShort: 'CF',
      name: 'Codeforces Round (Div. 2)',
      startTime: cfTime,
      duration: '2h 15m',
      durationSeconds: 8100,
      color: '#7B61FF',
      registered: false,
      status: 'upcoming',
      participants: 21500,
      url: 'https://codeforces.com/contests',
      timezoneNote: '8:05 PM IST (14:35 UTC)',
    })
  }

  // Sort strictly by start time
  contests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

  return res.json(contests)
})

// Student records endpoints
app.get('/api/students', async (req, res) => {
  try {
    const students = await db.all('SELECT * FROM students');
    students.forEach(s => s.verified = Boolean(s.verified));
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

app.post('/api/students', async (req, res) => {
  const { name, email, targetCompany, leetcodeUsername } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' })
  }

  try {
    const existing = await db.get('SELECT * FROM students WHERE email = ? COLLATE NOCASE', [email.trim()]);

    const studentObj = {
      id: existing ? existing.id : `student-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      targetCompany: targetCompany || 'Amazon',
      leetcodeUsername: leetcodeUsername ? extractLeetCodeUsername(leetcodeUsername) : '',
      score: existing ? existing.score : 80,
      streak: existing ? existing.streak : 1,
      totalSolved: existing ? existing.totalSolved : 0,
      easySolved: existing ? existing.easySolved : 0,
      mediumSolved: existing ? existing.mediumSolved : 0,
      hardSolved: existing ? existing.hardSolved : 0,
      ranking: existing ? existing.ranking : null,
      contestRating: existing ? existing.contestRating : null,
      verified: Boolean(leetcodeUsername),
      lastSynced: new Date().toISOString()
    };

    if (existing) {
      await db.run(`UPDATE students SET name=?, targetCompany=?, leetcodeUsername=?, verified=?, lastSynced=? WHERE id=?`,
        [studentObj.name, studentObj.targetCompany, studentObj.leetcodeUsername, studentObj.verified ? 1 : 0, studentObj.lastSynced, studentObj.id]);
    } else {
      await db.run(`INSERT INTO students (id, name, email, targetCompany, leetcodeUsername, score, streak, totalSolved, easySolved, mediumSolved, hardSolved, ranking, contestRating, verified, lastSynced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [studentObj.id, studentObj.name, studentObj.email, studentObj.targetCompany, studentObj.leetcodeUsername, studentObj.score, studentObj.streak, studentObj.totalSolved, studentObj.easySolved, studentObj.mediumSolved, studentObj.hardSolved, studentObj.ranking, studentObj.contestRating, studentObj.verified ? 1 : 0, studentObj.lastSynced]);
    }

    const updatedStudent = await db.get('SELECT * FROM students WHERE id = ?', [studentObj.id]);
    if (updatedStudent) updatedStudent.verified = Boolean(updatedStudent.verified);
    return res.json(updatedStudent || studentObj);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
})

// Sync student with LeetCode
app.post('/api/students/:id/sync-leetcode', async (req, res) => {
  const studentId = req.params.id
  const { leetcodeQuery } = req.body
  const username = extractLeetCodeUsername(leetcodeQuery)

  if (!username) {
    return res.status(400).json({ error: 'Username or profile link required' })
  }

  try {
    const student = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);

    // Fetch from LeetCode
    const lcRes = await fetch(`http://localhost:${PORT}/api/leetcode/${encodeURIComponent(username)}`)
    const lcText = await lcRes.text()
    let lcData = null
    try {
      lcData = lcText ? JSON.parse(lcText) : null
    } catch {}

    if (!lcRes.ok || !lcData) {
      return res.status(lcRes.status || 500).json(lcData || { error: 'Failed to fetch LeetCode data for student' })
    }

    if (student) {
      await db.run(`UPDATE students SET leetcodeUsername=?, totalSolved=?, easySolved=?, mediumSolved=?, hardSolved=?, score=?, ranking=?, contestRating=?, verified=?, lastSynced=? WHERE id=?`,
        [lcData.username, lcData.totalSolved, lcData.easySolved, lcData.mediumSolved, lcData.hardSolved, lcData.readinessScore, lcData.ranking, lcData.contestRating, 1, new Date().toISOString(), studentId]);
      
      const updatedStudent = await db.get('SELECT * FROM students WHERE id = ?', [studentId]);
      if (updatedStudent) updatedStudent.verified = Boolean(updatedStudent.verified);
      return res.json({ student: updatedStudent, leetcodeData: lcData });
    }

    return res.status(404).json({ error: 'Student not found' });
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`)
})
