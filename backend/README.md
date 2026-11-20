# Employee Directory — Interview Practice Backend

A deliberately simple Express + TypeScript API for practicing React frontend interviews.

## Run

```bash
npm install
npm run dev
```

Server: `http://localhost:3001` (override with `PORT`). CORS allows `http://localhost:5173`.

## Endpoints

- `GET /api/health` — `{ "status": "ok" }`
- `GET /api/employees` — array of 12 employees
- `GET /api/employees/:id` — one employee; invalid ID -> 400, unknown ID -> 404

Example employee:

```json
{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice.johnson@northstar.example",
  "department": "Engineering",
  "role": "Frontend Engineer",
  "company": { "name": "Northstar Labs" }
}
```

## Verify

```bash
npm run typecheck
npm test
```

## Frontend challenge

Create a Vite React + TypeScript frontend in a sibling `frontend/` folder. Start with fetching, loading, error and list display. Later rounds will add filter/find/sort, tests, performance and cancellation. Do not pre-implement the later rounds.
