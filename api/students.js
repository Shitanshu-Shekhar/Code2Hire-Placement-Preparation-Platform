// Vercel serverless function — /api/students
// Note: SQLite cannot run on Vercel's serverless runtime (no native binaries).
// Student data is persisted in the browser via localStorage (UserContext.tsx).
// This endpoint exists so the frontend fetch calls don't 404.

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    // Return empty array — UI falls back to localStorage data
    return res.status(200).json([])
  }

  if (req.method === 'POST') {
    // Echo back a synthetic student object so the UI doesn't break
    const { name, email, targetCompany, leetcodeUsername } = req.body || {}
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' })
    }
    const student = {
      id: `student-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      targetCompany: targetCompany || 'Amazon',
      leetcodeUsername: leetcodeUsername || '',
      score: 80,
      streak: 1,
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      ranking: null,
      contestRating: null,
      verified: Boolean(leetcodeUsername),
      lastSynced: new Date().toISOString(),
    }
    return res.status(200).json(student)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
