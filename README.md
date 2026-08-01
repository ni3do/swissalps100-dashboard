# Swiss Alps 100 Dashboard

Public static race dashboard for Simon's Swiss Alps 100K race plan.

- Target finish: 20 hours
- Domain: https://swissalps100.siwachter.com
- Deployment: Dokploy project `Swiss Alps 100`, app `Swiss Alps 100 Dashboard`

## Running

Node server (static files + shared tracking state API):

```bash
TRACKING_PIN=<crew pin> node server.js   # http://localhost:3000
```

- `GET /api/state` — public tracking state (JSON)
- `POST /api/state` — save state; body must include `"pin"` matching `TRACKING_PIN`. Writes are disabled (503) if the env var is unset.
- State persists to `DATA_FILE` (default `./data/state.json`, `/data/state.json` in Docker).

Dokploy: build from the `Dockerfile`, set `TRACKING_PIN`, and mount a volume at `/data` so tracking survives redeploys. Without the server (e.g. opening `index.html` directly) the dashboard still works, falling back to browser-local tracking.
