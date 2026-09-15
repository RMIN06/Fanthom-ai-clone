# 01 — Design System
### Original visual language, category-inspired (rounded SaaS dashboard, dark hero, violet AI accent)

## 1. Brand personality

Calm, confident, a little "AI-magic" without being gimmicky. Think: clean B2B SaaS (Linear, Notion, Ramp) crossed with a warm, human tone (not cold/enterprise). Lots of white space. Content (transcripts, summaries) is always the visual hero — chrome stays quiet.

## 2. Color palette

Use CSS variables so light/dark mode and theming are trivial. Values below are a defensible original starting palette — tune saturation ±5% to make it yours.

### Core brand
```css
--brand-50:  #f4f2ff;
--brand-100: #e9e5ff;
--brand-200: #d1c9ff;
--brand-300: #b3a2ff;
--brand-400: #9370ff;
--brand-500: #7c4dff;  /* primary brand / AI accent — buttons, active states, links */
--brand-600: #6b3bf0;
--brand-700: #5a2ed6;
--brand-800: #4623ad;
--brand-900: #351a80;
```

### Neutrals (UI chrome, text, borders)
```css
--neutral-0:   #ffffff;
--neutral-25:  #fbfbfd;   /* app background, light mode */
--neutral-50:  #f5f5f8;   /* card/panel background */
--neutral-100: #ececf1;   /* subtle dividers, hover fill */
--neutral-200: #dfe0e6;   /* borders */
--neutral-300: #c3c5cf;
--neutral-400: #9a9ca9;   /* placeholder text, disabled */
--neutral-500: #74768a;   /* secondary text */
--neutral-600: #55576b;
--neutral-700: #3c3d4d;
--neutral-800: #24252f;   /* primary text */
--neutral-900: #121218;   /* dark-mode background / darkest hero sections */
```

### Semantic
```css
--success-500: #1fb17d;   /* completed, connected integrations */
--success-100: #e0f7ee;
--warning-500: #e3a008;   /* action items, needs attention */
--warning-100: #fdf1d6;
--danger-500:  #e5484d;   /* errors, disconnect, delete */
--danger-100:  #fde3e4;
--info-500:    #2f8fe0;   /* links inside transcripts, timestamps */
```

### Dark mode (meeting library / recorder UI often defaults dark — matches category convention)
```css
--dark-bg-base:     #0d0d12;
--dark-bg-surface:  #17171f;
--dark-bg-elevated: #1f1f2b;
--dark-border:      #2c2c3a;
--dark-text-primary:   #f2f2f7;
--dark-text-secondary: #a3a3b3;
```

### Usage rules
- `--brand-500` is the ONLY color used for primary CTAs, active nav items, and focus rings. Never use it decoratively at large scale — it should always mean "action" or "AI."
- Speaker-diarization colors in transcripts get their own small palette so they never collide with semantic colors: `#7c4dff, #2f8fe0, #e3a008, #1fb17d, #e5484d, #d63aa0` cycling per speaker.
- AI-generated content (summaries, action items, "Ask" answers) gets a subtle `--brand-50` background wash + a small sparkle/AI icon — this visually distinguishes "what the AI said" from "what was literally transcribed," which matters a lot for trust.

## 3. Typography

Two-font system: a geometric/grotesk sans for UI, and the same or a slightly warmer sans for marketing headlines. Avoid anything overly rounded/friendly (Comic-ish) — this category reads as productivity software.

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Inter Tight', 'Inter', sans-serif;  /* headlines, marketing site */
--font-mono: 'JetBrains Mono', 'SF Mono', monospace; /* timestamps, transcript export view */
```

If you want more brand distinction than Inter (very common choice), swap `--font-display` for **General Sans**, **Söhne**, or **Geist** (Vercel's font — free, and thematically fits a Vercel-hosted product).

### Type scale (px, desktop — scale down ~10–15% on mobile)
| Token | Size / Line-height | Weight | Use |
|---|---|---|---|
| `display-xl` | 64 / 72 | 600 | Landing hero headline |
| `display-lg` | 48 / 56 | 600 | Section headers, marketing |
| `display-md` | 34 / 42 | 600 | Page titles (Dashboard, Settings) |
| `heading-lg` | 24 / 32 | 600 | Card/section headings |
| `heading-md` | 18 / 26 | 600 | Modal titles, list group headers |
| `body-lg` | 16 / 24 | 400 | Default body text, transcript text |
| `body-md` | 14 / 20 | 400 | UI labels, table cells, nav |
| `body-sm` | 13 / 18 | 400 | Metadata, timestamps, captions |
| `label` | 12 / 16 | 600, uppercase, +0.04em tracking | Section eyebrows, badges |

Weights used: 400 (body), 500 (emphasis/buttons), 600 (headings). Avoid 700+ except for the hero headline — keeps the product feeling calm, not shouty.

## 4. Spacing & layout

- **Base unit:** 4px. All spacing/padding/margins are multiples of 4 (4, 8, 12, 16, 24, 32, 48, 64, 96).
- **Container widths:** marketing site max-width 1200px; app shell content max-width 1440px with a fixed 264px left sidebar.
- **Grid:** 12-column, 24px gutter on desktop; single column with 16px side padding on mobile (<640px).

## 5. Radii, elevation, borders

```css
--radius-sm: 6px;   /* inputs, small buttons, badges */
--radius-md: 10px;  /* cards, dropdowns */
--radius-lg: 16px;  /* modals, large panels, video player frame */
--radius-full: 999px; /* pills, avatars */

--shadow-sm: 0 1px 2px rgba(16, 16, 24, 0.06);
--shadow-md: 0 4px 12px rgba(16, 16, 24, 0.08);
--shadow-lg: 0 12px 32px rgba(16, 16, 24, 0.12);   /* modals, popovers */
--shadow-focus: 0 0 0 3px rgba(124, 77, 255, 0.25); /* focus ring, matches --brand-500 */

--border-default: 1px solid var(--neutral-200);
--border-dark: 1px solid var(--dark-border);
```

Cards and panels almost never use heavy shadows in this category — prefer a 1px border (`--neutral-200`) over `--shadow-sm`, and reserve `--shadow-md`/`--shadow-lg` strictly for anything that floats above content (dropdowns, modals, toasts).

## 6. Iconography

- Use a single consistent icon set at 1.5–2px stroke weight, 20px/24px grid — **Lucide** (open source, pairs naturally with shadcn/ui) or **Phosphor** (regular weight).
- Never mix filled and outline icon styles in the same view. Outline = default state, filled/tinted = active/selected state only.
- Product-specific icons to design custom (don't rely on a generic set for these — they become part of your brand): the record/waveform icon, the "Ask" sparkle icon, the speaker-diarization avatar rings, the calendar-connected checkmark badge.
