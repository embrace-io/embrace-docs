# Embrace Android SDK versioning strategy

The Embrace Android SDK is built to evolve with the Android ecosystem while maintaining a stable integration experience.  
This document explains how we choose which versions of Android build tools and technologies to support, and what guarantees you can expect when upgrading.

---

## Minimum supported versions

For versions **8.0.0 and newer**, the Embrace Android SDK requires the following minimum tool and platform versions:

| **Technology** | **Minimum Version** |
| --- | --- |
| **Kotlin** | 2.0.21 |
| **Gradle** | 8.0.2 |
| **Android Gradle Plugin (AGP)** | 8.0.2 |
| **minSdk** | 26 * |
| **minCompileSdk** | 34 |
| **Build JDK version** | 17 |
| **sourceCompatibility** | 11 |

\* Due to a dependency in **opentelemetry-java** that requires a Java 11 class, **desugaring is required** to use Embrace with a lower `minSdk`.  
With desugaring enabled, Embrace supports `minSdk 21`, though Gradle should be updated to 8.4 and AGP to 8.3.0.

---

## Why we don’t support every version

Supporting very old versions of build tools and libraries has an ongoing maintenance cost.  
Outdated toolchains often prevent us from adopting newer Android APIs and features.

To provide the best experience — modern APIs, better performance, and faster support — we intentionally follow the evolution of the Android toolchain.  
While we aim to minimize disruption and support a reasonable range of versions, we expect occasional updates to be necessary.

---

## Our versioning principles

We follow these principles to stay aligned with the Android ecosystem:

### **Kotlin**

We build with the latest Kotlin version and target up to four versions behind it.  
Dropping support for older Kotlin versions only happens in a major SDK release.

### **AGP and Gradle**

We support the latest two major versions of AGP and Gradle, or higher if required by Kotlin.  
Because these tools don’t strictly follow semantic versioning, we may drop older versions when necessary to maintain compatibility or stability.

### **minSdk and minCompileSdk**

We align our `minSdk` with the minimum required by Jetpack Compose, since most Android projects adopt new minimums when Compose does.

### **Build-time JDK**

We require the JDK version needed by the minimum supported version of Gradle.

### **sourceCompatibility**

We set `sourceCompatibility = 11` and rely on **desugaring**, which allows apps with lower `minSdk` values to use modern Java 11+ language features.  
More info: [Java 8+ desugaring in Android Studio](https://developer.android.com/studio/write/java8-support)

### **OpenTelemetry API**

We track the latest stable OpenTelemetry Java and Kotlin APIs.  
Breaking changes in these projects are rare; if they occur, we will assess whether they require a major SDK release.

### **NDK**

We always build with the latest stable NDK, since apps don’t link against our native libraries directly.
