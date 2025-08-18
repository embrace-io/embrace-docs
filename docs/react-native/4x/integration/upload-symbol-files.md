---
title: Uploading Symbol Files
description: Learn how to upload source maps to Embrace to translate JavaScript stack traces for your React Native application
sidebar_position: 4
---

# Uploading Symbol Files

The Embrace SDK allows you to view both native and JavaScript stack traces for crashes and error logs.
These stack traces, however, usually require symbol files to be able to make sense of them.
For JavaScript, you'll need to upload source maps. For iOS, dSYM files, and the mapping file for Android.  

## Uploading Source Maps

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

In Xcode, find the "Bundle React Native code and images" step in the Build Phases tab.
The contents should look something like the following:

```shell-session
export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

Change the contents to the following:

```shell-session
export NODE_BINARY=node

export SOURCEMAP_FILE="$CONFIGURATION_BUILD_DIR/main.jsbundle.map"; <-- Add this line

../node_modules/react-native/scripts/react-native-xcode.sh
```

:::info
If you used the setup script mentioned on the [Adding the Embrace SDK](/react-native/4x/integration/add-embrace-sdk) page, this change has already been made for you.
:::

</TabItem>
<TabItem value="android" label="Android">
  By default, source maps are uploaded only for the release variant.
  If you'd like to upload source maps for other variants, make the following changes:

  ```groovy
  project.ext.react = [
          ...
          bundleIn<customVariant>: true,
          devDisabledIn<customVariant>: true,
  ]
  ```

  This creates a bundle and sets the debuggable flag to false.
</TabItem>
</Tabs>

## Uploading Native And Javascript Symbol Files

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

## Automatic Uploads

Automatically uploading dSYM files is a good option for you if you are not using bitcode to distribute your application.

To enable automatic dSYM uploads, we will need to locate a number of items first:

- **Your App ID.** This is a 5 character code used to start Embrace. It was provided to you when you registered for an Embrace account.
- **Your API token.** This is a longer character string. You can find it in the dashboard on the settings page, under the Tokens section.

Now, open the "Build Phases" tab in Xcode. We will be adding a new phase.

<img src={require('@site/static/images/ios-xcode-build-phase.png').default} />

Use the "+" button on this tab to add a new "Run Script" phase. Name the phase "Embrace Symbol Uploads".

This phase is going to be calling Embrace's `run.sh` upload script. You can configure the phase to only run on builds you want symbols uploaded to Embrace for, and skip the step on internal only builds to save time.

The run.sh script is distributed alongside the `Embrace.framework` file. Depending on how you linked Embrace, this file will be in a different location.
See the section relevant for your integration for how to call the run script.

Use this command format for CocoaPods integrations.

```shell-session
REACT_NATIVE_MAP_PATH="$CONFIGURATION_BUILD_DIR/main.jsbundle.map" EMBRACE_ID=USE_YOUR_APP_ID EMBRACE_TOKEN=USE_YOUR_TOKEN "${PODS_ROOT}/EmbraceIO/run.sh"
```

Notice how the script's location is a reference to the CocoaPods installation folder.

:::info
If you do not use Cocoapods please see the [Uploading dSYMs](/ios/5x/integration/dsym-upload) page from the iOS integration guide to setup automatic uploading of dSYM files in Xcode.
:::

## Native Manual Uploads

If your app is using bitcode or a CI system that makes accessing or modifying the build phases impossible, you can still upload your dSYM files manually.

When applications are built with bitcode, it means the final binary and symbols only exist on Apple servers post-submission. As such you must download those symbols manually from Apple. You can do this from the Organizer window in Xcode.

<img src={require('@site/static/images/ios-xcode-organizer.png').default} />

Once you have the dSYMs on your computer, you can upload it to Embrace using our upload utility.  

The upload utility is distributed with the Embrace SDK. See the section above on [automatically uploading dSYMs](/ios/5x/integration/dsym-upload#automatic-uploads) to learn how to locate this file in your project. You will also need your APP ID and API token. You can upload dSYM and .zip files in the same command or use the upload tool on the *Settings/Upload* dSYM tab.

Run the upload tool and your dSYM will be sent to Embrace.

```shell-session
# Upload a single file
/EmbraceIO/upload --app $APP_ID --token $API_TOKEN dsyms.zip

# Upload multiple files
/EmbraceIO/upload --app $APP_ID --token $API_TOKEN --dsym my_dsym --dsym my_file.zip
```

This process can be scripted into your CI backend as well. Simply include the upload utility with your project's repo and call it from within the CI scripting system.

## Javascript Manual Uploads

When you uplad the dSYM manually you also have to upload the javascript bundle and source map files, to export them from the bundle you have to add two parameters to your build method: bundle-output and sourcemap-output

```javascript
react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.js \
  --sourcemap-output main.map \
  --bundle-output main.bundle
```

```shell-session
ios/Pods/EmbraceIO/upload --app <your app ID> --token <your token> --rn-bundle ./build/main.jsbundle --rn-map ./build/main.map
```

---  

dSYM's are complicated, but ensuring that Embrace has them will make the data you collect much more useful. Please reach out if you have any trouble with this process.
</TabItem>
<TabItem value="android" label="Android">

Proguard files will be uploaded automatically.
If you don’t see symbolicated crashes while using Proguard, reach out to us on Slack and we’ll work with you directly.

</TabItem>

</Tabs>

## Symbolication with CodePush

If you use [App Center CodePush](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/) or any other service to deploy OTA (over the air) updates,
you'll need to upload those source maps to Embrace using the upload script that ships with the iOS SDK.

For CodePush, you'll need to generate the bundle and source map to be uploaded.

```shell-session
appcenter codepush release-react -a MyApp --output-dir ./build --sourcemap-output ./map
``` 

Then, use the Embrace upload script to upload the source map.

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

```shell-session
ios/Pods/EmbraceIO/upload --app <your app ID> --token <your token> --rn-bundle ./build/CodePush/main.jsbundle --rn-map ./map
```

</TabItem>
<TabItem value="android" label="Android">

```shell-session
ios/Pods/EmbraceIO/upload --app <your app ID> --token <your token> --rn-bundle ./build/CodePush/index.android.bundle --rn-map ./map
```

:::info
The android map is generated with a different name, but the tool to upload is the same as iOS
:::

</TabItem>
</Tabs>

## Pointing the Embrace SDK to the JavaScript Bundle

If you distribute changes to the JavaScript code without submitting a new version to the App Store or Google Play Store (i.e. Expo OTA updates),
you must point the Embrace SDK to where the updated JavaScript bundle will be downloaded on the device.
You can do this in either the JavaScript part or native parts of your app with the code snippet provided below.
Note that this step is unnecessary if you use CodePush since the Embrace SDK will leverage the CodePush SDK to find the location of the bundle.

<Tabs groupId="rn-language" queryString="rn-language">
<TabItem value="javascript" label="JavaScript">

```javascript
import {setJavaScriptBundlePath} from '@embrace-io/react-native';

setJavaScriptBundlePath(pathToBundle)
```

</TabItem>
<TabItem value="objectivec" label="Objective-C">

```objectivec
[[RNEmbrace sharedIntance] setJavasScriptBundleURL: pathToBundle];
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace.getInstance().getReactNativeInternalInterface().setJavaScriptBundleUrl(pathToBundle)
```

</TabItem>
</Tabs>

## Expo Apps

If your app is built using Expo and you leverage OTA to distribute updates to your users, you must manually upload source maps using the script distributed with the SDK
as described in the [Symbolication with CodePush](/react-native/4x/integration/upload-symbol-files#symbolication-with-codepush) section.

You must also point the Embrace SDK to the location the updated bundle will be downloaded to on the device, as described in the [Pointing the Embrace SDK to the JavaScript Bundle](/react-native/4x/integration/upload-symbol-files#pointing-the-embrace-sdk-to-the-javascript-bundle).

---

Now that you know how to upload symbol files to make sure stack traces are translated on the Dashboard, let's generate your first session.  
