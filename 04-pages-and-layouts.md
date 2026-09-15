# 04 — Page & Screen Specs

Each screen: layout, key components used (ref 02), and the one thing that screen must get right.

## 1. Marketing landing page

**Structure (top to bottom):**
1. Sticky top nav — logo left, links center (Product / Solutions / Pricing), Log in + primary "Get started free" button right. Background transparent over hero, solidifies to `--neutral-0` with `--shadow-sm` on scroll.
2. Hero — `display-xl` headline + one-line subhead + primary CTA button + trust row (logos or a "used by N teams" line) below the fold-line. Background: soft gradient from `--neutral-25` to `--brand-50`, or a dark `--neutral-900` hero with a glowing brand-colored orb/gradient blob (common, effective pattern for AI products — keep it subtle, not a full animated 3D scene for MVP).
3. Product screenshot / short looping video directly under the hero CTA — this category converts on "show, don't tell." Frame it in a soft device/browser chrome with `--radius-lg` and `--shadow-lg`.
4. Feature trio (3-column, icon + heading + 1-sentence description) — mirror the "Clarity / Momentum / Ease" three-pillar pattern (accuracy, search/ask, integrations) but write your own words.
5. Social proof stat row (e.g., "X hours saved," "Y meetings transcribed") — large numbers, `display-md`, centered, minimal decoration.
6. Integrations strip — logos of Zoom/Meet/Teams/Slack in a simple horizontal row, grayscale until hover.
7. Final CTA band — full-width `--brand-500` or `--neutral-900` background, centered headline + button, high contrast.
8. Footer — standard 4-column link layout + legal.

## 2. Sign up / Log in

- Centered card, 400px wide, `--radius-lg`, `--shadow-md`, on a subtle branded background (soft gradient, not full illustration — keep focus on the form).
- Google OAuth button is visually primary (top, full-width, `secondary` button style with the Google logo) — email/password is secondary, below a divider ("or continue with email").
- Single-column form, inline validation (see 02 §2), submit button full-width.

## 3. Onboarding (2–3 steps max for MVP)

- Step indicator: simple dot or thin progress bar at top, not a heavy stepper component.
- Step 1: Connect calendar (Google/Outlook) — big, obvious single-button action, explain in one sentence why (so meetings auto-populate).
- Step 2: Recording preference — bot-based vs. no-bot capture, toggle + short explainer copy, sensible default pre-selected.
- Step 3: Land directly in the dashboard with an empty state pointing at their next scheduled meeting ("Fathom-style" upcoming-meeting card at the top of an otherwise empty library).

## 4. Dashboard / Meeting library (default post-login view)

**Layout:** sidebar (nav) + top bar (search, avatar) + main content.

**Main content, top to bottom:**
1. "Upcoming" row — horizontal scroll of cards for the next 1–3 calendar meetings, each showing time, title, participants (stacked avatars), and an auto-record toggle inline. This surfaces the core value prop before the user even has to think.
2. Filter/sort bar — tabs or a segmented control for "All / Shared with me / Starred," plus a date-range and participant filter, right-aligned view toggle (card grid vs. table — see 02 §8).
3. Meeting list — repeating card/row component:
   - Left: small video thumbnail or a generic call-type icon if no thumbnail.
   - Center: meeting title (editable inline on click), date + duration (`body-sm`, `--neutral-500`), participant avatar stack.
   - Right (hover-revealed): share icon, star icon, more-menu (⋯).
   - Below title on hover or on the table's "summary preview" column: one-line AI summary snippet, truncated.
   - Status badge (Processing/Ready) appears immediately after a call ends, before the user even clicks in.

## 5. Meeting detail page (the core product screen)

**Layout:** two-column. Left ~60%: video/audio player pinned at top + tabs (Transcript / Summary / Ask) below it. Right ~40%: persistent summary/action-items rail (always visible regardless of which tab is active on the left) OR, if simplifying for MVP, collapse this into the tab system — pick ONE of these two layouts and be consistent everywhere.

- **Header bar:** meeting title (editable), date/time, participant avatars, share button (primary, top-right), more-menu.
- **Video/audio player:** custom-styled (not raw `<video>` chrome) — `--radius-lg` frame, brand-colored scrubber, click-to-seek from transcript (clicking a transcript line jumps playback to that timestamp — a must-have interaction).
- **Transcript tab:** speaker name + diarization-colored avatar + timestamp per line (see 01 §2, 02 §6), current playback position highlighted with a soft `--brand-50` background band that moves as audio plays.
- **Summary tab:** TL;DR paragraph at top (`body-lg`), then "Key points" as a bulleted list, then "Action items" as a checklist (checkable, assignable to a participant), each item optionally linking back to its transcript timestamp (small `→ 12:04` pill).
- **Ask tab:** chat interface scoped to this meeting — input pinned at bottom, message history above, AI answers use the streaming + citation pattern from 03 §4.
- **Share modal:** toggle public link on/off, permission level (view-only vs. can-comment), optional expiry, copy-link button front and center.

## 6. Ask / global search

- Accessible via `⌘K` command palette (see 02 §4) from anywhere in the app.
- Two modes in one interface: quick keyword search (returns matching meetings/transcript lines instantly, no AI needed) vs. a natural-language question (routes to the RAG "Ask" flow, streams an answer with citations across meetings).
- Results list: each hit shows the meeting title, date, and the matching transcript snippet with the query term highlighted (`--brand-100` background, not bold — bold reads as a heading, highlight reads as "found").

## 7. Settings

- Left sub-nav within the settings area: Account, Integrations, Recording preferences, Notifications, Billing.
- Integrations page: grid of integration cards (logo, name, connect/disconnect button, "Connected" badge state) — Zoom, Meet, Teams, Slack, Notion first; CRM integrations can be "Coming soon" disabled cards for MVP (shows roadmap ambition without overbuilding).

## 8. Pricing page

- Two or three plan cards side by side, the recommended plan visually elevated (slightly larger, `--brand-500` border or a "Most popular" badge). Keep the free tier generous and prominent — that's the wedge into this market (see 00 §5).
- Feature comparison table below the cards for anyone who scrolls further, not the primary decision surface.

## 9. Public shared-meeting view (external, non-authenticated)

- Stripped-down version of the meeting detail page: summary + action items + transcript, read-only, with a persistent small "Made with [YourProduct] — try it free" banner at the top or bottom. This page IS your growth loop — every share is an ad. Keep it fast-loading and clean so it reflects well on the sender.
