---
title: Current Session ID API
sidebar_position: 5
description: Track the current Embrace session by getting its ID.
---
# Current Session ID API

```javascript
import {getCurrentSessionId} from '@embrace-io/react-native';

const myMethod = () =>{
    getCurrentSessionId().then(sessionId=>{
        console.log("Embrace Session Id", sessionId)
    })
}
```  


import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

:::warning Important
If you call `getCurrentSessionId()` inside the `AppState change` listener; keep in mind that this is the moment when the session is ending, and a new one is starting. Therefore, there is a high chance that you will get the session ID of the session that is still ending. You might need to delay the call or obtain the session ID at any other point of the app lifecycle to make sure the session ID you get is the one you are looking for.
:::