---
description: Manually trigger the Investigation Phase (Phase 1).
---
# Investigation Workflow

**Goal**: Create `investigation.md` with deep analysis.

## Arguments
-   **PATH** (Required): The absolute or relative path to the plan directory.
    -   *Example*: `.orchestrator/plans/2026-01-28-feat-login`

## Protocol
1.  **Validate Path**: Check if directory `$PATH` exists.
2.  **Assume Persona**: `@architect`.
3.  **Execute Analysis**:
    -   Analyze the request.
    -   **GENERATE FILE**: `$PATH/investigation.md`.
4.  **Completion**:
    -   Output: "Phase 1 Complete for $PATH."
