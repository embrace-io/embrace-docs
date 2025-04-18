---
title: Capture Background Sessions
description: Embrace can capture background sessions so that you can gain insight into user experiences that are affected by events that happen in the background.
sidebar_position: 7
---

# Capture Background Sessions

The Embrace SDK can be configured to enable the capturing of background sessions. You can enable and disable capturing background sessions on the settings page of the Embrace dashboard.

It’s a server side configuration that gets received by the clients, and as it propagates they will stop sending the data.

:::info
Capturing background sessions requires v5.10.0 or higher.
:::

:::warning Important
Enabling the collection of background session will increase the amount of sessions that are collected.
:::
