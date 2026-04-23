---
title: Service Accounts
sidebar_position: 4
---

Service accounts let you give automated systems — AI assistants, CI pipelines, scripts — access to Embrace without tying that access to a specific person's account. Today they are used to authenticate with the [Embrace MCP server](../../mcp/mcp.md).

## What is a service account?

A service account is a non-human identity owned by your organization. It isn't tied to any individual user, so is not dependent on any standard user account. Each service account holds one or more bearer tokens that clients use to authenticate.

## What is a bearer token?

A bearer token is an opaque credential that a client sends in the `Authorization` header on every request:

```http
Authorization: Bearer emb_sa_AbCdEf0123456789-_XyZ9876543210abcdef1234567
```

Embrace bearer tokens start with the prefix `emb_sa_` followed by 43 characters (50 total). Tokens are shown once at creation. If you lose a token, revoke it and create a new one.

## Service accounts vs. API tokens

Service account tokens are a separate concept from the org-wide [API Tokens](./api-tokens.md) used for symbol upload, metrics ingestion, and similar integrations. Both coexist; existing API tokens continue to work and do not need to be rotated.

|                      | API Tokens                                        | Service Account Tokens                                |
|----------------------|---------------------------------------------------|-------------------------------------------------------|
| **Who manages them** | Auto-created per org                              | Admins create service accounts and issue tokens       |
| **Scope of access**  | Entire org                                        | Specific apps, or all apps                            |
| **Capabilities**     | One per token (symbol upload, metrics pull, etc.) | Multi-scope — a single token can combine capabilities |
| **Identity in logs** | "Org did X"                                       | "Service account 'CI Pipeline' did X"                 |
| **Rotation**         | Replace the whole org token                       | Revoke one token; issue a new one                     |

## What you can do with them today

The initial release is MCP-only: service account tokens authenticate requests to the Embrace MCP server. Available scopes:

- `mcp:tools:call` — invoke MCP tools (required for any MCP access)
- `mcp:read` — read data through the MCP server
- `mcp:write` — write data through the MCP server

## Creating a service account

Service accounts are created from **Settings → Organization → API → Service Accounts**. Only org admins can create, edit, or delete service accounts.

1. Click **Create Service Account**.
2. Give it a descriptive name and an optional description.
3. Choose whether it has access to all apps in the org or a specific set of apps.
4. Create a token on the service account, select the scopes it needs, and **copy the token immediately** — it will not be shown again.

## Managing app access

Each service account is either granted access to **all apps** in the org (including apps added in the future) or to an **explicit list** of apps. You can add or remove app grants at any time from the service account's detail page; changes take effect immediately.

## Rotating tokens

Because a service account can hold multiple tokens at the same time, you can rotate without downtime:

1. Create a second token on the service account.
2. Deploy the new token to the systems that use it.
3. Verify the new token is working by checking that its **Last used** timestamp is updating.
4. Revoke the old token.

## Revoking and deleting

Revoking a token stops it from authenticating immediately. Deleting a service account revokes all of its tokens.

## Security notes

- Treat bearer tokens like passwords — store them in a secret manager, not in source control.
- If a token is lost or exposed, revoke it and create a new one. We cannot recover a token once it has been created.
- Use separate service accounts for separate use cases so you can revoke narrowly without disrupting unrelated automations.

## FAQ

**Do I have to change anything?**
No. Existing API tokens continue to work. Create a service account only when you need the new capabilities — primarily MCP access today.

**Who can create service accounts?**
Only org admins.

**Can I control what a token can do?**
Yes. Pick which apps the service account can access, and which scopes each token has.

**Can I see a token again after creation?**
No — copy it immediately when it's shown. If lost, revoke the token and create a new one.

**What happens if I delete a service account?**
All of its tokens are revoked immediately.
