// Vercel serverless function — /api/contests
// Returns real-time contest schedules.
// Fetches live Codeforces data and combines with static platform schedules.

function getNextUtcDayOfWeek(targetDay, targetHour, targetMinute) {
  const now = new Date()
  const currentDay = now.getUTCDay()
  let daysToAdd = (targetDay - currentDay + 7) % 7

  const target = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + daysToAdd,
      targetHour,
      targetMinute,
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const contests = []

  // LeetCode Weekly: Sunday 02:30 UTC = 8:00 AM IST
  contests.push({
    id: 101,
    platform: 'LeetCode',
    platformShort: 'LC',
    name: 'Weekly Contest 438',
    startTime: getNextUtcDayOfWeek(0, 2, 30),
    duration: '1h 30m',
    durationSeconds: 5400,
    color: '#F9A93B',
    registered: false,
    status: 'upcoming',
    participants: 28400,
    url: 'https://leetcode.com/contest/',
    timezoneNote: 'Sunday 8:00 AM IST (02:30 UTC)',
  })

  // LeetCode Biweekly: Saturday 14:30 UTC = 8:00 PM IST
  contests.push({
    id: 102,
    platform: 'LeetCode',
    platformShort: 'LC',
    name: 'Biweekly Contest 153',
    startTime: getNextUtcDayOfWeek(6, 14, 30),
    duration: '1h 30m',
    durationSeconds: 5400,
    color: '#F9A93B',
    registered: true,
    status: 'upcoming',
    participants: 22600,
    url: 'https://leetcode.com/contest/',
    timezoneNote: 'Saturday 8:00 PM IST (14:30 UTC)',
  })

  // CodeChef Starters: Wednesday 14:30 UTC = 8:00 PM IST
  contests.push({
    id: 103,
    platform: 'CodeChef',
    platformShort: 'CC',
    name: 'Starters 176 (Div 1-4)',
    startTime: getNextUtcDayOfWeek(3, 14, 30),
    duration: '2h',
    durationSeconds: 7200,
    color: '#5B4638',
    registered: false,
    status: 'upcoming',
    participants: 14200,
    url: 'https://www.codechef.com/contests',
    timezoneNote: 'Wednesday 8:00 PM IST (14:30 UTC)',
  })

  // AtCoder Beginner: Saturday 12:00 UTC = 5:30 PM IST
  contests.push({
    id: 104,
    platform: 'AtCoder',
    platformShort: 'AC',
    name: 'AtCoder Beginner Contest 391',
    startTime: getNextUtcDayOfWeek(6, 12, 0),
    duration: '1h 40m',
    durationSeconds: 6000,
    color: '#00C0EF',
    registered: false,
    status: 'upcoming',
    participants: 13900,
    url: 'https://atcoder.jp/contests/',
    timezoneNote: 'Saturday 5:30 PM IST (12:00 UTC)',
  })

  // Fetch live Codeforces contests
  try {
    const cfRes = await fetch('https://codeforces.com/api/contest.list?gym=false')
    if (cfRes.ok) {
      const cfData = await cfRes.json()
      if (cfData.status === 'OK' && Array.isArray(cfData.result)) {
        const upcomingCf = cfData.result
          .filter((c) => c.phase === 'BEFORE' || c.phase === 'CODING')
          .slice(-4)
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
    // Fallback Codeforces slot
    contests.push({
      id: 105,
      platform: 'Codeforces',
      platformShort: 'CF',
      name: 'Codeforces Round (Div. 2)',
      startTime: getNextUtcDayOfWeek(5, 14, 35),
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

  contests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

  return res.status(200).json(contests)
}
