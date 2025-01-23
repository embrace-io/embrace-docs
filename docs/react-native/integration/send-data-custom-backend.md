---
title: Send data outside Embrace
description: Learn how to run the React Native Embrace SDK without an app_id and token
sidebar_position: 8
---

# Sending data outside Embrace

If you prefer to send the data into a custom backend avoiding Embrace it could be done by initializing the Embrace SDK without an app_id/token. This requires `@embrace-io/react-native-otlp` package to be installed and the configuration of at least **1 span exporter** and/or **1 log exporter**.

## Android

For Android both values can be omitted in the `embrace-config.json` file. For more information visit [Avoiding sending telemetry to Embrace](/android/features/traces/#avoiding-sending-telemetry-to-embrace). Please, make sure you also add `embrace.disableMappingFileUpload = true` to your `gradle.properties` file.

## iOS

For iOS the *appId* can be ommited as well when the SDK is initialized and configured through the code.

:::info SDK initialized in the Native side
If you already have the React Native Embrace SDK initialized in the Native Side or if you are planning to run the install scripts you would need to tweak manually both the Android/iOS sides.

Remember that the install scripts are adding the minimum code needed for Embrace to start but they are not integrating the configuration for exporting the telemetry data into a custom backend.

For more information about how to approach these changes you could visit the **[OTLP export](/react-native/features/otlp#initializing-in-the-native-layer)** section.
:::