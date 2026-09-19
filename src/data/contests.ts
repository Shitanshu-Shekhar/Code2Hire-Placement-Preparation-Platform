export interface Contest {
  id: number
  platform: string
  platformShort: string
  name: string
  startTime: string // ISO UTC date string
  duration: string
  color: string
  registered: boolean
  status: 'upcoming' | 'live' | 'ended'
  participants: number
  url: string
  timezoneNote?: string
}

// Precise UTC schedule generation matching actual platform contest times
function getNextUtcSchedule(dayOfWeek: number, utcHour: number, utcMinute: number): string {
  const now = new Date()
  const currentDay = now.getUTCDay()
  let daysToAdd = (dayOfWeek - currentDay + 7) % 7

  const target = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + daysToAdd,
      utcHour,
      utcMinute,
      0,
      0
    )
  )

  // If already passed or within 10 minutes, schedule for next occurrence
  if (target.getTime() <= now.getTime() + 10 * 60 * 1000) {
    target.setUTCDate(target.getUTCDate() + 7)
  }

  return target.toISOString()
}

export function generateContests(): Contest[] {
  return ([
    {
      id: 1,
      platform: 'LeetCode',
      platformShort: 'LC',
      name: 'Weekly Contest 438',
      // Sunday 8:00 AM IST = 02:30 UTC
      startTime: getNextUtcSchedule(0, 2, 30),
      duration: '1h 30m',
      color: '#F9A93B',
      registered: true,
      status: 'upcoming',
      participants: 28420,
      url: 'https://leetcode.com/contest/',
      timezoneNote: 'Sunday 8:00 AM IST (02:30 UTC)',
    },
    {
      id: 2,
      platform: 'AtCoder',
      platformShort: 'AC',
      name: 'AtCoder Beginner Contest 391',
      // Saturday 5:30 PM IST = 12:00 UTC (21:00 JST)
      startTime: getNextUtcSchedule(6, 12, 0),
      duration: '1h 40m',
      color: '#00C0EF',
      registered: false,
      status: 'upcoming',
      participants: 13900,
      url: 'https://atcoder.jp/contests/',
      timezoneNote: 'Saturday 5:30 PM IST (12:00 UTC)',
    },
    {
      id: 3,
      platform: 'LeetCode',
      platformShort: 'LC',
      name: 'Biweekly Contest 153',
      // Saturday 8:00 PM IST = 14:30 UTC
      startTime: getNextUtcSchedule(6, 14, 30),
      duration: '1h 30m',
      color: '#F9A93B',
      registered: false,
      status: 'upcoming',
      participants: 22400,
      url: 'https://leetcode.com/contest/',
      timezoneNote: 'Saturday 8:00 PM IST (14:30 UTC)',
    },
    {
      id: 4,
      platform: 'Codeforces',
      platformShort: 'CF',
      name: 'Codeforces Round #1021 (Div. 2)',
      // Friday 8:05 PM IST = 14:35 UTC
      startTime: getNextUtcSchedule(5, 14, 35),
      duration: '2h 15m',
      color: '#7B61FF',
      registered: true,
      status: 'upcoming',
      participants: 21100,
      url: 'https://codeforces.com/contests',
      timezoneNote: 'Friday 8:05 PM IST (14:35 UTC)',
    },
    {
      id: 5,
      platform: 'CodeChef',
      platformShort: 'CC',
      name: 'Starters 176 (Div 1-4)',
      // Wednesday 8:00 PM IST = 14:30 UTC
      startTime: getNextUtcSchedule(3, 14, 30),
      duration: '2h',
      color: '#5B4638',
      registered: false,
      status: 'upcoming',
      participants: 14250,
      url: 'https://www.codechef.com/contests',
      timezoneNote: 'Wednesday 8:00 PM IST (14:30 UTC)',
    },
    {
      id: 6,
      platform: 'Codeforces',
      platformShort: 'CF',
      name: 'Educational Codeforces Round 183',
      // Next Monday 8:05 PM IST = 14:35 UTC
      startTime: getNextUtcSchedule(1, 14, 35),
      duration: '2h',
      color: '#7B61FF',
      registered: false,
      status: 'upcoming',
      participants: 24300,
      url: 'https://codeforces.com/contests',
      timezoneNote: 'Monday 8:05 PM IST (14:35 UTC)',
    },
  ] as Contest[]).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
}

export const contests: Contest[] = generateContests()

export async function fetchLiveContests(): Promise<Contest[]> {
  try {
    const res = await fetch('/api/contests')
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        return data
      }
    }
  } catch (err) {
    console.warn('Using fallback contests schedule:', err)
  }
  return generateContests()
}

export function formatContestDateTime(isoString: string): string {
  try {
    const d = new Date(isoString)
    // Format date in user's locale with IST/local time specification
    const dateFormatted = d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    const timeFormatted = d.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    
    // Check timezone offset: if IST (+05:30), label as IST
    const isIST = d.getTimezoneOffset() === -330
    const tzLabel = isIST ? 'IST' : Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]?.replace('_', ' ') || 'Local'

    return `${dateFormatted} · ${timeFormatted} ${tzLabel}`
  } catch {
    return isoString
  }
}

export function formatContestRelative(isoString: string): string {
  const diff = new Date(isoString).getTime() - Date.now()
  if (diff <= 0) return 'Live now'
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days >= 2) return `In ${days} days`
  if (days === 1) return `Tomorrow`
  if (hours > 0) return `In ${hours}h ${minutes}m`
  return `In ${minutes}m`
}

export function getTimeRemaining(targetDate: string) {
  const total = new Date(targetDate).getTime() - Date.now()
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { total, days, hours, minutes, seconds }
}
