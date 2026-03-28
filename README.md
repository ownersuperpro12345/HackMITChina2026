# StellaScholars

Nobody actually enjoys revision. That's kind of the whole problem. StellaScholars is our attempt to fix that — it's a GCSE revision app that's built to feel more like a game than a chore. You earn XP, you level up through planets, you compete against other students in monthly leagues, and you get your essays marked by AI at 2am when no tutor is available. Oh, and it's completely free.

> Built for UK students in Years 10 and 11. Currently in Phase 1 — the full app is live with all pages working on mock data. Real accounts and persistent progress are coming next.

---

## Why we built this

Here's the honest version: most revision apps are boring. They either feel like a slightly better textbook or they're so gamified that there's no actual learning happening. We wanted something in the middle — real GCSE content, properly structured, but wrapped in a progression system that gives students a reason to come back tomorrow.

The planet rank system (Moon all the way up to Black Hole) means there's always a next goal. The monthly leagues mean there's always someone to beat. The streak counter means missing a day actually stings a little. And the AI essay marking means you don't have to wait until your teacher gets around to reading your work.

We also added a parent email feature because one of the biggest sources of revision stress is parents asking "have you been studying?" — now they get a weekly summary and everyone can relax.

---

## What it does

**The learning side**

Every major GCSE subject is in there, broken down into topics and subtopics. Each subtopic has a lesson page with explanations, worked examples, and a practice question. If we don't have static content for something yet, the app generates a full lesson on the fly using AI. There's also a past papers browser so students can practice with real exam questions.

**Quizzes**

Four question types: multiple choice, short answer, multi-step problems, and full essay questions. Each type earns a different amount of XP so harder questions are worth more. There's also a timed mock exam mode for when students want to simulate the real thing.

**AI essay marking**

This one's genuinely useful. You type your essay answer, hit submit, and within a few seconds you get a mark out of the maximum, two or three sentences of examiner-style feedback, and a list of specific things to improve. It uses the DeepSeek API under the hood and it's actually pretty good at mimicking how a GCSE marker thinks.

**Flashcards**

A spaced repetition flashcard game that tracks which cards you keep getting wrong and surfaces them more often. Nothing revolutionary, but it works.

**The game layer**

Every action earns XP. XP determines your planet rank — you start at Moon and work your way through Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Sun, Red Giant, and finally Black Hole. Separately, monthly study points feed into a league system with six tiers from Small Planets up to Cosmic Titans. Leagues reset every month so there's always a fresh competition. There are also achievements you unlock for things like hitting streaks, completing subjects, or getting perfect quiz scores.

**Dashboard and profile**

Your dashboard shows your weekly study time, recent activity, subject progress, and topics the app thinks you should work on next. Your profile page has all your stats, a notification settings section, and a field to add a parent email for weekly summaries.

---

## Getting it running

You don't need to be a developer to run this locally, but you do need to install one thing first.

**Step 1 — Install Node.js**

Node.js is what lets your computer run the app. Download it from [nodejs.org](https://nodejs.org/en/download) — click the big **LTS** button (that's the stable version) and run the installer. If it asks you anything during setup, just click Next/Continue through everything.

To check it worked, open Terminal (Mac) or Command Prompt (Windows) and type:

```bash
node -v
```

If you see a version number like `v20.x.x`, you're good.

**Step 2 — Download the project**

Download this repo as a ZIP by clicking the green **Code** button at the top of this page, then **Download ZIP**. Unzip it somewhere on your computer — your Desktop is fine.

**Step 3 — Open a terminal in the project folder**

- **Mac:** Right-click the unzipped folder → "New Terminal at Folder"
- **Windows:** Open the folder, click the address bar at the top, type `cmd`, and press Enter

**Step 4 — Install the project's packages**

In the terminal, paste this and press Enter:

```bash
npm install
```

This downloads everything the app needs. It might take a minute — that's normal.

**Step 5 — Start the app**

```bash
npm run dev
```

Then open your browser and go to **http://localhost:3000** — the app will be there. Sign up with any username and password to get started.

To stop the app, go back to the terminal and press `Ctrl + C`.

---

> **AI essay marking** works straight away — no setup needed. If you want to use your own DeepSeek API key instead of the default one, you can add it from your profile page inside the app.

---

## Project structure

```
index.html - the main html
README.md - description and information
```

---

## Routes

| URL | What's there |
|---|---|
| `/` | Landing page |
| `/login` | Login |
| `/signup` | Sign up |
| `/onboarding` | Pick your qualification and subjects (required on first login) |
| `/dashboard` | Your personal study hub |
| `/subjects` | All GCSE subjects |
| `/subjects/:subjectId` | Topics within a subject |
| `/subjects/:subjectId/:topicId` | Subtopics within a topic |
| `/lesson/:lessonId` | Lesson content |
| `/quiz/:quizId` | Quiz |
| `/essay/:essayId` | Essay practice with AI marking |
| `/flashcards/:setId` | Flashcard game |
| `/mock-exam` | Timed mock exam |
| `/past-papers` | Past paper browser |
| `/achievements` | Your badge collection |
| `/profile` | Stats, settings, parent email |

---

## Dependencies

## What's coming next

| Phase | What we're building | Where it's at |
|---|---|---|
| Phase 1 — UI | Everything you see now, running on mock data | ✅ Done |
| Phase 2 — Real accounts | Supabase auth, real login/signup, profiles in a database | Up next |
| Phase 3 — Real progress | Quiz scores, XP, and study time saved properly and synced | Planned |
| Phase 4 — Better AI | Essay marking via OpenAI through a Supabase Edge Function | Planned |
| Phase 5 — Emails | Weekly parent reports and achievement notifications | Planned |

---

## License

Private. Not open for redistribution.
