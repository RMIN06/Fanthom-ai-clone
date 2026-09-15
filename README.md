# Fathom workspace clone

A polished, seeded clone of the Fathom meeting-notetaker workspace for the 8x Careers software engineering assignment.

## What is included

- Populated meetings inbox with realistic seeded data
- Search across meeting titles, topics, and summaries
- Meeting detail view with recorded-state player UI
- AI-generated summary presentation with template affordance
- Action items with interactive completion state
- Transcript and highlight tabs
- Share/copy feedback states and responsive layout
- Capture log directory committed at `.agent-logs/`

The recording bot/capture layer is stubbed. The implementation focuses on the post-meeting experience and the workflows that remain useful with seeded recordings.

## Run locally

```bash
npm install
npm run dev
```

## Verification

`npm run build` passes successfully.
