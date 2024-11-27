---
title: Configure the iOS Platform
description: Configuring the Embrace Unity iOS SDK for mobile platforms
sidebar_position: 3
---

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the SDK, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms using the Embrace editor window.

## Configure the iOS platform

Go to Tools -> Embrace -> Getting Started and click on it to reveal the Embrace editor window. Select the iOS tab and fill in the missing `App ID` and `Symbol Upload API Token`. You can get the correct values from the settings page in your dash.

<img src={require('@site/static/images/unity-ios-configure-editor-window.png').default} />

Additionally, when you start the SDK you will need to pass the `App ID` to the StartSDK call as below:

```cs
EmbraceStartupArgs args = new EmbraceStartupArgs("AppID");
Embrace.Instance.StartSDK(args);
```

Now when you build and run your project, our editor script will use those values to correctly setup the final IPA to work with Embrace.

## Known Issues

Our Apple SDK and the Unity iOS SDK use Swift, which has a known issue with the current Unity build pipeline. To handle this issue, after creating your XCode project, add a Dummy Swift file to the UnityFramework target. This will adjust the linker pipeline to invoke Swift appropriately.

For further information, please refer to this discussion: https://github.com/CocoaPods/CocoaPods/issues/11960

---

In the next section, we'll learn how to configure the Android Platform.
