---
description: Commits and pushes changes to the main repository.
---
# Ship Workflow

**Goal**: Verify tests pass, then execute git commit and push only when explicitly called.

## Usage

Standard call: `/ship "commit message"`

## Protocol

1. **Pre-Ship Test Gate (MANDATORY)**:

   ```bash
   cd peluqueria-api && ./mvnw test -q
   ```

   ```bash
   cd peluqueria-client && npm test
   ```

   - **IF any test fails** → **ABORT SHIP**. Do NOT commit or push. Fix the tests first.

2. **Ship (only after tests pass)**:

   ```bash
   git add . && git commit -m "$1" && git push origin main
   ```

## Rule

**Never invoke this workflow automatically.** It must be triggered by a human user or an explicit command from the user.
**Never ship with failing tests.** If tests fail, the ship is cancelled.
