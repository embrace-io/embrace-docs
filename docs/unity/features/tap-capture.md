---
title: Unity Tap Capture
description: Capture Unity Context Taps
sidebar_position: 15
---

# Unity Tap Capture

## Overview

As part of the Unity SDK, we are providing an initial release of the Unity contextualized auto-instrumented tap capture.

To enable tap capture auto-instrumentation in production, all you have to do is replace your current `InputModule` (usually the [Standalone Input Module](https://docs.unity3d.com/Packages/com.unity.ugui@1.0/manual/script-StandaloneInputModule.html)) with our custom Embrace override: the `EmbraceStandaloneInputModule`:

<img src={require('@site/static/images/unity-tap-capture-input-module.png').default} />

Afterwards, you'll need to enable Embrace tap capture manually via code. This is an opt-in feature that you must turn on because of the risk of accidentally capturing PII. Therefore, it is up to you to activate and deactivate the feature as you deem safe as follows:

```csharp
FindFirstObjectByType<EmbraceStandaloneInputModule>().EmbraceTapCaptureEnabled = true
```

That's it! We'll now automatically capture whatever the users taps on using the first touch on a screen. We do not yet instrument multiple taps at this time. Note that each tap is recorded as a span, which will count against your span limit of 100 spans per session.

## Customization Options

Additionally if you want to customize how we extract various object identifiers we provide three interfaces you can override directly on the `EmbraceStandaloneInputModule`: `IEmbraceViewNameProvider`, `IEmbraceGameObjectNameProvider`, and `TappedNameProvider`.

Each comes with a sane, but highly open-ended default that might not fit your project's telemetry needs. Please reference the `DefaultViewNameProvider` and `DefaultGameObjectNameProvider` definitions for examples of how to override these. `TappedNameProvider` is simply a reference to a `Func<string, string, string>` that composes two strings. Of course you can override this as well.
