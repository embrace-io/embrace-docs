---
title: "Uploading Symbol Files"
description: Learn how to upload source maps to Embrace to translate JavaScript stack traces for your React Native application
sidebar_position: 4
aliases:
  - /react-native/upload-symbol-files/
---

# Uploading Symbol Files

The Embrace SDK allows you to view both native and JavaScript stack traces for crashes and error logs.
These stack traces, however, usually require symbol files to be able to make sense of them.
For JavaScript, you'll need to upload source maps. For iOS, dSYM files, and the mapping file for Android. 

## Uploading Source Maps

{{< tabs "uploadingJavaScriptSourceMaps" >}}

{{< tab "iOS" >}}

In Xcode, find the "Bundle React Native code and images" step in the Build Phases tab.
The contents should look something like the following:

```sh
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

Change the contents to the following:

```sh
export NODE_BINARY=node
export EXTRA_PACKAGER_ARGS="--sourcemap-output $CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle.map"
../node_modules/react-native/scripts/react-native-xcode.sh
```

{{< hint info >}}

If you used the setup script mentioned on the [Adding the Embrace SDK]({{< relref "/react-native/integration/add-embrace-sdk" >}}) page, this change has already been made for you.

{{< /hint >}}

{{< /tab >}}

{{< tab "Android" >}}

Add extra arguments to the bundle step in `android/app/build.gradle`.

```groovy
project.ext.react = [
    entryFile: "index.js",
    extraPackagerArgs: ["--sourcemap-output", "$buildDir/generated/sourcemaps/android-embrace.bundle.map"]
]
```

{{< hint info >}}

**Note on variants**
By default, source maps are uploaded only for the release variant.
If you'd like to upload source maps for other variants, make the following changes:

```groovy
project.ext.react = [
        ...
        bundleIn<customVariant>: true,
        devDisabledIn<customVariant>: true,
        extraPackagerArgs: ["--sourcemap-output", "$buildDir/generated/sourcemaps/android-embrace.bundle.map"]
]
```
This creates a bundle and sets the debuggable flag to false.

{{< /hint >}}

{{< /tab >}}

{{< /tabs >}}

## Symbolication with CodePush

If you use [App Center CodePush](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/) or any other service to deploy OTA (over the air) updates,
you'll need to upload those source maps to Embrace using the upload script that ships with the iOS SDK.

For CodePush, you'll need to generate the bundle and source map to be uploaded.
```sh
appcenter codepush release-react -a MyApp --output-dir ./build --sourcemap-output ./map
``` 

Then, use the Embrace upload script to upload the source map.

{{< tabs "uploadingCodepushSourceMaps" >}}

{{< tab "iOS" >}}

```sh
ios/Pods/EmbraceIO/upload --app <your app ID> --token <your token> --rn-bundle ./build/CodePush/main.jsbundle --rn-map ./map
```

{{< /tab >}}

{{< tab "Android" >}}

```sh
ios/Pods/EmbraceIO/upload --app <your app ID> --token <your token> --rn-bundle ./build/CodePush/index.android.bundle --rn-map ./map
```

{{< hint info >}}

The android map is generated with a different name, but the tool to upload is the same as iOS

{{< /hint >}}

{{< /tab >}}

{{< /tabs >}}

## Uploading Native Symbol Files

{{< tabs "uploadingNativeSymbolFiles" >}}

{{< tab "iOS" >}}

Please see the [Uploading dSYMs]({{< relref "/ios/integration/dsym-upload" >}}) page from the iOS integration guide to setup automatic uploading of dSYM files in Xcode.

{{< /tab >}}

{{< tab "Android" >}}

Proguard files will be uploaded automatically.
If you don’t see symbolicated crashes while using Proguard, reach out to us on Slack and we’ll work with you directly.

{{< hint warning >}}

**Note** We do not officially support Dexguard.

{{< /hint >}}

{{< /tab >}}

{{< /tabs >}}

## Pointing the Embrace SDK to the JavaScript Bundle

If you distribute changes to the JavaScript code without submitting a new version to the App Store or Google Play Store (i.e. Expo OTA updates),
you must point the Embrace SDK to where the updated JavaScript bundle will be downloaded on the device.
You can do this in either the JavaScript part or native parts of your app with the code snippet provided below.
Note that this step is unnecessary if you use CodePush since the Embrace SDK will leverage the CodePush SDK to find the location of the bundle.

{{< tabs >}}

{{< tab "JavaScript" >}}

```javascript
import {setJavaScriptBundlePath} from 'react-native-embrace';

setJavaScriptBundlePath(pathToBundle)
```

{{< /tab >}}

{{< tab "Objective-C" >}}

```objective-c
[[RNEmbrace sharedIntance] setJavasScriptBundleURL: pathToBundle];
```

{{< /tab >}}

{{< tab "Java" >}}

```java
Embrace.getInstance().setJavaScriptBundleURL(pathToBundle)
```

{{< /tab >}}


{{< /tabs >}}

## Expo Apps

If your app is built using Expo and you leverage OTA to distribute updates to your users, you must manually upload source maps using the script distributed with the SDK
as described in the [Symbolication with CodePush]({{< relref "/react-native/integration/upload-symbol-files#symbolication-with-codepush" >}}) section.

You must also point the Embrace SDK to the location the updated bundle will be downloaded to on the device, as described in the [Pointing the Embrace SDK to the JavaScript Bundle]({{< relref "/react-native/integration/upload-symbol-files#pointing-the-embrace-sdk-to-the-javascript-bundle" >}}).

---

Now that you know how to upload symbol files to make sure stack traces are translated on the Dashboard, let's generate your first session.  

{{< button relref="/react-native/integration/session-reporting" >}}Create Your First Session{{< /button >}}

