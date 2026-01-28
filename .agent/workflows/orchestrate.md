---
description: Master Loop that manages the state of the project.
---
# Orchestrate Workflow

**Goal**: Initialize workspace and dispatch sub-workflows with EXPLICIT PATHS.

## 1. Setup Workspace Only
Analyze Intent (`feat`, `fix`, `docs`) + Slug.

```bash
# ONLY CREATE THE DIRECTORY.
export PLAN_PATH=".orchestrator/plans/$(date +'%Y-%m-%d-%H-%M')-<TYPE>-<SLUG>" && \
mkdir -p "$PLAN_PATH" && \
echo "Workspace Ready: $PLAN_PATH"
```

## 2. Dispatch Loop (Explicit Path Injection)
The Agent MUST pass the `$PLAN_PATH` to every sub-workflow.

### Step A: Investigation
-   **Command**: Invoke `/investigation PATH="$PLAN_PATH"`.

### Step B: Design
-   **Command**: Invoke `/design PATH="$PLAN_PATH"`.

### Step C: Planning
-   **Command**: Invoke `/plan PATH="$PLAN_PATH"`.

### Step D: Implementation & Verification
-   **Command**: Invoke `/implementation PATH="$PLAN_PATH"`.
-   **Validation (The Quality Gate)**:
    -   READ `$PLAN_PATH/plan.md`.
    -   **IF** any `[ ]` exists:
        -   **FAIL**: "Implementation incomplete. Tasks pending."
        -   **ADVISE**: "Rerunning /implementation to finish tasks."

## Rule
**Never invoke a sub-workflow without appending the PATH.**
