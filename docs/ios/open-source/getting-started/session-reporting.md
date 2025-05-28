---
title: Session Reporting
description: Upload sessions from your mobile application using the Embrace SDK
sidebar_position: 2
---

# Session Reporting

## Understanding Sessions

Once Embrace is configured and started in your app, it automatically starts capturing user sessions. 

A session is any length of user experience that occurs while the app is in the foreground or background. Note that foreground sessions and background sessions behave differently, and are recorded separately. This means that, for example, opening a push notification from your app will end a foreground session and start a background session.

In iOS SDK 6.x and greater, sessions are recorded as OpenTelemetry spans with Attributes and SpanEvents that capture various app lifecycle events, user interactions, and device information. This OpenTelemetry foundation provides a standardized way to instrument your application and collect telemetry data.

## Session Lifecycle

The Embrace SDK manages session lifecycle automatically:

- A new foreground session starts when your app launches or comes to the foreground
- A new background session starts when your app goes to the background
- Sessions end when the app transitions between foreground and background states
- Session data is automatically uploaded to the Embrace dashboard on subsequent app launches or state transitions
- Sessions capture important metadata like cold start status, clean exit information, and any crash information

You can also manually control sessions if needed:

```swift
// Force start a new session
Embrace.client?.startSession()

// Force end the current session
Embrace.client?.endSession()
```

## Session Data Structure

Each session in iOS SDK 6.x includes:

- **Session ID**: A unique identifier for the session
- **Session State**: Foreground or background
- **Timestamps**: Start time, end time, and heartbeat times
- **Cold Start Flag**: Indicates if this is the first session after app launch
- **Span Events**: App lifecycle events that occurred during the session
- **Clean Exit Status**: Whether the session ended normally or unexpectedly
- **Crash Report ID**: Link to any crash that occurred during the session (if applicable)

All this information is structured as OpenTelemetry spans and attributes, allowing for consistent and standardized telemetry collection.

## Triggering a Session Upload

To trigger a session upload during development, simply send the application to the background by:

- Pressing the simulator's 'home' button or swiping up (depending on the simulator you're running)
- Pressing `Cmd+Shift+H` on your keyboard

Typically the SDK will be given sufficient time to upload the session, but sometimes the app is not able to complete the upload in the background. To ensure the session was uploaded, launch the application again, which will trigger the SDK to complete any pending uploads. Refresh the dashboard in your browser to see your session data.

You can learn more about capturing specific moments and events in the [Core Concepts](/docs/ios/open-source/core-concepts/) section.