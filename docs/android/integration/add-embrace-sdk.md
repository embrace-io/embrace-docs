---
title: Add the Android Embrace SDK
sidebar_position: 3
description: Add the Embrace SDK as a dependency to your Android application
---

# Adding the Android Embrace SDK

## Add Embrace as a dependency

### If you are using Version Catalogs:

Add our gradle plugin to your `libs.versions.toml` file

```
[versions]
embrace = "{{ embrace_sdk_version platform="android" }}"
...

[plugins]
embrace = { id = "io.embrace.swazzler", version.ref = "embrace" }
```

Then add the following at the top of your `app/build.gradle.kts`:

```groovy
plugins {
    alias(libs.plugins.embrace)
}
```

### If you are not using Version Catalogs:

Add the following to your `settings.gradle`:

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
        id 'io.embrace.swazzler' version "${swazzler_version}" apply false
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
        id("io.embrace.swazzler") version "${swazzler_version}" apply false
    }
}
```

</TabItem>
</Tabs>

Include `swazzler_version` in your `gradle.properties` file:

```groovy
swazzler_version={{ embrace_sdk_version platform="android" }}
```

Then add the following at the top of your `app/build.gradle`:

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
    id("io.embrace.swazzler")
}
```

</TabItem>
</Tabs>

### Legacy approach

:::tip
If you use Gradle's legacy <a href="https://docs.gradle.org/current/userguide/plugins.html#sec:plugins_block" target="_blank">Plugins DSL</a> follow this approach instead.
:::

Alter the `build.gradle` at your project's root as shown below:

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
        google()
    }
    dependencies {
        classpath("io.embrace:embrace-swazzler:$swazzler_version")
    }
}
```

</TabItem>
</Tabs>

Then apply the plugin in your `app/build.gradle` file & ensure you specify Java 8 in `compileOptions`:

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
apply plugin: 'com.android.application'
apply plugin: 'embrace-swazzler'

android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
apply(plugin = "com.android.application")
apply(plugin = "embrace-swazzler")

android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}
```

</TabItem>
</Tabs>

The Embrace Gradle Plugin performs a few key functions:
* Adds the Embrace SDK to your app's dependency list.
* Injects configuration info the SDK reads at run time.
* Instruments bytecode to insert SDK hooks that capture telemetry.
* Uploads mapping files to get human-readable stacktraces in production.

:::info Note on Permissions
Embrace automatically adds the following permissions so that it can make HTTP requests to deliver captured data.

* `android.permission.INTERNET`
* `android.permission.ACCESS_NETWORK_STATE`

:::

## Add a dependency to modules or libraries you want to call Embrace from (optional)

If you have an app that uses internal modules or libraries, you must specify the Embrace SDK dependency directly in your module's Gradle file

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="groovy" label="Groovy">

```groovy
implementation 'io.embrace:embrace-android-sdk:{{ embrace_sdk_version platform="android" }}'
```

</TabItem>

<TabItem value="kotlin" label="Kotlin">

```kotlin
implementation("io.embrace:embrace-android-sdk:{{ embrace_sdk_version platform="android" }}")
```

</TabItem>
</Tabs>

You still need to apply the Embrace Gradle Plugin in the app's Gradle file `(apply plugin: 'embrace-swazzler')` and verify that the version set in your project Gradle file is the same as the version set for the SDK in the module’s Gradle file.

## Add the config file

Add a file at `app/src/main/embrace-config.json` with the following contents:

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

:::info
Further configuration options are documented [here](/android/features/configuration-file/).
:::

:::warning
It's not recommended to directly hardcode access tokens into your source code. Instead, you can add it as an environment variable like `EMBRACE_API_TOKEN` and reference that.
:::

:::info
Your app ID and API token are available on the Embrace dashboard.
:::

---

## NDK crash capture

If you want to capture NDK crash reports from your app add the `ndk_enabled` setting to your config file:

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "ndk_enabled": true
}
```

---

Next, you'll be creating your first session.
