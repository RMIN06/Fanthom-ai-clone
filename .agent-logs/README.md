# Agent capture logs

This directory is committed as part of the 8x assignment.

## Capture mechanism

The tool used for this work is Codex desktop / Codex CLI, running model `gpt-5.6-luna`.
Codex automatically persists session transcripts as JSONL under:

`C:\Users\ZBOOK\.codex\sessions\YYYY\MM\DD\rollout-*.jsonl`

Codex does not expose a repository-local Claude-style prompt/end-of-turn hook in this
setup. The canary records in this directory are the redacted prompt/final-response
entries extracted from those automatic session transcripts. Raw session files are not
committed because they contain internal events, tool output, and potentially sensitive
session data.

See the repository-root `CAPTURE-TEST.md` for the verification record and the two
canary sessions.
