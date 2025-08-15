---
title: ANR Reporting
description: ANR Reporting
sidebar_position: 1
---

# ANR Reporting

## What is an ANR?

ANRs (or Application Not Responding) are Android errors indicating that an app is stuck or frozen during a user interaction. It is triggered when the Main Thread (UI thread) of an Android app is blocked for too long. They are triggered mostly if the app does not respond to user input within 5 seconds.

But ANRs can also be caused by:
- Slow services
- Slow broadcast receivers
- Foreground services not started correctly
- Improper use of JobScheduler (new in Android 14)
- When the app is unresponsive the user is presented with an ANR dialog that gives them the option to force quit the application. ANRs may not cause your app to crash but are just as disruptive as crashes to the user experience

## How does Embrace capture ANRs?

Embrace instantly auto-captures and detects a sample/snapshot of an ANR in production every 100ms as soon as the main thread is not responding for 1 second and until the ANR interval is over

## Troubleshooting your ANRs

  ### Issue Summary List
- **Issue Prioritization**: Is done as a combination of the number of occurrences, and user and session impact
- **Issue Categories**: Ad SDK, Android, Java, and IO.
- **Drilling down on notable frames**: by being able to inspect significant frames in the stack trace under this method, which could be one of the root causes of the ANRs
- **Common Issues highlighting**: For each “problematic” method, we identify possible issues under its stack trace that could lead to an ANR, and we are highlighting that right away on the right panel
- **Sample types**: We collect up to 80 samples per ANR event, and we allow you to choose which one to further inspect
  - **First Sample**: Use the first sample taken when the ANR is detected. This is typically around 1 second after the main thread is blocked.
  - **Most Representative Sample**: Our SDK records multiple samples during an ANR and not just a single sample after 5 seconds. Select this option to use the sample that was most common during the ANR.
  - **Ad-Focused Sample**: Similar to Most Representative Sample, but this option only considers samples that contain at least one frame associated with an ad SDK.

### ANR Flame Graph Troubleshooting View

This page will help you understand which parts of your app contribute most to ANRs. You can get to this page from each issue in the summary table from the previous page

- **Drilling down on notable frames:**  The same hierarchical view from the summary list gets transferred to the flame graph. For the selected issue on the flame graph, you can access and inspect all the significant branches for that specific method across different ANR samples
- **Common Issues:**  The user can explore different branches of the issue tree in the flame graph while seeing on the right side a list of possible known issues to explore
- **Sample Sessions:** We know the importance of referring to specific sessions that were affected by ANRs. In this case, the user will have a list of sessions with ANRs that present the issue selected
- **Insights**: These outliers highlight over-indexed statistics for experiencing an issue and point to characteristics that you should investigate.
- **Filters and tools:**  The user can explore and debug using the flame graph's new functionalities, different actions will allow the user to focus, group, and collapse on methods, adapting the view to the needs of the problem
  - **Debugging:**  default filter, shows all the packages and methods in the sample stack traces. User will get the full picture
  - **Prioritization:**  The focus is on important methods/packages, others will be collapsed and greyed out
  - **Custom**: The user can decide how they want to visualize the graph
    - **Collapse on:**  join similar method groups under one root package (either common categories or all). Probably the most useful view is when we collapse all the Android system packages, which reduces the noise in the flame graph quite a bit
    - **Focus on:** Gray out unimportant categories (android packages) and focus only on the ones that matter (i.e ads packages)
    - **Min Width:** the min % of method appearances on the samples needed to appear on the flame graph

### ANR Method Troubleshooting View

This graph is *anchored* around the selected method. This allows you to see all the code paths that lead to the selected method and the code paths following the method. Users can get to this page from branches in the flame graph and from the known issues list.

- **Common Issues/Methods ANR contribution:** This view will break the percentage of appearances of the problematic methods across calling or being called by the selected one across the different samples
- **Sample Sessions:**  same as above, users will have access to “Sample Sessions” from this issue's detailed view
