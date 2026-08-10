# Swiss Alps 100 Archive

Read-only public archive for Simon’s completed Swiss Alps 100K:

- Final result: **102.89 km · 5,817 m gain · 23:50:52 elapsed**
- Public domain: https://swissalps100.siwachter.com
- Deployment: Dokploy project **Swiss Alps 100**, app **Swiss Alps 100 Dashboard**

## Public routes

- `/` — post-race archive landing page
- `/race-plan.html` — frozen race-day plan: historic target, route, fueling, crew/pacer plan, and kit
- `/training/` — historical training dashboard
- `/training/race-debrief.html` — race telemetry, lessons, recovery snapshot, and next-time playbook

## Running locally

```bash
node server.js
# http://localhost:3000
```

The server intentionally serves only static archive assets. There is no live tracker, Crew PIN, state API, writable volume, or external data dependency.
