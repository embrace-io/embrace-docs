---
title: Last run end state
description: Understand if the previous app instance ended in a crash
sidebar_position: 5
---

# Last run end state API

This API lets you programmatically determine if the previous app instance ended in a crash. Depending on your use case, querying this API enables you to adjust the behavior or UI of your app after a crash has occurred.

**What do we mean by previous app instance?**

A cold launch. If the app gets backgrounded/resumed so a new session starts, the value returned won't change:

1. App crashes
2. App is relaunched
3. `getLastRunEndState` returns "crashed"
4. App is sent to background
5. App is resumed, starting a new session
6. `getLastRunEndState` still returns "crashed"
7. App exits cleanly
8. App is relaunched
9. `getLastRunEndState` returns "clean exit"

## Integration steps

To use this feature, follow these steps:

1. Ensure your app is using the latest version of the Embrace SDK.
2. Implement the API call after starting the SDK to receive the state of the last run:

```dart
// The SDK must be started before checking the last run end state
final didCrashLastRun = await Embrace.instance.getLastRunEndState() == LastRunEndState.crash;
```

**Important notes**

- You can only call the API after the SDK has been started. If you call it before starting the Embrace SDK, you'll get a response of `LastRunEndState.invalid`.
- It returns that a crash occurred if the app crashed any time since the app last came to the foreground, including if the app crashed while running in the background.
- On iOS, this feature only works when the Embrace crash reporter is enabled. It's **not** compatible with Crashlytics for crash reporting.

### Version

This feature is available in Embrace Flutter SDK version 1.3.0 and later.

### Possible values

```dart
/// Used to represent the end state of the last run of the application.

enum LastRunEndState {
  /// The SDK has not been started yet, or it is not configured as the crash handler for the application
  invalid,

  /// The last run resulted in a crash
  crash,

  /// The last run did not result in a crash
  cleanExit
}
```

## Support

If you have questions or something isn't working as intended, reach out to your Customer Success Manager.
