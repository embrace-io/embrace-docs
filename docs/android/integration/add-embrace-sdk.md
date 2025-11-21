---
title: Add the Android Embrace SDK
sidebar_position: 1
description: Add the Embrace SDK as a dependency to your Android application
---

# SDK Setup

## Add the Embrace Gradle Plugin

The Embrace Gradle Plugin uploads mapping files that gets human-readable stacktraces from production. It also
instruments bytecode so that some telemetry is automatically captured.

Add the Embrace Gradle Plugin to your build using one of the methods below:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="plugin-config-type" queryString="plugin-config-type">
<TabItem value="version-catalog" label="Version Catalog">

Alter your `libs.versions.toml` file:

```toml
[versions]
embrace = "{{ embrace_sdk_version platform="android" }}"

[plugins]
embrace = { id = "io.embrace.gradle", version.ref = "embrace" }
```

Then apply the plugin at your module-level `build.gradle.kts`:

```kotlin
plugins {
    alias(libs.plugins.embrace)
}
```

</TabItem>

<TabItem value="settings" label="Settings File">

### Kotlin

Alter your `settings.gradle.kts`:

```kotlin
pluginManagement {
    repositories {
        mavenCentral()
    }
    plugins {
        id("io.embrace.gradle") version "{{ embrace_sdk_version platform="android" }}" apply false
    }
}
```

Then apply the plugin at your module-level `build.gradle.kts`:

```kotlin
plugins {
    id("io.embrace.gradle")
}
```

### Groovy

Alter your `settings.gradle`:

```groovy
pluginManagement {
    repositories {
        mavenCentral()
    }
    plugins {
        id 'io.embrace.gradle' version "{{ embrace_sdk_version platform="android" }}" apply false
    }
}
```

Then apply the plugin at your module-level `build.gradle`:

Alter your `settings.gradle`:

```groovy
plugins {
    id 'io.embrace.gradle'
}
```

</TabItem>

<TabItem value="legacy-dsl" label="Legacy Plugins DSL">

Alter your root-level `build.gradle`:

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'io.embrace:embrace-gradle-plugin:{{ embrace_sdk_version platform="android" }}'
    }
}
```

Then apply the plugin at your module-level `build.gradle`:

```groovy
apply plugin: 'embrace-gradle-plugin'
```

</TabItem>

</Tabs>

## Add the Embrace Android SDK

Add the Embrace Android SDK to the `build.gradle` file of each module where you want to invoke Embrace:

<Tabs groupId="dep-type" queryString="dep-type">
<TabItem value="version-catalog" label="Version Catalog">

Alter your `libs.versions.toml` file:

```toml
[libraries]
embrace = { group = "io.embrace", name = "embrace-android-sdk", version.ref = "embrace" }
```

Then add the dependency at your module-level `build.gradle.kts`:

```kotlin
implementation(libs.embrace)
```

</TabItem>

<TabItem value="not-catalog" label="Not Version Catalog">

### Kotlin

```kotlin
implementation("io.embrace:embrace-android-sdk:{{ embrace_sdk_version platform="android" }}")
```

### Groovy

```groovy
implementation 'io.embrace:embrace-android-sdk:{{ embrace_sdk_version platform="android" }}'
```

</TabItem>

</Tabs>

## Create Embrace configuration file

A JSON-formatted file is used to configure Embrace SDK features. To start off, create a new empty JSON file at `app/src/main/embrace-config.json`:

```json
{
}
```

## Set your app ID and API token

Next, login to the [Embrace dashboard](https://dash.embrace.io/) and create a project if you haven't already.
The dashboard contains the app ID and API token that are necessary for configuring your integration.

For the initial integration and on local developer builds, you can set these in the Embrace configuration file created above:

```json
{
  "app_id": "<your-app-id>",
  "api_token": "<your-api-token>"
}
```

In production, we recommend setting these values via the build machine's environment variables:

```bash
export EMBRACE_APP_ID="<your-app-id>"
export EMBRACE_API_TOKEN="<your-api-token>"
```

The Embrace SDK will automatically read these environment variables when your app is built. The environment variables
will override any values set via the configuration file.

## Start the Embrace SDK

Start the SDK on the main thread before the `Application` object is created. Refer to the FAQ [here](/android/faq/#do-i-need-to-start-embraces-sdk-on-the-main-thread) for rationale.

<Tabs groupId="startup" queryString="startup">

<TabItem value="auto-start" label="Auto Start">

The Embrace SDK can be started automatically during your `Application` object's `onCreate()` method by setting a property in the Embrace Gradle Plugin DSL. This requires your app to use a custom `Application` subclass, which the Embrace Gradle Plugin will modify at build time to all the SDK start method.

If you don't have an `Application` subclass, you must [create one](https://developer.android.com/reference/android/app/Application).

```kotlin
embrace {
    bytecodeInstrumentation {
        autoSdkInitializationEnabled.set(true)
    }
}
```

</TabItem>

<TabItem value="startup-library" label="App Startup Library">

If you have already integrated the [App Startup Library](https://developer.android.com/topic/libraries/app-startup) you can define an `Initializer` to start Embrace:

```kotlin
class EmbraceInitializer : Initializer<Embrace> {
    override fun create(context: Context): Embrace = Embrace.start(context)
    override fun dependencies(): List<Class<out Initializer<*>>> = return emptyList()
}
```

Then add an entry to your `AndroidManifest.xml`:

```xml
<provider
    android:name="androidx.startup.InitializationProvider"
    android:authorities="${applicationId}.androidx-startup"
    android:exported="false"
    tools:node="merge">
    <meta-data  android:name="com.example.EmbraceInitializer"
          android:value="androidx.startup" />
</provider>
```

</TabItem>

<TabItem value="manual" label="Manual">

Initialize the Embrace SDK in the `onCreate` method of your `Application` subclass.

```kotlin
class MyApplication : Application {
  override fun onCreate() {
      super.onCreate()
      Embrace.start(this)
  }
}
```

</TabItem>

</Tabs>

## Build and Run the Application

Build and run the application. You should see the following message in Logcat:

```text
Embrace SDK version X.Y.Z started for appId = xxxxx
```

## Confirm data is sent to Embrace

Launch your app, send it to the background by switching to another app, and then relaunch it.

After refreshing the [Embrace dashboard](https://dash.embrace.io/) you should see the uploaded session in your browser.
Depending on network conditions this may ocassionally take a few minutes to show up.

If you stop your app by force killing it Embrace will not upload the completed session until it is relaunched. You
must always relaunch your app before data can show in Embrace's dashboard.

## Alter default behavior

After completing an SDK integration we recommend you alter the [SDK's configuration](/android/features/configuration-file/) from the defaults to suit your needs.
You can also alter the [Gradle Plugin's configuration](/android/features/embrace-gradle-plugin/) if needed.
