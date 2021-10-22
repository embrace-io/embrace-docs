---
title: "Configure the Android Platform"
description: Configuring the Embrace Unity Android SDK for mobile platforms
weight: 4
aliases:
  - /unity/configure-embrace-android/
---

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the SDK, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms using the Embrace editor window.

# Configure the Android platform

Go to Tools -> Embrace and click on it to reveal the Embrace editor window. Select the Android tab and there fill in your unique `APP_ID` and `API_TOKEN`. You can get the correct values from the settings page in your dash.

{{< image src="/docs/images/android-configure-editor-window.png" alt="Image showing the location of the Embrace Unity Editor within the Embrace package" caption="The location of the Embrace Unity Editor in the Embrace package." width="702" height="438" >}}

On Android, Unity builds are handled by Gradle. To integrate Embrace, we'll be adding some new dependencies to Unity's Gradle templates. Unity has already given us ways to customize the Gradle configuration via templates accessible from the `Player Settings` menu.

# External Dependency Manager

{{< hint info >}}
**Notes on minimum versions**

To use the External Dependency Manager you must be using:
1. At least version `1.0.13` of the Unity SDK
1. At least version `4.7.0` of the Android Swazzler Plugin

{{< /hint >}}

If your project is already using other Android plugins, it is likely you are also using the External Dependency Manager. This is a module that ships with many plugins and handles dependency resolution for you.  

Embrace fully supports the External Dependency Manager. Our dependencies are defined in `<plugin root>/Editor/EmbraceSDKDependencies.xml`.  Additionally, the following setting must be added to your Gradle template to disable our own Gradle plugin's automatic dependency resolver:

{{< tabs "unity_swazzler_config" >}}

{{< tab "2019 and higher" >}}

This disables our custom dependency resolution:

```gradle
swazzler {
    disableDependencyInjection = true
}
```

This should be added to the `launcherTemplate.gradle` at the root level.

{{< /tab >}}

{{< tab "2018 and lower" >}}

This disables our custom dependency resolution:

```gradle
swazzler {
    disableDependencyInjection = true
}
```

This should be added to the `mainTemplate.gradle` at the root level.

{{< /tab >}}

{{< /tabs >}}

Whether you use the resolver or not, make sure to also continue with the steps below to complete the configuration.

# Unity 2019 and Newer

{{< image src="/docs/images/unity-android-gradle-templates.png" alt="Image showing how to customize the Unity Gradle templates" caption="The Gradle template customization features in Unity." width="700" height="452" >}}

If your project already modifies these files, then apply the changes below to your existing files. If you do not customize the template currently, add a customization and then modify them as described below.

After creating or finding these template files in your project, make the following changes:

1. In `baseProjectTemplate.gradle`, add the swazzler as a dependency. Also, ensure you have Maven Central defined as repositories as shown below. Note that they must be added in two places.
    ```
    allprojects {
        buildscript {
            repositories {
                mavenCentral()
            }
            dependencies {
                 classpath 'io.embrace:embrace-swazzler:{{< sdk platform="unity_android" >}}'
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

# Unity 2018 and Older

{{< image src="/docs/images/unity-android-gradle-templates-2018.png" alt="Image showing how to customize the Unity Gradle templates" caption="The Gradle template customization features in Unity." width="700" height="409" >}}

In Unity 2018 and older there was only one Gradle template available for customization.  All of the required changes can still be done in this file.

1. In `mainTemplate.gradle`, add the swazzler as a dependency. Also, ensure you have Maven Central defined as repositories as shown below. Note that they must be added in two places. Apply the plugin:
   ```
   buildscript {
       repositories {
           mavenCentral()
       }
       dependencies {
           classpath 'io.embrace:embrace-swazzler:{{< sdk platform="unity_android" >}}'
       }
   }
   
   ...
   
   allprojects {
       repositories {
           mavenCentral()
       }
   }
   
   ...
   
   apply plugin: 'embrace-swazzler'
   ```
   
   1. Next, to enable AndroidX support we also must add this block to the `mainTemplate.gradle` file:
   
   ```
   ([rootProject] + (rootProject.subprojects as List)).each {
       ext {
           it.setProperty("android.useAndroidX", true)
           it.setProperty("android.enableJetifier", true)
       }
   }
   ```

---

Finally, if you export your Android build from Unity then you must ensure that the `Create symbols.zip` entry is checked under build settings.


{{< image src="/docs/images/unity-android-build-settings.png" alt="Image showing the correct build settings for exporting an Android project with Embrace from Unity" caption="The build settings window showing the checkbox to create symbols.zip." width="584" height="600" >}}

--- 

Now that you've configured the Android platform, it's time to login to the
Embrace dashboard.

{{< button relref="/unity/integration/login-embrace-dashboard" >}}How to Access the Dashboard{{< /button >}}
