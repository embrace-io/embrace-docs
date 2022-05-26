---
title: Crash Reporting
weight: 5
description: Upload crash reports from your Android application using the Embrace SDK
aliases:
  - /android/crash-reporting/
---
# Collect Your First Crash Report

##  Setting up the Crash Reporter

{{< hint info >}}
See our [FAQ]({{< relref "/android/faq#crash-capture" >}}) for details on compatibility with other crash reporters.
{{< /hint >}}

For Android, the Embrace SDK automatically captures crash reports and uploads them.
Assuming you've initialized the Embrace SDK in the [Session Reporting]({{< relref "/android/integration/session-reporting" >}}) section,
congratulations, you're done!

Trigger a crash organically, or by adding the following code.

```java
throw new RuntimeException("This is a crash");
```

{{< hint danger >}}

**Note** This will crash your app, so only use it for testing purposes.

{{< /hint >}}

In most scenarios, the Embrace SDK is able to upload a crash report and session message after a crash occurs, but for certain scenarios they can only be uploaded on the next launch. If you do not see your crash in the dashboard, relaunch your application.

Once the crash and session messages are uploaded, you should notice that your session is marked with the "crashed" icon and your crash is visible in the crashes section of the dashboard.

## Symbolicating Stack Traces

If you have obfuscated your application with ProGuard, R8, or another obfuscation tool, the captured crashes will contain obfuscated method names. ProGuard and R8 files will be uploaded automatically at build time. If you don't see symbolicated crashes while using ProGuard or R8, reach out to us
on Slack and we'll work with you directly.

{{< hint warning >}}

**Note** Please contact us if you need Dexguard support.

{{< /hint >}}

---

In the next section, you'll be learning how to add Breadcrumb logs to add
context to sessions. 

{{< button relref="/android/integration/breadcrumbs" >}}Learn About Breadcrumb Logging{{< /button >}}
