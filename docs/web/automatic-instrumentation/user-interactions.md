---
title: User Interactions
description: Automatically monitor user interactions in your web app with Embrace
sidebar_position: 5
---

# User Interactions

The Embrace SDK automatically instruments user clicks throughout your app, providing visibility into user interactions
and the components they engage with most.

## How User Interaction Instrumentation Works

The instrumentation listens for any 'click' events on the global `document` object and records them as SpanEvents on
the current session Span. Clicks are not reported if the HTML element being interacted with has the 'disabled' attribute
or if the click event had had its propagation stopped.

The time of the click is captured along with a representation of the element being interacted with. In addition, if there
is an [INP Web Vital](/docs/web/automatic-instrumentation/web-vitals.md) reported and the click is determined to have
contributed to the score then it is associated with it.

This data is shown as part of User Timelines in the Embrace Dashboard to help provide context of what actions led to 
potential performance issues or errors within a session.

## Turning Off Capture

This instrumentation can be turned off altogether following the process described in [Configuring Automatic Instrumentation](/docs/web/automatic-instrumentation/index.md#configuring-automatic-instrumentation),
or selectively for certain elements as described in [Security Considerations](/docs/web/best-practices/security-considerations.md#configure-the-user-interaction-auto-instrumentation).