---
title: FAQ
description: Frequently asked questions about the React Native Embrace SDK
sidebar_position: 3
---

# Embrace React Native SDK FAQ

Here is a list of frequently asked questions and their answers. If you don't see your question here, or would like more clarification on one, reach out on Slack or email [support@embrace.io](mailto:support@embrace.io).

## Common questions

### **How do I support Android API levels < 26?**

Desugaring is required to support Android API levels < 26. To enable, the following is required in your app's
`android/app/build.gradle`:

```text
android {
   ...  
    compileOptions {
        ...
        coreLibraryDesugaringEnabled true   
    }
}

dependencies {
    ...
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.0.3' // 2.0.3 or higher
}
```

In addition, in your `android/gradle.properties` you must set

```text
android.useFullClasspathForDexingTransform=true
```

Note that these settings require higher versions of Android tooling than is set by default in older versions of React
Native application templates, specifically Gradle 8.4+ and AGP 8.3.0+. For RN versions below 0.73 you may also need to point
to a newer version of the React Native gradle plugin. To see all the required changes you can review our
[integration application template](https://github.com/embrace-io/embrace-react-native-sdk/tree/main/integration-tests/templates)
for the React Native version you are using in your application.

### **Does Embrace work with Buck / OKBuck?**

Not currently. Please contact us at [support@embrace.io](mailto:support@embrace.io) or on Slack if you would like to request support.

### **Does Embrace support Hermes for React Native?**

Yes, we support Hermes in Embrace Android SDK versions 5.5.0 and above. Please ensure that you are using at least version 0.71 of React Native when utilizing Hermes.

## Users

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes, we make the Embrace ID available to you via our SDK. See [these docs](/react-native/features/session-metadata/#current-device-id) for more details.

## Network requests

### **Why are my API calls not displaying in the dashboard?**

Please make sure that Embrace is initialized after any 3rd party networking libraries.
We are consistently discovering new APIs and libraries for which we need to add support.
Please contact us via email or Slack with the information.

### **Do you support gRPC?**

Yes. Please contact us for the steps to track gRPC.

### **Do you support GraphQL?**

Yes, we have multiple customers that use GraphQL. See the [GraphQL guide](/best-practices/graphql) in [Best Practices](/best-practices).

### **My network calls are not being captured. What could be going wrong?**

The native libraries that are used for React Native's [fetch and XMLHttpRequest implementations](https://reactnative.dev/docs/network)
will be automatically instrumented and any network calls made through them (or third-party libraries that depend on them)
should get captured.

If you or a package you are using are doing something custom beyond these implementations then network calls may not be
getting captured. In these cases you can call our [network logging methods](https://github.com/embrace-io/embrace-react-native-sdk/blob/main/packages/core/src/api/network.ts)
directly to manually record these requests.

Note that we currently do not automatically capture WebSocket requests.
