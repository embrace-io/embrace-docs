---
title: Current Device ID API
sidebar_position: 4
description: Get the Device ID.
---

# Current Device ID API

```javascript
import {getDeviceId} from '@embrace-io/react-native';

const myMethod = () =>{
    getDeviceId().then(deviceId=>{
        console.log("Embrace Device Id", deviceId)
    })
}
```  

## Overview

Embrace SDK’s API enables customers to programmatically obtain the current Embrace Device ID.

**When should I call the Current Device ID method?**  

If you call the method before the SDK has started, it will return null. So, you need to call it once the SDK has been started.