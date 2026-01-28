---
description: Manually trigger the Implementation Phase (Phase 4).
---
# Implementation Workflow

**Goal**: Execute code changes AND maintain the audit trail.

## Arguments
-   **PATH** (Required): The active plan directory.

## 🛑 DEFINITION OF DONE (CRITICAL)
Work is **NOT COMPLETE** until:
1.  Every task in `$PATH/plan.md` matches `[x]` or `[-]`. No `[ ]` allowed.
2.  `$PATH/implementation.md` contains a log of actions.

**IF YOU SKIP UPDATING THESE FILES, YOU HAVE FAILED.**

## Protocol
1.  **Initialize**:
    -   Create `$PATH/implementation.md` with header.
2.  **Execution Loop**:
    -   **Read**: `$PATH/plan.md`.
    -   **Find**: The first `- [ ] Task...`.
    -   **Action**: Execute the code change (SDD).
    -   **Atomic Documentation (MANDATORY)**:
        -   **IMMEDIATELY** after the code edit...
        -   Edit `$PATH/plan.md` -> Mark `[x]`.
        -   Append to `$PATH/implementation.md` -> "Completed Task X: [Details]".
3.  **Verification**:
    -   Read `$PATH/plan.md` again.
    -   Are there any `[ ]` left? -> **GO TO STEP 2**.
    -   Are they all `[x]`? -> **EXIT**.
