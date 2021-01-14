---
title: Linking Embrace
weight: 2
description: Linking Embrace with your application is quick and easy.
aliases:
  - /unity/linking-embrace/
---

# Linking Embrace with your Unity project

Embrace supports two methods of integration, automatic via the UPM git-repo feature of newer versions of the Unity Editor and a manual import solution.

Depending on how your project is structured and the Unity Editor version you use, follow one of these guides:

# Using the Unity Package Manager to add Embrace

If your project is using Unity editor version 2019 or newer, you can easily integrate Embrace by adding our UPM git-repo in package manager:

{{< image src="/docs/images/unity-upm-import.png" alt="Image showing how to use the package manager in Unity" caption="Unity Project showing the package manager's git import feature." width="800" height="520" >}}

1. Open your Unity project and navigate to the package manager using the `Window` menu
1. Press the `+` button in the upper left corner and choose `add package from git url`
1. Enter this url: `https://github.com/embrace-io/embrace-unity-upm.git`
1. The Embrace SDK will now be imported into the packages folder of your project

# Manually importing the Embrace SDK

For projects using older versions of the Unity Editor, or projects that prefer to contorl the location of their depencies, we also distribute our SDK as a unitypackage that you can download:

[Download Embrace For Unity](https://s3.amazonaws.com/embrace-downloads-prod/EmbraceSDK_{{< sdk platform="unity">}}.unitypackage.zip)

Once downloaded, unzip the archive and drag the unitypackage into your assets folder in the editor:

{{< image src="/docs/images/unity-import-embrace.png" alt="Image showing the import dialogue box for the Embrace SDK" caption="After dragging Embrace into your project, import all the required files." width="175" height="283" >}}

--- 

Now that Embrace is part of your project, learn how to add some required configuration options in the next section. 

---

{{< button relref="/unity/integration/configure-embrace" >}}Learn how to Configure Embrace{{< /button >}}
