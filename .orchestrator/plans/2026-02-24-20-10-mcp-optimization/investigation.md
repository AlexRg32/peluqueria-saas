# Investigation: MCP Tool Limit Conflict

**Goal**: Understand why the GitHub MCP was deactivated and how to re-enable it while managing the 100-tool limit.

## Context

The user recently added the **Render** MCP server. Upon doing so, the **GitHub** MCP server was automatically disabled with an error message:
> `error: cannot enable more tools because it would exceed the limit of 100`

## Analysis

### Tool Count Estimate

The system has a hard limit of **100 enabled tools**. The current configuration includes multiple MCP servers, each contributing a significant number of tools:

1. **Native Tools**: ~35 tools (e.g., `run_command`, `read_url_content`, `view_file`, etc.).
2. **StitchMCP**: 8 tools (UI/Design).
3. **Render MCP**: 24 tools (Deployments, Logs, Services).
4. **Supabase MCP**: 29 tools (Database, Migrations, Edge Functions).

**Current Active Total**: ~96 tools.

### Why GitHub was Deactivated

The **GitHub MCP** typically provides around **25-30 tools** (Issues, PRs, Search, Repository Management).
Adding GitHub would bring the total to ~121-126 tools, exceeding the 100-tool threshold. The system automatically disabled GitHub to maintain stability and comply with the limit.

## Findings

- **Limit**: 100 tools total across all MCP servers and native tools.
- **Degradation**: Even if the limit were higher, having > 50 tools can lead to decreased model accuracy ("Agent drift") where the model might pick the wrong tool or become confused.
- **Current Culprit**: The addition of Render and Supabase (which are very tool-heavy) filled up the available "budget".

## Recommendations

### Option 1: Temporary Deactivation (Recommended)

Disable the MCP servers you are not using in the current session.

- If you are focused on **coding and deployment**, keep GitHub, Render, and Supabase active, but disable **StitchMCP**. (Note: This only frees 8 slots, which might still not be enough for GitHub).
- If you are focused on **GitHub and Backend**, disable **Render** while you work.

### Option 2: Config Optimization

Modify `mcp_config.json` to toggle servers as needed.
Setting `"disabled": true` for a server effectively removes its tools from the count.

### Option 3: Filter Tools (Advanced)

If the MCP client supports it (check specific agent documentation), some clients allow an `include` or `exclude` list of tools to prevent loading everything.

## Next Steps

1. Verify the exact tool count for GitHub to see how many slots are needed.
2. Decide which current server to disable (e.g., `StitchMCP` or `render`).
3. Update `mcp_config.json` to reflect the chosen configuration.

Phase 1 Complete for /Users/alex32/Desktop/peluqueria-saas/.orchestrator/plans/2026-02-24-20-10-mcp-optimization.
