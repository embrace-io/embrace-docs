---
title: Versioning Strategy
sidebar_position: 6
---

# Versioning strategy

The Embrace Android SDK is built to evolve with the Android ecosystem while maintaining a stable integration experience. This document explains which versions of Android build tools and technologies are supported, and what guarantees you can expect when upgrading.

---

## Minimum supported versions

For versions **8.0.0 and newer**, the Embrace Android SDK requires the following minimum tool and platform versions:

| **Technology**                  | **Minimum Version** |
|---------------------------------|---------------------|
| **Kotlin**                      | 2.0.21              |
| **Gradle**                      | 8.0.2               |
| **Android Gradle Plugin (AGP)** | 8.0.2               |
| **minSdk**                      | 26 *                |
| **minCompileSdk**               | 34                  |
| **Build JDK version**           | 17                  |
| **sourceCompatibility**         | 11                  |

\* Due to a dependency in **opentelemetry-java** that requires a Java 11 class, **you need to enable desugaring** to use Embrace with a lower `minSdk`. With desugaring enabled, Embrace supports `minSdk 21`, though you should update Gradle to 8.4 and AGP to 8.3.0.

---

## Why we don’t support every version

Supporting very old versions of build tools and libraries has an ongoing maintenance cost. Outdated toolchains often prevent adoption of newer Android APIs and features.

To provide the best experience — modern APIs, better performance, and faster support — the Embrace SDK intentionally follows the evolution of the Android toolchain. While we aim to minimize disruption and support a reasonable range of versions, occasional updates may be necessary.

---

## Versioning principles

The following principles are used to stay aligned with the Android ecosystem:

### Kotlin

The SDK is built with the latest Kotlin version and targets up to four versions behind it. Dropping support for older Kotlin versions only happens in a major SDK release.

### AGP and Gradle

The SDK supports the latest two major versions of AGP and Gradle, or higher if required by Kotlin. Because these tools don't strictly follow semantic versioning, older versions may be dropped when necessary to maintain compatibility or stability.

### minSdk and minCompileSdk

The SDK aligns its `minSdk` with the minimum required by Jetpack Compose, since most Android projects adopt new minimums when Compose does.

### Build-time JDK

The SDK requires the JDK version needed by the minimum supported version of Gradle.

### sourceCompatibility

The SDK sets `sourceCompatibility = 11` and relies on **desugaring**, which allows apps with lower `minSdk` values to use modern Java 11+ language features. More info: [Java 8+ desugaring in Android Studio](https://developer.android.com/studio/write/java8-support)

### OpenTelemetry API

The SDK tracks the latest stable OpenTelemetry Java and Kotlin APIs. Breaking changes in these projects are rare; if they occur, an assessment will determine whether they require a major SDK release.

### NDK

The SDK is always built with the latest stable NDK, since apps don’t link against our native libraries directly.
