---
title: Last Run End State
description: Learn about the advanced ways Embrace can help your application
sidebar_position: 6
---

# Last Run End State API

## Overview

---

The Last Run End State API enables customers to automatically/programmatically understand if the previous app instance ended in a crash. Depending on your use case, having the ability to query an API to understand if the previous app instance ended in a crash will enable you to adjust the behavior or UI of your app after a crash has occurred.

**What do we mean by previous app instance?**

A cold launch, basically. If the app gets backgrounded/resumed so a new session starts, the value returned will not change. So:

1. App crashes
1. App is relaunched
1. `lastRunEndState` returns "crash"
1. App is sent to background
1. App is resumed, starting a new session
1. `lastRunEndState` still returns "crash"
1. App exits cleanly
1. App is relaunched
1. `lastRunEndState` returns "cleanExit"

## Integration Steps

---

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