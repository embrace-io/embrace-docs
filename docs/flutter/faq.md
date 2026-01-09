---
title: FAQ
description: Frequently asked questions about the Embrace Flutter SDK
sidebar_position: 5
---

# Embrace Flutter SDK FAQ

Here are some questions we commonly receive along with their answers. If you don't see your question or need more clarification, contact us on the [community Slack](https://community.embrace.io) or email us at [support@embrace.com](mailto:support@embrace.com).

## Integration

### **The SDK should support API level 21, but I get an error saying I need to set android.useFullClasspathForDexingTransformAPI**

A [desugaring bug](https://issuetracker.google.com/issues/230454566#comment18) in old AGP versions results in runtime crashes on old devices when using Embrace. If your `minSdk` is below 26, you must use AGP 8.3+ and add `android.useFullClasspathForDexingTransform=true` to your `gradle.properties`. Alternatively, you can set your `minSdk` to 26 to avoid the problem.

### **The SDK should support API level 21, but I get an error saying some other API level is needed. What's wrong?**

Verify that the following Gradle options are set:

```kotlin
compileOptions {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}
```
