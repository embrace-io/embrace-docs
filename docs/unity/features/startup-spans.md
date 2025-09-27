---
title: Startup Spans
description: Startup Spans for the Embrace Unity SDK
sidebar_position: 18
---

# Overview

Tracking app starting times is important to measure the performance of your app and to see how long your users are waiting before being able to actually interact with the app.

## Getting Started

Start by going to **Tools > Embrace > Settings**

Under the **Spans** Tab / **Startup Spans** enable:
**emb-app-startup**
**emb-app-loaded**
**emb-app-time-to-interactive**

Then click 'Apply Settings'.

### Implementation

The startup spans are not fully automated. You will need to call `Embrace.Instance.EndAppStartup();` after all your plugins and everything have finished loading. It's also important that you call `Embrace.Instance.StartSDK();` beforehand as well.

#### Start

Once the first scene has loaded a parent span is created `emb-app-startup`. Using the Startup API you can:

- Add your own custom child span by calling `EmbraceStartupSpans.StartChildSpan(string spanId);`
- Stop a custom child span by calling `EmbraceStartupSpans.StopChildSpan(string spanId);` (Please note that any child span that is not stopped before `EndAppStartup` is called will not be recorded. In the release of the Unity SDK 2.7.0 we will automatically stop child spans that were not explicitly stopped)

#### End

To end the Startup phase you'll need to call `Embrace.Instance.EndAppStartup();` in your code. Usually you want to call this sometime after your app has finished loading and the user is ready to interact with it.

Also with this call you can pass in a `Dictionary<string, string>` for any custom attributes you want to be reported along with the parent span.

## Viewing The Data

In your Embrace dashboard you can see the span details by going to your sessions and looking at the root span `emb-app-startup`

Click the 'See Details' to get more information and to view the child spans

Now you can view exactly how long it took your app to start up and then how long it took to load plugins and assets.

### Child Spans

Depending on the version of Android and other additional data your app provides, the following child spans may be recorded as part of the app startup trace, with the cold or warm root span as their parent.

#### emb-app-loaded

- The time it took starting from the OS registering your app with the system until the first scene was loaded including all assets and MonoBehaviors running their `Awake` functions.
- Only recorded for cold startups

#### emb-embrace-init

- The time it took for the Embrace SDK to initialize.
- Only recorded for cold startups

#### emb-app-time-to-interactive

- The time between when the first scene has loaded until `Embrace.Instance.EndAppStartup();` is called
- Only recorded for cold startups

### Sample Usage

```csharp
private async void Start()
{
    // Start the Embrace SDK
    Embrace.Instance.StartSDK();

    // Wait for any other plugins to initialize
    await InitializePlugins();

    // Now that the user is able to interact with the app, we can end the startup phase
    Embrace.Instance.EndAppStartup();
}
```
