# 05 — Assets, Icons & Image Generation Briefs

**Important:** do not source, download, or hotlink any image/PNG/SVG from fathom.video or fathom.ai's CDN into your product. The briefs below are written so you (or an AI image generator / your designer) can produce fully original assets that hit the same *category* feeling.

## 1. Logo & wordmark

- Brief for a designer or logo-generation tool: "A minimal geometric wordmark for an AI meeting-notes product. Lowercase or mixed-case sans-serif matching Inter/Inter Tight. Icon mark: an abstract shape suggesting 'listening/capturing' — options to explore: a soundwave folded into a checkmark, an open-bracket/quote shape (transcripts), or a simple radar/pulse ring. Single color (`--brand-500`) for primary lockup, with a monochrome (all-black / all-white) variant for dark backgrounds."
- Export needs: SVG master, PNG @1x/2x/3x in both a full lockup (icon+wordmark) and icon-only (for favicon/app icon), transparent background, both light and dark variants.
- Favicon: icon-only mark, simplified further if needed at 16/32px (remove fine detail that won't render at that size).

## 2. Marketing illustrations (empty states, onboarding, feature sections)

Use a **single consistent illustration style** across the whole product — mixing styles is the #1 thing that makes a clone feel cheap. Recommended direction for this category: simple, flat, geometric line illustrations with one or two accent fills in `--brand-300`/`--brand-500`, generous negative space, no complex gradients or photorealism.

Briefs (usable directly in an AI image generator, e.g. Midjourney/DALL·E/your design tool — adjust wording to the tool's syntax):

- **Empty meeting library:** "Flat minimal line illustration, a calendar page with a small microphone icon floating above it, single accent color purple (#7c4dff) on white background, generous whitespace, no text, vector style, thin 2px strokes."
- **Onboarding — connect calendar:** "Flat minimal line illustration of two puzzle-piece shapes connecting, one shaped like a calendar grid and one like a chat bubble, purple accent color, thin line style, vector, white background."
- **No search results:** "Flat minimal line illustration of a magnifying glass over a blank document, subtle dotted lines suggesting a search trail, single purple accent, thin strokes, vector, white background."
- **404 / error page:** "Flat minimal line illustration, a disconnected plug/cable shape with a small question mark, purple accent color, vector, thin line style."

Keep every illustration on a transparent or pure-white background so they drop cleanly into both light and (with an inverted stroke variant) dark surfaces.

## 3. Hero / product imagery

- Landing page hero: prefer an actual **product screenshot or short screen-recording loop** of your real UI over a generated illustration — this category converts better on authentic product visuals than abstract art. Frame it in a simple browser/device chrome mockup.
- If you want an abstract hero background instead of/behind the screenshot: a soft, dark radial gradient blob in `--brand-500`/`--brand-700` on a `--neutral-900` background, subtly animated (slow drift, 20–30s loop, `--ease-standard`) — avoid busy particle/3D scenes for an MVP; they hurt load performance and don't age well.

## 4. Icon set

- Base UI icon set: adopt **Lucide** or **Phosphor** wholesale (both are free, MIT/open-license, and SVG-based) rather than commissioning hundreds of generic icons — spend custom-illustration budget only on the product-specific icons below.
- Custom icons to design (small set, high reuse):
  1. Record/waveform icon (nav + recording badge)
  2. "Ask" sparkle/spark icon (distinct from generic AI-sparkle clichés if possible — e.g., a small radiating dot rather than a 4-point star, to avoid looking identical to every other AI product)
  3. Calendar-connected checkmark badge
  4. Speaker/diarization ring avatar frame
  5. Share-link icon with a small "public" indicator variant

## 5. Social/OG image

- 1200×630px, `--neutral-900` background, wordmark top-left, a short one-line value-prop headline in `display-md`, and a cropped product screenshot bottom-right bleeding off the edge. Keep text large enough to read at thumbnail size (social previews render small).

## 6. Favicon & app icons

- Standard set: `favicon.ico` (multi-res), `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` (180×180), and a maskable PWA icon (512×512, icon centered within a safe zone at ~80% of canvas per PWA maskable-icon spec) if you add PWA support later.

## 7. File organization (for your repo)

```
/public
  /brand
    logo-full-light.svg
    logo-full-dark.svg
    logo-icon.svg
    favicon.ico
    og-image.png
  /illustrations
    empty-meetings.svg
    empty-search.svg
    onboarding-calendar.svg
    404.svg
  /icons        (only truly custom icons — everything else imported from lucide-react)
    record.svg
    ask-sparkle.svg
    calendar-connected.svg
```
