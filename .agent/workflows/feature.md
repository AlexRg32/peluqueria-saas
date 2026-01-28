---
description: Initialize a new feature workspace without full orchestration.
---
# Feature Workflow

**Goal**: Create a new plan directory and return its PATH.

## Usage
`/feature <slug>`

## Protocol
1.  **Generate Path**:
    ```bash
    PLAN_PATH=".orchestrator/plans/$(date +'%Y-%m-%d-%H-%M')-<SLUG>" && \
    mkdir -p "$PLAN_PATH" && \
    echo "$PLAN_PATH"
    ```
2.  **Output**: Simply return the path string.
3.  **Next Step**: User or Agent should then call `/investigate PATH=$PLAN_PATH`.
