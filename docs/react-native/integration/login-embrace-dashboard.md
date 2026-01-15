---
title: Login to the Embrace Dashboard
description: Login to the Embrace dashboard to get started with your React Native integration
sidebar_position: 2
---

# Getting Started with the Embrace Dashboard

## Logging In

Before being able to integrate, you'll need to create an account on the Embrace
dashboard so you can access your app ID and API token. Open a browser and
navigate to [dash.embrace.io](https://dash.embrace.io/).

Either login if you have created an account already, or follow the prompts to
register for a new one.

<img src={require('@site/static/images/login-page.png').default} />

## Integration page

Once you've finished logging in or registering for a new account, you'll be able
to create a new app. Follow the prompts until you get to the integration page.
Keep this tab open in your browser throughout the integration process. This will
assist you in verifying that data is sent, along with helping you become
familiar with the features the Embrace Dashboard offers.

:::info
Take note of the app ID and API token, as you'll need those when integrating the
Embrace SDK with your app.
:::

<img src={require('@site/static/images/rn-android-integration.png').default} />

<img src={require('@site/static/images/rn-ios-integration.png').default} />

Create **separate apps** in the Embrace dashboard for each plat form:
- One Android App :: One Android App ID
- One iOS App :: One iOS App ID
This setup allows us to have platform-specific SDK configuration as well as separate data streams.

At the end of the day you would have two app ids (one for Android and anothe one for iOS if integrating both).
Once we have all of the relevant apps and app IDs, we are ready to add the SDK to your app.

## Use without an Embrace account

If you prefer to send the data into a custom backend avoiding Embrace it could be done by initializing the Embrace SDK without an app_id/token. This requires configuring the [OTLP Export](/react-native/features/otlp) feature using the `@embrace-io/react-native-otlp` package to be installed and the configuration of at least **1 span exporter** and/or **1 log exporter**.

### Android

For Android both values can be omitted in the `embrace-config.json` file. For more information visit [Avoiding sending telemetry to Embrace](/android/features/traces/#avoiding-sending-telemetry-to-embrace). Please, make sure you also add `embrace.disableMappingFileUpload = true` to your `gradle.properties` file.

### iOS

For iOS the **appId** can be ommited as well when the SDK is initialized and configured through the code.

:::info SDK initialized in the Native side
If you already have the React Native Embrace SDK initialized in the Native Side or if you are planning to run the install scripts you would need to tweak manually both the Android/iOS sides.

Remember that the install scripts are adding the minimum code needed for Embrace to start but they are not integrating the configuration for exporting the telemetry data into a custom backend.

For more information about how to approach these changes you could visit the **[OTLP export](/react-native/features/otlp#initializing-in-the-native-layer)** section.
:::
