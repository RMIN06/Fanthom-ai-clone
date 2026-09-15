# 03 — Motion & Interaction Design

## 1. Motion principles

1. **Motion explains state change, never decorates.** If a transition doesn't help the user understand what just happened (something appeared, something loaded, something was confirmed), cut it.
2. **Fast by default.** This is a productivity tool used many times a day — nothing should feel like it's "performing" for the user. Most UI transitions are 120–200ms.
3. **AI moments get slightly more weight.** When the AI is "thinking" (generating a summary, answering a search query), a slightly slower, more deliberate animation (streaming text, soft pulse) signals "real work is happening" — this is one of the few places to slow down.

## 2. Easing tokens

```css
--ease-standard: cubic-bezier(0.4, 0, 0.2, 1);   /* default for most UI transitions */
--ease-out: cubic-bezier(0, 0, 0.2, 1);          /* entrances — things appearing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);           /* exits — things disappearing */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* toggles, checkboxes, small playful confirmations */
```

## 3. Duration tokens

```css
--duration-instant: 80ms;   /* hover fills, color changes */
--duration-fast: 150ms;     /* button press, tab underline slide, dropdown open */
--duration-base: 220ms;     /* modal open/close, drawer slide, card expand */
--duration-slow: 400ms;     /* page-level transitions, onboarding step changes */
--duration-ai: 600ms+ (streaming, not a fixed duration) /* AI summary/answer generation */
```

## 4. Specific interaction specs

### Buttons
- Hover: background color transition `--duration-instant`, `--ease-standard`.
- Press: `scale(0.98)` transform, `--duration-instant`, `--ease-standard`. Release springs back with `--ease-spring`.

### Toggles / switches
- Thumb slide: `--duration-fast`, `--ease-spring` (the slight overshoot is what makes a toggle feel satisfying — don't use linear/standard easing here).
- Track color crossfade happens simultaneously, `--ease-standard`.

### Modals & drawers
- Enter: opacity 0→1 + `translateY(8px)→0` (modals) or `translateX(100%)→0` (drawers), `--duration-base`, `--ease-out`.
- Exit: reverse, `--duration-fast`, `--ease-in` (exits should always feel snappier than entrances).
- Backdrop fades independently, slightly faster than the panel itself, so the panel feels like it's arriving "into" a space that's already dimming.

### Tabs (Transcript / Summary / Ask)
- Underline indicator: animate `transform: translateX()` + `width` between tab positions, `--duration-fast`, `--ease-standard`. Never crossfade tab content instantly — slide the content panel horizontally 8px + fade, matching the direction of tab movement.

### Meeting library list
- New meeting item entering the list (e.g., after a call ends): fade + slight scale-up from 0.98→1, `--duration-base`, `--ease-out`, staggered 40ms per item if multiple appear at once.
- Row hover reveal (share/menu icons appearing on the right): opacity fade only, `--duration-instant` — no slide, it should feel like it was always there, just invisible.

### Recording indicator
- Live "Recording" badge: pulsing dot, 1.6s ease-in-out infinite loop, opacity 1→0.4→1, scale 1→1.15→1. Keep this subtle — a fast/sharp pulse reads as alarming, which is the wrong feeling for "we're calmly capturing this."

### Live transcript
- New lines append with a fade-in + `translateY(4px)→0`, `--duration-fast`, `--ease-out`. Auto-scroll follows smoothly (`scroll-behavior: smooth`) unless the user has manually scrolled up, in which case show a "↓ jump to live" pill instead of forcing scroll.

### AI summary generation (the signature moment)
- Stream text token-by-token as it's generated (not a spinner-then-dump). This single decision does more for perceived quality than almost anything else in the product.
- While waiting for the first token: show 3 skeleton lines with a soft shimmer sweep (`background-position` animated left→right, 1.4s linear infinite, using a `--brand-50`-to-transparent gradient).
- Action items animate in as individual checklist rows once identified, each with the list-item stagger pattern above — it should feel like the AI is "finding" them one at a time, not pasting a finished block.

### Ask / search (command palette + in-app chat)
- Palette open: scale 0.96→1 + fade, `--duration-fast`, `--ease-out`, combined with the backdrop fade.
- Answer streaming: same token-stream treatment as summaries. Citations (linking back to transcript timestamps) fade in slightly after the sentence they support finishes streaming, as small inline pills — don't front-load all citations before the text exists.

### Page/route transitions
- Keep these minimal — a 150ms crossfade on the main content area is enough. Do not do full-page slide transitions between dashboard sections; this is a tool people live inside all day, and heavy page transitions become friction on the 50th use of the day.

## 5. Sound & haptics

- No sound by default anywhere except an optional, user-toggleable "meeting ended" chime — this category's users are often in open offices; sound-by-default is a fast way to get uninstalled.
- If shipping a desktop app later: a subtle haptic/visual confirmation (not sound) when recording starts/stops is enough.

## 6. Motion don'ts

- No parallax scrolling on the marketing site hero — it reads as dated and hurts perceived load performance.
- No confetti/celebration animations for routine actions (saving settings, connecting an integration) — reserve any celebratory moment (if any) for genuinely rare milestones (first meeting recorded, 100th meeting).
- Never block the UI with a full-screen loading animation for anything except initial app load. Every other loading state should be scoped to the component that's loading (skeletons, inline spinners).
