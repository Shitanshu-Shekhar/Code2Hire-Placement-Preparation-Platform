# Code2Hire

Code2Hire is a placement-preparation command center: it uses coding history, target-company relevance, weaknesses, and available preparation time to recommend the most valuable next action.

## Current product slice

This repository starts with a fully responsive, interactive dashboard demo. It includes unified metrics, an explainable recommendation, topic intelligence, a readiness trend, adaptive task completion, a conflict-aware contest feed, and a what-if planning surface.

Run it locally:

```bash
npm install
npm run dev
```

## Architecture blueprint

```text
frontend (Vite + React + TypeScript)
  pages / components / data / services
          ↓ REST + Socket.IO
backend (Express + TypeScript)
  routes → controllers → services → repositories → MongoDB
                         ↓
             recommendation engine / platform adapters / BullMQ jobs
                         ↓
                    Redis cache + Socket.IO events
```

The next backend modules are intentionally separated by responsibility:

- `auth`: JWT access + rotating refresh token, bcrypt, verification/reset workflows
- `platforms`: `CodingPlatformAdapter` implementations with API-safe mock fallbacks
- `analytics`: topic-performance, contest-performance, and readiness calculation
- `recommendations`: a weighted, explainable scoring service
- `contests`, `study-plan`, `mocks`, `interview`, `profiles`, and `admin`

## Core API contract

All API responses should use `{ success: true, data }` or `{ success: false, error: { code, message } }`.

Initial endpoints:

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`
- `GET /api/dashboard`, `GET /api/recommendations`, `GET /api/recommendations/today`
- `POST /api/platforms/connect`, `POST /api/platforms/sync`, `GET /api/platforms/stats`
- `GET /api/contests`, `GET /api/analytics/topics`, `GET /api/readiness`
- `POST /api/study-plan`, `GET /api/study-plan/today`

## Recommendation model

Every recommendation is ranked and returned with human-readable reasons:

```text
score = companyRelevance × 0.30
      + weakness × 0.25
      + recentFailure × 0.20
      + difficultyMatch × 0.15
      + topicFrequency × 0.10
```

The preparation score is an internal progress metric and must never claim to predict hiring probability.

## Data model

MongoDB collections: `users`, `codingProfiles`, `platformStats`, `contests`, `contestParticipations`, `problems`, `problemAttempts`, `companies`, `companyProblems`, `topics`, `topicPerformances`, `studyPlans`, `studyTasks`, `mockAssessments`, `mockQuestions`, `mockSubmissions`, `interviewSessions`, `notifications`, `achievements`, and `publicProfiles`.

Critical indexes: `users.email`, `{ codingProfile.platform, username }`, `contests.startTime`, `problems.company`, `problems.topic`, `problems.difficulty`, and `{ problemAttempt.userId, problemId }`.
