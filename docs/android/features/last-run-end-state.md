---
title: Last run end state
description: Understand if the previous app instance ended in a crash
sidebar_position: 10
---

# Last run end state API

This API enables customers to automatically/programmatically understand if the previous app instance ended in a crash. Depending on your use case, having the ability to query an API to understand if the previous app instance ended in a crash will enable you to adjust the behavior or UI of your app after a crash has occurred.

**What does previous app instance mean?**  

A cold launch, basically. If the app gets backgrounded/resumed so a new session starts, the value returned will not change. So:

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

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using the latest version of the Embrace SDK
2. Implement the API call after starting the SDK to receive the state of the last run.

```kotlin
// The SDK must be started before checking the last run end state
val didLastRunCrash = Embrace.lastRunEndState == LastRunEndState.CRASH
```

**Important notes**

:::warning Important

- The API can only be called after the SDK has been started. If a call is made prior to starting the Embrace SDK you will get a response of `LastRunEndState.INVALID`
- It will return that a crash occurred if the app crashed any time since the app last came to the foreground. This includes if the app crashed while running in the background.
:::

### Version

This feature is included in Embrace SDK version 5.21.0 and above.

### Possible values

```kotlin
/// Used to represent the end state of the last run of the application.
enum class LastRunEndState {
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

import CallSupport from '@site/shared/call-support.md';

<CallSupport />
