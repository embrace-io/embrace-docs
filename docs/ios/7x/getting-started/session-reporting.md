---
title: Session Reporting
description: Upload sessions from your mobile application using the Embrace SDK
sidebar_position: 2
---

## Session Reporting

### Understanding Sessions

Once Embrace is configured and started in your app, it automatically starts capturing user sessions.

In 7.x, a **user session** groups one or more **session parts**. A session part is a contiguous interval of app execution in either the foreground or the background. A user session is bounded by a configurable maximum duration and inactivity timeout — as long as the user keeps returning within those bounds, their foreground and background parts are stitched into the same user session. When those bounds are exceeded, a new user session begins. See [Sessions](/ios/7x/core-concepts/sessions.md) for the complete model.

In Apple SDK 7.x, session parts are recorded as OpenTelemetry spans with Attributes and SpanEvents that capture various app lifecycle events, user interactions, and device information. This OpenTelemetry foundation provides a standardized way to instrument your application and collect telemetry data.

### Session Lifecycle

The Embrace SDK manages the session lifecycle automatically:

- A new foreground part starts when your app launches or comes to the foreground
- A new background part starts when your app goes to the background
- Parts end when the app transitions between foreground and background states
- A new user session starts when the maximum duration or inactivity timeout is reached
- Session data is automatically uploaded to the Embrace dashboard on subsequent app launches or state transitions
- Sessions capture important metadata like cold start status, clean exit information, and any crash information

You can also manually end the current user session — for example, when a user logs out:

```swift
// End the current user session and immediately start a new one
EmbraceIO.shared.endUserSession()
```

`endUserSession()` closes the current part and user session and immediately starts a new part (with the same foreground/background state) under a fresh user session. This call is rate-limited to once every 5 seconds; calls made within 5 seconds of a previous one are ignored.

:::info Changed in 7.x
The 6.x `startNewSession()` / `endCurrentSession()` methods have been removed. In 7.x you manage
the user session with a single `endUserSession()` call.
:::

### Session Data Structure

Each session part in iOS SDK 7.x includes:

- **User Session ID**: A unique identifier for the user session the part belongs to
- **Session Part ID**: A unique identifier for the individual part
- **Session State**: Foreground or background
- **Timestamps**: Start time, end time, and heartbeat times
- **Cold Start Flag**: Indicates if this is the first part after app launch
- **Span Events**: App lifecycle events that occurred during the part
- **Clean Exit Status**: Whether the part ended normally or unexpectedly
- **Crash Report ID**: Link to any crash that occurred during the part (if applicable)

All this information is structured as OpenTelemetry spans and attributes, allowing for consistent and standardized telemetry collection.

### Triggering a Session Upload

To trigger a session upload during development, simply send the application to the background by:

- Pressing the simulator's 'home' button or swiping up (depending on the simulator you're running)
- Pressing `Cmd+Shift+H` on your keyboard

Typically the SDK will be given sufficient time to upload the session, but sometimes the app is not able to complete the upload in the background. To ensure the session was uploaded, launch the application again, which will trigger the SDK to complete any pending uploads. Refresh the dashboard in your browser to see your session data.

You can learn more about capturing specific moments and events in the [Core Concepts](/ios/7x/core-concepts/index.md) section.
