---
title: Adding the Embrace SDK
description: Add the Embrace SDK as a dependency to your React Native application
sidebar_position: 3
---

# Adding the React Native Embrace SDK

## Add the JavaScript library

Use Yarn or NPM to install the NPM module.

```shell-session
yarn add react-native-embrace
```

```shell-session
npm install react-native-embrace --save
```

:::info
If you are using a yarn workspace, you must run the command at the react-native application folder level or modify package.json manually. Do not run this on your yarn workspace root.
:::

## Native Modules

If you're on React Native version 0.60 and above, you can use [Autolinking](https://github.com/react-native-community/cli/blob/master/docs/autolinking/)
to set up the native modules. 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="rn-platform" queryString="rn-platform">
<TabItem value="ios" label="iOS">

Configure your `PodFile` to add Embrace. (RN Versions < 0.6)

```ruby
target 'MyApp' do
  # ...

  pod 'EmbraceIO'
  pod 'RNEmbrace', :path => '../node_modules/react-native-embrace'
end
```
Then, install the pod.

```shell-session
cd ios && pod install --repo-update
```

</TabItem>
<TabItem value="android" label="Android">

<!-- This is wrong because the manual instalation is related to the SDK not the native modules 
We have to check how is the integration for RN project without autolinking -->
Follow the steps in the **Setup Script** section or the [Manual](/android/integration/add-embrace-sdk#adding-the-sdk-manually) section to add the Android native dependencies.

</TabItem>
</Tabs>

# Adding the SDK 

## Setup Script

The JavaScript Embrace SDK ships with a setup script to modify the files in your
project to add the native dependencies. The setup scripts can be found in your
`node_modules` folder at `node_modules/react-native-embrace/dist/scripts/setup`

**Run the setup script**
```shell-session
node node_modules/react-native-embrace/dist/scripts/setup/installAndroid.js
```

```shell-session
node node_modules/react-native-embrace/dist/scripts/setup/installIos.js
```

You can use git to see the changes that the script made.

```shell-session
git diff
```

Compare the changes to the [Manual Setup](/android/integration/add-embrace-sdk#adding-the-sdk-manually) step to verify the changes were made
correctly.

## Manually

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

You'll need to add an `Embrace-Info.plist` file at the root of the iOS project.
Please see the [Session Reporting](/ios/integration/session-reporting#import-embrace) page from the iOS integration guide page on how to add this file in Xcode. 

</TabItem>
<TabItem value="android" label="Android">

Update the `build.gradle` file (usually located at `<root>/android/build.gradle`) to include the Embrace Swazzler.

```groovy
buildscript {
  repositories {
    mavenCentral()
    google()
  }
  dependencies {
    classpath('io.embrace:embrace-swazzler:{{ embrace_sdk_version platform="android" }}')
  }
}
```

Then, update the app `build.gradle` file (usually located at `<root>/android/app/build.gradle`).

```groovy
apply plugin: 'com.android.application'
apply plugin: 'embrace-swazzler'
repositories {
  mavenCentral()
  google()
}
```

:::warning Important
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

:::

Now, add the Embrace config file at `android/app/src/main/embrace-config.json`, and add your API key and token.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
}
```

:::info
Your API ID and token are available on the Embrace dashboard.
:::

:::info
You’ll need to set the following permissions so the Embrace SDK can send events and monitor connectivity.

* `android.permission.INTERNET`
* `android.permission.ACCESS_NETWORK_STATE`
:::

</TabItem>
</Tabs>

---

There's a little more configuration we have to do to set up the uploading of symbol files.
You'll be learning about that next.