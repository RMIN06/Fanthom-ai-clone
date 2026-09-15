# Fathom workspace clone

A polished Fathom-inspired meeting-notetaker workspace for the 8x Careers software engineering assignment.

## What is included

- Personal meetings inbox backed by Supabase
- Search across meeting titles, topics, and summaries
- Meeting detail view with recorded-state player UI
- AI-generated summary presentation with template affordance
- Action items with interactive completion state
- Transcript and highlight tabs
- Calendar connection and automatic-capture preference state
- Browser capture session that saves the real elapsed duration for follow-up notes
- Ask view with cross-meeting search and transcript timestamp citations
- Meeting highlights collection and action-item workspace
- Shareable public summary links and `.txt` meeting export
- Workspace settings and simple pricing preview
- Responsive layout with original visual language and copy
- Capture log directory committed at `.agent-logs/`

The recording bot/capture layer is intentionally stubbed: browser capture tracks a real session duration and saves a meeting record, while transcript and summary generation remain explicit integration points for a hosted capture/transcription provider.

## Run locally

```bash
npm install
npm run dev
```

## Verification

`npm run build` passes successfully.
