# Embrace Last Run End State API

## Overview

---

This API enables customers to automatically/programmatically understand if the previous app instance ended in a crash. Depending on your use case, having the ability to query an API to understand if the previous app instance ended in a crash will enable you to adjust the behavior or UI of your app after a crash has occurred.

**What do we mean by previous app instance?** 

A cold launch, basically. If the app gets backgrounded/resumed so a new session starts, the value returned will not change. So:

1. App crashes
2. App is relaunched
3. getLastRunEndState returns "crashed"
4. App is sent to background
5. App is resumed, starting a new session
6. getLastRunEndState still returns "crashed"
7. App exits cleanly
8. App is relaunched
9. getLastRunEndState returns "clean exit"

## Integration Steps

---

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using the latest version of the Embrace SDK
2. Implement the API call to receive the state of the last run.

**Important Notes**

- The API can only be called after the SDK has been started. If a call is made prior to starting the Embrace SDK you will get a response of `Invalid`
- It will return that a crash occurred if the app crashed any time since the app last came to the foreground. This includes if the app crashed while running in the background.

<aside>
⚠️ This feature only works with the Embrace crash reporter. It is **NOT** compatible if you use Crashlytics for crash reporting.

</aside>

## Android (Java & Kotlin)

---

### Version

This feature is included in Embrace SDK version 5.21.0 and above.

### Implementation

Java

```java
switch (Embrace.getInstance().getLastRunEndState()) {
            case CRASH: {
                Log.e("Embrace", "Last run ended in a crash.");
                break;
            }
            case CLEAN_EXIT: {
								Log.i("Embrace", "Last run ended without a crash.");
                break;
            }
            case INVALID: {
                Log.e("Embrace", "Invalid usage of getLastRunEndState(). Please call it after Embrace.getInstance().start()");
                break;
            }
        }
```

Kotlin

```kotlin

when (Embrace.getInstance().lastRunEndState) {
            Embrace.LastRunEndState.CRASH -> {
                Log.e("Embrace", "Last run ended in a crash.");
            }
            Embrace.LastRunEndState.CLEAN_EXIT -> {
                Log.i("Embrace", "Last run ended without a crash.")
            }
            Embrace.LastRunEndState.INVALID -> {
                Log.e("Embrace", "Invalid usage of getLastRunEndState(). Please call it after Embrace.getInstance().start()")
            }
        }
```

### Possible Values

```kotlin
Enum class LastRunEndState {
        /**
         * The SDK has not been started yet.
         */
        INVALID(0),

        /**
         * Last run ended in a crash.
         */
        CRASH(1),

        /**
         * Last run ended without a crash.
         */
        CLEAN_EXIT(2)
}
```

## iOS (Objective-C & Swift)

---

### Version

**This feature is included in Embrace SDK version 5.21.0 and above.**

### Implementation

**Objective C**

```objectivec
EMBLastRunEndState lastEndState = [Embrace sharedInstance].lastRunEndState;
if(lastEndState == EMBLastRunEndStateInvalid)
{
    NSLog(@"We have misused the api either by calling it before start, or by trying to use it with crashlytics.");
} else if (lastEndState == EMBLastRunEndStateCrash)
{
    NSLog(@"There was a crash last run.");
} else if (lastEndState == EMBLastRunEndStateCleanExit)
{
    NSLog(@"Last run ended without a crash.");
}
```

**Swift**

```swift
switch Embrace.sharedInstance().lastRunEndState {
    case .invalid:
        print("We have misused the api either by calling it before start, or by trying to use it with crashlytics.")
    case .crash:
        print("There was a crash last run.")
    case .cleanExit:
        print("Last run ended without a crash.")
    @unknown default:
        print("Something has gone horribly wrong")
}
```

### Possible Values

```objectivec
/**
 The last state of the app
 */
typedef NS_ENUM(NSInteger, EMBLastRunEndState) {

    /**
     The SDK has not been started yet or the crash provider is not Embrace
     */
    EMBLastRunEndStateInvalid = 0,

    /**
     The last run resulted in a crash
     */
    EMBLastRunEndStateCrash = 1,

    /**
     The last run did not result in a crash
     */
    EMBLastRunEndStateCleanExit = 2,
};
```

<aside>
⚠️ If the last run resulted in a sigkill, then `EMBLastRunEndStateCleanExit` will be returned anyway. This is because Embrace, and basically anybody except apple, is unable to catch sigkill crashes.

</aside>

## Unity (C# )

---

### Version

This feature is included in Embrace Unity SDK version 1.15.0 and above.

```csharp
// The SDK must be started before checking the last run end state
Embrace.Instance.StartSDK();
bool didCrashLastRun = Embrace.Instance.GetLastRunEndState() == LastRunEndState.Crash;
```

## Support

---

If you have any questions or there’s something that is not working as intended, please reach out to your Customer Success Manger.