# Akira Code

AI PMO service with health monitoring.

## Quick Start

```bash
npm install
npm start        # starts on port 3000
npm test         # runs test suite
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Hello World |
| GET | `/health` | Health check — returns status, uptime, version, timestamp |

## Health Check Response

```json
{
  "status": "ok",
  "uptime_seconds": 42,
  "version": "1.0.0",
  "timestamp": "2026-02-12T10:36:00.000Z"
}
```
