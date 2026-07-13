---
title: Embrace Client
description: Reference documentation for the Embrace client main interface
sidebar_position: 2
---

## Embrace Client

:::warning
As of Embrace 7.x, the `Embrace` client and `Embrace.Options` are no longer part of the public API. The SDK now exposes a single public client: [`EmbraceIO`](./embraceio-client.md).
:::

In earlier versions of the SDK there were two public clients, `EmbraceIO` and `Embrace`. Starting with Embrace 7.x there is only one: `EmbraceIO`. All setup, logging, performance monitoring, session management, and user/metadata APIs are now accessed through `EmbraceIO` and its shared instance, `EmbraceIO.shared`.

### Migrating from the `Embrace` client

If you were previously using the `Embrace` client, see the [6.x → 7.x migration guide](/ios/7x/getting-started/migration-guide.md) for how to move to the equivalent `EmbraceIO` APIs. For the complete API, see the [EmbraceIO Client](./embraceio-client.md) reference.

**GitHub Source**: [EmbraceIO](https://github.com/embrace-io/embrace-apple-sdk/tree/main/Sources/EmbraceIO)
