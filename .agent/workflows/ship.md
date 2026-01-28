---
description: Commits and pushes changes to the main repository.
---
# Ship Workflow

**Goal**: Execute git commit and push only when explicitly called.

## Usage

Standard call: `/ship "commit message"`

## Unified Command

```bash
git add . && git commit -m "$1" && git push origin main
```

## Rule

**Never invoke this workflow automatically.** It must be triggered by a human user or an explicit command from the user.
