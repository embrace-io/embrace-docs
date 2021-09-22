---
title: "Configure the iOS Platform"
description: Configuring the Embrace Unity iOS SDK for mobile platforms
weight: 3
aliases:
  - /unity/configure-embrace-ios/
---

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the SDK, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms.

Create an `EmbraceConfiguration` asset from the Assets tab, if not already present.

{{< image src="/docs/images/unity-embrace-configurator.png" alt="Image showing the location of the Embrace-Info.plist within the Embrace package" caption="Adding the EmbraceSDK Configuration asset" width="702" height="438" >}}

# Configure the iOS platform

Locate the `EmbraceConfiguration.asset` file within the Embrace package and click on it to reveal the Embrace Unity Editor.
There go ahead and fill in the missing `APP_ID` and `API_TOKEN`. You can get the correct values from the settings page in your dash.

{{< image src="/docs/images/unity-ios-config.png" alt="Image showing the location of the EmbraceConfiguration.asset within the Embrace package" caption="The location of the EmbraceConfiguration.asset  in the Embrace package." width="702" height="438" >}}


Now when you build and run your project, our editor script will use those values to correctly setup the final IPA to work with Embrace.

---

In the next section, we'll learn how to configure the Android Platform.

{{< button relref="/unity/integration/configure-embrace-android" >}}Configure the Android Platform{{< /button >}}
