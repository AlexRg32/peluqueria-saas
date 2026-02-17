# Test Tooling Setup
>
> Goal: Configure test infrastructure so `npm test` and `./mvnw test` work in isolation
> Architecture: Vitest + RTL (frontend), JUnit 5 + H2 (backend)

### Task 1: Install frontend test dependencies

1. Run `npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event` in `peluqueria-client`.
2. Verify packages appear in `package.json` devDependencies.

- [x] Complete

### Task 2: Configure Vitest in vite.config.js

1. Add `/// <reference types="vitest" />` at top of `vite.config.js`.
2. Add `test: { globals: true, environment: 'jsdom', setupFiles: './src/test/setup.ts' }` to the config.
3. Add `"test": "vitest run"` script to `package.json`.

- [x] Complete

### Task 3: Create test setup file

1. Create `src/test/setup.ts` that imports `@testing-library/jest-dom`.
2. Update `tsconfig.json` to include `"src/test"` in the `include` array.

- [x] Complete

### Task 4: Write frontend smoke test and verify

1. Create `src/App.test.tsx` with a basic render test.
2. Run `npm test` and verify exit code 0.

- [x] Complete

### Task 5: Add H2 to backend for test isolation

1. Add `com.h2database:h2` dependency with `<scope>test</scope>` to `pom.xml`.
2. Create `src/test/resources/application-test.yml` with H2 datasource config.

- [x] Complete

### Task 6: Fix backend test to use H2 profile and verify

1. Add `@ActiveProfiles("test")` to `PeluqueriaApplicationTests.java`.
2. Run `./mvnw test` and verify exit code 0 (no PostgreSQL required).

- [x] Complete
