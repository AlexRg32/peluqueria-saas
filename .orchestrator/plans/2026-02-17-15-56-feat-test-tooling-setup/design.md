# Design: Test Tooling Setup

## Goal

Configure the complete test infrastructure for both frontend and backend so that `./mvnw test` and `npm test` work reliably in isolation (no external dependencies required).

## Frontend Strategy

### Dependencies

- `vitest` — Test runner (native Vite integration, no extra config overhead)
- `jsdom` — DOM environment for component testing
- `@testing-library/react` — React component testing utilities
- `@testing-library/jest-dom` — DOM assertion matchers (toBeInTheDocument, etc.)
- `@testing-library/user-event` — Simulates real user interactions

### Configuration

- Add `test` block to existing `vite.config.js` with `environment: 'jsdom'`
- Create `src/test/setup.ts` for global test setup (import jest-dom matchers)
- Add `"test": "vitest run"` script to `package.json`
- Include `src/test/setup.ts` in tsconfig

### Smoke Test

- Create `src/App.test.tsx` that renders `<App />` and verifies it mounts without crashing

## Backend Strategy

### Dependencies

- `com.h2database:h2` (scope: test) — In-memory database for isolated tests

### Configuration

- Create `src/test/resources/application-test.yml` with H2 config
- Use `@ActiveProfiles("test")` on test classes to activate H2 profile

### Existing Test Fix

- Update `PeluqueriaApplicationTests.java` to use `@ActiveProfiles("test")` so it loads H2 instead of requiring PostgreSQL

## Verification Criteria

- `cd peluqueria-client && npm test` → exits 0 with 1 passing smoke test
- `cd peluqueria-api && ./mvnw test` → exits 0 with contextLoads passing on H2
