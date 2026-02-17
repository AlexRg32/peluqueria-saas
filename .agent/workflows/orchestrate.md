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

- **Command**: Invoke `/investigation PATH="$PLAN_PATH"`.

### Step B: Design

- **Command**: Invoke `/design PATH="$PLAN_PATH"`.

### Step C: Planning

- **Command**: Invoke `/plan PATH="$PLAN_PATH"`.

### Step D: Implementation & Verification

- **Command**: Invoke `/implementation PATH="$PLAN_PATH"`.
- **Validation (The Task Gate)**:
  - READ `$PLAN_PATH/plan.md`.
  - **IF** any `[ ]` exists:
    - **FAIL**: "Implementation incomplete. Tasks pending."
    - **ADVISE**: "Rerunning /implementation to finish tasks."

### Step E: Test Gate (MANDATORY — DO NOT SKIP)

- **This step runs AFTER implementation succeeds. It is NOT optional.**
- **Run the full test suite**:
  - Backend: `cd peluqueria-api && ./mvnw test`
  - Frontend: `cd peluqueria-client && npm test`
- **IF any test fails**:
  - **FAIL**: "Test Gate failed. Tests must pass before completion."
  - **ACTION**: Fix the failing tests and re-run.
- **IF all tests pass**:
  - **PASS**: "✅ Test Gate passed. All tests green."

## Rules

- **Never invoke a sub-workflow without appending the PATH.**
- **TESTS ARE NON-NEGOTIABLE**: No feature is complete without passing tests. If tests don't exist for the code being written, they must be created.
- **COMPONENTIZATION**: In React, always split logic and UI into separate components whenever logical, viable, and sensible.
- **DESTRUCTIVE ACTIONS**: Always implement a confirmation modal when deleting any resource to ensure user intent and prevent data loss.
