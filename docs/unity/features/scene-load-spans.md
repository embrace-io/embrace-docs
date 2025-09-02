---
title: Automated Scene Loading Span Instrumentation
description: Capture scene loading times
sidebar_position: 20
---

# Overview

In the Embrace Unity SDK it's incredibly easy to measure how long your scenes are taking to load. We support single scenes and additive scenes.

## Getting Started

In the Unity editor start by going to **Tools > Embrace > Settings**

Under the **Spans** Tab check:
**Enable Scene Load Spans**

::: Note
Scene Load Spans is an opt-in feature, meaning it will only work if you enable it using the steps above.
:::

### Implementation

Scene loading spans are entirely automated. We use an internal span tracker to automatically track spanIds as soon as the app is loaded.

### Allow List

By default we measure the loading times of all scenes, however you may request that we only measure certain scenes. Use this function `SceneLoadMeasure.SetSceneAllowList` (with an argument of a list of scene names you want to allow). If you don't have any scenes in the allow list we will automatically measure all scenes.

### Viewing The Data

After you run your application on a device you can then check the Embrace dashboard to see your spans.

In your session details you should see spans with the format `scene-{sceneName}-loaded`.

### Notice
As part of this feature we override the SceneManagerAPI. If your application is already overriding the SceneManagerAPI then you won't be able to track scene load spans.
