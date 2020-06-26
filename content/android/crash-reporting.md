---
title: "Crash Reporting"
weight: 4
---

# Collect Your First Crash Report

##  Setting up the Crash Reporter

For Android, the Embrace SDK automatically captures crash reports and uploads them.
Assuming you've initialized the Embrace SDK in the [Session Reporting]({{< relref "/android/session-reporting" >}}) section,
congratulations, you're done!

Trigger a crash organically, or by adding the following code.

```java
throw new RuntimeException("This is a crash");
```

{{< hint warning >}}

**Note** This function will crash your app so only use it for testing purposes.

{{< /hint >}}

Remember that Embrace sessions only upload on subsequent launches.
This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded, you should notice that your session is marked with the "crashed" icon.
Additionally, your crash is visible in the crashes section of the dashboard.

## Symbolicating Stack Traces

By default, a stack trace will only show memory addresses, so it must be symbolicated to display useful information.
Symbolication will replace the memory addresses with function names, file paths, and line numbers.

Proguard files will be uploaded automatically. If you don't see symbolicated crashes while using Proguard, reach out to us
on Slack and we'll work with you directly.

{{< hint warning >}}

**Note** We do not officially support Dexguard.

{{< /hint >}}

---

In the next section, you'll learn about adding context to session with logs.

{{< button relref="/android/breadcrumbs" >}}Learn About Breadcrumb Logs{{< /button >}}
