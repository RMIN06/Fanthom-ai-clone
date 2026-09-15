# 00 — Overview & Strategy
### Product spec for an AI meeting-notetaker (Fathom-class), written to brief a design/dev AI agent

> Feed this whole folder (00–05) to Claude Code / Cursor / v0 as project context before generating screens or components. Each file is self-contained but they're meant to be read together.

---

## 1. What we're building

An AI meeting notetaker that joins or listens to video calls (Zoom / Google Meet / Teams), produces a live transcript, generates an AI summary + action items after the call, and lets the user search/ask questions across all their past meetings. Same category as Fathom, Otter, Fireflies, Granola, Read AI.

**This is an MVP.** Ruthlessly cut scope to the loop that proves value in one sitting: *record → transcribe → summarize → share*. Everything else (CRM sync, scorecards, team analytics) is phase 2+.

**Non-negotiable constraint:** this is a *competitor*, not a copy. Do not reuse Fathom's copywriting, illustrations, logo, or literal asset files. Everything in files 01–05 describes an **original visual language inspired by the category conventions** (rounded SaaS-dashboard aesthetic, dark hero, purple/violet AI accent) — not extracted Fathom brand assets. Treat every hex/font/copy line as a starting point for your own brand, not a pixel-for-pixel trace.

---

## 2. Target user & core promise

- **User:** knowledge workers who live in back-to-back calls (sales, CS, PMs, founders) and hate manual note-taking.
- **Promise:** "Show up to the call. We'll handle the notes." Trust hinges on two things: transcript accuracy and summary quality — nail those before anything else.

## 3. MVP feature scope (build in this order)

| Priority | Feature | Notes |
|---|---|---|
| P0 | Auth (email + Google OAuth) | Google OAuth matters — most users connect Google Meet/Calendar immediately |
| P0 | Calendar connect + auto-join toggle per meeting | This is the "magic" moment |
| P0 | Recording bot OR browser-tab capture | Bot-based is easier for MVP (join via meeting URL); no-bot capture is a stronger differentiator but harder — see §5 |
| P0 | Live transcript (speaker-separated) | Even a slight delay is fine for MVP; real-time isn't required day 1 |
| P0 | Post-call AI summary (TL;DR + key points + action items) | This is the retention driver |
| P0 | Meeting library (searchable list of past calls) | Table/grid view, filters by date/participant |
| P0 | Meeting detail page (video/audio + transcript + summary side-by-side) | The core "product" screen — see 04 |
| P0 | Share link / clip / export | Shareable summary link is a major viral loop for Fathom — copy the mechanic, not the design |
| P1 | "Ask" — chat over one meeting or across all meetings (RAG) | This is Fathom's "Ask Fathom" — strong differentiator vs. older tools |
| P1 | Slack / Notion webhook or Zapier | Pick one integration to nail, not six shallow ones |
| P2 | Team workspace, shared meeting feed | Only after solo product is solid |
| P2 | CRM auto-fill (HubSpot/Salesforce) | High value, high effort — later |
| P2 | AI coaching / talk-time scorecards | Nice-to-have, not MVP |

## 4. Screen inventory (see 04 for full layout specs)

1. Marketing landing page
2. Sign up / log in
3. Onboarding (connect calendar + calendar/meeting platform permissions)
4. Dashboard / meeting library (default view after login)
5. Meeting detail (transcript + summary + video)
6. Ask / search (global search + chat-with-your-meetings)
7. Settings (account, integrations, recording preferences)
8. Pricing page
9. Shared/public meeting summary view (the link non-users see)

## 5. How to genuinely be *better* than Fathom, not just cheaper

Pick 1–2 of these as your wedge — don't try all of them for an MVP:

- **Faster time-to-summary.** Fathom's summary lands right after the call ends; if you can beat that latency (streaming summary that finalizes within ~10–15s of call end) that's a felt difference.
- **Better "Ask" UX.** Most competitors bolt on a chat box. Make cross-meeting search feel like a real second brain: inline citations back to the exact transcript timestamp, not just a text answer.
- **No-bot capture done well.** Bots joining calls as a visible participant is a common complaint. A clean screen/tab-audio capture flow (no visible bot) is a real differentiator if you can make permissions painless.
- **Radically simpler pricing.** Category pricing is confusing (seat-based + usage caps). A dead-simple "free forever for individuals, flat $X/seat for teams" story is a genuine edge.
- **Speed of the UI itself.** Make the meeting library and transcript scroll feel instant (virtualized lists, optimistic UI, no spinner-heavy summary loading). SaaS incumbents get bloated; a fast MVP feels premium.

## 6. Suggested tech stack (MVP-appropriate, not prescriptive)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui as a base, then restyle per 01/02.
- **Realtime transcript:** WebSocket or SSE stream from your transcription worker to the client.
- **Transcription/diarization:** a hosted STT API (e.g., Deepgram, AssemblyAI, Whisper-based) — don't build ASR yourself for an MVP.
- **Summarization:** Claude via the Messages API, prompted per meeting with the transcript + speaker labels; stream the summary back token-by-token for the "instant" feel.
- **Auth:** Clerk or Auth.js (Google OAuth is priority #1 provider).
- **DB:** Postgres (Supabase/Neon) — meetings, transcripts, users, workspaces.
- **Calendar/meeting join:** Recall.ai or Meeting BaaS (third-party meeting-bot infra) is the fastest MVP path instead of building a Zoom/Meet bot yourself.
- **Hosting:** Vercel (matches your existing deployment).

## 7. What this spec deliberately does NOT include

- Fathom's actual logo, wordmark, or illustration files (copyrighted — do not source from their CDN).
- Verbatim marketing copy (rewrite everything in your own voice; file 00 gives you the structural pattern, not the sentences).
- Legal/compliance copy (SOC2, HIPAA badges) — don't claim compliance you haven't earned.
