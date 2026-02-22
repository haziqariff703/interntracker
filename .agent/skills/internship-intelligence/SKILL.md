---
name: internship-intelligence
description: Production-grade rules and BMAD operating standards for the Internship Intelligence Platform.
---

# Internship Intelligence Platform — Skills & BMAD Operating Rules

---

# SYSTEM IDENTITY

This is a production-grade Internship Intelligence Platform built with:

- Next.js (App Router)
- PostgreSQL (Neon DB)
- UUID primary keys
- ENUM types
- JSONB (AI analysis)
- ARRAY (skills matching)
- Full-text search (GIN)
- TIMESTAMPTZ everywhere

This system must scale into a SaaS-ready product.

Never generate beginner-level architecture.

---

# BMAD METHOD INTEGRATION

This project follows BMAD:

B — Build with intention  
M — Measure everything  
A — Automate intelligently  
D — Design for durability

All code, schema, and logic must respect these principles.

---

# B — BUILD WITH INTENTION

Before generating code:

1. Define purpose of the feature.
2. Define expected inputs.
3. Define expected outputs.
4. Define edge cases.
5. Validate against database constraints.

Every feature must connect to:

- Applications
- AI matching
- Analytics
- Skill intelligence
- Long-term scalability

---

# M — MEASURE EVERYTHING

All important actions must be measurable.

Applications must track:

- time_to_response (INTERVAL)
- status progression
- interview dates
- salary offers
- ai_match_score
- confidence_score

The system must support analytics such as:

- Average response time
- Conversion rate to interview
- Offer rate
- Skill demand frequency

---

# A — AUTOMATE INTELLIGENTLY

Automation rules:

- Status change → must log history
- AI analysis → must store JSONB result
- Updated rows → must auto-update timestamp
- Search → must use tsvector + GIN
- Skill matching → must use ARRAY intersection

AI must:

- Generate resume feedback
- Suggest keywords
- Calculate compatibility
- Store structured results in JSONB

---

# D — DESIGN FOR DURABILITY

Design must support:

- Multi-user SaaS
- Recruiter dashboard
- Analytics engine
- Recommendation engine
- Geographic filtering
- Subscription model

Schema must:

- Use UUID
- Use ENUM for status
- Use constraints
- Use foreign keys
- Use ON DELETE rules
- Use indexes for performance

---

# DATABASE STANDARDS

## Primary Keys

UUID only.

## Status

Must use ENUM application_status.

## Skills

TEXT[] only.
Matching must use intersection logic.

## AI Data

JSONB only.
Never replace relational tables with JSON.

## Search

Must use:

- tsvector
- GIN index

## Time

Always use TIMESTAMPTZ.

## Monetary Values

NUMERIC(10,2).

## Email

CITEXT.

---

# APPLICATION LOGIC RULES

Application updates must:

1. Update current_status.
2. Insert into application_status_history.
3. Update updated_at automatically.

---

# PERFORMANCE DISCIPLINE

Always index:

- Foreign keys
- Search columns
- Frequently filtered fields

Avoid N+1 queries and large unpaginated results.

---

# SECURITY RULES

- Users can only access their own data.
- No raw SQL in frontend.
- Password must be hashed.
- Validate all inputs server-side.
- Prepare for row-level security.

---

# CODE STRUCTURE RULES

- Separate UI from business logic.
- Create service layer for database access.
- Avoid monolithic components.
- Prefer small modular files.

---

# VIBE CODING PROTOCOL

When generating code:

- Think like a senior backend engineer.
- Assume production deployment.
- Validate edge cases.
- Respect schema integrity.
- Refactor if design is weak.

---

# QUALITY GATE

Before outputting code, verify:

1. Is it scalable?
2. Is it measurable?
3. Is it automated?
4. Is it durable?
5. Does it respect BMAD?

---

# SYSTEM OBJECTIVE

This is an Internship Intelligence Platform designed to evolve into a startup-level system.
All generated output must reflect that level.
