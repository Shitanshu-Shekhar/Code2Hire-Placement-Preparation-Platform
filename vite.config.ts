import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function leetcodeDevPlugin(): Plugin {
  return {
    name: 'leetcode-dev-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/leetcode')) {
          return next()
        }

        const rawParam = req.url.replace(/^\/api\/leetcode\/?/, '')
        let username = ''
        try {
          let cleaned = decodeURIComponent(rawParam).trim().replace(/\/+$/, '')
          const match = cleaned.match(/(?:leetcode\.com\/(?:u\/)?|@)?([a-zA-Z0-9_\-]+)$/i)
          username = match && match[1] ? match[1] : cleaned
        } catch {
          username = rawParam.trim()
        }

        if (!username) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Valid LeetCode username or profile link is required.' }))
          return
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
          const lcResponse = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Referer': 'https://leetcode.com/',
            },
            body: JSON.stringify(query),
          })

          const text = await lcResponse.text()
          let json: any = null
          try {
            json = JSON.parse(text)
          } catch {}

          if (!lcResponse.ok || !json?.data?.matchedUser) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: `LeetCode user "${username}" was not found. Please double-check the username or link.` }))
            return
          }

          const matched = json.data.matchedUser
          const profile = matched.profile || {}
          const acList = matched.submitStats?.acSubmissionNum || []
          const totalList = matched.submitStats?.totalSubmissionNum || []

          const getAcCount = (diff: string) => {
            const item = acList.find((x: any) => x.difficulty.toLowerCase() === diff.toLowerCase())
            return item ? item.count : 0
          }

          const getTotalSubmissions = (diff: string) => {
            const item = totalList.find((x: any) => x.difficulty.toLowerCase() === diff.toLowerCase())
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

          const recentSubmissions = (json.data.recentSubmissionList || []).map((sub: any) => ({
            title: sub.title,
            titleSlug: sub.titleSlug,
            url: `https://leetcode.com/problems/${sub.titleSlug}/`,
            status: sub.statusDisplay === 'Accepted' ? 'Accepted' : sub.statusDisplay,
            language: sub.lang,
            timestamp: new Date(parseInt(sub.timestamp) * 1000).toISOString(),
          }))

          const acceptanceRate = totalSubmissions > 0 ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1)) : 85.0

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

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err: any) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Failed to fetch LeetCode data.', details: err.message }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), leetcodeDevPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
