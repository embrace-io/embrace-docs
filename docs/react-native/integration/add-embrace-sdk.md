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
cd ios && USE_FRAMEWORKS=dynamic pod install --repo-update
```

:::info
Additional features for our SDK are kept in separate packages to allow you to include just the dependencies for the ones
you wish to use and keep your overall bundle size smaller. The instructions on this page will add just our core SDK
package as a dependency, additional packages can then be included later as you integrate more of the functionality
described in our [Feature Reference](/react-native/features/).
:::

## Native Setup

There are 3 options for applying the native side changes required by the SDK: using our Expo config plugin, using our
setup script, or applying them manually. Each options is described below.

### Expo config plugin

If you are using Expo's `prebuild` system to manage your native files you can make use of our config plugin. In your
`app.json` configure the plugin with your Embrace application IDs and symbol upload API token:

```json
    "plugins": [
        ...

        [
            "@embrace-io/react-native/lib/app.plugin.js",
            {
                "androidAppId": "__ANDROID_APP_ID__",
                "iOSAppId": "__IOS_APP_ID__",
                "apiToken": "__SYMBOL_UPLOAD_API_TOKEN__"
            }
        ]
    ],
```

:::info
Refer to [EmbraceProps](https://github.com/embrace-io/embrace-react-native-sdk/tree/main/packages/core/src/plugin//types.ts)
for the full set properties available to configure the plugin.
:::

The next time you run `npx expo prebuild` the native Android and iOS files should be updated with the changes required
by the Embrace SDK. Note that there are other customizations and advanced features of the SDK such as [OTLP Export](/react-native/features/otlp/#initializing-in-the-native-layer)
which will still require manual editing of native files, at the moment the config plugin only covers this initial SDK
setup.

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

Since [6.3.0](/react-native/changelog/#630) there are a few changes required in the Podfile of the application described below.

### Embrace Apple SDK depends on KSCrash

KSCrash needs modular headers enabled to be able to build. In order to support this Pod, the Podfile in the iOS project needs to add the following line before the target is declared:

```ruby
pod 'KSCrash', :modular_headers => true # insert this line here to enable modular headers only for KSCrash

target 'ProjectName' do
  config = use_native_modules!
  flags = get_default_flags()

  use_react_native!(
    :path => config[:reactNativePath],
    ...
```

Additionally, because of the integration with KSCrash, we also now internally use `USE_FRAMEWORKS=dynamic` as our binding setting. It is strongly recommended that you do so as well when invoking `pod install` on your own projects (e.g. `USE_FRAMEWORKS=dynamic pod install`).

Finally, KSCrash and `react-native-flipper` are NOT compatible. For React Native customers using 0.73 or before, `react-native-flipper` is included by default; for 0.74 onwards, it has been removed. If you have `react-native-flipper` in your project, you will need to disable it with the following changes to your `react-native.config.js`:

```js
module.exports = {
  dependencies: {
    ...(process.env.NO_FLIPPER ? { 'react-native-flipper': { platforms: { ios: null } } } : {})
  }
}
```
</TabItem>

<TabItem value="android" label="Android">

Update the `build.gradle` file (usually located at `<root>/android/build.gradle`) to include the Embrace Gradle Plugin.

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

- `android.permission.INTERNET`
- `android.permission.ACCESS_NETWORK_STATE`
:::

</TabItem>
</Tabs>

---

There's a little more configuration we have to do to set up the uploading of symbol files. You'll be learning about that next.

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

### Android build error on React Native 0.71

In your `android/app/build.gradle` if you have

```text
apply from react.gradle
```

try replacing it with:

```text
apply plugin: "com.facebook.react"
```

See [this commit](https://github.com/facebook/react-native/commit/af6aafff90c4d40abfe160c4cfc8e1ae8fa0d956) for more details.

### Package "@embrace-io/react-native" does not contain a valid config plugin

Expo's plugin resolution method changed in version 52, the simplest way to guarantee our plugin is found across
different Expo versions is to specify the full "@embrace-io/react-native/lib/app.plugin.js" path for the plugin in
`app.json` rather just the "@embrace-io/react-native" package name. See [this PR](https://github.com/expo/expo/pull/31569)
for more details.
