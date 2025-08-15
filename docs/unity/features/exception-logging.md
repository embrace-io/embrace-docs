---
title: Exceptions Logging
description: Automatic Unhandled Exception Logging
sidebar_position: 6
---

# Automatic Exception Logging

Embrace automatically logs all unhandled exceptions thrown by your application, including the exception typename, message and managed stack trace when available. All exception logs passed through Unity's logger are captured and considered unhandled, including exceptions logged explicitly via `UnityEngine.Debug.LogException`. It is therefore recommended to send caught/handled exceptions directly to Embrace rather than log them via Unity's logger, as discussed in the [Manual Exception Logging](#manual-exception-logging) section below.

:::warning Important
 Embrace uses Unity's `Application.logMessageReceived` event to capture unhandled exceptions. If the logger is disabled (`Debug.unityLogger.logEnabled = false`), Embrace will not automatically log any exceptions. It is recommended to leave the logger enabled in release builds. If desired, lower severity logs can be disabled using `Debug.unityLogger.filterLogType = LogType.Exception`. [Manual Exception Logs](#manual-exception-logging) is available for use cases where the Unity logger can not be used.
:::

## Multi-Threaded Exceptions

By default, only exceptions thrown on the main Unity thread are captured automatically. To automatically capture exceptions thrown from background threads, enable the **Capture Multi-Threaded Log Exceptions** in the Embrace settings window (**Tools > Embrace > Settings > General**).

## Manual Exception Logging

Exceptions can be manually sent to Embrace via the `Embrace.Instance.LogUnhandledUnityException` and `Embrace.Instance.LogHandledUnityException` methods. Using these methods to record an exception that is also logged by Unity's debug logger will result in double capture, so it is recommended to use `Embrace.Instance.LogHandledUnityException` in place of `UnityEngine.Debug.LogException` for handled exceptions.

## Managed Stack Traces

Each exception log can include a managed stack trace provided by the Unity runtime. To ensure that stack traces are available, confirm that the **Stack Trace** level for exceptions in your project's player settings is set to **ScriptOnly** or **Full** for each platform (**Edit > Project Settings > Player > Other Settings > Stack Trace**).

<img src={require('@site/static/images/unity-stack-trace-level.png').default} />

## Stack Trace limit

Embrace User Timeline and Exception Details pages will only display the first 200 frames of a stack trace.  This limit is set to protect your users' network data transfer, as well as maintain high-performance session tooling.  For Exceptions with over 200 frames, we recommend reviewing your logging to prevent recursion.
