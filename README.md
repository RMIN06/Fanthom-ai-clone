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

## Google Calendar integration

Google Calendar is connected through Supabase's Google OAuth flow only after the user chooses “Connect Google Calendar.” The app requests the read-only calendar.readonly scope and loads the primary calendar for the next 14 days. Revoked or expired permissions are shown as “Needs re-auth” instead of appearing connected.

## Google Stitch MCP

The repository includes a local MCP proxy at .mcp.json and scripts/stitch-mcp.mjs, using the official @google/stitch-sdk package and the documented Stitch endpoint. Set STITCH_API_KEY in your local environment or MCP client secret store; never put the real key in source files, .env files, logs, or Git. Run npm run mcp:stitch or start it through an MCP client that reads .mcp.json.

Stitch is a local design/development dependency and is not required by the deployed app. Zoom, Google Meet, and Teams capture remain explicitly marked as requiring a bot provider such as Recall.ai or Meeting BaaS until those credentials are configured.

## Run locally

```bash
npm install
npm run dev
```

## Verification

`npm run build` passes successfully.
