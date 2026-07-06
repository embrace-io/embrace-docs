---
title: Sessions
description: Understanding sessions in the Embrace iOS SDK 7.x
sidebar_position: 1
---

## Sessions

Sessions are a fundamental concept in the Embrace iOS SDK that help you understand how users interact with your application over time. The 7.x SDK redefines what a "session" is, so if you are coming from 6.x it is worth reading this page carefully.

### User Sessions and Session Parts

7.x introduces two related concepts:

- **Session Part** — a contiguous interval of app execution in either the **foreground** or the **background** state.
- **User Session** — a grouping of one or more session parts that represents a user's continuous time in your app.

In 6.x, each foreground or background interval was its own separate "session". In 7.x those intervals are **parts**, and one or more parts are stitched together into a single **user session**. For example, a user who opens your app, briefly backgrounds it to answer a notification, and returns will generate several parts — but they all belong to one user session.

A user session is bounded by two configurable limits:

- **Maximum session duration** — the longest a single user session can last (default 12 hours).
- **Inactivity timeout** — how long the app can go without an active foreground part before the user session is considered ended (default 30 minutes).

As long as the user keeps returning within those bounds, their parts belong to the same user session. When either bound is exceeded, the current user session ends and a new one begins.

### How Sessions Work

When you initialize the Embrace SDK in your app, it automatically begins capturing session data. Session parts are recorded as OpenTelemetry spans with attributes and span events for various app lifecycle events, user experiences, and device information.

A session part contains important information such as:

- App lifecycle events (start, foreground, background, terminate)
- Device information (model, OS version, memory usage)
- Network activity
- View controller lifecycle
- User actions and interactions
- Custom events and logs you add

### Session Lifecycle

A typical lifecycle looks like this:

1. **Part Start**: When the app is launched, foregrounded, or backgrounded
2. **Part Running**: As the user interacts with the app, data is collected
3. **Part End**: When the app changes foreground/background state
4. **User Session Rollover**: When the maximum duration or inactivity timeout is exceeded, the current user session ends and a new one begins
5. **Upload**: Session data is uploaded to Embrace for analysis

Embrace automatically uploads sessions on subsequent launches or when the app transitions between foreground and background states.

### Configuration

The maximum session duration and inactivity timeout can be set through remote configuration and are applied when a new user session is created (changing the config does not truncate an in-progress user session). The SDK falls back to sensible defaults and clamps values to safe ranges:

| Setting              | Default    | Allowed range      |
| -------------------- | ---------- | ------------------ |
| Maximum duration     | 12 hours   | 1 hour – 24 hours  |
| Inactivity timeout   | 30 minutes | 30 seconds – 24 hours |

:::info End User Session API
The end-user-session API is useful for apps where a "session" naturally ends well before the
maximum duration — for example, a point-of-sale app where transactions happen in seconds or
minutes, or when a user logs out. Because it is rate-limited to once per 5 seconds, it is safe
to call in response to user actions.
:::

### Session Attributes

The SDK emits the following identifiers so that telemetry can be correlated to the right user session and part. These appear in the attributes of session part spans and logs:

- `session.id` — UUID identifying the user session. By default this is the same value as `emb.user_session_id`.
- `emb.session_part_id` — UUID identifying the individual session part.
- `emb.user_session_id` — UUID of the user session.

Session part spans additionally carry attributes such as `emb.user_session_number` (an incrementing counter of user sessions since install) and `emb.user_session_part_number` (the 1-indexed position of the part within its user session, which replaces the 6.x `emb.session_number`).

Telemetry that is not tied to a part (such as some logs) will not carry a session id.

### Sessions vs Other Concepts

It's important to understand how sessions relate to other core concepts in the SDK:

- **Sessions and Traces**: A session part can contain multiple traces. Traces represent specific operations within a part.
- **Sessions and Logs**: Logs provide additional context within a session, helping you understand what happened during user interaction.
- **Sessions and User Identification**: User identification helps you attribute sessions to specific users or user segments.

### Best Practices

- Let the SDK manage the session lifecycle automatically
- Add relevant user identification early to ensure proper attribution
- Use custom logs and traces to add context to sessions
- Use `endUserSession()` when a discrete user session ends (such as logout), rather than trying to manage parts directly
- Review session data regularly to identify patterns and issues

### Working with Session Data

#### Accessing Current Session Information

Get information about the current user session:

```swift
// Get the current user session ID
if let userSessionId = EmbraceIO.shared.currentUserSessionId {
    print("Current user session: \(userSessionId)")
    // Use the session ID for logging or analytics
}

// Check if the SDK is enabled and capturing
if EmbraceIO.shared.isSDKEnabled {
    print("SDK is enabled and capturing sessions")
}

// Get device identifier for session attribution
if let deviceId = EmbraceIO.shared.deviceId {
    print("Device ID: \(deviceId)")
}
```

#### Managing the User Session

Control the user session manually when needed — for example, around login and logout:

```swift
class SessionManager {
    func handleUserLogin(userId: String) {
        // Set user identification
        EmbraceIO.shared.userIdentifier = userId
        EmbraceIO.shared.addPersona("authenticated", lifespan: .session)

        // Start a fresh user session for the logged-in user
        EmbraceIO.shared.endUserSession()

        // Log session start for analytics
        EmbraceIO.shared.log(
            "New user session started",
            severity: .info,
            attributes: [
                "user.login_method": "credentials",
                "session.type": "authenticated"
            ]
        )
    }

    func handleUserLogout() {
        // Log the logout
        EmbraceIO.shared.log(
            "User session ended",
            severity: .info,
            attributes: ["user.logout_method": "manual"]
        )

        // Clear user context and roll to a fresh, anonymous user session
        EmbraceIO.shared.userIdentifier = nil
        EmbraceIO.shared.removeAllPersonas(lifespans: [.session])
        EmbraceIO.shared.endUserSession()
    }
}
```

#### Adding Custom Properties to Sessions

Enrich sessions with custom properties and metadata:

```swift
class SessionEnrichment {
    func configureSessionProperties() {
        // Add permanent properties that persist across sessions
        EmbraceIO.shared.setProperty(
            key: "app.flavor",
            value: Bundle.main.bundleIdentifier?.contains("debug") == true ? "debug" : "release",
            lifespan: .permanent
        )

        // Add process-level properties
        EmbraceIO.shared.setProperty(
            key: "app.version",
            value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown",
            lifespan: .process
        )

        // Add session-specific properties
        EmbraceIO.shared.setProperty(
            key: "session.start_method",
            value: "app_store",
            lifespan: .session
        )
    }

    func updateSessionContext(userTier: String, feature: String) {
        EmbraceIO.shared.setProperty(key: "user.tier", value: userTier, lifespan: .session)
        EmbraceIO.shared.setProperty(key: "current.feature", value: feature, lifespan: .session)

        // Add persona tags for segmentation
        EmbraceIO.shared.addPersona(userTier.lowercased(), lifespan: .session)
    }
}
```

#### Session Event Tracking

Track important events within the current session part:

```swift
class SessionEventTracker {
    func trackMilestone(milestone: String, metadata: [String: String] = [:]) {
        // Add a milestone event to the current session part
        EmbraceIO.shared.addSessionEvent(
            name: "session.milestone",
            attributes: ["milestone.name": milestone].merging(metadata) { _, new in new }
        )

        // Also log for detailed tracking
        EmbraceIO.shared.log(
            "Session milestone reached",
            severity: .info,
            attributes: ["milestone.name": milestone]
        )
    }

    func trackUserFlow(step: String, totalSteps: Int, currentStep: Int) {
        EmbraceIO.shared.setProperty(
            key: "flow.current_step",
            value: "\(currentStep)/\(totalSteps)",
            lifespan: .session
        )

        EmbraceIO.shared.log(
            "User flow progress",
            severity: .info,
            attributes: [
                "flow.step": step,
                "flow.current_step": currentStep,
                "flow.total_steps": totalSteps
            ]
        )
    }
}
```

These examples demonstrate how to effectively work with session data, add custom properties, and track important events to gain deeper insights into user behavior and app performance.
