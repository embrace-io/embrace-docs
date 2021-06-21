---
title: Linking Embrace
weight: 2
description: Linking Embrace with your application is quick and easy.
aliases:
  - /unity/linking-embrace/
---

# Linking Embrace with your Unity project

Embrace supports two methods of installation, OpenUPM, and manual installation.

## Using OpenUPM to add Embrace

[**See our package on OpenUPM**](https://openupm.com/packages/io.embrace.unity/) and follow the instructions on the right to install. Updates to the Embrace SDK will be automatically available through the Unity Package Manager.

## Manually importing the Embrace SDK

To manually install Embrace, download our latest SDK.

[**Download Embrace {{< sdk platform="unity">}} For Unity**](https://s3.amazonaws.com/embrace-downloads-prod/EmbraceSDK_{{< sdk platform="unity">}}.unitypackage)

Once downloaded, import the Unity Package by selecting Assets → Import Package → Custom Package.

{{< image src="/docs/images/unity-import-embrace.png" alt="Image showing the import dialog box for the Embrace SDK" caption="After selecting the downloaded package, import all the required files." width="92" height="137" >}}

---

Now that Embrace is part of your project, learn how to add some required configuration options in the next section.

{{< button relref="/unity/integration/configure-embrace-ios" >}}Configure the iOS Platform{{< /button >}}
