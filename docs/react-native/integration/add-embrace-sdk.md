---
title: Adding the Embrace SDK
description: Add the Embrace SDK as a dependency to your React Native application
sidebar_position: 3
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# Adding the React Native Embrace SDK

## Add the JavaScript library

npm:

```sh
npm install @embrace-io/react-native
```

yarn:

```sh
yarn add @embrace-io/react-native
```

For iOS you will also need to install or update pods for the application:

```sh
cd ios && pod install --repo-update
```

:::info
Additional features for our SDK are kept in separate packages to allow you to include just the dependencies for the ones
you wish to use and keep your overall bundle size smaller. The instructions on this page will add just our core SDK
package as a dependency, additional packages can then be included later as you integrate more of the functionality
described in our [Feature Reference](/react-native/features/).
:::

## Native Setup

### Setup Script

The JavaScript Embrace SDK ships with a setup script to modify the files in your
project to add the native dependencies. The setup scripts can be found in your
`node_modules` folder at `node_modules/@embrace-io/dist/scripts/setup`

**Run the setup script**
```shell-session
node node_modules/@embrace-io/react-native/lib/scripts/setup/installAndroid.js
```

```shell-session
node node_modules/@embrace-io/react-native/lib/scripts/setup/installIos.js
```

:::info Clean Up Embrace implementation
If you need to clean up an Embrace implementation added manually or by our scripts you can use our uninstall script
```shell-session
node node_modules/@embrace-io/react-native/lib/scripts/setup/uninstall.js
```
:::

You can use git to see the changes that the script made.

```shell-session
git diff
```

Compare the changes to the manual setup step to verify the changes were made
correctly.

### Manually

<Tabs groupId="platform" queryString="platform">
<TabItem value="ios" label="iOS">

Configuration for iOS is handled in code when initializing the SDK which we will cover in the next step. The native module
should be setup using [Autolinking](https://github.com/react-native-community/cli/blob/dec33cb945be548a0d30c2ea073493e253239850/docs/autolinking.md#platform-ios)
so you're good to go!
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
    classpath "io.embrace:embrace-swazzler:${findProject(':embrace-io_react-native').properties['emb_android_sdk']}"
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

Now, add the Embrace config file at `android/app/src/main/embrace-config.json`, and add your API key and token. Make
sure to also indicate that your app is using React Native.

```json
{
  "app_id": "xxxxx",
  "api_token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sdk_config": {
    "app_framework": "react_native"
  }
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


## Troubleshooting

### ExpoModulesProvider error

If you encounter the following build error on iOS after running through our setup using an expo app:

> "Cannot find interface declaration for 'ModulesProvider', superclass of 'ExpoModulesProvider'"

Update your `AppDelegate.m|mm` file to include the following import, making sure it is added before your
`#import "ProjectName-Swift.h"` line:

```objective-c
#import "ExpoModulesCore-Swift.h"
```

See [this GitHub issue](https://github.com/expo/expo/issues/17705) for more details.