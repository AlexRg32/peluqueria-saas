# Investigation: Implement Promote Workflow

## Summary

The user requested the implementation of a `promote` workflow that merges the staging or current branch into `main`. Looking back at the repository's history, the project previously contained a `.agent/workflows/promote.md` workflow that promoted the `staging` branch to the `main` (production) branch. This was deleted during the recent `.agent` workspace rewrite. We need to restore and adapt it to the current schema.

## Current State

- **Tech Stack**: Markdown workflow inside the `.agent/workflows` directory.
- **Relevant Code**: `.agent/workflows/promote.md`.
- **Architecture**: AI orchestrator workflows.

## Requirements

### Functional

- [x] Create the `.agent/workflows/promote.md` file.
- [x] Configure it to switch to `main`, pull its latest changes, and merge `staging` into `main`.
- [x] Include turbo tags so it can be executed automatically.
- [x] Perform pre-flight checks (verify there are commits to promote).

### Non-Functional

- The workflow should be documented clearly for the user and adhere to standard formatting.
- Fail safely if there are merge conflicts.

## Scope

### In Scope

- Creating the `promote` workflow.

### Out of Scope

- Codebase logic.

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Merging conflicts cause the agent to fail mid-process | Medium | The workflow will include explicit instructions for the agent to STOP and report conflicts so the user can resolve them manually. |

## Recommendation

Re-create the `promote.md` file following the schema seen in `ship.md` but specifically addressing branch-to-branch promotion (e.g. from `staging` to `main`) instead of feature-branch shipping.
