# Investigation: Test Tooling Setup

## Current State

### Backend (peluqueria-api) — ✅ READY

- **Framework**: Spring Boot 3.3.0, Java 17, Maven (via `./mvnw`)
- **Test deps installed**: `spring-boot-starter-test` (JUnit 5 + Mockito + AssertJ), `spring-security-test`
- **Test runner**: `./mvnw test` → passes (exit 0)
- **Existing tests**: Only auto-generated `PeluqueriaApplicationTests.java` (contextLoads)
- **Missing**: H2 in-memory database for isolated tests (currently uses PostgreSQL which requires Docker running)
- **Status**: Infrastructure ready. Needs H2 for test isolation.

### Frontend (peluqueria-client) — ❌ NOT CONFIGURED

- **Framework**: Vite 7.2.4, React 19.2.0, TypeScript
- **Test framework**: NONE installed
- **Test runner script**: NONE (`npm test` does not exist)
- **Config file**: `vite.config.js` (JavaScript, not TypeScript)
- **Path aliases**: `@/` → `src/` (configured in both vite.config.js and tsconfig.json)

### What Needs to Be Done

1. **Frontend**: Install Vitest + jsdom + React Testing Library + @testing-library/user-event
2. **Frontend**: Add Vitest config to `vite.config.js`
3. **Frontend**: Add `test` script to package.json
4. **Frontend**: Create a test setup file for jsdom globals
5. **Frontend**: Write a smoke test to verify the setup works
6. **Backend**: Add H2 dependency for test scope (in-memory DB for tests)
7. **Backend**: Create `application-test.yml` profile for H2 config
8. **Backend**: Fix existing `PeluqueriaApplicationTests` to use H2 test profile
