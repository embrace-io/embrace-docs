---
title: SPA Navigation
description: Automatically track single-page app navigation in your web app with Embrace
sidebar_position: 9
---

## SPA Navigation

The Embrace SDK automatically tracks route changes in single-page applications (SPAs), giving you visibility into
how users move between views as they interact with your app, with no setup required.

### How SPA Navigation Tracking Works

The SDK detects route changes using the [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API),
a newly available browser API that reports in-page URL changes driven by the History API (e.g. `history.pushState`)
or user-initiated back/forward navigation. Whenever the current entry changes, the SDK ends the span tracking the
outgoing route and starts a new one for the route the user landed on. Same-URL replacements, such as a framework
rehydrating state with `history.replaceState`, are ignored since no navigation actually took place.

By default, route spans are named after the raw resolved URL (e.g. `/products/123`). If you're using React Router,
you can enrich this by having spans use the route's templated path instead (e.g. `/products/:productId`) — see
[React Router](./react/react-router.md). If you're not using React Router, or would rather classify pages without
code changes, you can instead group and name pages by URL pattern directly in the Embrace Dashboard — see
[Page Groups](/product/settings/app-settings/page-groups.md).

Because this relies on the Navigation API, automatic route change detection is only available in browsers that
support it — see the [browser compatibility table on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API#browser_compatibility).
In unsupported browsers only the initial route is captured; use the [React Router](./react/react-router.md)
instrumentation to track subsequent route changes there instead.

### Zero Time Reset

Every detected route change also resets what the SDK internally calls "zero time" — the point in time some
telemetry is measured from. Without this reset, those measurements would keep growing relative to the original hard
page load, even long after the user has moved on to a completely different view. When a route change is detected,
the SDK moves zero time forward to that navigation, so telemetry collected afterwards is reported relative to the
start of the current view rather than the original page load.

Not all telemetry rebases onto zero time — only measurements that are meaningful as "how far into this view did this
happen" do:

| Instrumentation                                           | Resets on route change |
| --------------------------------------------------------- | ---------------------- |
| [Element Timing](./w3c-performance-api/element-timing.md) | Yes                    |
| [User Timing](./w3c-performance-api/user-timing.md)       | Yes                    |
| [First Interaction](./first-interaction.md)               | Yes                    |
| [Web Vitals](./web-vitals.md)                             | No                     |
| [Document Load](./document-load.md)                       | No                     |
| [User Interactions](./user-interactions.md)               | No                     |
| [Exceptions](./exceptions.md)                             | No                     |

Everything marked "No" is measured relative to the original hard page load, or reports a pure duration that doesn't
need rebasing at all. If you need the full technical explanation of zero time and how each instrumentation maps onto
it, it's documented in the `PerformanceManager` module in the Web SDK source.

### Integration with Other Features

SPA navigation tracking integrates with other Embrace features:

- Each detected route change ends the current [session part](/product/sessions/whats-changing.md) and starts a new
  one, so telemetry collected afterwards is correctly attributed to the new view
- Route spans are associated with the current session and used to correlate other telemetry, like Web Vitals, with
  the page the user was viewing
