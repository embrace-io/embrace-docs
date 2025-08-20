---
title: Configure the Android Platform
description: Configuring the Embrace Unity Android SDK for mobile platforms
sidebar_position: 4
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the SDK, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms using the Embrace editor window.

## Configure the Android platform

Go to Tools -> Embrace -> Getting Started and click on it to reveal the Embrace editor window. Select the Android tab and fill in your unique `App ID` and `Symbol Upload API Token`. You can get the correct values from the settings page in your dash.

<img src={require('@site/static/images/unity-android-configure-editor-window.png').default} />

On Android, Unity builds are handled by Gradle. To integrate Embrace, we'll be adding some new dependencies to Unity's Gradle templates. Unity has already given us ways to customize the Gradle configuration via templates accessible from the `Player Settings` menu.

## Minimum Gradle and Android Gradle Plugin Versions

To use the latest version of the Embrace Unity SDK you must be using:
- At least version `7.5.1` of Gradle
- At least version `7.4.2` of the Android Gradle Plugin (classpath `com.android.tools.build:gradle`)

If your version of Unity does not come with supported versions of Gradle and AGP, you may need to upgrade them. See [this page](https://docs.unity3d.com/Manual/android-gradle-overview.html) for more information. Alternatively, see the instructions on [this page](https://developers.google.com/admob/unity/gradle) regarding how to upgrade these inside Unity. Please note that in upgrading, you may have to update values in the generated template files we require as they may still point to the older values.  

## External Dependency Manager - Android Resolver

:::info Notes on minimum versions**
To use the External Dependency Manager you must be using:
- At least version `1.0.13` of the Unity SDK
- At least version `4.7.0` of the Android Swazzler Plugin
:::

If your project is already using other Android plugins, it is likely you are also using the External Dependency Manager. This is a module that ships with many plugins and handles dependency resolution for you.

Embrace fully supports the External Dependency Manager. Our dependencies are defined in `<plugin root>/Editor/EmbraceSDKDependencies.xml`. You can disable the Embrace automatic EDM support from `Tools -> Settings -> Advanced -> Use External Dependency Manager`. **Warning**, disabling EDM support may cause a `RuntimeException` due to duplicated classes at build time.

In case that you decided to disable the EDM support from Settings and the build failed because the `Duplicated Classes RuntimeException`, you can still disable the Embrace Dependencies Injection manually by adding the following setting to the root level of your `launcherTemplate.gradle` to prevents the error:

```text
swazzler {
    disableDependencyInjection = true
}
```

:::info External Dependency Manager Settings

We recommend enabling the `Patch mainTemplate.gradle` setting in the External Dependency Manager menu. When enabled, the External Dependency Manager will declare dependencies in the `mainTemplate.gradle` file rather than download dependency artifacts into the Unity project. This allows gradle to handle retrieving those dependencies, and often results in fewer conflicts.

Please note that in order for the `Patch mainTemplate.gradle` setting to take effect your Unity project must contain a `mainTemplate.gradle` file. If you do not already have one in your `Plugins/Android` directory, create one by toggling the `Custom Main Gradle Template` option in `Project Settings -> Player -> Android -> Publishing Settings -> Build`.
:::

Whether you use the resolver or not, make sure to also continue with the steps below to complete the configuration.

## Customize Gradle Templates

<img src={require('@site/static/images/unity-android-gradle-templates.png').default} />

Embrace needs the following templates present in your project:

1. `baseProjectTemplate.gradle`
2. `launcherTemplate.gradle`
3. `gradleTemplate.properties`
4. `settingsTemplate.gradle`

   If your project already modifies these files, then apply the changes below to your existing files. If you do not customize the template currently, add a customization and then modify them as described below.

   After creating or finding these template files in your project, make the following changes:

5. In `baseProjectTemplate.gradle`, add the swazzler as a dependency. Also, ensure you have Maven Central defined as repositories as shown below.

   Add the following block to the top of your `baseProjectTemplate.gradle` file.

```groovy
    buildscript {
        dependencies {
            classpath "io.embrace:embrace-swazzler:{{ embrace_sdk_version platform="unity_android" }}"
        }
    }
```

   Example:

```groovy
    buildscript {
        dependencies {
            classpath "io.embrace:embrace-swazzler:{{ embrace_sdk_version platform="unity_android" }}"
        }
    }

    plugins {
        // If you are changing the Android Gradle Plugin version, make sure it is compatible with the Gradle version preinstalled with Unity
        // See which Gradle version is preinstalled with Unity here https://docs.unity3d.com/Manual/android-gradle-overview.html
        // See official Gradle and Android Gradle Plugin compatibility table here https://developer.android.com/studio/releases/gradle-plugin#updating-gradle
        // To specify a custom Gradle version in Unity, go do "Preferences > External Tools", uncheck "Gradle Installed with Unity (recommended)" and specify a path to a custom Gradle version
        id 'com.android.application' version '7.4.2' apply false
        id 'com.android.library' version '7.4.2' apply false
        **BUILD_SCRIPT_DEPS**
    }

    task clean(type: Delete) {
        delete rootProject.buildDir
    }
```

   Under `settingsTemplate.gradle` file, ensure that the `mavenCentral()` repositories exists.

   Example:

```groovy
    pluginManagement {
        repositories {
            **ARTIFACTORYREPOSITORY**
            gradlePluginPortal()
            google()
            mavenCentral()
        }
    }

    include ':launcher', ':unityLibrary'
    **INCLUDES**

    dependencyResolutionManagement {
        repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
        repositories {
            **ARTIFACTORYREPOSITORY**
            google()
            mavenCentral()
            flatDir {
                dirs "${project(':unityLibrary').projectDir}/libs"
            }
        }
    }
```

6. In `launcherTemplate.gradle`, add the `embrace-swazzler` plugin.

 ```gradle
 apply plugin: 'embrace-swazzler'
 ```

7. In `gradleTemplate.properties`, add the following if not present:

 ```gradle
 android.useAndroidX=true
 android.enableJetifier=true
 ```

   Finally, if you export your Android build from Unity then you must ensure that the `Create symbols.zip` entry is checked under build settings. Then, you can save the zip file at the root of your project. We will grab the `symbols.zip` file automatically.

   <img src={require('@site/static/images/unity-android-build-settings.png').default} />

   Now that you've configured the Android platform, it's time to login to the Embrace dashboard.
