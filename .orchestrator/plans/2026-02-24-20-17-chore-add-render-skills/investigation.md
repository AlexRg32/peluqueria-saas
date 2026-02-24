# Investigation Phase - Add Render Skills

## Objective

Add the most starred Render-related skills from GitHub to the project's `.agent/skills` configuration.

## Findings

From the search results, the most relevant repository is `render-oss/skills`.
This repository contains three main skills:

1. `render-debug`: For debugging failed deployments.
2. `render-deploy`: For deploying applications using Blueprints or Direct Creation.
3. `render-monitor`: For real-time monitoring of service health and metrics.

### Skill 1: render-debug

- **Description:** Debug failed Render deployments by analyzing logs, metrics, and database state.
- **Key Features:** Identifies common errors (missing env vars, port binding, OOM, etc.).
- **Dependencies:** Render MCP tools or CLI.

### Skill 2: render-deploy

- **Description:** Deploy applications to Render via Blueprints or Direct Creation.
- **Key Features:** Codebase analysis, Blueprint generation (`render.yaml`), and Dashboard deeplinks.
- **Dependencies:** Render MCP tools or CLI.

### Skill 3: render-monitor

- **Description:** Monitor Render services in real-time.
- **Key Features:** Health checks, performance metrics, and resource usage monitoring.
- **Dependencies:** Render MCP tools or CLI.

## Proposed Action Plan

1. Create directories for each skill in `.agent/skills/`.
2. Download the `SKILL.md` content for each skill.
3. (Optional) Download key reference files or update links to point to the GitHub repository to avoid broken links.
4. Update the project's `.agent` configuration if necessary (though skills are usually auto-discovered if placed in the right directory).

## Conclusion

The identified skills are highly relevant for a project deployed on Render. They leverage the already configured Render MCP tools.
