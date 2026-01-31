---
title: Linking Embrace
sidebar_position: 2
description: Linking Embrace with your application is quick and easy.
---

# Linking Embrace with your Unity project

To install Embrace, download our latest SDK below.

[Download Embrace 2.8.1 for Unity](https://github.com/embrace-io/embrace-unity-sdk/releases/download/v2.8.1/EmbraceSDK_2.8.1.unitypackage.zip)

Once downloaded, import the Unity Package by selecting Assets -> Import Package
-> Custom Package.

:::warning Info
Note that on some versions of iOS, when double clicking the file to unzip, it will produce a series of folders containing binaries rather than a unity package. This is because the .unitypackage data type is a zip file containing the files organized for Unity's pipeline. To deal with this, simply invoke `unzip EmbraceSDK_2.8.1.unitypackage.zip` from your terminal in the folder where you are keeping the zipped package. This will only unzip one level rather than fully unzipping the file.
:::

<img src={require('@site/static/images/unity-import-embrace.png').default} />

---

Now that Embrace is part of your project, learn how to add some required
configuration options in the next section.
