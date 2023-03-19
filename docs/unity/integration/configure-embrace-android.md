---
title: Configure the Android Platform
description: Configuring the Embrace Unity Android SDK for mobile platforms
sidebar_position: 4
---

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the SDK, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms using the Embrace editor window.

# Configure the Android platform

Go to Tools -> Embrace -> Getting Started and click on it to reveal the Embrace editor window. Select the Android tab and fill in your unique `APP_ID` and `API_TOKEN`. You can get the correct values from the settings page in your dash.

<img src={require('@site/static/images/android-configure-editor-window.png').default} />

On Android, Unity builds are handled by Gradle. To integrate Embrace, we'll be adding some new dependencies to Unity's Gradle templates. Unity has already given us ways to customize the Gradle configuration via templates accessible from the `Player Settings` menu.

# External Dependency Manager

:::info Notes on minimum versions**
To use the External Dependency Manager you must be using:
1. At least version `1.0.13` of the Unity SDK
1. At least version `4.7.0` of the Android Swazzler Plugin
:::

If your project is already using other Android plugins, it is likely you are also using the External Dependency Manager. This is a module that ships with many plugins and handles dependency resolution for you.  

Embrace fully supports the External Dependency Manager. Our dependencies are defined in `<plugin root>/Editor/EmbraceSDKDependencies.xml`.  Additionally, the following setting must be added to the root level of your `launcherTemplate.gradle` file to disable our own Gradle plugin's automatic dependency resolver:

```gradle
swazzler {
    disableDependencyInjection = true
}
```

:::info External Dependency Manager Settings

We recommend enabling the `Patch mainTemplate.gradle` setting in the External Dependency Manager menu. When enabled, the External Dependency Manager will declare dependencies in the `mainTemplate.gradle` file rather than download dependency artifacts into the Unity project. This allows gradle to handle retrieving those dependencies, and often results in fewer conflicts.

Please note that in order for the `Patch mainTemplate.gradle` setting to take effect your Unity project must contain a `mainTemplate.gradle` file. If you do not already have one in your `Plugins/Android` directory, create one by toggling the `Custom Main Gradle Template` option in `Project Settings -> Player -> Android -> Publishing Settings -> Build`.
:::

Whether you use the resolver or not, make sure to also continue with the steps below to complete the configuration.

# Customize Gradle Templates

<img src={require('@site/static/images/unity-android-gradle-templates.png').default} />

If your project already modifies these files, then apply the changes below to your existing files. If you do not customize the template currently, add a customization and then modify them as described below.

After creating or finding these template files in your project, make the following changes:

1. In `baseProjectTemplate.gradle`, add the swazzler as a dependency. Also, ensure you have Maven Central defined as repositories as shown below. Note that they must be added in two places.

    ```gradle
    allprojects {
        buildscript {
            repositories {
                mavenCentral()
            }
            dependencies {
                 classpath 'io.embrace:embrace-swazzler:{{ embrace_sdk_version platform="unity_android" }}'
            }
        }
        repositories {
            mavenCentral()
        }
    }
    ```
2. In `gradleTemplate.properties`, add the following:
     ```
     android.useAndroidX=true
     android.enableJetifier=true
     ```
3. In `launcherTemplate.gradle`, add:
     ```
     apply plugin: 'embrace-swazzler'
     ```

---

Finally, if you export your Android build from Unity then you must ensure that the `Create symbols.zip` entry is checked under build settings.

<img src={require('@site/static/images/unity-android-build-settings.png').default} />

--- 

Now that you've configured the Android platform, it's time to login to the Embrace dashboard.
