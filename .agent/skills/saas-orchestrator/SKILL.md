---
name: saas-orchestrator
description: Use this skill to ORCHESTRATE the entire lifecycle of a SaaS product: from Definition and Design to Planning and Implementation.
---

# SaaS Orchestrator Framework

## Overview

## Execution Loop (One-Liners Only)

### Phase 1: Initialize & Investigate

- **Context**: `research.md`.
- **Run this to start**:
`DIR=".orchestrator/plans/$(date +'%Y-%m-%d-%H-%M')-<slug>" && mkdir -p "$DIR" && touch "$DIR"/{investigation.md,design.md,plan.md,implementation.md}`

### Phase 2: Design

- **Context**: `research.md`.
- **Invoke**: `@architect`. Output MUST be a concise `design.md` with API Endpoints/Schemas.

### Phase 3: Planning

- **Context**: `research.md`.
- **Invoke**: `@planner`. REQUIRED: Use `writing-plans` skill. Output: `plan.md` (tasks < 15min).

### Phase 4: Implementation (SDD Mode)

- **Context**: `development.md`.

1. **Dispatch**: For each task in `plan.md`, spawn a subagent.
2. **Review (Context: `review.md`)**: `@architect` (spec) then `@spring-boot-engineer` (quality).
3. **Commit**: Wait for User to trigger `/ship "<msg>"`. NEVER auto-commit.

## Token Optimization Rules

- **No Small Talk**: Skip intros/outros. Go straight to tool calls.
- **Batched Logic**: Use `&&` to combine shell commands (mkdir, touch, cd).
- **Curation**: Only read files explicitly mentioned in the active task.

## Workflow Example

**User:** "Admin Dashboard for Users."

**Agent Action:**

1. **Boot**: `mkdir -p .orchestrator/plans/2026-01-28-14-30-admin-dashboard`
2. **Phase 1**: Research Admin needs. Write `investigation.md`.
3. **Phase 2**: Define `User` REST endpoints and Mockup UI. Write `design.md`.
4. **Phase 3**: Plan: "1. Mod peluqueria-api, 2. Mod peluqueria-client, 3. E2E Test". Write `plan.md`.
5. **Phase 4**: Execute. Log results to `implementation.md`.

- **Specialized Agents** (See `.agent/agents/`):
  - `@architect` (`architect.md`): For system design.
  - `@planner` (`planner.md`): For breakdown.
  - `@spring-boot-engineer` (`spring-boot-engineer.md`): For Java/Spring Boot code.
  - `@frontend-master` (`frontend-master.md`): For React code.
  - `@doc-expert` (`doc-expert.md`): For docs.
- **Behavioral Contexts**:
  - `research`: Active during Phases 1 & 2. Focus on discovery.
  - `subagent-driven-development`: For high-quality, task-isolated execution.
  - `parallel-orchestration`: For multi-agent analysis and review.
- **Engineering Standards**:
  - `backend-dev-guidelines`: Spring Boot / Java.
  - `frontend-dev-guidelines`: React/TS/Suspense architecture.
  - `api-patterns`: REST/GraphQL contracts & versioning.
  - `database-design`: Schema modeling & Prisma patterns.
  - `software-architecture`: Clean Architecture & DDD.
  - `api-security-best-practices`: OWASP & Auth hardening.
  - `clean-code`: General coding standards.
  - `git-commit-formatter`: Conventional commits.

## Custom Commands

- `/feature <slug>`: Setup workspace.
- `/orchestrate <name>`: Full bootstrap.
- `/checkpoint <name>`: Save state.

## Common Mistakes

- **Skipping Logging**: NEVER work without creating the `.orchestrator/plans/...` directory first.
- **Direct Commits**: NEVER commit code without having the `design.md` and `plan.md` approved (or at least written) first.
- **Submodule Confusion**: Remember that modifying a file in `peluqueria-api/` requires TWO commits (one inside `peluqueria-api`, one in root to update the pointer).
