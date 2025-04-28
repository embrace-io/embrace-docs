---
title: Last Run End State
description: Determine how the previous app session ended
sidebar_position: 4
---

# Last Run End State

The Last Run End State API enables you to programmatically determine if the previous app instance ended in a crash. This powerful feature allows you to adjust your app's behavior or UI based on how the previous session terminated.

## Overview

With the Last Run End State API, you can build more user-friendly experiences by:

- Showing recovery UI after a crash
- Logging additional diagnostic information when returning from a crash
- Restoring user state or offering to restore it
- Adjusting the app's behavior to avoid repeating problematic operations

**What do we mean by previous app instance?**

A cold launch, basically. If the app gets backgrounded/resumed so a new session starts, the value returned will not change. So:

1. App crashes
2. App is relaunched
3. `lastRunEndState` returns "crash"
4. App is sent to background
5. App is resumed, starting a new session
6. `lastRunEndState` still returns "crash"
7. App exits cleanly
8. App is relaunched
9. `lastRunEndState` returns "cleanExit"

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using the latest version of the Embrace SDK
2. Implement the API call to receive the state of the last run.

:::info
This feature only works with the Embrace crash reporter. It is **NOT** compatible if you use Crashlytics for crash reporting.
:::

## Implementation

The API will return a value noting the last run end state of the application. Note that:

- The API can only be called after the SDK has been started. If a call is made prior to starting the Embrace SDK you will get a response of `.unavailable`.
- It will return that a crash occurred if the app crashed any time since the app last came to the foreground. This includes if the app crashed while running in the background.

```swift
let lastRunEndState = Embrace.client?.lastRunEndState()
```

### Possible Values

The current [possible values](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/LastRunEndState.swift) for end state are:

```swift
// Last end state can't be determined
case unavailable

// Last app run ended in a crash
case crash

// Last app run ended cleanly
case cleanExit 
```

## Common Use Cases

### Crash Recovery

Implement crash recovery logic to restore user state after a crash:

```swift
func configureApp() {
    // First check if we're returning from a crash
    if let lastRunEndState = Embrace.client?.lastRunEndState(),
       lastRunEndState == .crash {
        // Implement crash recovery
        restoreUserState()
        showCrashRecoveryMessage()
        
        // Log the crash recovery attempt
        Embrace.client?.logMessage(
            "Performing crash recovery",
            severity: .info
        )
    }
    
    // Continue with normal app initialization
    setupAppComponents()
}

func showCrashRecoveryMessage() {
    // Show a user-friendly message
    let alertController = UIAlertController(
        title: "We noticed the app closed unexpectedly",
        message: "We've restored your previous state. If you continue experiencing issues, please contact support.",
        preferredStyle: .alert
    )
    
    alertController.addAction(UIAlertAction(title: "OK", style: .default))
    
    // Present the alert
    window?.rootViewController?.present(alertController, animated: true)
}
```

### Special Handling for Repeated Crashes

Detect and handle situations where the app crashes repeatedly in the same area:

```swift
func handleFeatureEntry(featureId: String) {
    // Check if we're returning from a crash
    if let lastRunEndState = Embrace.client?.lastRunEndState(),
       lastRunEndState == .crash,
       let lastCrashFeature = UserDefaults.standard.string(forKey: "lastActiveFeature"),
       lastCrashFeature == featureId {
        
        // The app crashed last time in this feature
        // Implement safe mode for this feature
        enterSafeMode(forFeature: featureId)
        
        Embrace.client?.logMessage(
            "Entering safe mode for feature that previously crashed",
            severity: .warning,
            properties: ["feature_id": featureId]
        )
    }
    
    // Track currently active feature
    UserDefaults.standard.set(featureId, forKey: "lastActiveFeature")
}
```

### Diagnostic Information Collection

Gather additional diagnostic information after a crash to help with debugging:

```swift
func applicationDidFinishLaunching(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Setup Embrace
    setupEmbrace()
    
    // Check for crash
    if let lastRunEndState = Embrace.client?.lastRunEndState(),
       lastRunEndState == .crash {
        // Collect diagnostic information
        let diagnosticInfo = collectExtendedDiagnostics()
        
        // Log the additional diagnostic information
        Embrace.client?.logMessage(
            "Additional post-crash diagnostics",
            severity: .info,
            properties: diagnosticInfo
        )
    }
    
    return true
}
```

TODO: Add examples of using Last Run End State with SwiftUI apps
TODO: Show examples of coordinating crash recovery across multiple app components
TODO: Include best practices for testing crash recovery flows 