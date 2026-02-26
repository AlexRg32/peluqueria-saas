# Plan: Fix Render Deploys (Frankfurt)
>
> Goal: Fix the missing `rootDir` configuration for Frankfurt services.
> Architecture: Render Web Services for a Java Monorepo.

## Foundation

- [x] **Task 1: Create render.yaml Blueprint** — `render.yaml`
  - What: Define the production and staging services for the Frankfurt region with the correct `rootDir` and build settings.
  - Verify: Ensure the file exists and has the correct YAML structure.

## Integration

- [ ] **Task 2: Inform User & Proactive Fix** — `status.md`
  - What: Explain the findings to the user and suggest they update the `rootDir` manually since the current API tools are limited, or use the new Blueprint.
  - Verify: User confirms they can see the issue.

## Implementation & Verification

- [ ] **Task 3: Trigger Build (if possible)** — N/A
  - What: Use the API to trigger a manual deploy after the user has updated the settings (or I try to push the change).
  - Verify: Monitor build status.
