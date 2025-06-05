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

## Working with Session Data

### Accessing Current Session Information

Get information about the current session:

```swift
// Get the current session ID
if let sessionId = Embrace.client?.currentSessionId() {
    print("Current session: \(sessionId)")
    // Use session ID for logging or analytics
}

// Check if SDK is enabled and session is active
if Embrace.client?.isSDKEnabled == true {
    print("Session is active and SDK is enabled")
}

// Get device identifier for session attribution
if let deviceId = Embrace.client?.currentDeviceId() {
    print("Device ID: \(deviceId)")
}
```

### Managing Session Lifecycle

Control session lifecycle manually when needed:

```swift
class SessionManager {
    func handleUserLogin(userId: String) {
        // Start a new session for the logged-in user
        Embrace.client?.endCurrentSession()
        
        // Set user identification for the new session
        Embrace.client?.metadata.userIdentifier = userId
        try? Embrace.client?.metadata.add(
            persona: PersonaTag("authenticated"),
            lifespan: .session
        )
        
        // Start new session with user context
        Embrace.client?.startNewSession()
        
        // Log session start for analytics
        Embrace.client?.log(
            "New user session started",
            severity: .info,
            attributes: [
                "user.login_method": "credentials",
                "session.type": "authenticated"
            ]
        )
    }
    
    func handleUserLogout() {
        // Log session end
        Embrace.client?.log(
            "User session ended",
            severity: .info,
            attributes: [
                "user.logout_method": "manual",
                "session.duration": String(getCurrentSessionDuration())
            ]
        )
        
        // Clear user context and start anonymous session
        Embrace.client?.metadata.clearUserProperties()
        Embrace.client?.endCurrentSession()
        Embrace.client?.startNewSession()
    }
    
    private func getCurrentSessionDuration() -> TimeInterval {
        // Calculate session duration based on your app's logic
        return Date().timeIntervalSince(sessionStartTime)
    }
}
```

### Adding Custom Properties to Sessions

Enrich sessions with custom properties and metadata:

```swift
class SessionEnrichment {
    func configureSessionProperties() {
        // Add permanent properties that persist across sessions
        try? Embrace.client?.metadata.addProperty(
            key: "app.flavor",
            value: Bundle.main.bundleIdentifier?.contains("debug") == true ? "debug" : "release",
            lifespan: .permanent
        )
        
        // Add process-level properties
        try? Embrace.client?.metadata.addProperty(
            key: "app.version",
            value: Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown",
            lifespan: .process
        )
        
        // Add session-specific properties
        try? Embrace.client?.metadata.addProperty(
            key: "session.start_method",
            value: determineStartMethod(),
            lifespan: .session
        )
    }
    
    func updateSessionContext(userTier: String, feature: String) {
        // Update session context as user progresses through the app
        try? Embrace.client?.metadata.updateProperty(
            key: "user.tier",
            value: userTier,
            lifespan: .session
        )
        
        try? Embrace.client?.metadata.addProperty(
            key: "current.feature",
            value: feature,
            lifespan: .session
        )
        
        // Add persona tags for segmentation
        try? Embrace.client?.metadata.add(
            persona: PersonaTag(userTier.lowercased()),
            lifespan: .session
        )
    }
    
    func trackBusinessContext(context: [String: String]) {
        // Add business-specific context to sessions
        for (key, value) in context {
            try? Embrace.client?.metadata.addProperty(
                key: "business.\(key)",
                value: value,
                lifespan: .session
            )
        }
    }
    
    private func determineStartMethod() -> String {
        // Determine how the app was started
        if ProcessInfo.processInfo.environment["SIMULATOR_DEVICE_NAME"] != nil {
            return "simulator"
        } else if isAppStoreReceipt() {
            return "app_store"
        } else {
            return "development"
        }
    }
    
    private func isAppStoreReceipt() -> Bool {
        guard let receiptURL = Bundle.main.appStoreReceiptURL else { return false }
        return receiptURL.lastPathComponent == "receipt"
    }
}
```

### Session Event Tracking

Track important events within sessions:

```swift
class SessionEventTracker {
    func trackMilestone(milestone: String, metadata: [String: String] = [:]) {
        // Add milestone events to the current session span
        let event = SpanEvent(
            name: "session.milestone",
            timestamp: Date(),
            attributes: [
                "milestone.name": milestone,
                "milestone.timestamp": ISO8601DateFormatter().string(from: Date())
            ].merging(metadata) { _, new in new }
        )
        
        Embrace.client?.add(event: event)
        
        // Also log for detailed tracking
        Embrace.client?.log(
            "Session milestone reached",
            severity: .info,
            attributes: [
                "milestone.name": milestone
            ].merging(metadata) { _, new in new }
        )
    }
    
    func trackUserFlow(step: String, totalSteps: Int, currentStep: Int) {
        // Track user progress through multi-step flows
        let progressPercentage = Int((Double(currentStep) / Double(totalSteps)) * 100)
        
        try? Embrace.client?.metadata.addProperty(
            key: "flow.current_step",
            value: "\(currentStep)/\(totalSteps)",
            lifespan: .session
        )
        
        try? Embrace.client?.metadata.addProperty(
            key: "flow.progress_percentage",
            value: String(progressPercentage),
            lifespan: .session
        )
        
        Embrace.client?.log(
            "User flow progress",
            severity: .info,
            attributes: [
                "flow.step": step,
                "flow.current_step": String(currentStep),
                "flow.total_steps": String(totalSteps),
                "flow.progress_percentage": String(progressPercentage)
            ]
        )
    }
    
    func trackFeatureUsage(feature: String, action: String) {
        // Track feature usage within sessions
        let featureKey = "feature.\(feature.lowercased()).usage_count"
        
        // Increment feature usage counter
        let currentCount = getCurrentUsageCount(for: featureKey)
        try? Embrace.client?.metadata.updateProperty(
            key: featureKey,
            value: String(currentCount + 1),
            lifespan: .session
        )
        
        // Log the specific action
        Embrace.client?.log(
            "Feature action performed",
            severity: .debug,
            attributes: [
                "feature.name": feature,
                "feature.action": action,
                "feature.usage_count": String(currentCount + 1)
            ]
        )
    }
    
    private func getCurrentUsageCount(for key: String) -> Int {
        // In a real implementation, you'd retrieve this from your metadata storage
        // For this example, we'll return 0
        return 0
    }
}
```

### Session Performance Monitoring

Monitor session health and performance:

```swift
class SessionPerformanceMonitor {
    private let startTime = Date()
    private var lastMemoryCheck = Date()
    
    func monitorSessionHealth() {
        // Check session duration
        let sessionDuration = Date().timeIntervalSince(startTime)
        if sessionDuration > 3600 { // 1 hour
            Embrace.client?.log(
                "Long session detected",
                severity: .warning,
                attributes: [
                    "session.duration_minutes": String(Int(sessionDuration / 60)),
                    "session.health_check": "long_duration"
                ]
            )
        }
        
        // Check memory usage periodically
        if Date().timeIntervalSince(lastMemoryCheck) > 300 { // Every 5 minutes
            checkMemoryUsage()
            lastMemoryCheck = Date()
        }
    }
    
    private func checkMemoryUsage() {
        let memoryUsage = getCurrentMemoryUsage()
        let memoryMB = Double(memoryUsage) / 1024 / 1024
        
        if memoryMB > 500 { // Warn if over 500MB
            Embrace.client?.log(
                "High memory usage detected",
                severity: .warning,
                attributes: [
                    "memory.usage_mb": String(format: "%.1f", memoryMB),
                    "memory.threshold_exceeded": "true"
                ]
            )
        }
        
        // Update session property with current memory usage
        try? Embrace.client?.metadata.updateProperty(
            key: "session.peak_memory_mb",
            value: String(format: "%.1f", memoryMB),
            lifespan: .session
        )
    }
    
    private func getCurrentMemoryUsage() -> UInt64 {
        var info = mach_task_basic_info()
        var count = mach_msg_type_number_t(MemoryLayout<mach_task_basic_info>.size)/4
        
        let kerr: kern_return_t = withUnsafeMutablePointer(to: &info) {
            $0.withMemoryRebound(to: integer_t.self, capacity: 1) {
                task_info(mach_task_self_, task_flavor_t(MACH_TASK_BASIC_INFO), $0, &count)
            }
        }
        
        return kerr == KERN_SUCCESS ? info.resident_size : 0
    }
}
```

These examples demonstrate how to effectively work with session data, add custom properties, and monitor session health to gain deeper insights into user behavior and app performance.
