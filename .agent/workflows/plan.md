---
description: Manually trigger the Planning Phase (Phase 3).
---
# Plan Workflow

**Goal**: Create `plan.md` with atomic tasks.

## Arguments
-   **PATH** (Required): The active plan directory.

## Protocol
1.  **Read Context**: Read `$PATH/design.md`.
2.  **Assume Persona**: `@planner`.
3.  **Execute Planning**:
    -   Use `writing-plans` skill.
    -   **GENERATE FILE**: `$PATH/plan.md`.
4.  **Completion**:
    -   Output: "Phase 3 Complete for $PATH."
