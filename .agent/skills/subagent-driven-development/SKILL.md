---
name: subagent-driven-development
description: Use when executing implementation plans. Dispatches fresh subagents per task with a two-stage review process (spec compliance and code quality).
---

# Subagent-Driven Development (SDD)

## SDD Workflow

1. **Dispatch**: Spawn fresh subagent per task from `plan.md`.
2. **Review 1 (Spec)**: `@architect` validates requirements.
3. **Review 2 (Quality)**: `@spring-boot-engineer`/`@doc-expert` validates code/docs.
4. **Review 3 (Tests)**: Verify tests exist AND pass for the changed code.
   - Backend: `cd peluqueria-api && ./mvnw test -q`
   - Frontend: `cd peluqueria-client && npm test`
   - **IF no tests exist for the code** → Write them BEFORE marking complete.
   - **IF tests fail** → Fix before proceeding.
5. **Cleanup**: Mark task complete in `plan.md` + `implementation.md`.

## Laws

- **Strict Isolation**: One subagent = one task. No context carryover.
- **Copy-Paste**: Provide the subagent with the **task text**, not a file path to the plan.
- **Review Loop**: Fixes MUST be re-reviewed by the same agent persona.
- **Error Check**: Reviews MUST verify that user interactions have clear, personalized error messages.
- **Test Mandate**: Every task MUST have corresponding tests. No task is complete without passing tests.
