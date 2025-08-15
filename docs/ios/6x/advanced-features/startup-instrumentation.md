---
title: Startup Instrumentation
description: Instrumentation around the application startup
sidebar_position: 4
---

# Automatic Instrumentation

The Embrace SDK will automatically create spans to instrument the startup process of the application. These should help you understand how your app is performing during startup and also give more context if your users are running into issues when launching it.

## Detecting Cold / Warm launches

As explained [here](https://developer.apple.com/documentation/xcode/reducing-your-app-s-launch-time#Understand-cold-and-warm-launch), app launches can vary depending on the state of the phone when the app is launched.

The Embrace SDK will automatically attempt to detect if the launch was **cold** or **warm**, which can be seen in the name of the root span for the automatic instrumentation: `emb-app-startup-cold` or `emb-app-startup-warm`.

## Detecting pre-warmed launches

A pre-warmed launch means some parts of the application were already pre-loaded before it was launched. This usually results in a faster startup process, however there's no way to control this behavior directly.

The Embrace SDK will automatically detect if the launch was pre-warmed and add the `isPrewarmed` attribute to all startup traces.

On top that, if the app was **not** pre-warmed, the `emb-app-pre-main-init` span will be created. This span starts when the app is being launched and ends when the `main()` function is called (in other words, this span measures how much time it takes for the application to be loaded before it actually starts).

## Detecting first frame rendered

The Embrace SDK will automatically detect when the first frame of the application is rendered, and essentially treat this as the "end" of the startup process.

The `emb-app-first-frame-rendered` span will be created when the application starts, and ends when the first frame is rendered.

## Detecting `appDidFinishLaunching`

If the Embrace SDK is setup and started within the `appDidFinishLaunching` method, it will automatically create `emb-app-startup-app-init` span. This span will measure how long it takes from the app starting until the `UIApplicationDidFinishLaunchingNotification` notification is called.

On top of this, the `emb-sdk-setup` and `emb-sdk-start` spans will be created to measure the Embrace SDK initialization process.

:::warning
Note that in order for these spans to be included, the Embrace SDK has to be setup and started within the `appDidFinishLaunching` method.  
:::

# Manual Instrumentation

You can add your own child spans and attributes to the startup traces through the Embrace client public API.

```swift
// add attributes to all startup traces
Embrace.client?.startupInstrumentation.addAttributesToTrace(["myKey": "myValue"])

// build a startup child span
let span = Embrace.client?.startupInstrumentation.buildChildSpan(name: "mySpan")?.startSpan()
// ...
span?.end()

// record a startup child span
Embrace.client?.startupInstrumentation.recordCompletedChildSpan(name: "myOtherSpan", startTime: someStartTime, endTime: someEndTime)
```
