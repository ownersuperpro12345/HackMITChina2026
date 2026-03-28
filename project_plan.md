# StellaScholars — Project Plan

## 1. Project Description
StellaScholars is a gamified GCSE revision platform targeted at UK secondary school students (ages 14-16). It transforms exam preparation into an engaging space-themed adventure where students earn XP, level through planets, compete in monthly leagues, and track study progress. The platform covers all major GCSE subjects with lessons, quizzes, flashcards, and AI-analysed essay practice.

**Target Users:** GCSE students (Y10-Y11), parents monitoring progress  
**Core Value:** Make revision feel like a game — motivating, competitive, and rewarding

## 2. Page Structure
- `/` — Homepage (landing/marketing page)
- `/dashboard` — Student dashboard (overview, stats, suggestions)
- `/subjects` — All GCSE subjects grid
- `/subjects/:subjectId` — Subject detail with topics list
- `/subjects/:subjectId/:topicId` — Topic overview
- `/lesson/:lessonId` — Lesson content page
- `/quiz/:quizId` — Quiz page (multi-type questions)
- `/essay/:essayId` — Essay practice + AI analysis
- `/flashcards/:setId` — Flashcard revision game
- `/leaderboard` — Weekly/Monthly/All-time leaderboards + Leagues
- `/achievements` — Achievements & badges collection
- `/profile` — Profile, stats, settings, parent email

## 3. Core Features
- [x] Subject & topic browsing with filters
- [x] Lesson content pages
- [x] Multi-type quiz system (MCQ, short answer, multi-step, essay)
- [x] Points system by question type
- [x] AI essay analysis (mock UI — real AI via backend later)
- [x] Flashcard revision game with spaced repetition UI
- [x] XP & planet rank progression (Mercury → Galaxy)
- [x] Monthly league system (Small Planets → Cosmic Titans)
- [x] Weekly/Monthly/All-time leaderboards
- [x] Achievements & badge system
- [x] Study time tracking (weekly & monthly)
- [x] Parent email settings section
- [x] Student dashboard with stats & suggestions

## 4. Data Model Design
(To be backed by Supabase in future phases)

### users
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| username | text | Display name |
| email | text | Login email |
| xp | integer | Total XP earned |
| planet_rank | text | Current planet level |
| league | text | Current monthly league |
| streak_days | integer | Current daily streak |
| study_time_week | integer | Minutes studied this week |
| study_time_month | integer | Minutes studied this month |
| parent_email | text | Optional parent email |
| created_at | timestamp | Registration date |

### subject_progress
| Field | Type | Description |
|-------|------|-------------|
| user_id | uuid | FK to users |
| subject_id | text | Subject slug |
| topics_completed | integer | Count of mastered topics |
| total_topics | integer | Total topics in subject |
| last_studied | timestamp | Last activity date |

### question_attempts
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to users |
| question_id | text | Question reference |
| score | integer | Points earned |
| type | text | MCQ / short / multistep / essay |
| attempted_at | timestamp | When answered |

### achievements
| Field | Type | Description |
|-------|------|-------------|
| id | text | Achievement slug |
| user_id | uuid | FK to users |
| unlocked_at | timestamp | When earned |

## 5. Backend / Third-party Integration Plan
- **Supabase:** Needed for user auth, database (progress, scores, achievements), storage
- **AI / OpenAI:** Edge function for essay analysis and feedback scoring
- **Email (Resend/SendGrid):** Weekly parent summary emails + achievement notifications
- **Stripe:** Not needed for initial phases
- **Shopify:** Not needed

## 6. Development Phase Plan

### Phase 1: Full UI Concept (Current)
- Goal: Build complete visual UI for all pages with mock data
- Deliverable: All 12 pages fully designed and navigable

### Phase 2: Supabase Auth & User Accounts
- Goal: Real login/signup, user profiles saved to DB
- Deliverable: Working authentication flow

### Phase 3: Real Subject Data & Progress Tracking
- Goal: Save quiz scores, study time, XP to Supabase
- Deliverable: Persistent progress across sessions

### Phase 4: AI Essay Analysis
- Goal: Connect essay endpoint to OpenAI via Edge Function
- Deliverable: Real AI feedback on submitted essays

### Phase 5: Email Notifications
- Goal: Weekly parent emails, achievement alerts
- Deliverable: Automated email system via Edge Function + cron
