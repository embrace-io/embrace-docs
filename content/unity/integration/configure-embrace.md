---
title: "Configure Embrace"
description: Configuring the Embrace Unity SDK for mobile platforms
weight: 3
aliases:
  - /unity/configure-embrace/
---

# Configure Embrace

The Embrace Unity SDK includes an editor script to assist with properly linking the sdk, and collecting and uploading debug information for symbolication. That component requires configuration prior to building. If your project ships on both Android and iOS make sure to configure both platforms.

# Configure the iOS platform

When Unity builds your project for iOS, it uses the Apple provided tool chain, including xCode to do that work. In order for project to use Embrace at runtime two things have to happen:

1) The native Embrace framework must be linked and embedded with the final IPA
2) The `Embrace-Info.plist` file must be present at the root of the IPA with the correct ids for your project

Without those in place, your project may build and run but will not report session data to Embrace.

{{< image src="/docs/images/unity-ios-config-file.png" alt="Image showing the location of the Embrace-Info.plist within the Embrace package" caption="The location of the Embrace-Info.plist in the Embrace package." width="800" height="525" >}}

Open the file and fill in the missing `API_KEY` and `API_TOKEN`. You can get the correct values from the settings page in your dash. 

Now when you build and run your project, our editor script will use those values to correctly setup the final IPA to work with Embrace.

# Configure the Android platform

On Android, Unity builds are handled by gradle. Unity has already given us ways to customize the gradle configuration via templates accessible from the `Player Settings` menu.

{{< image src="/docs/images/unity-android-gradle-templates.png" alt="Image showing how to customize the Unity gradle templates" caption="The gradle template customization features in Unity." width="700" height="452" >}}

If your project already modifies these files then apply the changes below to your existing files. If you do not customize the template currently, add a customization and then make the following changes:

{{< image src="/docs/images/unity-ios-config-file.png" alt="Image showing the location of the embrace-config file within the Embrace package" caption="The location of the embrace-config file in the Embrace package." width="800" height="625" >}}

After creating or finding these template files in your projet make the following changes:

1. In `baseProjectTemplate.gradle`, add `classpath 'embrace-io:embrace-swazzler:4.6.0'` to `allprojects:buildscript:dependencies:`
1. In `gradleTemplate.properties`, add `android.useAndroidX=true` and `android.enableJetifier=true`
1. In `launcherTemplate.gradle`, add `apply plugin: 'embrace-swazzler'`

Finally, if you export your Android build from Unity then you must ensure that the `Create symbols.zip` entry is checked under build settings;


{{< image src="/docs/images/unity-android-build-settings.png" alt="Image showing the correct build settings for exporting an Android project with Embrace from Unity" caption="The build settings window showing the checkbox to create symbols.zip" width="584" height="600" >}}

--- 

In the next section, we'll learn how to keep Embrace updated.

{{< button relref="/unity/integration/update-embrace" >}}Keeping Embrace Up To Date{{< /button >}}

