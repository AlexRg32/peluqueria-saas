---
description: Promote changes from staging to main (Production).
---
# Promote Workflow

**Goal**: Promote the current state of the `staging` branch to `main` (Production) after validation.

// turbo-all

## Step 1: Pre-Flight Checks

### 1A — Environment Check

```bash
git fetch origin main staging
```

### 1B — Verification

Check if there are changes to promote:

```bash
git log main..staging --oneline
```

- If empty → **ABORT**. "Staging is already up to date with main. Nothing to promote."

## Step 2: Merge Staging into Main

```bash
git checkout main && \
git pull origin main && \
git merge staging && \
git push origin main
```

- If merge conflicts → **STOP**. "⚠️ Merge conflicts between staging and main. Please resolve them manually."

## Step 3: Cleanup

```bash
git checkout staging
```

## Step 4: Summary

Present a summary of promoted changes:

```text
🚀 Promotion Complete!
─────────────────────────────
  From: staging
  To:   main (Production)
  Status: Pushed to origin/main ✓
─────────────────────────────
```
