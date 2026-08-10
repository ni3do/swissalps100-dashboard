Run Simon's Swiss Alps 100K weekly training review.

Context:
- Repo: `/home/node/.openclaw/workspace/training-dashboard`
- Read `docs/personal-trainer-setup.md`, `docs/training-plan.md`, `docs/training-log.md`, and `training-data.js` first.
- Use Europe/Zurich dates. Review the last completed training week ending today.

Data sources:
- Strava: use first-class Strava tools if available; otherwise use direct MCP via `mcporter` with the configured Strava env/token file.
- WHOOP: use direct MCP via `mcporter` if first-class WHOOP tools are not available. Credentials are in OpenClaw config env and tokens are at `~/.whoop-mcp/tokens.json`.

Tasks:
1. Pull last 7 days of Strava activities.
2. Pull last 7 days of WHOOP recovery, sleep, workouts/cycles as available.
3. Compare planned vs actual using `training-data.js` and the markdown docs.
4. Fill or update the current week's section in `docs/training-log.md` using the weekly review template.
5. Run trigger checks:
   - 3+ consecutive days WHOOP recovery <33%
   - 2+ key sessions missed or under-target
   - Simon reported slog feeling for 2+ weeks
   - phase boundary
6. Create a Discord thread in parent Discord text channel `1467157917752098936` named `Training review — YYYY-MM-DD` where `YYYY-MM-DD` is the review date. Use the message tool's Discord thread creation/reply capability, then post the concise review summary inside that thread.

Thread summary must include:
   - planned vs actual
   - load/recovery highlights
   - trigger check
   - recommendation for next week
   - any plan changes that need Simon's approval

Do not post the normal review summary directly into the parent channel unless thread creation fails. The current Strava/WHOOP conversation is itself a Discord thread (`1502701820731195412`), so do not attempt to create a child thread there; use parent text channel `1467157917752098936`. If thread creation fails, post a short fallback summary in the parent channel and clearly say thread creation failed.

Rules:
- Do not apply non-trivial plan/dashboard/calendar changes without Simon's explicit approval.
- Do not chase missed volume automatically.
- Preserve Tuesday key sessions unless recovery/injury risk argues otherwise.
- If you edit files, commit the repo changes with a clear message; only push if the changes are routine log/docs updates, not unapproved plan changes.
