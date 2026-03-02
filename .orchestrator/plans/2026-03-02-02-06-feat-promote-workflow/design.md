# Design: Implement Promote Workflow

## Architecture Overview

The `.agent/workflows/promote.md` file defines a sequential process for an AI agent or developer to automatically verify and execute a merge from `staging` to `main`, simulating a release deployment.

## File Structure

- `.agent/workflows/promote.md` -> New file containing the markdown instructions for the AI orchestration system.

## Workflow Structure

The workflow will consist of 4 steps:

1. **Target Branch Selection**: Defaulting or detecting the target branch (e.g., from `staging` to `main`).
2. **Pre-flight Check**: Running `git log main..staging --oneline` to verify if there are actually changes to promote.
3. **Execution**: Pulling the latest changes of the origin branches, then merging `staging` into `main` without squashing. We keep the entire commit history from staging intact, but use a merge commit by default. Wait, `git pull` and `git merge` will be standard.
4. **Push**: Pushing the result to `main`.
5. **Rollback Instructions**: Informing the user what to do in case they need to rollback.

## Dependencies

- Uses git commands via `run_command`.
- Uses `turbo-all` annotation so the commands are executed directly.
