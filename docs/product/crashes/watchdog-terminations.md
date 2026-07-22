---
title: Watchdog Terminations
description: Understand why the OS terminated your iOS app using MetricKit watchdog termination reports
sidebar_position: 3
---

## Watchdog Terminations

:::info iOS Only
Watchdog terminations are currently available for **iOS** apps using the Embrace Apple SDK.
:::

When iOS force-terminates your app, the process receives a `SIGKILL` that no in-process crash reporter can catch.
This happens when your app blocks the main thread for too long, overheats the device, or holds a file lock while
being suspended. Apple's MetricKit framework reports these terminations on the next app launch, and Embrace collects
and groups those reports so you can see why the OS is killing your app.

### Requirements

- Use version 6.19.0 or later of the Embrace Apple SDK, which captures MetricKit crash reports by default.
- MetricKit capture requires the default KSCrash-based crash reporter. If you pass `crashReporter: nil` or use the
  `CrashlyticsReporter`, MetricKit capture is disabled. See
  [Crash Reporting in iOS](/ios/6x/manual-instrumentation/crash-reporting.md) for details.

The **Watchdog Terminations** tab appears on the **Crashes** page once Embrace receives MetricKit reports with
termination reasons for your app.

### Viewing watchdog terminations in the dashboard

The summary view charts watchdog terminations by watchdog event, shows other termination codes separately, and lists
every termination reason with its event and device counts.

<!-- TODO: screenshot of the Watchdog Terminations summary tab
![Watchdog Terminations summary tab showing the termination reasons chart and table](/images/watchdog-terminations-summary.png)
-->

Each row in the table represents one termination reason:

- **Events**: Total count of termination events in this group
- **Devices**: Unique devices affected by this termination reason
- **Termination Reason**: The termination code and, for watchdog kills, the watchdog event that triggered it
- **Versions**: Version range where this termination reason has been observed

You can filter the view by app, device, OS, and user attributes, as well as termination-specific fields like
process visibility and termination code. See [Filters](/product/filters.md) for definitions of common filters.

### Termination reasons

Terminations are grouped by the termination code Apple includes in the report, combined with the watchdog event for
watchdog kills:

| Code         | Label                | What it means                                                                                                      |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `0x8BADF00D` | Watchdog             | The OS watchdog killed the app because an operation took too long, such as launching, updating a scene, or exiting |
| `0xC00010FF` | Thermal Kill         | The OS killed the app in response to a thermal event                                                               |
| `0xDEAD10CC` | File Lock on Suspend | The app held a file or database lock while being suspended                                                         |
| `0x2BAD45EC` | Drawing While Locked | The app drew to the screen while the device was locked                                                             |

Watchdog kills are further grouped by the watchdog event, for example `Watchdog: scene-update` or
`Watchdog: process-launch`. Each watchdog event also includes an exhaustion type that tells you which allowance the
app exhausted: wall clock time, CPU time, graceful termination timeout, or deadlock.

The codes and their meanings come from Apple. See Apple's documentation on
[addressing watchdog terminations](https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations)
and [the exception types in a crash report](https://developer.apple.com/documentation/xcode/understanding-the-exception-types-in-a-crash-report)
for more detail.

### Termination details

Click a termination reason to open its details page, which shows a count-by-version chart over time and the list of
individual termination events.

<!-- TODO: screenshot of the termination details page
![Termination details page showing the version chart and termination events list](/images/watchdog-terminations-details.png)
-->

Each termination event shows the report time, app version, and device, and you can use **Customize** to choose which
columns appear. Expand an event to see:

- **Stack Trace**: The symbolicated stack trace captured at termination, in the same viewer used for crashes
- **Termination Details**: The raw termination text from MetricKit, including elapsed time, CPU statistics, and the
  OS explanation for the termination

### Good to know

- **Report times are approximate.** Apple does not expose the exact time of the termination. MetricKit batches
  diagnostic reports and delivers them on the next app launch.
- **Watchdog terminations are not associated with sessions.** MetricKit reports arrive outside of session context,
  so termination events do not link to user sessions, do not affect crash-free rates, and are not available in
  alerts, widgets, or custom metrics at this time.
