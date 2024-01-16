---
title: React Native FAQ
description: Frequently asked questions about the React Native Embrace SDK
sidebar_position: 3
---

# React Native FAQ

Here are a list of questions we commonly receive along with their answers.
If you don't see your question here, or would like more clarification on one please reach out to use on Slack
or email us at <support@embrace.io>.

## Common Questions

### **Does Embrace work with Buck / OKBuck?**

Not currently. Please contact us at <support@embrace.io> or on Slack if you would like to request support.


## Users

### **If a user registered in a later session, are previous sessions still linked to that user?**

Yes. We link all sessions to that user from the past and in the future. Search by the Embrace ID for all of that users sessions.

### **Do I have access to the Embrace ID at runtime?**

Yes, we make the Embrace ID available to you via our SDK. See the [API docs](https://embrace-io.github.io/react-native-embrace/modules/_embrace_.html#getdeviceid).

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

This could be due to one of the following reasons:

* We currently do not automatically capture WebSocket requests.
* The networking library you're using isn't one of the supported ones.
* You may use a CDN like Cloudflare, which can change your networking under-the-hood. Here's a list of CDNs that are verified to be compatible:
  * Akamai
  * Cloudflare
  * PacketZoom
* You are using an Axios version that is not compatible with us or you have a custom integration that block us. You can force log the Axios request appying our [interceptor](https://embrace-io.github.io/embrace-react-native/modules/_embrace_.html#applynetworkinterceptors).  
