# Post-Tool Execution Hooks

**Goal**: Automate logging and state updates after every significant action.

## 1. Plan Tracker (Implementation Phase Only)
**Trigger**: After `write_to_file`, `replace_file_content`, or `run_command` (if successful).
**Logic**:
1.  **Identify Active Task**: Read `plan.md` to find the currently active task (the first unchecked box).
2.  **Status Update**:
    -   **Success**: Mark the task box as `[x]`. Add entry to `implementation.md` with:
        -   Task ID/Name.
        -   Files modified.
        -   Test result (if applicable).
    -   **Failure**: Mark the task box as `[-]` (Blocked/Failed). Add entry to `implementation.md` with:
        -   Error Log snippet.
        -   Retry Strategy (Iterate).

## 2. Submodule Sync
**Trigger**: After any `git commit` in a submodule (`x-api`, `x-backend`, etc.).
**Logic**:
-   Suggest running `git add x-<submodule>` in the root repo to keep pointers in sync.

## 3. Continuous Documentation
**Trigger**: After modifying any file that is NOT code (e.g., config, rules, schema).
**Logic**:
-   Invoke `@doc-expert` to update `README.md` or `ARCHITECTURE.md` if the change alters system behavior.
