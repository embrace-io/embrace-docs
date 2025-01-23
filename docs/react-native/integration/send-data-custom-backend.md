---
title: Sending data outside Embrace
description: Learn how to run the React Native Embrace SDK without an app_id and token
sidebar_position: 4
---

# Sending data outside Embrace

If you prefer to send the data into a custom backend avoiding Embrace it could be done easily by initializing the Embrace SDK without an app_id or token. This requires `@embrace-io/react-native-otlp` package to be installed and the configuration of at least 1 span exporter & 1 log exporter.

## Android

For Android both values can be omitted in the `embrace-config.json` file. For more information visit [Avoiding sending telemetry to Embrace](android/features/traces/#avoiding-sending-telemetry-to-embrace). Please, make sure you also add `embrace.disableMappingFileUpload = true` to your `gradle.properties` file.

## iOS

For iOS the appId can be ommited as well.