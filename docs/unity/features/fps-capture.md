---
title: FPS Capture
description: FPS Capture for the Embrace Unity SDK
sidebar_position: 19
---

# Overview

In mobile games and apps it is crucial to know when/if your app is having FPS issues. Typically you want a target minimum frame rate for your app and our automatic FPS capture tool will log periodically how your app is doing and if you went below a target threshold.

## Getting Started

Start by going to **Tools > Embrace > Settings**

Under the **Settings** Tab enable:
**Auto Instrumentation FPS Capture**

Please note this is an opt-in feature.

### Implementation

The FPS Capture tool is automatically added to your application as soon as it starts. If you want to change your target threshold go to Embrace SDK > Resources > EmbraceFrameMeasurer.prefab and modify the `Target Frame Rate` value.

### Start

By default the Frame Measuring tool will automatically generate a report every 60 seconds and post it as a log to the Embrace dashboard. Information viewed in each log is for the last report length. For example if your report interval is 60 seconds you will see the information for the last 60 seconds in each log.

## Viewing The Data

After you run your application on a device you can then check the Embrace dashboards to see your logs.

In your session details you should see a log called `frame-rate-report`. If you open that up you will see several properties as described:

**low-frame-rate-count**
The `low-frame-rate-count` property is a count of all frames that fell below your target threshold. This is shown as a percentage of the total frames for the reported length.

**profiler-marker-x-ms**
Unity exposes several profiler markers (300 to 4000 depending on the scope of your build) and these markers give you specific information about how the performance of your application is doing. We've exposed the data for the most common markers (player-loop for example) to display in the dashboard.

All values are shown in milliseconds and are sampled within the last report interval. If you see any numbers here that are alarming we recommend using the Unity Profiler itself to deep dive into why your app might be struggling in specific areas.

One thing to note here is that different devices will behave differently. On one Android device you might not see any issues and on others you may have horrible frame rate. Being able to tell which device is struggling depending on the marker is very helpful in hunting down the cause of the performance issues.

**record-average-fps**
This property describes your average frame rate for the last reporting interval.

### Custom Session Properties

You can also view your average session FPS by looking under the custom session properties for the property `session-average-fps`. This is helpful because you can compare that to report intervals and see how the reported interval compares to the overall session.
