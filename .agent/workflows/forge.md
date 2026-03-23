---
description: Full-cycle forge — codebase awareness, structured templates, checkpoints, and quality gates.
---

// turbo-all

# Forge Workflow

**Goal**: Drive a task from request to shipping-ready code with **codebase awareness**, **structured phase outputs**, **automatic checkpoints**, and **build verification**. This file is self-contained — it overrides the thin sub-workflow defaults with richer inline instructions.

---

## Phase 0: Setup Workspace & Branch

**Input Assessment**: Determine if the user is asking to implement a new feature from scratch, or to execute/resume a previously generated plan.

### Scenario A: Execute recent plan / Resume

If the user asks to "execute", "resume", "implement the plan", or similar, OR if they provided a `PATH`:

1. If a `PATH` was provided, use it. Otherwise, automatically find the most recently created directory in `.orchestrator/plans/` and set `PLAN_PATH` to it: `export PLAN_PATH=$(ls -td .orchestrator/plans/* | head -1)`
2. Check Git Branch: run `git branch --show-current`. If the current branch is `main`, create a new feature branch to protect the integration branch: `git checkout -b "feat/resume-$(date +'%H%M')"`.
3. Jump directly to the **## Recovery & Resume** section at the bottom of this file. Do NOT re-initialize folders or status files.

### Scenario B: New Feature (Default)

If the user provides a new feature request instead, analyze Intent (`feat`, `fix`, `refactor`, `docs`, `chore`) + Slug.

1. **Initialize Git Branch**:

   ```bash
   git checkout main && \
   git pull origin main && \
   export BRANCH_NAME="<TYPE>/<SLUG>-$(date +'%H%M')" && \
   git checkout -b "$BRANCH_NAME"
   ```

   If `main` does not exist locally, create tracking first:

   ```bash
   git fetch origin main && \
   git checkout -b main --track origin/main
   ```

2. **Initialize Workspace Directory**:

   ```bash
   export PLAN_PATH=".orchestrator/plans/$(date +'%Y-%m-%d-%H-%M')-<TYPE>-<SLUG>" && \
   mkdir -p "$PLAN_PATH" && \
   echo "Workspace Ready: $PLAN_PATH on branch $BRANCH_NAME"
   ```

3. **Create Status Tracker** — Create `$PLAN_PATH/status.md`:

   ```markdown
   # Status: <SLUG>
   | Phase          | Status  |
   |----------------|---------|
   | Investigation  | pending |
   | Design         | pending |
   | Plan           | pending |
   | Implementation | pending |

   Branch: `<BRANCH_NAME>`
   Created: <ISO_TIMESTAMP>
   ```

---

## Phase 1: Investigation (Enhanced)

> Uses: `software-architecture` skill

### 1A — Codebase Scan (MANDATORY)

Before analyzing the request, **understand what already exists**:

1. **CRITICAL: Analyze Documentation**: Read ALL files in the `docs/` folder FIRST, starting with `00-general-docs.md`. This is the source of truth for the project context. Do not skip.
2. List top-level files/dirs → detect tech stack (`package.json`, `pom.xml`, `Dockerfile`, etc.).
3. Map folder structure → identify architecture pattern (monorepo, feature-based, layered).
4. Read key configs → `tsconfig.json`, `application.yml`, `.env.example`, etc.
5. Check existing conventions → linters, formatters, test patterns, naming.

### 1B — Deep Analysis

Answer these five questions:

1. **What** is being requested? (clear problem statement)
2. **Why** is it needed? (business value / user impact)
3. **Where** does it fit? (which modules/layers are affected)
4. **What exists** that can be reused or extended?
5. **What are the risks** and edge cases?

### 1C — Generate `$PATH/investigation.md`

```markdown
# Investigation: [Name]

## Summary
> One-paragraph description of what we're building and why.

## Current State
- **Tech Stack**: [detected]
- **Relevant Code**: [files/modules that will be affected]
- **Architecture**: [current pattern]

## Requirements
### Functional
- [ ] Requirement 1
- [ ] Requirement 2

### Non-Functional
- Performance: [constraints if any]
- Security: [considerations if any]

## Scope
### In Scope
- ...

### Out of Scope
- ...

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| ...  | ...    | ...        |

## Recommendation
> Recommended approach and reasoning.
```

### 1D — Checkpoint

Update `$PLAN_PATH/status.md` → Investigation: `done`.

---

## Phase 2: Design (Enhanced)

> Uses: `software-architecture`, `api-patterns`, `database-design`, `frontend-dev-guidelines`, `backend-dev-guidelines`, `stitch-designs` skills

### 2A — Read `$PATH/investigation.md`

### 2B — Generate `$PATH/design.md`

```markdown
# Design: [Name]

## Architecture Overview
> How this feature fits into the existing architecture.

## Data Model (if applicable)
| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| ...    | ...       | ...           |

## API Contracts (if applicable)
| Method | Path | Body | Response | Auth |
|--------|------|------|----------|------|
| ...    | ...  | ...  | ...      | ...  |

## Component Design (if frontend)
### Component Tree
[ASCII tree of components with logic/presentation split]

### State Management
- Local state: [what/where]
- Server state: [cache keys]

## File Structure
[Tree showing new/modified files and where they go]

## Dependencies
- New packages: [with justification]
- Existing packages used: [list]

## Testing Strategy
- Unit: [what]
- Integration: [what]
```

**MODULARITY CHECK**: If React, verify every complex component is split into hook (logic) + presentation.

### 2C — Checkpoint

Update `$PLAN_PATH/status.md` → Design: `done`.

---

## Phase 3: Planning (Enhanced)

> Uses: `writing-plans` skill

### 3A — Read `$PATH/design.md` (and reference `investigation.md`)

### 3B — Generate `$PATH/plan.md`

Each task MUST be:

- **Atomic**: One concern per task (single file or tightly coupled pair).
- **Time-boxed**: 5-15 minutes.
- **Ordered**: Dependency order — foundations first, features second, integrations last.
- **Verifiable**: Every task has a way to confirm it worked.

```markdown
# Plan: [Name]
> Goal: [one-line from investigation]
> Architecture: [from design]

## Foundation

- [ ] **Task 1: [Name]** — `[target file(s)]`
  - What: [specific action]
  - Verify: [how to confirm]

## Core

- [ ] **Task 2: [Name]** — `[target file(s)]`
  - What: [specific action]
  - Verify: [how to confirm]

## Integration & Polish

- [ ] **Task N: [Name]** — `[target file(s)]`
  - What: [specific action]
  - Verify: [how to confirm]
```

**Validation before proceeding**:

- [ ] Every task has What + Verify.
- [ ] Tasks are in dependency order.
- [ ] No task exceeds ~15 min.
- [ ] Destructive operations include confirmation UI task.

### 3C — Checkpoint

Update `$PLAN_PATH/status.md` → Plan: `done`.

---

## Phase 4: Implementation (Enhanced)

> Uses: `subagent-driven-development`, `clean-code`, `testing-patterns` skills

### 🛑 DEFINITION OF DONE

Work is **NOT COMPLETE** until:

1. Every task in `$PATH/plan.md` is `[x]` or `[-]`. **No `[ ]` allowed.**
2. `$PATH/implementation.md` contains a log of all actions.
3. **DOCUMENTATION IS UPDATED**: Relevant files in `docs/` have been updated to reflect the changes.
4. The project **builds without errors**.

### 4A — Initialize `$PATH/implementation.md`

```markdown
# Implementation Log: [Name]
> Started: [timestamp]
> Tasks: [count]
---
```

### 4B — Execution Loop (SDD)

For each `- [ ]` task in `plan.md`:

1. **Read** → Find first unchecked task.
2. **Execute** → Write the code (using SDD per task).
3. **Verify** → Run the task's Verify clause.
4. **Document** (IMMEDIATELY after):
   - `plan.md` → Mark `[x]`.
   - `implementation.md` → Append: `### Task N: [Name] ✅ — Files: [list]`.
5. **Loop** → Any `[ ]` left? Go to step 1.

### 4C — Build Verification

After all tasks complete, run the appropriate build/test command:

```bash
# Node.js
npm run build 2>&1 || echo "BUILD_FAILED"

# Java/Spring Boot
# mvn compile test 2>&1 || echo "BUILD_FAILED"
```

If build fails → fix issues before proceeding.

### 4D — Documentation Update

Update any files in the `docs/` folder that are affected by this task (e.g., API contracts, architecture diagrams, data models, or business rules). Technical documentation MUST match the current implementation.

### 4E — Finalize

Append to `$PATH/implementation.md`:

```markdown
---
## Summary
- Completed: [N] tasks
- Skipped: [N] (reasons)
- Build: PASS/FAIL
- Finished: [timestamp]
```

### 4F — Checkpoint

Update `$PLAN_PATH/status.md` → Implementation: `done`.

---

## Phase 5: Wrap-Up

After all phases complete, present to the user:

1. **Branch**: `$BRANCH_NAME` — ready for review.
2. **Files changed**: List of created/modified files.
3. **Skipped items**: Any `[-]` tasks with reasons.
4. **Next step**: Suggest `"/ship '<commit message>'"` when ready.

---

## Recovery & Resume

If orchestration is interrupted or re-invoked for the same plan:

1. Read `$PLAN_PATH/status.md`.
2. Find the first phase with status `pending`.
3. Resume from that phase — **do NOT re-run completed phases**.

---

## Global Rules

- **GITIGNORE COMPLIANCE**: **STRICTLY FORBIDDEN** to use `git add -f`. Never force the commitment of files or directories defined in `.gitignore` (especially `.orchestrator/`, `.tanstack/`, or similar cache/tool dirs).
- **NO AUTOMATIC COMMITS/PUSHES**: **STRICTLY FORBIDDEN** to run `git commit` or `git push` automatically within this workflow. Development changes must remain as uncommitted changes in the local working directory.
- **MANUAL SHIPPING ONLY**: The only workflows allowed to commit or push are `/ship` and `/pr`, both of which require explicit human confirmation of the commit message.
- **PATH Injection**: Never invoke a sub-workflow without `PATH="$PLAN_PATH"`.
- **COMPONENTIZATION**: In React, split logic (hooks) and UI (components) whenever logical and sensible.
- **DESTRUCTIVE ACTIONS**: Always implement a confirmation modal when deleting any resource.
- **Skill Map**:
  - Phase 1 → `software-architecture`
  - Phase 2 → `software-architecture`, `api-patterns`, `database-design`, `frontend-dev-guidelines`, `backend-dev-guidelines`, `stitch-designs`, `landing-page-anatomy`, `premium-animations`, `advanced-tailwind-styling`
  - Phase 3 → `writing-plans`
  - Phase 4 → `subagent-driven-development`, `clean-code`, `testing-patterns`
- **AUTOPILOT**: Proceed through ALL phases (0 through 4) sequentially and automatically. Do NOT stop to ask for permission for anything (including analyzing code or creating/writing files) unless a critical/unresolvable blocker occurs.
- **NO PERMISSIONS**: Never ask "Is it okay if I create this file?" or "Should I start the analysis?". Just do it.
- **SAFE TO AUTO-RUN**: All commands in this workflow (git branch, mkdir, git commit checkpoints, etc.) are explicitly safe. Use `SafeToAutoRun: true` for all tool calls to avoid interrupting the user.
- **Codebase-First**: Phase 1 MUST scan the existing codebase and `docs/` folder before making any decisions.
