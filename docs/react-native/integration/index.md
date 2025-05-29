---
title: Integration Guide
description: Get started with integrating Embrace into your React Native application
sidebar_position: 1
---

# React Native Integration

## Getting Started

This guide will walk you through integrating Embrace into your React Native application with a series of articles. We
recommend following them in order, although you are free to skip around.

## Requirements

:::info
Note that our minimum requirements on the native side tend to be a bit higher than those set by react-native init or
@react-native-community/cli init by default for a fresh React Native project, please double-check that your project is
configured correctly for the SDK to run. You may find [these app templates](https://github.com/embrace-io/embrace-react-native-sdk/tree/main/integration-tests/templates)
that we've setup for integration testing useful as a guide for bringing your project up to the minimum required
configuration.
:::

### Android

* Android: Android 7.0 (API 24)
* `minSdkVersion`: 24 or higher
* `compileSdkVersion`: 34 or higher
* Java 1.8
* Kotlin 1.8.22
* Gradle 7.5.1
* AGP (Android Gradle Build Tools Plugin) 7.4.2

### iOS

* iOS 13.0
* Swift 5
* Known incompatibilities
  * `@datadog/mobile-react-native`. More details [here](/ios/open-source/integration/linking-embrace/#known-issues).

### Supported versions of React Native

We test that apps integrated with Embrace across React Native minor versions from `0.71` to `0.79` build and launch without
issue. Apps on versions of React Native older than 0.71 may work with Embrace after some modification but these are not
directly supported. The templates used to generate apps for integration testing along with the exact patch versions of
React Native we use can be found [here](https://github.com/embrace-io/embrace-react-native-sdk/tree/main/integration-tests/templates).

### Expo support

Apps using Expo are supported by Embrace's React Native SDK. If you are using Expo's `prebuild` system you can make use
of our [Expo config plugin](/react-native/integration/add-embrace-sdk/#expo-config-plugin) to manage the changes to your
project's native `android/` and `ios/` folders required by the SDK.