---
description: Manually trigger the Design Phase (Phase 2).
---
# Design Workflow

**Goal**: Create `design.md` with technical specs.

## Arguments
-   **PATH** (Required): The active plan directory.

## Protocol
1.  **Read Context**: Read `$PATH/investigation.md`.
2.  **Assume Persona**: `@architect`.
3.  **Execute Design**:
    -   Define Schemas/Contracts.
    -   **GENERATE FILE**: `$PATH/design.md`.
4.  **Completion**:
    -   Output: "Phase 2 Complete for $PATH."
