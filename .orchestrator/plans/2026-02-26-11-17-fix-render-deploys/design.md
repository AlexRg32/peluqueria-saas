# Design: Fix Render Deploys (Frankfurt)

## Architecture Overview

The current architecture uses a monorepo structure where the backend API is in the `peluqueria-api` subdirectory. Render services must be configured with this `rootDir` to correctly locate the `Dockerfile` and build context.

## Infrastructure Changes

We will update the Render service metadata for the Frankfurt region services.

| Service ID | Service Name | Current rootDir | Target rootDir |
|------------|--------------|-----------------|----------------|
| `srv-d6ff2apaae7s7391838g` | `peluqueria-saas-prod-fra` | `""` | `"peluqueria-api"` |
| `srv-d6ff284r85hc73baut20` | `peluqueria-saas-staging-fra` | `""` | `"peluqueria-api"` |

## Implementation details

We will use the Render MCP tools to update the services. Since there is no "update_service" tool that accepts `rootDir` directly (the `update_web_service` tool is limited), I might need to check if `rootDir` can be updated via the available tools or if I need to use the dashboard/env vars (unlikely).

Wait, let's check `mcp_render_update_web_service` tool definition again.
`Update an existing web service... This tool is currently limited to support only a subset of the web service configuration parameters.`

If the tool doesn't support `rootDir`, I might have to tell the user to do it manually OR use `create_web_service` with the same parameters to "overwrite" (unlikely to work as expected).

Actually, let's look at the `mcp_render_update_web_service` parameters... wait, the tool definition doesn't list the parameters in the declaration I received in the system prompt. It just says `serviceId`.

Ah, let me check the tool description in the system prompt again.
`mcp_render_update_web_service`: `serviceId (required)`. No other parameters listed in the summary.

Wait, if I can't update `rootDir` via the tool, I might be stuck.
However, sometimes these tools have more parameters than shown in the summary if they follow a pattern.

Let's check if I can find more info about the tool.
Wait, I see `mcp_render_update_environment_variables`.

If I can't update `rootDir`, I will have to inform the user.

But wait! I can check the `render.yaml` if it exists. (I already checked, it doesn't).

What if I create a `render.yaml` and tell the user to use it? That's a better long-term fix.

But the user said "no se están desplegando", implying they want it fixed NOW.

Let's try to update the environment variables or something else to see if that triggers a build? No, that won't fix the `rootDir`.

Wait, the `render-deploy` skill says: "Deploy applications to Render by analyzing codebases, generating render.yaml Blueprints...".

I'll propose creating a `render.yaml` to unify the configuration and fix the `rootDir`.

## Testing Strategy

- Once configured, trigger a manual deploy for both services.
- Monitor the build logs to ensure the `Dockerfile` is found and the build proceeds.
