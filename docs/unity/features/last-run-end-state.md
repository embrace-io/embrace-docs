---
title: Last Run End State
description: Understand if the previous app instance ended in a crash
sidebar_position: 6
---

# Last Run End State API

This API enables customers to automatically/programmatically understand if the previous app instance ended in a crash. Depending on your use case, having the ability to query an API to understand if the previous app instance ended in a crash will enable you to adjust the behavior or UI of your app after a crash has occurred.

**What do we mean by previous app instance?**  

A cold launch, basically. If the app gets backgrounded/resumed so a new session starts, the value returned will not change. So:

1. App crashes
2. App is relaunched
3. `GetLastRunEndState` returns "crashed"
4. App is sent to background
5. App is resumed, starting a new session
6. `GetLastRunEndState` still returns "crashed"
7. App exits cleanly
8. App is relaunched
9. `GetLastRunEndState` returns "clean exit"

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using the latest version of the Embrace SDK
2. Implement the API call after starting the SDK to receive the state of the last run.

```csharp
// The SDK must be started before checking the last run end state
Embrace.Instance.StartSDK();
bool didCrashLastRun = Embrace.Instance.GetLastRunEndState() == LastRunEndState.Crash;
```

**Important Notes**

- The API can only be called after the SDK has been started. If a call is made prior to starting the Embrace SDK you will get a response of `Invalid`
- It will return that a crash occurred if the app crashed any time since the app last came to the foreground. This includes if the app crashed while running in the background.
- This feature only works with the Embrace crash reporter on iOS. It is **not** compatible if you use Crashlytics for crash reporting.

### Version

This feature is available in Embrace Unity SDK version 1.15.0 and later.

### Possible Values

```csharp
/// <summary>
/// Represents the end state of the last run of the application.
/// </summary>
public enum LastRunEndState
{
    /// <summary>
    /// The SDK has not been started yet or the crash provider is not Embrace
    /// </summary>
    Invalid = 0,

    /// <summary>
    /// The last run resulted in a crash
    /// </summary>
    Crash = 1,

    /// <summary>
    /// The last run did not result in a crash
    /// </summary>
    CleanExit = 2,
}
```

## Support

---

If you have any questions or there’s something that is not working as intended, please reach out to your Customer Success Manager.
