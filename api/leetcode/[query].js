// Vercel serverless function — /api/leetcode/[query]
// Proxies LeetCode's GraphQL API to avoid CORS issues from the browser.
// Path: /api/leetcode/<username-or-url>

function extractLeetCodeUsername(input) {
  if (!input || typeof input !== 'string') return ''
  try {
    let cleaned = decodeURIComponent(input).trim().replace(/\/+$/, '')
    const urlMatch = cleaned.match(/(?:leetcode\.com\/(?:u\/)?|@)?([a-zA-Z0-9_\-]+)$/i)
    if (urlMatch && urlMatch[1]) return urlMatch[1]
    return cleaned
  } catch {
    return input.trim()
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Extract username from query param (Vercel passes [query] as req.query.query)
  const rawQuery = Array.isArray(req.query.query)
    ? req.query.query.join('/')
    : req.query.query || ''

  const username = extractLeetCodeUsername(rawQuery)

  if (!username) {
    return res.status(400).json({
      error: 'Valid LeetCode username or profile link is required.',
    })
  }

  const graphqlQuery = {
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
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Referer: 'https://leetcode.com/',
      },
      body: JSON.stringify(graphqlQuery),
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

    const acceptanceRate =
      totalSubmissions > 0
        ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1))
        : 85.0

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

    return res.status(200).json({
      username: matched.username,
      realName: profile.realName || matched.username,
      avatar:
        profile.userAvatar || 'https://assets.leetcode.com/users/default_avatar.jpg',
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
    })
  } catch (err) {
    console.error('LeetCode API error:', err)
    return res.status(500).json({
      error: 'Failed to fetch LeetCode data. Please verify the profile exists and try again.',
      details: err.message,
    })
  }
}
