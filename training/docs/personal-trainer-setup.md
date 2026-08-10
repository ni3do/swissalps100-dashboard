# Personal Trainer Setup

This repo is the operating base for Simon's Swiss Alps 100K training block.

## Source of truth

- `training-data.js` — dashboard/data source used by the static pages.
- `docs/training-plan.md` — long-form plan and adjustment log.
- `docs/training-log.md` — subjective/objective weekly review journal.
- `training-calendar.ics` — calendar version of the plan.

When plan changes are approved, update all relevant surfaces together:

1. `training-data.js`
2. `docs/training-plan.md`
3. `docs/training-log.md` when the change came from a review
4. affected HTML pages (`schedule.html`, `running.html`, `gym.html`, `zones.html`, `training-log.html`)
5. `training-calendar.ics`

## Coaching agreement

Simon wants guided coaching using Strava + WHOOP data to monitor progress and adjust the plan together. The assistant should be proactive, evidence-based, and conservative with injury/fatigue risk.

The assistant may:

- interpret training data and readiness
- recommend workout adjustments
- update logs after Simon gives subjective notes
- draft plan changes

The assistant should ask before applying non-trivial changes to the plan/calendar/dashboard.

## Coaching loop

### Daily readiness check

Use WHOOP recovery/sleep/HRV/RHR plus the current plan day.

Default decisions:

- Recovery >= 60%: proceed as planned, unless subjective notes indicate risk.
- Recovery 40–59%: keep easy work; reduce intensity/volume for key sessions.
- Recovery < 40%: no intensity; rest, walk, or very easy recovery only.
- 3+ consecutive days < 33%: flag for plan adjustment.

### Post-session review

Simon will usually send a short subjective breakdown after training. Treat that as the athlete note and combine it with Strava + WHOOP telemetry.

Expected short breakdown format, informal is fine:

- how it felt / RPE 1–10
- anything notable: niggle, fatigue, heat, fueling, mood, sleep, gear
- whether the planned session felt too easy / right / too hard

Use Strava for actual activity data and WHOOP for strain/load.

Capture:

- Planned vs actual
- Key metrics: distance, time, pace/power, HR, elevation, strain
- Simon's subjective note, lightly cleaned up but not over-written
- Whether this changes upcoming sessions

Default behavior: log the session first, then recommend any next-session adjustment separately.

### Sunday review

Scheduled for Sunday 19:00 Europe/Zurich in OpenClaw cron. The cron creates a dated Discord thread under parent Discord text channel `1467157917752098936` and posts the review there; the Strava/WHOOP discussion itself is already a thread, so it cannot contain child threads.

Every Sunday evening:

1. Pull last 7 days from Strava.
2. Pull WHOOP recovery/sleep/strain.
3. Compare against `training-data.js` and `docs/training-plan.md`.
4. Fill the weekly review template in `docs/training-log.md`.
5. Recommend either:
   - no change,
   - minor next-week adjustment,
   - formal plan update.
6. Ask Simon before applying non-trivial plan changes.

### Guardrails

- Do not chase missed volume automatically.
- Preserve Tuesday key sessions unless recovery or injury risk says otherwise.
- Easy/Z2 sessions are HR-controlled; threshold/tempo sessions are pace-controlled, HR-monitored.
- Treadmill sessions: Apple Fitness/GymKit distance is authoritative; Strava treadmill distance may overshoot.
- Long rides can replace aerobic stimulus but not run-specific connective-tissue loading.

## Data integrations

- Strava MCP: activities, streams, laps, routes, segments.
- WHOOP MCP: profile, body measurement, recovery, sleep, workout, cycles.

If OpenClaw gateway has not restarted after OAuth, direct MCP calls may work before in-chat tools do.
