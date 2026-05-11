---
title: Element Timing
description: Automatically track render and load timing for annotated elements with Embrace
sidebar_position: 2
---

## Element Timing

The Embrace SDK automatically captures render and load timing for elements you explicitly opt into
tracking by adding the [`elementtiming`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/elementtiming)
HTML attribute. This gives you fine-grained visibility into when key elements — images, hero text,
call-to-action blocks — become visible on screen.

### How Element Timing Instrumentation Works

The SDK observes [`PerformanceElementTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming)
entries via a `PerformanceObserver`. Each observed entry
is emitted as a span, using the element's `identifier` (the `elementtiming` attribute value) as the
span name, and the `renderTime` or `loadTime` as the span boundaries.

To instrument an element, add the `elementtiming` attribute with a descriptive identifier:

```html
<img src="/hero.jpg" elementtiming="hero-image" />
<h1 elementtiming="page-heading">Welcome</h1>
```

The SDK captures all annotated elements automatically — no additional SDK configuration is needed.

### Data Captured

For each element timing entry, the SDK captures:

- The `elementtiming` identifier
- `renderTime` — when the element was painted on screen (ms from navigation start); `0` for cross-origin elements
- `loadTime` — when the element's resource finished loading (ms from navigation start); `0` for text elements
- `startTime` — `renderTime` when non-zero, otherwise `loadTime`
- The HTML tag name (e.g. `img`, `p`)
- The resource URL, natural width, and natural height (for image elements)

### Browser Support

Element timing is a Chromium-only feature. The instrumentation is silently skipped in Firefox and
Safari — no error is thrown and no data is lost on those browsers.

### Integration with Other Features

- Element timing spans are associated with the current session and page
- Custom dashboards can be built to monitor render time, load time, and start time percentiles per identifier
- Alerts can be set on render times exceeding specific thresholds
