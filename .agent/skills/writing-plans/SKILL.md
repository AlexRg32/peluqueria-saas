---
name: writing-plans
description: Use when you have a spec or requirements for a task, BEFORE touching code. This is the tactical blueprint for all implementations.
---

# Writing Implementation Plans

## Rules

1. **Granularity**: Tasks MUST be 5-15 mins.
2. **EVERY task MUST include a test step**. No exceptions.
3. **Standard Loop (TDD — Non-Negotiable)**:
   - Write failing test (RED).
   - Minimal code (GREEN).
   - Verify (PASS) — run the actual test command.
   - Commit + `/checkpoint`.

## Plan Template

```markdown
# [Feature]
> Goal: [value]
> Architecture: [pattern]

### Task N: [File] — [Description]
1. Write failing test in `XyzTests.java` / `Xyz.test.tsx`.
2. Implement in `Xyz.java` / `Xyz.tsx`.
3. Run tests: `cd peluqueria-api && ./mvnw test -Dtest=XyzTests` / `cd peluqueria-client && npm test`.
4. Verify: tests pass ✅.
5. `git commit` + `/checkpoint`.
```

## Anti-Rationalization

- ❌ "This is just a UI change, no tests needed" — **NO. UI changes get component tests.**
- ❌ "This is just wiring, nothing to test" — **NO. Integration tests verify wiring.**
- ❌ "I'll add tests later" — **NO. Tests come FIRST (TDD). No test = no task completion.**
- ❌ "The test framework isn't set up" — **NO. Setting up the test framework IS a task in the plan.**
