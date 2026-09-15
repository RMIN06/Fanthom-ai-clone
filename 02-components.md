# 02 — Component Library
### Build these on top of shadcn/ui / Radix primitives; values below override the defaults

For every component: **default, hover, active/pressed, focus, disabled, loading** states must be explicitly designed — this category lives or dies on perceived polish.

## 1. Buttons

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| Primary | `--brand-500`, hover `--brand-600`, active `--brand-700` | white | none | Main CTA per screen (1 per view max) |
| Secondary | `--neutral-0`, hover `--neutral-50` | `--neutral-800` | 1px `--neutral-200` | Secondary actions |
| Ghost | transparent, hover `--neutral-100` | `--neutral-700` | none | Toolbar/inline actions |
| Destructive | `--danger-500`, hover darken 8% | white | none | Delete meeting, remove integration |
| Link | transparent | `--brand-500`, underline on hover | none | Inline text actions |

- Height: `sm` 32px, `md` 40px (default), `lg` 48px (marketing CTAs only).
- Border-radius: `--radius-sm` (6px) for all buttons — sharper than cards, keeps buttons feeling "clickable" vs. decorative.
- Padding: 12px horizontal per 8px of height increment (md = 16px horizontal).
- Disabled: 40% opacity, no pointer events, no hover transform.
- Loading: replace label with a 16px spinner (use the brand color inverted for contrast), keep button width fixed (no layout shift) — use `min-width` set from the label's rendered width.
- Icon buttons: 36×36px hit target minimum even if the icon itself is 20px, for accessibility.

## 2. Inputs & forms

- Height 40px, `--radius-sm`, 1px `--neutral-200` border, `--neutral-0` background.
- Focus: border becomes `--brand-500`, add `--shadow-focus` ring, no color change on the label.
- Placeholder text: `--neutral-400`.
- Error state: border `--danger-500`, helper text below in `--danger-500` at `body-sm`, small alert-circle icon leading the helper text.
- Labels: `body-md` weight 500, `--neutral-700`, 6px margin-bottom above the field.
- Checkboxes/radios: 18px square/circle, `--radius-sm` for checkbox, checked state fills `--brand-500` with a white check icon, 150ms fill transition.
- Toggle switches (used heavily for "auto-join," "auto-record," integration on/off): track 44×24px, thumb 20px, off = `--neutral-300` track, on = `--brand-500` track, thumb slides with a spring easing (see 03).

## 3. Cards & panels

- Default card: `--neutral-0` background, `--border-default`, `--radius-md`, 20–24px internal padding.
- Meeting-list-item card (the core repeating element in the dashboard): see 04 for full anatomy — but structurally it's a card with a left-aligned thumbnail/avatar cluster, title + metadata center, and a right-aligned action cluster (share, more-menu) that only appears on row hover.
- Hover state on interactive cards: background shifts to `--neutral-25`, border unchanged, cursor pointer, 120ms ease.
- Elevated card (modals, dropdown panels): `--shadow-lg`, `--radius-lg`, no border (shadow alone defines the edge).

## 4. Navigation

- **App shell sidebar:** fixed 264px, `--neutral-0` (light) / `--dark-bg-surface` (dark), nav items 40px tall, `--radius-sm`, active item gets `--brand-50` background + `--brand-600` text + `--brand-500` left accent bar (3px) OR filled icon — pick one, not both.
- **Top bar:** 64px tall, contains global search (see below), notification bell, avatar/workspace switcher on the right.
- **Global search / command palette:** trigger with `⌘K`. Modal overlay, centered, 640px wide, `--radius-lg`, `--shadow-lg`. This is a high-value pattern for this product — search across meetings should live here, not just in a page.
- **Tabs:** underline style (not pill) for switching between Transcript / Summary / Ask on the meeting detail page — 2px `--brand-500` underline, 200ms slide transition between tabs (see 03).

## 5. Badges & tags

- `--radius-full`, `body-sm`, weight 500, 4px vertical / 10px horizontal padding.
- Status badges: `Recording` (danger-100 bg / danger-500 text + pulsing dot), `Processing` (warning-100/warning-500 + subtle shimmer), `Ready` (success-100/success-500), `Shared` (brand-50/brand-600).
- Integration badges show the tool's own brand mark at 16px inside a neutral pill.

## 6. Avatars

- Circular, `--radius-full`, sizes 24 / 32 / 40 / 64px.
- Stacked avatar group for meeting participants: 4px overlap, max 4 visible + `+N` overflow badge in `--neutral-100`.
- Speaker avatars in transcript view get a 2px ring in that speaker's assigned diarization color (see 01 §2).

## 7. Modals, drawers, toasts

- Modal: centered, `--radius-lg`, `--shadow-lg`, max-width 480px (confirmation) or 720px (content-heavy, e.g. sharing settings). Backdrop `rgba(13,13,18,0.4)` with a subtle blur (`backdrop-filter: blur(4px)`).
- Drawer (used for "meeting settings" / integration config): slides from the right, full-height, 400px wide, same shadow.
- Toast notifications: bottom-right, `--radius-md`, `--shadow-md`, `--neutral-900` background with white text (inverted, so it reads as a system-level message distinct from app content), auto-dismiss 4s, manual close (x) always available.

## 8. Tables (meeting library alternate view, integration logs)

- Row height 56px, `body-md`, zebra-free (use `--border-default` row dividers only, not background stripes — cleaner, matches Linear/Notion convention).
- Header row: `body-sm`, `--neutral-500`, weight 600, uppercase optional, sticky on scroll.
- Row hover: `--neutral-25` background, row-level checkbox fades in on hover for bulk actions.

## 9. Empty states

Every list view needs a designed empty state, not just blank space:
- No meetings yet → center illustration (simple, original line-art, not a stock icon) + "Connect your calendar to get started" + primary CTA.
- No search results → smaller inline icon + "No meetings match '{query}'" + a "clear filters" link.
- Empty transcript (call in progress) → animated waveform placeholder (see 03) + "Transcribing live…" label.
