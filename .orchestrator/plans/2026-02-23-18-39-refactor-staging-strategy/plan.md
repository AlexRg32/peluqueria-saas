# Plan: Staging Strategy implementation

> Goal: Implement a two-branch strategy (main/staging) in workflows and documentation.
> Architecture: feature -> staging -> main.

## Foundation

- [x] **Task 1: Update Infrastructure Doc** — `docs/07-infraestructura.md`
  - What: Update the document to include Staging and Production environment details.
  - Verify: Read the file and check for the new sections.

## Core

- [x] **Task 2: Update Forge Workflow** — `.agent/workflows/forge.md`
  - What: Change base branch from `main` to `staging`.
  - Verify: Check lines 16-17 of the file.
- [x] **Task 3: Update Ship Workflow** — `.agent/workflows/ship.md`
  - What:
    - `Step 1A`: Update warning if on `staging` (instead of `main`).
    - `Step 3`: Change `git checkout main` to `git checkout staging`.
    - `Step 3`: Change `git pull origin main` to `git pull origin staging`.
    - `Step 4`: Change `git push origin main` to `git push origin staging`.
  - Verify: Check lines 32, 78-79, 85, 98, 120, 122, 131, 132 of the file.
- [x] **Task 4: Update Vision Doc** — `docs/01-vision-general.md`
  - What: Add a note about the staging/production flow.
  - Verify: Read the file.

## Integration & Polish

- [x] **Task 5: Final Review** — `status.md`
  - What: Clean up and final status update.
  - Verify: Workspace is clean and consistent.
- [x] **Task 6: Create Promote Workflow** — `.agent/workflows/promote.md`
  - What: Implementation of the staging-to-main promotion command.
  - Verify: Check file contents.
