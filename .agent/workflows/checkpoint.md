---
description: Creates a checkpoint snapshot of the current state.
---
# Checkpoint Command

## Usage
`/checkpoint <name-of-milestone>`

## Logic
Creates a git commit and logs the milestone in the orchestrator memory.

## Protocol
1.  **Git Snapshot**:
    `git add . && git commit -m "checkpoint: <name>"`
2.  **Verification**:
    Ensure the working directory is clean before proceeding to the next complex task.
