---
description: Manually trigger the Implementation Phase (Phase 4).
---
# Implementation Workflow

**Goal**: Execute code changes, write tests, verify they pass, AND maintain the audit trail.

## Arguments

- **PATH** (Required): The active plan directory.

## 🛑 DEFINITION OF DONE (CRITICAL)

Work is **NOT COMPLETE** until:

1. Every task in `$PATH/plan.md` matches `[x]` or `[-]`. No `[ ]` allowed.
2. `$PATH/implementation.md` contains a log of actions.
3. **ALL tests pass.** Both backend (`./mvnw test`) and frontend (`npm test`) must exit 0.
4. **MANDATORY**: The `docs/` folder has been updated to reflect all changes.

**IF YOU SKIP TESTS OR UPDATING DOCUMENTATION, YOU HAVE FAILED.**

## Protocol

1. **Initialize**:
    - Create `$PATH/implementation.md` with header.
2. **Execution Loop**:
    - **Read**: `$PATH/plan.md`.
    - **Find**: The first `- [ ] Task...`.
    - **Action**: Execute the code change (SDD).
    - **Test First (MANDATORY)**:
        - If the task touches backend code → run `cd peluqueria-api && ./mvnw test -q`.
        - If the task touches frontend code → run `cd peluqueria-client && npm test`.
        - If tests fail → **FIX BEFORE CONTINUING**. Do NOT mark the task `[x]`.
    - **Atomic Documentation (MANDATORY)**:
        - **IMMEDIATELY** after code edit + tests pass...
        - Edit `$PATH/plan.md` -> Mark `[x]`.
        - Append to `$PATH/implementation.md` -> "Completed Task X: [Details]. Tests: PASS ✅".
3. **Final Test Gate (MANDATORY — DO NOT SKIP)**:
    - After ALL tasks are `[x]`, run the **full test suite**:
        - `cd peluqueria-api && ./mvnw test`
        - `cd peluqueria-client && npm test`
    - **IF any test fails** → Fix it. Do NOT exit.
    - **IF all tests pass** → Append "✅ Final Test Gate: ALL TESTS PASS" to `$PATH/implementation.md`.
4. **Documentation Update (NON-NEGOTIABLE)**:
    - Go to the `docs/` folder.
    - Analyze which documents are affected by the changes.
    - Update them or create new ones as necessary.
    - **Verify**: Audit the documentation against the newly implemented code.
5. **Verification**:
    - Read `$PATH/plan.md` again.
    - Are there any `[ ]` left? -> **GO TO STEP 2**.
    - Are they all `[x]` AND Final Test Gate passed AND Documentation updated? -> **EXIT**.
