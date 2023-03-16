---
title: Linking Embrace
sidebar_position: 2
description: Linking Embrace with your application is quick and easy.
aliases:
  - /unity/linking-embrace/
---

# Linking Embrace with your Unity project


To install Embrace, download our latest SDK below.

[**Download Embrace {{< sdk platform="unity">}} For Unity**](https://s3.amazonaws.com/embrace-downloads-prod/EmbraceSDK_{{< sdk platform="unity">}}.unitypackage)

Once downloaded, import the Unity Package by selecting Assets → Import Package → Custom Package.

{{< image src="/docs/images/unity-import-embrace.png" alt="Image showing the import dialog box for the Embrace SDK" caption="After selecting the downloaded package, import all the required files." width="92" height="137" >}}

## Scoped Registries
Scoped Registries allow Unity to communicate the location of any custom package registry server to the Package Manager so that the user has access to several collections of packages at the same time. Embrace uses Scoped Registries to allow our users to manage, download and install our SDK using the built-in Unity Package Manager.
{{< image src="/docs/images/unity-package-manager.png" alt="Image showing the unity package manager" caption="Example of the Embrace SDK being used in Unity's Package Manager." width="536.5" height="435.5" >}}

We've automated the process of setting up Embrace as a scoped registry. If you would like to manage your scoped registries, you can do so by going to Project Settings --> Package Manager --> Scoped Registries.

---

Now that Embrace is part of your project, learn how to add some required configuration options in the next section.

{{< button relref="/unity/integration/configure-embrace-ios" >}}Configure the iOS Platform{{< /button >}}
