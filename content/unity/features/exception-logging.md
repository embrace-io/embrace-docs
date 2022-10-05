---
title: Unhandled Exceptions
description: Automatic Unhandled Exception Logging
weight: 5
aliases:
  - /Unity/exception-logging/
---

# Unhandled Exception Logging

Embrace automatically logs all unhandled exceptions thrown by your application, including the exception message and managed stack trace when available. 

{{<hint warning>}}
 Embrace uses Unity's `Application.logMessageReceived` event to capture unhandled exceptions. If the logger is disabled (`Debug.unityLogger.logEnabled = false`), Embrace will not automatically log any exceptions. It is recommended to leave the logger enabled in release builds. If desired, lower severity logs can be disabled using `Debug.unityLogger.filterLogType = LogType.Exception`. 
{{</hint>}}

## Multi-Threaded Exceptions

By default, only exceptions thrown on the main Unity thread are logged. To capture exceptions on background threads as well, enable the **Capture Multi-Threaded Log Exceptions** in the Embrace settings window (**Tools > Embrace > Settings > General**).

## Managed Stack Traces

Each exception log can include a managed stack trace provided by the Unity runtime. To ensure that stack traces are available, confirm that the **Stack Trace** level for exceptions in your project's player settings is set to **ScriptOnly** or **Full** for each platform (**Edit > Project Settings > Player > Other Settings > Stack Trace**).
{{< image src="/docs/images/unity-stack-trace-level.png" alt="Image showing Stack Trace level options" width="650" height="158" >}}