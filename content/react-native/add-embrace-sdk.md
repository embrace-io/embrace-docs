---
title: "Adding the Embrace SDK"
description: Add the Embrace SDK as a dependency to your React Native application
weight: 3
---

# Adding the React Native Embrace SDK

## Add the JavaScript library

Use Yarn or NPM to install the NPM module.

```sh
yarn add react-native-embrace
```

```sh
npm install react-native-embrace --save
```

## Use Autolinking

If you're on React Native version 0.60 and above, you can use [Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md)
to setup the native modules. 

{{< tabs >}}

{{< tab "iOS" >}}

Add the EmbraceIO Pod.

```sh
cd ios && pod install
```

{{</tab >}}

{{< tab "Android" >}}

Follow the steps in the [Setup Script]({{< relref "/android/integration/add-embrace-sdk#using-the-setup-script" >}}) section or the [Manual]({{< relref "/android/integration/add-embrace-sdk#adding-the-sdk-manually" >}}) section to
add the Android native dependencies.

{{</tab >}}


{{< /tabs >}}

## Using the Setup Script

The JavaScript Embrace SDK ships with a setup script to modify the files in your
project to add the native dependencies. The setup script can be found in your
`node_modules` folder at `node_modules/react-native-embrace/dist/scripts/setup/setup.js`

```sh
node node_modules/react-native-embrace/dist/scripts/setup/setup.js
```

You can use git to see the changes that the script made.

```sh
git diff
```

Compare the changes to the [Manual Setup]({{< relref "/android/integration/add-embrace-sdk#adding-the-sdk-manually" >}}) step to verify the changes were made
correctly.

## Adding the SDK Manually

{{< tabs "reactNativeAddSDK" >}}

{{< tab "iOS" >}}

Configure your `PodFile` to add Embrace.

```ruby
target 'MyApp' do
  # ...

  pod 'EmbraceIO'
  pod 'RNEmbrace', :path => '../node_modules/react-native-embrace'
end
```

Then, install the pod.

```sh
pod install
```

Finally, you'll need to add an `Embrace-Info.plist` file at the root of the iOS project.
Please see the [Session Reporting]({{< relref "/ios/integration/session-reporting#import-embrace" >}}) page from the iOS integration guide page on how to add this file in Xcode. 

{{< /tab >}}

{{< tab "Android" >}}

Update the `build.gradle` file (usually located at `<root>/android/build.gradle`) to include the Embrace Swazzler.

```groovy
buildscript {
  repositories {
    jcenter()
    google()
  }
  dependencies {
    classpath('embrace-io:embrace-swazzler:{{< sdk platform="android" >}}')
  }
}
```

Then, update the app `build.gradle` file (usually located at `<root>/android/app/build.gradle`).

```groovy
apply plugin: 'com.android.application'
apply plugin: 'embrace-swazzler'
repositories {
  jcenter()
  google()
}
```

{{< hint warning >}}
React Native 0.59.0 and later automatically adds the required `compileOptions` directive to the `android/app/build.gradle` file.
If you are using a version of React Native older than 0.59.0, or your project was created with a version older than 0.59.0, add the following to your `android/app/build.gradle` file:

```groovy
android {
    // ...

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    // ...
}
```

{{< /hint >}}

Now, add the Embrace config file at `android/app/src/main/embrace-config.json`, and add your API key and token.


```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

{{< hint info >}}
Your API ID and token are available on the Embrace dashboard.
{{< /hint >}}

{{< hint info >}}

You’ll need to set the following permissions so the Embrace SDK can send events and monitor connectivity.

* `android.permission.INTERNET`
* `android.permission.ACCESS_NETWORK_STATE`

{{< /hint >}}

{{< /tab >}}

{{< /tabs >}}

---

There's a little more configuration we have to do to setup the uploading of symbol files.
You'll be learning about that next.

{{< button relref="/react-native/upload-symbol-files" >}}On to Uploading Symbol Files{{< /button >}}

