---
title: User Timeline
description: User Timeline
sidebar_position: 1
---

## User Timeline
The User Timeline offers a granular view of each user's session, showcasing every interaction, network request, and crash.

### Page Elements

The User Timeline page provides developers with a glimpse of an individual user's activity. This page include three sections:

- The Stitched Sessions show you the length and duration of each session for this specific user.
- The Timeline section provides a high-level technical summary of a single session.
- The Timeline Details section allows you to dig into the specifics for each event in the user's session.

<!-- TODO: Types of Timeline events
Fill in with items, descriptions, and images for:

Start
Tap
Breadcrumb
Root Span
Log
Network
Views
Web Views
You can filter these items. -->

###  Timeline
The horizontal timeline provides an overview of the session, highlighting different events such as network requests, crashes, and user interactions. Hovering over the timeline reveals details of activities at specific times. You can customize your view by filtering out events as per your preference.

<img src={require('@site/static/images/features/user-session-insights/user-session-insights-2.png').default} alt="Horizontal Timeline" />

Clicking on any event directs you to the Timeline Details.

### Timeline Details
The timeline details table presents an ordered list of every event within the timeline. Expandable rows provide additional information about each event. Clicking "See Impact" navigates you to the details page for that specific event.

<img src={require('@site/static/images/features/user-session-insights/user-session-insights-3.png').default} alt="Timeline Details" />

Scrolling through the Timeline Details section combines the activity for this user across [Stitched Sessions](/docs/product/sessions/stitched-sessions.md).

### Search for Timeline events
Timeline details can be quickly searched using the search bar in the upper right.  This searches on top-level text across all events, eg: network calls, breadcrumbs, taps, traces, etc.  Each search will highlight all found events, which can be navigated using the arrows in the search bar.

<img src={require('@site/static/images/features/user-session-insights/timeline-search.png').default} alt="Timeline Search" />
