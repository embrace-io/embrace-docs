---
title: Configure the iOS Platform
description: Configuring the Embrace Unity iOS SDK for mobile platforms
sidebar_position: 3
---

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the SDK, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms using the Embrace editor window.

# Configure the iOS platform

Go to Tools -> Embrace -> Getting Started and click on it to reveal the Embrace editor window. Select the iOS tab and fill in the missing `APP_ID` and `API_TOKEN`. You can get the correct values from the settings page in your dash.

<img src={require('@site/static/images/ios-configure-editor-window.png').default} />

Now when you build and run your project, our editor script will use those values to correctly setup the final IPA to work with Embrace.

---

In the next section, we'll learn how to configure the Android Platform.