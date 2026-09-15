# 07 — Feature Deployment: Making Meeting Connections Actually Work
### Grounded in current (as of Sept 2026) Zoom, Google Meet, and Microsoft Teams API documentation — every claim below is sourced, not guessed. Sources listed at the bottom.

## 0. Why "connect to Zoom/Google Meet" buttons are commonly just UI with nothing behind them

This is a very common MVP trap: an integrations page gets designed and built with toggle switches and "Connect" buttons before anyone wires up the actual OAuth flow + meeting-bot infrastructure behind them, because that backend work is genuinely the hardest part of this whole product category — harder than the UI, harder than the summarization. There are two fundamentally different ways to get audio/transcript out of someone else's meeting, and you need to pick one (or mix) deliberately:

| Approach | What it means | Effort |
|---|---|---|
| **A. Native platform APIs** | Use Zoom's own API, Google's own Meet API, Microsoft's own Graph API to pull recordings/transcripts *that platform already generated* | Medium — mostly OAuth + polling/webhooks, but each platform has real eligibility gates (below) |
| **B. Bot-based capture** | Your own (or a third-party) "bot" joins the meeting as a participant, records the audio/video itself, and you run your own transcription | High if built yourself; low-to-medium if you use existing meeting-bot infrastructure (e.g., Recall.ai, Meeting BaaS) |

Fathom itself, and most notetakers in this category, use approach B for the "just works everywhere, bot or no-bot" experience — approach A alone can't give you that, because of the eligibility gates below. For an MVP, **the realistic fastest path to "Zoom/Meet/Teams connections that actually work" is a third-party meeting-bot API** (Recall.ai and Meeting BaaS are the two most commonly used), which handles joining, recording, and normalizing output across all three platforms behind one API, so you don't have to build and maintain three separate bot integrations yourself. This file gives you both the "use a vendor" path and the "native API" path so you can decide with real information, not marketing claims.

---

## 1. Google Meet — native API option

Google's own Meet REST API can retrieve conference records, recordings, and transcripts *if the meeting already had auto-recording/auto-transcription turned on*, without you needing a bot at all.

**How it actually works:**
- OAuth scopes: `https://www.googleapis.com/auth/meetings.space.created` or `https://www.googleapis.com/auth/meetings.space.readonly`.
- After a call ends, call `conferenceRecords.list` to find the record, then `conferenceRecords.recordings.list` / `conferenceRecords.transcripts.list` / `.transcripts.entries.list` to pull the artifacts. Transcript entries are deleted 30 days after the conference ends, so you must sync promptly.
- Recordings and transcripts are saved by Meet to the meeting organizer's Google Drive by default — your app is reading artifacts Google already generated, not generating your own.

**The real gate — read this before promising this feature to users:** native transcripts/recordings are **only available on eligible Google Workspace editions** (Business Standard/Plus, Enterprise Standard/Plus, Enterprise Starter, Essentials Starter/Enterprise Essentials, education editions, or Google Workspace Individual/Google One 2TB+ for personal accounts) — not on a plain free @gmail.com account. As of April 2026 Google also began letting admins require explicit in-meeting participant consent before auto-transcription/recording can start, which is another point of friction to design your onboarding around.

**Verdict:** genuinely the simplest of the three to implement, but only reliably useful for users on paid Workspace plans. Free-tier personal Gmail users will hit a wall with this approach — you'll need bot-based capture (§4) to serve them.

## 2. Zoom — native API option

Zoom's own APIs can retrieve cloud recordings/transcripts after a call, and separately, the Meeting SDK can let a bot join and capture locally.

**How it actually works:**
- OAuth app scopes (current "granular" scope system, replacing legacy scopes since April 2024): `meeting:read:list_meetings`, `meeting:read:meeting`, `user:read:user`, and for cloud recordings/transcripts specifically, `recording:read` / `cloud_recording:read:*` scopes to list and download a meeting's recording files and transcript via `GET /meetings/{meetingId}/recordings` style endpoints.
- **Important 2026 change:** starting Feb 23, 2026 (originally targeted, later confirmed for enforcement), Zoom requires an "On Behalf Of" (OBF) token for Meeting SDK apps joining meetings hosted by accounts outside your own — obtained via OAuth with a `user:read:token` scope. If your product needs a bot to join meetings hosted by your *users'* Zoom accounts (which it does), you need to build this OAuth flow correctly or your bot will simply be blocked from joining as of that enforcement date.
- For continuous/persistent recording use cases, Zoom's current recommendation is **Real Time Media Streams (RTMS)** rather than the older SDK-join approach.

**Verdict:** Zoom's API surface is real and workable, but it's the most in-flux of the three right now because of the OBF enforcement change — build against the current granular scopes and RTMS/OBF flow, not older tutorials you'll find online (many pre-date this change and will silently stop working).

## 3. Microsoft Teams — native API option

Microsoft Graph exposes `callTranscript` and `callRecording` resources on a scheduled `onlineMeeting`.

**How it actually works:**
- Endpoints: `GET /users/{userId}/onlineMeetings/{meetingId}/transcripts` and `/recordings`, or `onlineMeeting: getAllTranscripts` to pull all of a user's transcripts in one call (recommended over per-meeting polling — there are documented indexing-delay issues with the per-meeting endpoint).
- Requires configuring permissions in Microsoft Entra ID (organization-wide application permissions, or resource-specific consent for a single meeting) and, per Microsoft's own docs, **these transcript/recording-fetch APIs are metered (paid) APIs**, not free Graph calls.
- Real limitation: this only works for **scheduled, calendar-backed meetings** — ad-hoc meetings created via the `createOnlineMeeting` API are explicitly documented as not exposing transcripts through this path.

**Verdict:** workable for users inside an organization with Teams admin buy-in, but has real cost (metered API) and scope limits (calendar-backed meetings only) you should surface honestly in your product rather than promising blanket "Teams support."

## 4. The realistic MVP path: third-party meeting-bot infrastructure

Because all three native paths above have real gates (Workspace edition, Zoom OBF complexity, Teams metering + calendar-only), the fastest way to make "Connect Zoom / Connect Google Meet / Connect Teams" *actually join and record any meeting regardless of the host's plan* — which is what users expect when they see those buttons — is to use an existing meeting-bot API rather than building three bot integrations from scratch:

- **Recall.ai** and **Meeting BaaS** are the two most commonly referenced providers for this specific problem (a bot that joins Zoom/Meet/Teams calls and returns audio/transcript via one unified API). Both publish their own OAuth setup guides per platform (e.g., Recall's own Zoom OAuth guide covers exactly the granular-scopes and OBF-token requirements in §2, so you don't have to track Zoom's policy changes yourself).
- This is a genuine build-vs-buy decision, not a shortcut to be embarrassed about — even well-funded competitors in this category route through third-party meeting-bot infra rather than maintaining their own Zoom/Meet/Teams SDK integrations in-house, because platform policies (like Zoom's OBF change) shift often enough that it's a full-time maintenance burden.
- **Trade-off to weigh honestly:** you're now dependent on a vendor's uptime/pricing, and per-minute bot costs scale directly with usage — model this cost per meeting-minute into your pricing before launch, don't discover it after.

## 5. What to actually ship for the "Integrations" page, honestly

Given the above, here's a scope that is both truthful and achievable:

1. **Calendar connect (Google Calendar / Outlook Calendar)** — this is just standard OAuth + calendar read scopes, no meeting-bot complexity, and it's what powers your "upcoming meetings" auto-populate feature. Ship this first; it's unblocked by everything above.
2. **Recording method, per platform, exposed honestly in the UI:**
   - If you integrate a bot vendor (§4): all three platforms "just work" the same way — one connect flow, one bot-join experience. This is the cleanest UX and matches user expectations from Fathom/Otter/etc.
   - If you go native-only (§1–3) for MVP speed: label each connection with its real constraint in the UI itself (e.g., "Google Meet — requires a Google Workspace paid plan" / "Microsoft Teams — requires your Teams admin to enable meeting recording APIs") rather than a bare "Connect" button that will silently fail for a chunk of your users.
3. **A visible, honest connection status per integration** (Connected / Needs re-auth / Not eligible on your plan) — this single UI detail does more to prevent support tickets than almost anything else, because the #1 failure mode in this category is a user assuming a connection is live when it silently isn't.

## 6. Suggested build order

1. Google Calendar / Outlook Calendar OAuth (read-only) → powers "upcoming meetings."
2. Pick ONE bot-vendor (Recall.ai or Meeting BaaS) and get end-to-end bot-join + transcript-back working for Zoom first (highest-volume platform for most B2B users) — validate the whole recording → transcript → summary pipeline on one platform before replicating to Meet/Teams.
3. Add Google Meet and Microsoft Teams through the same vendor's unified API — this should be mostly configuration, not new integration code, if you picked a vendor that genuinely unifies the three.
4. Only after the bot-based path is solid, consider *also* offering native-API "no-bot" capture as a premium/eligible-users-only option (this is Fathom's own "bot or no bot" distinction) — it's a real differentiator but strictly an addition, not a replacement, for the bot path that covers everyone.

---

## Sources (verify against these directly before implementing — API policies shift; the OBF change alone shows how fast)

- Google Meet REST API overview & artifacts guide — developers.google.com/workspace/meet
- Google Meet release notes (auto-recording/transcript config, Feb 2025 update) — developers.google.com/workspace/meet/release-notes
- Google Workspace consent-for-recording update (April 2026) — workspaceupdates.googleblog.com
- Google Meet Workspace edition requirements — support.google.com/meet/answer/10459644 and answer/7317473
- Zoom Meeting SDK OBF authorization FAQ (2026 enforcement) — developers.zoom.us/docs/meeting-sdk/obf-faq
- Zoom granular OAuth scopes guide — docs.recall.ai/docs/integration-guide-zoom-oauth
- Zoom Meetings API reference (recording/transcript scopes) — developers.zoom.us/docs/api/meetings
- Microsoft Graph `callTranscript` / `callRecording` docs — learn.microsoft.com/graph/api/calltranscript-get, onlinemeeting-list-transcripts
- Microsoft Teams meeting-transcript API overview (metered API note) — learn.microsoft.com/microsoftteams/platform/graph-api/meeting-transcripts/overview-transcripts
