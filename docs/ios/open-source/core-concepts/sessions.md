---
title: Sessions
description: Understanding sessions in the Embrace iOS SDK 6.x
sidebar_position: 1
---

# Sessions

Sessions are a fundamental concept in the Embrace iOS SDK that help you understand how users interact with your application over time.

## What is a Session?

A session is a comprehensive record of user interaction that occurs while your app is in either the foreground or background state. Embrace automatically captures sessions when your app is initialized and started.

Key points about sessions:
- Foreground sessions capture user interaction while the app is actively being used
- Background sessions capture processes that occur while the app is in the background
- Sessions transition when the app changes state (foreground to background or vice versa)

## How Sessions Work

When you initialize the Embrace SDK in your app, it automatically begins capturing session data. Sessions are recorded as OpenTelemetry spans with attributes and span events for various app lifecycle events, user experiences, and device information.

Sessions contain important information such as:
- App lifecycle events (start, foreground, background, terminate)
- Device information (model, OS version, memory usage)
- Network activity
- View controller lifecycle
- User actions and interactions
- Custom events and logs you add

## Session Lifecycle

A typical session lifecycle looks like this:

1. **Session Start**: When the app is launched or foregrounded
2. **Session Running**: As the user interacts with the app, data is collected
3. **Session End**: When the app is backgrounded or terminated
4. **Session Upload**: The session data is uploaded to Embrace for analysis

Embrace automatically uploads sessions on subsequent launches or when the app transitions between foreground and background states.

## Triggering Session Uploads

To manually trigger a session upload during development, you can:

1. Send the application to the background by pressing the simulator's home button or using `Cmd+Shift+H`
2. Launch the application again to ensure the session was fully uploaded

Sometimes the app might not have sufficient time to complete the upload while in the background. Relaunching the app ensures the session data is properly transmitted.

## Sessions vs Other Concepts

It's important to understand how sessions relate to other core concepts in the SDK:

- **Sessions and Traces**: A session can contain multiple traces. Traces represent specific operations within a session.
- **Sessions and Logs**: Logs provide additional context within a session, helping you understand what happened during user interaction.
- **Sessions and User Identification**: User identification helps you attribute sessions to specific users or user segments.

## Implementation Details

In the Embrace SDK 6.x, sessions are implemented as OpenTelemetry spans. When a session starts, a span begins that will continue until the session ends:

```swift
// This happens internally in the SDK
static func span(id: SessionIdentifier, startTime: Date) -> Span {
    EmbraceOTel().buildSpan(name: spanName, type: .session)
        .setStartTime(time: startTime)
        .setAttribute(key: sessionIdAttribute, value: id.toString)
        .startSpan()
}
```

The session span contains all relevant session information and serves as a parent for other spans created during the session lifetime.

## Best Practices

- Let the SDK manage session lifecycle automatically
- Add relevant user identification early in the session to ensure proper attribution
- Use custom logs and traces to add context to sessions
- Consider how background sessions impact your analytics
- Review session data regularly to identify patterns and issues

## TODO: Add more code examples showing how to access session data and add custom properties to sessions 