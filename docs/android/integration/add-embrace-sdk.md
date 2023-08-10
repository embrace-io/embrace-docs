---
title: Add the Android Embrace SDK
sidebar_position: 3
description: Add the Embrace SDK as a dependency to your Android application
---

# Adding the Android Embrace SDK

:::tip
For a sample integration, check out the Kotlin and Java apps in the <a href="https://github.com/embrace-io/embrace-demo-apps/tree/master/android" target="_blank">Embrace demo apps repo</a>.
:::

## Add Embrace as a dependency

This is how you add embrace plugin to your project.

Depending on how you configured your project, add the following to your `settings.gradle`:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
pluginManagement {
    repositories {
        mavenCentral()
    }

    plugins {
        id ‘io.embrace.swazzler’ version “${swazzler_version}” apply false
    }
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
pluginManagement {
    repositories {
        mavenCentral()
    }
    val swazzler_version: String by settings
    plugins {
        id(“io.embrace.swazzler”) version "${swazzlerVersion}" apply false
    }
}
```

</TabItem>
</Tabs>

Where `swazzler_version` is defined in `gradle.properties` for better organization.

```groovy
swazzler_version={{ embrace_sdk_version platform="android" }}
```

We are loading the plugin, but not applying it yet.

Then, on the `app/build.gradle` add the following:

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
plugins {
    id 'io.embrace.swazzler'
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
plugins {
    id(“io.embrace.swazzler”)
}
```

</TabItem>
</Tabs>

### Legacy approach

With the introduction of <a href="https://docs.gradle.org/current/userguide/plugins.html#sec:plugins_block" target="_blank">Pluigns DSL</a> users should have little reason to use the legacy method of applying plugins. 
If you’re still using legacy code for applying plugins, this is how you should add embrace plugin.

The Embrace SDK is available on Maven Central. Make the following changes in your
project's `build.gradle` file to add the Embrace SDK to your app.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
buildscript {
  repositories {
    mavenCentral()
    google()
  }
  dependencies {
    classpath 'io.embrace:embrace-swazzler:{{ embrace_sdk_version platform="android" }}'
  }
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("io.embrace:embrace-swazzler:$swazzler_version")
    }
}
```

</TabItem>
</Tabs>

Then, apply the Embrace swazzler plugin in your `app/build.gradle` file. Also, specify that the Embrace SDK uses Java 8 features with the `compileOptions` settings.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
apply plugin: 'com.android.application'
apply plugin: 'embrace-swazzler'

repositories {
  mavenCentral()
  google()
}

android {
  ...
  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
  ...
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
apply(plugin = “embrace-“swazzler)
```

</TabItem>
</Tabs>

The Swazzler works as a support process during build time for the Embrace SDK to work properly during run time. It performs a few key functions:
* Adds the Embrace SDK dependencies to the app's dependency list.
* Injects a build info JSON file for the SDK to parse during run time. This specifies an internal Embrace build UUID, build app ID, and the build variant.
* Runs a code transformation / injection over specified bytecode class files to add hooks that the SDK uses to capture certain data.
* Injects ProGuard rules for the SDK to work properly when a build type is set to be minified.

:::info Note on Permissions
You'll need to set the following permissions so the Embrace SDK can send events and monitor connectivity. 

* `android.permission.INTERNET`
* `android.permission.ACCESS_NETWORK_STATE`

:::

## Add a dependency to modules or libraries you want to call Embrace from (optional)

If you have an app that uses internal modules or libraries, you must specify the Embrace SDK dependency directly in your module's Gradle file

```groovy
implementation 'io.embrace:embrace-android-sdk:{{ embrace_sdk_version platform="android" }}'
```

You still need to apply the Swazzler plugin in the app's Gradle file `(apply plugin: 'embrace-swazzler')` and verify that the Swazzler version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file.

## Add the config file

Add a config file to configure the Embrace SDK. This file must be named `embrace-config.json` and should be placed in `app/src/main`. The config file supports many more options than those shown in the example below, but for the initial integration, only the two settings listed below are needed.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

:::info
Your app ID and API token are available on the Embrace dashboard.
:::

---

## NDK crash capture

:::info
If your app is written entirely in Java and Kotlin, you do not need to enable NDK crash capture to capture crashes in your code.
:::

If your app has native components, you can enable NDK crash capture. Simply add the `ndk_enabled` setting to your config file.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "ndk_enabled": true
}
```

---

Next, you'll be creating your first session.
