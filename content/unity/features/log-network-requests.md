---
title: Log Network Requests
description: Log network requests made by your application
weight: 4
aliases:
  - /Unity/log-network-requests/
---

# Log Network Requests

## Manual Logging

Network requests of any type can be logged manually via the log message API.

```csharp
Embrace.Instance.LogNetworkRequest(...)
```

{{<hint warning>}}
On iOS, requests sent through `UnityWebRequest` are logged automatically by the native Embrace SDK.
{{</hint>}}

## HttpClient Message Handler (BETA)

Embrace provides an implementation of `HttpMessageHandler` that automatically logs all network requests passed through it. To enable this behavior, pass an instance of the Embrace handler to the constructor when instantiating your `HttpClient`.

```csharp
var client = new HttpClient(new EmbraceLoggingHttpMessageHandler());
```

After logging the request, the `EmbraceLoggingHttpMessageHandler` delegates to an inner handler. An instance of `HttpMessageHandler` is used by default. If you'd like to use your own handler, pass it to the constructor when instantiating the Embrace handler.

```csharp
var handler = new EmbraceLoggingHttpMessageHandler(new MyHandler());
var client = new HttpClient(handler);
```

## Automatic Network Capture (BETA)

The Embrace Unity SDK includes a compilation post-processor that can weave code to automatically capture all network requests sent through `UnityWebRequest` and `HttpClient`. 

{{<hint warning>}}
Internally, the Embrace weaver uses `Mono.Cecil` to inspect and modify CIL assemblies. The Embrace package resolves this dependency through the Unity Package Manager. If your project already includes `Mono.Cecil` from another source, we recommend switching to the package manager version to avoid conflicts.
{{</hint>}}

### Enabling Automatic Network Capture Weaving

Automatic network capture weaving can be enabled in the **Network Capture** tab of the Embrace settings window (**Tools > Embrace > Settings**). 

{{< image src="/docs/images/unity-network-capture-settings.png" alt="Image showing Embrace network capture settings" width="662" height="271" >}}

By default, the code weaver processes assemblies any time they are recompiled, including at build time and in the editor. To improve iteration time, weaving can be restricted to builds only by enabling the **Weave Builds Only** toggle. It is recommended to start with this toggle disabled to quickly catch compatibility issues while this feature is in beta.

The **Verbose Logging** option instructs the weaver to log diagnostic information to the Unity console for each assembly it inspects. This can lead to thousands of log messages, and it is recommended to leave this option disabled.

### Excluding Code from Network Capture Weaving

Use the `[EmbraceWeaverExclude]` attribute to instruct the network capture weaver to ignore certain sections of code. It can be applied to a method, class, or an entire assembly. Assemblies can also be excluded by adding the assembly definition to the **Excluded Assemblies** list in the **Network Capture** settings tab. Editor-only assemblies are automatically excluded.

{{<hint warning>}}
The **Automatic Network Capture Weaving** and **Weave Builds Only** toggles work by defining the `EMBRACE_WEAVER_ENABLED` and `EMBRACE_WEAVER_BUILDS_ONLY` symbols, respectively. These symbols are defined project wide, and thus all non-editor assemblies in the project are included in weaving. Network capture weaving can be restricted to targeted assemblies by manually defining those symbols in the desired assembly definitions rather than at the project level.
{{</hint>}}