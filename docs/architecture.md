# Internship Tracker System

## System Architecture Documentation

**Version:** v1.0  
**Last Updated:** February 2026

---

# 1. System Overview

The Internship Tracker System is a cloud-based web application designed to help students manage internship applications, track skill development, and receive AI-powered career insights.

The system follows a modern **3-Tier Client–Server Architecture** enhanced with Backend-as-a-Service (BaaS) and a Hybrid AI Analytics Layer.

The architecture is designed to be:

- Modular
- Scalable for early-stage growth
- Secure by design
- Maintainable
- Extendable to SaaS-level deployment

---

# 2. Architectural Style

## 2.1 Architecture Pattern

The system adopts:

- Client–Server Architecture
- 3-Tier Separation (Presentation, Application, Data)
- Serverless Backend Model
- Hybrid AI Processing Model

---

# 3. High-Level Architecture

## 3.1 Presentation Layer

**Framework:** Next.js  
**Hosting:** Vercel

### Responsibilities

- UI rendering
- Dashboard visualization
- Internship form submission
- Authentication redirection
- Displaying AI insights
- Managing session state

The frontend communicates securely with backend API routes over HTTPS.

---

## 3.2 Application Layer

The application layer consists of two components:

### A. Serverless API Layer

Implemented using Next.js API Routes.

Responsibilities:

- Business logic processing
- Internship CRUD operations
- Skill analysis logic
- Deterministic scoring engine
- AI request orchestration
- Secure environment variable handling

---

### B. Serverless Database Layer

**Platform:** Neon DB

Responsibilities:

- Managed PostgreSQL hosting
- Serverless auto-scaling
- Connection pooling (via Prisma)
- Data persistence

**Authentication:** [NextAuth.js](https://next-auth.js.org/) (integrated in Next.js Serverless API layer)

This model ensures low latency and high performance for database operations while leveraging serverless scaling.

---

## 3.3 Data Layer

**Database:** PostgreSQL (Managed by Neon DB)
**ORM:** Prisma

### Core Tables

- users
- internships
- applications
- skills
- activity_logs
- analytics_cache

### Data Access Model

- **ORM Integration:** Prisma Client for type-safe database queries.
- **Server-Side Only:** Database is only accessible via serverless API routes.
- **Data Isolation:** User-scoped data filtering handled via application logic and Prisma queries.
- **Connection Pooling:** Leveraging Neon's serverless connection pooling for efficient API route handling.

---

# 4. External Service Integrations

The system integrates with:

- Google OAuth
- GitHub OAuth
- Gemini 1.5 (AI Analytics)
- Resend (Email Notifications)

All API keys are stored securely using environment variables and are never exposed to the client.

---

# 5. Hybrid AI Analytics Architecture

The system implements a **Hybrid Intelligence Model**, combining deterministic backend logic with AI interpretation.

This ensures reliability, explainability, and structured analytics.

---

## 5.1 Layer 1 – Deterministic Scoring Engine

Before invoking AI, the backend computes structured metrics such as:

- Skill Match Percentage
- Internship Readiness Score
- Application Success Rate
- Missing Core Skills

Example logic:

```js
matchScore = (matchedSkills / requiredSkills) * 100;
```

This ensures:

- Mathematical consistency
- Transparent scoring
- Reduced hallucination risk

---

## 5.2 Layer 2 – AI Interpretation Layer

After structured scoring, summarized data is sent to Gemini 1.5 for contextual interpretation.

Example structured input:

```json
{
  "skill_match": 72,
  "missing_skills": ["TypeScript", "REST API Design"],
  "application_success_rate": 45,
  "target_role": "Fullstack Intern"
}
```

AI Responsibilities:

- Interpret quantitative results
- Provide strategic advice
- Offer actionable improvement steps
- Deliver motivational coaching tone
- Return structured JSON response

This architecture ensures:

- Explainable AI outputs
- Controlled formatting
- Consistent user experience

---

# 6. System Data Flow

## 6.1 Standard Data Flow

1. User submits internship data
2. Frontend sends request to API route
3. API validates input and checks session (NextAuth)
4. API communicates with Neon DB via Prisma
5. Database returns response
6. UI updates dynamically

---

## 6.2 AI Analytics Flow

```
User
 ↓
Frontend Dashboard
 ↓
API Route
 ↓
Deterministic Scoring Engine
 ↓
Gemini 1.5 AI Interpretation
 ↓
Response Formatter
 ↓
Dashboard Visualization
```

AI output may be cached in `analytics_cache` to reduce repeated API calls and improve performance.

---

# 7. Security Considerations

- HTTPS enforced communication
- Server-side AI invocation
- Environment variable isolation
- Authentication via NextAuth (Server-side validation)
- Database access restricted to Serverless API layer via Prisma

---

# 8. Scalability Considerations

Although currently positioned as a portfolio project, the architecture supports early-stage SaaS growth:

- Serverless auto-scaling via Vercel
- Managed serverless database scaling via Neon
- Modular AI layer (replaceable model)
- Caching strategy for analytics
- Connection pooling for high-concurrency handling

---

# 9. Deployment Architecture

| Layer    | Platform          |
| -------- | ----------------- |
| Frontend | Vercel            |
| API      | Vercel Serverless |
| Database | Neon DB           |
| AI       | Gemini 1.5        |
| Email    | Resend            |

All services are cloud-managed to minimize infrastructure overhead.

---

# 10. Architecture Evolution Strategy

The system architecture is version-controlled and designed to evolve.

Potential future upgrades:

- Background job queue for heavy AI processing
- Redis caching layer
- AI model abstraction layer
- Usage analytics dashboard
- Multi-tenant SaaS configuration

All architectural changes will increment the version number and update documentation accordingly.

---

# 11. Design Philosophy

The Internship Tracker System is built under the following principles:

- AI enhances logic, not replaces it
- Deterministic computation before probabilistic interpretation
- Security by default
- Modular third-party integration
- Clear separation of concerns
