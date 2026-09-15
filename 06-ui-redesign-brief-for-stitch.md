# 06 — UI Redesign Brief (for Google Stitch)
### A from-scratch visual redesign, written to be fed into Stitch prompts via its MCP server in Codex

## 0. An honest caveat before anything else

I fetched `https://fanthom-ai-clone.vercel.app/` directly, but it's a client-side-rendered app (likely Next.js/React) — my fetch tool only sees the initial empty HTML shell before your JS renders the real UI, so **I have not actually seen your current screens.** Anything specific I said in an earlier response about "purple gradients" etc. was a generic description of *what AI-generated SaaS UIs commonly look like*, not a description of your app — I want to be explicit about that rather than let it sound like I inspected your product.

**To get a genuinely targeted redesign** (not a generic one), do one of these before your next Stitch session:
- Paste 3–5 screenshots of your actual current screens (dashboard, meeting detail, settings, landing page) into the chat, and ask for a line-by-line slop audit against the checklist in §1 below.
- Or paste your current Tailwind config / globals.css so the "what to rip out" list in §3 can reference your real tokens instead of placeholders.

Everything below is written to be useful *either way*: §1–2 are a general-purpose framework you can apply yourself to any screenshot, and §4 gives you ready-to-paste Stitch prompts for a genuinely original direction.

---

## 1. The "AI slop" checklist — what to actually look for

This is the pattern-matching list. Go through your real screens against each line and mark yes/no — don't skip this by assuming you know the answer:

- [ ] A purple-to-blue (or purple-to-pink) gradient anywhere as a primary brand color choice
- [ ] Glassmorphism — frosted/blurred translucent panels — used decoratively rather than functionally
- [ ] Every card has the exact same radius, same shadow, same padding, with no visual hierarchy between "this matters more" and "this is secondary"
- [ ] A hero section with a giant centered headline + subhead + button + an abstract blob/orb graphic behind it
- [ ] Emoji or sparkle (✨) icons used as a substitute for an actual icon set or as a stand-in for "this is the AI part"
- [ ] Default shadcn/ui component styling left completely untouched (same border-radius, same gray palette, same spacing scale as every other shadcn app)
- [ ] Inter font at default weights with no display/heading font distinction
- [ ] Icon set mixed between two different styles (e.g. some Heroicons, some emoji, some Lucide) inconsistently
- [ ] Copy that reads like AI wrote it: "Unlock the power of...", "Seamlessly...", "Effortlessly...", "Say goodbye to...", triads of adjectives ("fast, simple, powerful")
- [ ] Illustrations that are obviously stock/generated 3D blob characters unrelated to the product's actual function
- [ ] No real content in mockups — lorem ipsum, "John Doe," or placeholder avatars still visible in what's supposed to be a finished screen
- [ ] Buttons/CTAs with no clear single primary action per screen — three buttons of equal visual weight competing for attention

If more than ~4 of these are true, that confirms the "generic AI SaaS" read — and tells you exactly which ingredients to remove, rather than "redesign everything," which is much harder to execute than fixing a specific list.

## 2. Why this pattern exists (so you can deliberately avoid it)

Most AI-generated and template-based SaaS UIs converge on the same look because they're trained on/copying the same source material: Linear, Notion, and the shadcn/ui default theme, filtered through thousands of Dribbble "AI SaaS landing page" shots. The fix isn't "add more polish" — polish applied to a generic layout still reads as generic. The fix is **making 3–4 specific, opinionated choices that a template wouldn't make**, and applying them consistently everywhere. Pick your own from this pool (don't take all of them — a redesign with 3 firm opinions beats one with 10 timid ones):

- An unusual but legible font pairing that isn't Inter + Inter (e.g., a serif or slab display face for headings against a plain grotesk body font)
- A non-purple brand color — this single choice does more to escape "AI SaaS" pattern-matching than almost anything else, precisely because purple/violet has become the default "AI product" signifier
- Asymmetric layouts instead of everything centered in a max-width container
- A denser, more information-rich UI (more like a real tool, less like a marketing page) even on the dashboard — this actually suits a meeting-notes product, whose users are power users checking it many times a day, not casual browsers
- Real photography or real product screenshots instead of any illustration/3D-render style at all
- A restrained, almost monochrome UI with color used only as a functional signal (recording = red, AI content = one accent), not decoratively

## 3. What to explicitly rip out of the current build

Since I can't see your code, treat this as a search-and-remove checklist to run against your own repo:
- Search your CSS/Tailwind config for any gradient utility classes (`bg-gradient-to-*`) used on large surfaces (hero backgrounds, card backgrounds) — remove or replace with flat color.
- Search for `backdrop-blur` / `bg-white/10` style translucent-panel classes — if they're not on something that's genuinely floating over other content (a real modal/dropdown), they're decorative glassmorphism and should go.
- Grep for `✨`, `🚀`, `💡` or similar emoji in component files — replace with your real icon set or remove.
- Check whether shadcn/ui's `components.json` theme is still the default (`neutral`/`zinc` base color, default radius) — if untouched, that's the single fastest tell that this is a template, not a designed product.
- Audit every heading/CTA line of marketing copy for the AI-writing tells listed in §1 and rewrite in a plainer, more specific voice (say what the product actually does, not how it makes the user feel).

## 4. Prompting Google Stitch (via its MCP server) correctly

Stitch (Gemini-powered, at stitch.withgoogle.com, callable via MCP from Codex) produces noticeably better results with **specific, structured prompts** than with a one-line request — vague prompts are exactly what produces the generic look you're trying to escape. Structure every Stitch prompt with these four parts, in order:

1. **Idea** — what the screen is and who uses it
2. **Theme** — the 3–4 opinionated visual choices from §2 you're committing to (name actual colors/fonts, not vibes)
3. **Content** — the real components and real copy that must appear (not "some cards" — the actual data fields)
4. **Constraints** — states, responsiveness, what NOT to include (explicitly ban gradients/glassmorphism/emoji here, since that's exactly the failure mode you're avoiding)

### Ready-to-paste Stitch prompts

**Dashboard / meeting library:**
```
Design a web dashboard for an AI meeting-notes tool, for a power user who
checks it 10+ times a day between calls. Theme: [your chosen accent color,
e.g. "deep forest green #1a4d3a as the only accent color"], [your chosen
font pairing], flat colors only — no gradients, no glassmorphism, no
sparkle/emoji icons. Layout: dense information-first table view (not
spacious marketing-style cards) with columns for meeting title, date,
duration, participants (small stacked avatars), and a one-line AI summary
preview truncated to 60 characters. Top of the page: a horizontal row of
"upcoming meetings" from the connected calendar, each showing an
auto-record toggle. Include hover state on rows showing share/star/menu
icons appearing on the right. Include an empty state for a brand-new
account with zero meetings yet.
```

**Meeting detail page:**
```
Design a meeting-detail screen for an AI meeting-notes tool. Two-column
layout: left 60% has a video player pinned at top with three tabs below it
(Transcript, Summary, Ask); right 40% is a persistent panel showing the
AI-generated summary and a checklist of action items, each with an
assignee avatar and a small timestamp link back to the transcript.
Transcript tab: speaker name + colored avatar ring + timestamp per line,
current playback position highlighted. Theme: [your color/font choices],
flat, no gradients, no glassmorphism, no generic AI sparkle iconography —
use a small waveform icon for anything recording-related instead.
```

**Landing page hero:**
```
Design a marketing landing page hero for an AI meeting-notes product.
NO centered gradient-blob hero, NO glassmorphism panel, NO stock 3D
illustration. Instead: asymmetric two-column hero, headline + one-line
subhead + single primary CTA on the left (roughly 45% width), a real
product screenshot (browser-chrome frame) bleeding off the right edge of
the viewport. Theme: [your color/font choices]. Copy should state
literally what the product does in plain language, avoiding phrases like
"unlock," "seamlessly," "effortlessly," or "power of AI."
```

Iterate with follow-ups like "make the accent color the only saturated color on the page, everything else neutral gray" or "swap the heading font for something with more character" rather than accepting the first generation — Stitch's own docs note it's built for exactly this kind of iterative refinement per screen.

## 5. Handoff to Codex

Once you've got screens you're happy with in Stitch, export via its Figma/HTML-CSS export and hand the generated markup + your chosen design tokens (colors, fonts, spacing from whatever you landed on in §4) to Codex as the literal source of truth for implementation — don't let Codex "interpret" the design loosely, since that's another common place genericness creeps back in.
