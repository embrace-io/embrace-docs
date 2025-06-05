---
title: Integration Guide
description: Get started with integrating Embrace into your React Native application
sidebar_position: 1
---

# React Native Integration

## Getting Started

This guide will walk you through integrating Embrace into your React Native application with a series of articles. We recommend following them in order, although you are free to skip around.

## Requirements

:::info
Note that our minimum requirements on the native side tend to be a bit higher than those set by react-native init or @react-native-community/cli init by default for a fresh React Native project, please double-check that your project is configured correctly for the SDK to run
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
  * `@datadog/mobile-react-native`. More details [here](/docs/ios/6x/getting-started/installation.md#known-issues).

### Expo

For Expo apps, the project must be ejected (use `expo eject` for older versions or `expo prebuild` for newer versions) to integrate the necessary native components.