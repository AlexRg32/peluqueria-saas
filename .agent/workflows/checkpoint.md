---
description: Creates a checkpoint snapshot of the current state.
---
# Checkpoint Command

## Usage

`/checkpoint <name-of-milestone>`

## Logic

Verifies tests pass, then creates a git commit and logs the milestone in the orchestrator memory.

## Protocol

1. **Pre-Checkpoint Test Gate (MANDATORY)**:
    - If backend code was modified: `cd peluqueria-api && ./mvnw test -q`
    - If frontend code was modified: `cd peluqueria-client && npm test`
    - **IF tests fail** → **ABORT CHECKPOINT**. Fix the tests first.
2. **Git Snapshot (only after tests pass)**:
    `git add . && git commit -m "checkpoint: <name>"`
3. **Verification**:
    Ensure the working directory is clean before proceeding to the next complex task.
