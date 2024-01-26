---
title: Current Session ID API
sidebar_position: 9
description: Get the Device ID.
---
# Current Device ID API

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using at least version `4.0.0` of the Embrace SDK.
2. Implement the API call to obtain the current Device ID.


```javascript
import {getDeviceId} from '@embrace-io/react-native';

const myMethod = () =>{
    getDeviceId().then(deviceId=>{
        console.log("Embrace Device Id", deviceId)
    })
}
```  

import CallSupport from '@site/shared/call-support.md';

<CallSupport />