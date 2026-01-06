---
title: Embrace MCP Server
sidebar_position: 0
description: Access Embrace mobile observability data through the Model Context Protocol
---

# Embrace MCP Server

The Embrace Model Context Protocol (MCP) server lets you query your mobile app's performance and crash data directly from AI assistants like Claude. You can investigate crashes, monitor app health, and analyze trends without leaving your development workflow.

## Available tools

| Tool                      | Description                                                         |
| ------------------------- | ------------------------------------------------------------------- |
| `list_apps`               | Find and search applications in your Embrace workspace              |
| `get_app_details`         | Get health metrics, crash-free rates, and session counts for an app |
| `get_top_versions`        | Identify which app versions are most widely used                    |
| `list_crashes`            | List top crashes ranked by frequency and user impact                |
| `get_crash_details`       | Get detailed information about a specific crash group               |
| `get_crash_stack_samples` | Fetch actual stack traces for crash analysis                        |

## Prerequisites

:::warning
Embrace's MCP Server is in Beta and has only been officially tested with Claude Code. Please refer to the relevant documentation provided by your LLM Client on how to connect to a remote MCP server.
:::

Before you can use the Embrace MCP server, you need:

- An active Embrace account with access to at least one application
- An MCP-compatible AI assistant
- The MCP feature to be enabled for your org (reach out to your Customer Success Manager or Support to enable this)

## Setup examples

### Cursor

Follow the MCP Integration instructions in [Cursor's official docs](https://cursor.com/docs/context/mcp#using-mcpjson).

For example, add to your `mcp.json` file:

```json
{
  "mcpServers": {
    "embrace-mcp": {
      "url": "https://mcp.embrace.io/mcp"
    }
  }
}
```

### Claude Code

Run:

```bash
claude mcp add --transport http embrace https://mcp.embrace.io/mcp
```

Then start Claude Code and follow the instructions in the `/mcp` slash command. Reference Anthropic's official docs [here](https://code.claude.com/docs/en/mcp) for more info. NOTE: Bearer Token authentication is not currently supported.

### Opencode

Follow the OAuth MCP integration instructions in [Opencode's official docs](https://opencode.ai/docs/mcp-servers/#oauth).

For example, add to your `opencode.json` file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "embrace": {
      "type": "remote",
      "url": "https://mcp.embrace.io/mcp"
    }
  }
}
```

Then authenticate using:

```bash
opencode mcp auth embrace
```

### All others

For other AI Assistants supporting MCP, please reference your relevant docs. Official support will come in the near future for these as we continue to improve and add functionality.

The Embrace MCP Server uses a Streamable HTTP transport and is located at `https://mcp.embrace.io/mcp`.

## Common use cases

### Daily health check

Check your app's overall health and identify any issues:

1. Use `get_app_details` to check application details, session counts, crash-free rates, and more summary statistics
2. Use `get_top_versions` to check on app versions ordered by session count
3. Use `list_crashes` to identify any new or critical crashes

**Example query:** "What's the health status of my app today?"

### Investigate a critical crash

Deep dive into a specific crash to understand its root cause:

1. Use `list_crashes` to find crashes ranked by total occurrences and number of unique users affected
2. Use `get_crash_details` to understand the crash's scope and affected versions
3. Use `get_crash_stack_samples` to analyze actual stack traces by crash group ID and identify the bug

**Example query:** "What's causing the top crash in my app and how do I fix it?"

### Version-specific analysis

Focus on a particular app version:

1. Use `list_crashes` with the `app_versions` parameter to filter results
2. Use `get_crash_details` for the top crashes in that version
3. Use `get_crash_stack_samples` to see if patterns emerge

**Example query:** "Show me all crashes in version 2.1.0"

### Track trends over time

Monitor how your app's health changes:

1. Use `get_app_details` with different `time_window` values to compare periods
2. Use `list_crashes` to see which crashes are new or resolved
3. Use `get_top_versions` to track version adoption velocity

**Example query:** "How has my crash-free rate changed over the last 7 days?"
