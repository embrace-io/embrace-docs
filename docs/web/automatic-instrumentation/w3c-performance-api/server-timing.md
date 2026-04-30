---
title: Server Timing
description: Automatically capture backend performance hints from Server-Timing headers with Embrace
sidebar_position: 3
---

## Server Timing

The Embrace SDK automatically reads backend performance metrics sent by your server via the
[`Server-Timing`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing) HTTP
response header on the navigation request. This gives you visibility into server-side latency
contributors — database queries, cache lookups, CDN processing — alongside your frontend telemetry.

### How Server Timing Instrumentation Works

When the page finishes loading, the SDK reads `performance.getEntriesByType('navigation')[0].serverTiming`
and emits one log per `PerformanceServerTiming` entry. If the navigation entry has no server timing
data, the SDK no-ops silently.

No changes to your frontend code are required. Visibility depends on your server emitting the header:

```
Server-Timing: db;dur=78, cache;desc="HIT";dur=0, render;dur=163
```

### Known Limitation

`serverTiming` is only populated for same-origin navigations, or cross-origin navigations where the
server includes the `Timing-Allow-Origin` response header. When neither condition is met, the array
is empty and the SDK no-ops silently.

### Data Captured

For each `Server-Timing` entry, the SDK captures:

- `name` — the metric name (e.g. `db`, `cache`, `cfEdge`)
- `description` — the `desc` parameter value; in practice carries high-cardinality data such as cache status, country codes, and request IDs
- `duration` — milliseconds; `0` when the server omits the `dur` parameter (common for metadata-only entries)

### Integration with Other Features

- Server timing logs are associated with the current session and page navigation
- Custom dashboards can be built to monitor duration percentiles per metric name, and filter by description values
- Alerts can be set on server-side latencies exceeding specific thresholds
