---
title: Stitched Sessions
description: Stitched Sessions
sidebar_position: 0
---

Embrace's dashboard attempts to combine a user's activity into one cohesive picture of activity and intent using stitched sessions.  

After a user's session is ingested, it is sequenced, or "stitched", to previous sessions within a given time interval. This approach uses the user's device ID to tie together activity  

# Stitched Sessions List

The stitched sessions list presents a chronological compilation of all user sessions. Sessions are seamlessly stitched together to offer a complete view of the user's journey. You can easily identify sessions with crashes, ANRs (App Not Responding), or network issues, and filter them by user ID, device, app version, and more.

<img src={require('@site/static/images/features/user-session-insights/user-session-insights-1.png').default} alt="Stitched Sessions List" />

Click on any session to delve into the [User Timeline](/product/sessions/user-timeline.md).

<!-- TODO: What are the indicators in the Stitched Session view

item, description, and image for:

Foreground
Background
Inactivity
Crashes -->

## How do I learn more about specific sessions?

You can [filter sessions](/product/sessions/filter-sessions.md) by a variety of dimensions to learn more.
