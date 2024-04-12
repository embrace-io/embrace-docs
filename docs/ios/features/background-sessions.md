---
title: Capture Background Sessions
description: Embrace can capture background sessions so that you can gain insight into user experiences that are affected by events that happen in the background.
sidebar_position: 5
---

# Capture Background Sessions

The Embrace SDK can be configured to enable the capturing of background sessions. You can enable and disable capturing background sessions on the settings page of the Embrace dashboard.

A background session will contain any activity that happens when the app goes to the background, and its duration will be how long the app remains in this state.
Please note that when an app is backgrounded, it is only "alive" for a short period of time and it is then sent to "sleep" by the OS. 
How long the app remains active in the background may vary depending on what the app is doing, but ultimately it is the OS the one that has the control.
This means that a background session could be 1 hour long, but only 1 minute in that hour will have any kind of activity.

Here are some examples of what can start a background session:
- The app is active and it is sent to the background: this can happen when the user minimizes the app manually or another app goes to the foreground.
- The app is closed and then gets "waken up" in the background by the OS: usually happens when the app is configured with background tasks like handling silent push notifications. 

:::info
Capturing background sessions requires v5.15.0 or higher.
:::

:::warning Important
Enabling the collection of background session will increase the amount of sessions that are collected.
:::
