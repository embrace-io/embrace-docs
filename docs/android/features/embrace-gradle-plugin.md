---
title: Embrace Gradle Plugin
description: Get readable stacktraces in production with the Embrace Gradle Plugin and auto-instrument your app
sidebar_position: 20
---

# Embrace Gradle Plugin

## Overview

The Embrace Gradle Plugin performs several functions:
1. It uploads mapping files to the Embrace backend that are required to get readable stacktraces from production apps
2. It instruments your app's bytecode to insert SDK hooks that capture telemetry out-of-the-box
3. It adds Embrace dependencies to your project's compile classpath
4. It injects your specified configuration for the Embrace SDK into the APK/App Bundle

## Apply the Embrace Gradle Plugin

To apply the Embrace Gradle Plugin to your app follow the instructions in our [integration steps](/android/integration/integration-steps).

## Configure the Embrace Gradle Plugin

The Embrace Gradle Plugin should be configured via the `build.gradle` of the module where you applied the plugin. The full DSL is shown here, and explained in more detail below the code snippet:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
plugins {
    id 'io.embrace.swazzler'
}

embrace {
    autoAddEmbraceDependencies.set(true)
    autoAddEmbraceComposeClickDependency.set(false)
    telemetryEnabled.set(true)
    failBuildOnUploadErrors.set(true)
    customSymbolsDirectory = "app/src/main/embrace/symbols"

    bytecodeInstrumentation {
        enabled.set(true)
        okhttpEnabled.set(true)
        onClickEnabled.set(true)
        onLongClickEnabled.set(true)
        webviewOnPageStartedEnabled.set(true)
        firebasePushNotificationsEnabled.set(true)
        classIgnorePatterns.set(["com.example.foo.*"])
    }

    buildVariantFilter {
        if (it.name.contains("debug")) {
            it.disablePluginForVariant()
            it.disableBytecodeInstrumentationForVariant()
        }
    }
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
plugins {
    id("io.embrace.swazzler")
}

embrace {
    autoAddEmbraceDependencies.set(true)
    autoAddEmbraceComposeClickDependency.set(false)
    telemetryEnabled.set(true)
    failBuildOnUploadErrors.set(true)
    customSymbolsDirectory = "app/src/main/embrace/symbols"

    bytecodeInstrumentation {
        enabled.set(true)
        okhttpEnabled.set(true)
        onClickEnabled.set(true)
        onLongClickEnabled.set(true)
        webviewOnPageStartedEnabled.set(true)
        firebasePushNotificationsEnabled.set(true)
        classIgnorePatterns.set(listOf("com.example.foo.*"))
    }

    buildVariantFilter {
        if (name.contains("debug")) {
            disablePluginForVariant()
            disableBytecodeInstrumentationForVariant()
        }
    }
}
```

</TabItem>
</Tabs>

### Gradle DSL reference

#### autoAddEmbraceDependencies

Whether the Embrace Gradle Plugin should automatically add Embrace dependencies to this module's classpath. Defaults to true.

#### autoAddEmbraceComposeClickDependency

Whether the Embrace Gradle Plugin should automatically add the embrace-android-compose dependency to this module's classpath. Defaults to false.

#### customSymbolsDirectory

Path to a directory containing architecture subdirectories (e.g., arm64-v8a/, x86/, etc.) with .so files to be used for crash symbolication
This could be:
    - An **absolute path**, like: "/Users/yourname/project/app/src/main/symbols".
    - A **path relative to the module's root directory** such as: "app/src/main/embrace/symbols".

#### telemetryEnabled

Whether the Embrace Gradle Plugin should report telemetry on its own performance. Defaults to true.

#### failBuildOnUploadErrors

Whether the Embrace Gradle Plugin should fail the build if it encounters an error during a HTTP request. Defaults to true.

#### bytecodeInstrumentation.enabled

Global flag that overrides all others & decides whether Embrace should perform any bytecode instrumentation. Defaults to true.

#### bytecodeInstrumentation.okhttpEnabled

Whether Embrace should automatically instrument OkHttp requests. Defaults to true.

#### bytecodeInstrumentation.onClickEnabled

Whether Embrace should automatically instrument android.view.View click events. Defaults to true.

#### bytecodeInstrumentation.onLongClickEnabled

Whether Embrace should automatically instrument android.view.View long click events. Defaults to true.

#### bytecodeInstrumentation.webviewOnPageStartedEnabled

Whether Embrace should automatically instrument onPageStarted() in webviews. Defaults to true.

#### bytecodeInstrumentation.firebasePushNotificationsEnabled

Whether Embrace should automatically instrument push notifications from Firebase. Defaults to false.

#### bytecodeInstrumentation.classIgnorePatterns

A list of string patterns that are used to filter classes during bytecode instrumentation. For example, `'com.example.foo.*'`
would avoid instrumenting any classes in the `'com.example.foo'` package.

This can be useful if you wish to avoid instrumenting certain parts of your codebase. Defaults to an empty list.

#### buildVariantFilter

Controls how the Embrace Gradle Plugin behaves on a specific build variant. You can use this by checking the variant name and then configuring the build variant as required.

For example, if you wish to disable bytecode instrumentation for any build variant with the 'debug' buildType you could specify the following:

```kotlin
embrace {
    buildVariantFilter {
        if (name.contains("debug")) {
            disableBytecodeInstrumentationForVariant()
        }
    }
}
```
