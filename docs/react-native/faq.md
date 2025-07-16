---
title: React Native FAQ
description: Frequently asked questions about the React Native Embrace SDK
sidebar_position: 3
---

# React Native FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to use on Slack
or email us at [support@embrace.com](mailto:support@embrace.com).

## Common Questions

### **Does Embrace work with Buck / OKBuck?**

Not currently. Please contact us at [support@embrace.com](mailto:support@embrace.com) or on Slack if you would like to request support.

### **Does Embrace support Hermes for React Native?**

Yes, we support Hermes in Embrace Android SDK versions 5.5.0 and above. Please ensure that you are using at least version 0.71 of React Native when utilizing Hermes.


## Users

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes, we make the Embrace ID available to you via our SDK. See [these docs](/react-native/features/session-metadata/#current-device-id) for more details.

## Network Requests

### **Why are my API calls not displaying in the dashboard?**

Please make sure that Embrace is initialized after any 3rd party networking libraries.
We are consistently discovering new APIs and libraries for which we need to add support.
Please contact us via email or Slack with the information.

### **Do you support GRPC?**

Yes. Please contact us for the steps to track GRPC.

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