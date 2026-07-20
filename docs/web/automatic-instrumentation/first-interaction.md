---
title: First Interaction
description: Automatically track the first user interaction in each session part with Embrace
sidebar_position: 10
---

## First Interaction

The Embrace SDK automatically captures the first user interaction — a click, tap, key press, or scroll — that
occurs in each [session part](/product/sessions/whats-changing.md), providing visibility into how quickly users
start engaging with your app after a page loads or a route change.

### How First Interaction Tracking Works

The instrumentation listens for the first `click`, `keydown`, or `scroll` event on the global `document` object and
reports it as a log. Once an interaction is captured, the listeners are detached for the rest of the session part —
later interactions in the same part are not reported. When a new session part starts (for example, after a
[SPA route change](./spa-navigation.md) or the user returning from the background), the listeners are re-attached so
the next interaction in that part can be captured.

### Data Captured

For each first interaction, the SDK captures:

- The type of interaction: click, tap, keypress, or scroll
- The element interacted with — its tag name and CSS selector (scroll interactions are attributed to the document,
  with no selector)
- The x/y coordinates of the interaction, captured for click and tap only
- How long into the current session part the interaction happened

### Turning Off Capture

This instrumentation can be turned off following the process described in
[Configuring Automatic Instrumentation](/web/automatic-instrumentation/index.md#configuring-automatic-instrumentation).

### Integration with Other Features

First Interaction tracking integrates with other Embrace features:

- First interaction logs are associated with the current session and can help correlate slow user engagement with
  [Web Vitals](./web-vitals.md) or [Document Load](./document-load.md) performance issues
- The interaction time is reported relative to [zero time](./spa-navigation.md#zero-time-reset), so it reflects how
  long into the current view the interaction happened rather than time since the original page load
