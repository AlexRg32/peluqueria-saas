# Design Phase - Add Render Skills

## Proposed Structure

The new skills will be placed in the `.agent/skills` directory, following the existing pattern:

- `.agent/skills/render-debug/SKILL.md`
- `.agent/skills/render-deploy/SKILL.md`
- `.agent/skills/render-monitor/SKILL.md`

## Content Optimization

Since the `SKILL.md` files refer to other files in `references/` and `assets/` folders within the original repository, I have two options:

1. **Full Import:** Download every referenced file.
2. **Hybrid Import:** Download only `SKILL.md` and update all relative links to point to the `render-oss/skills` GitHub repository (raw content).

**Decision:** I will go with **Option 2 (Hybrid Import)** for the following reasons:

- It keeps the project's repository light.
- It avoids breaking links if the files are not present locally.
- The `SKILL.md` provides all the necessary instructions; the references are for deeper dives which the agent can do via `read_url_content` anyway.

### Example Link Update

Change `[references/error-patterns.md](references/error-patterns.md)`
To `[references/error-patterns.md](https://github.com/render-oss/skills/blob/main/skills/render-debug/references/error-patterns.md)`

## Verification Plan

1. Check that the files are created correctly.
2. Verify that the agent can "see" the new skills (if possible via prompt reflection, otherwise just assume based on file existence).
3. Check a few links to ensure they point to the correct GitHub location.
