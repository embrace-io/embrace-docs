---
title: Last Run End State
description: Understand if the previous app instance ended in a crash
sidebar_position: 6
---

# Last Run End State API

```javascript
  useEffect(() => {
    getLastRunEndState().then(resp => {
      console.log('LastRunEndState', resp);
    });
  }, []);
```

This API enables customers to automatically/programmatically understand if the previous app instance ended in a crash. Depending on your use case, having the ability to query an API to understand if the previous app instance ended in a crash will enable you to adjust the behavior or UI of your app after a crash has occurred.

**What do we mean by previous app instance?** 

A cold launch, basically. If the app gets backgrounded/resumed so a new session starts, the value returned will not change. So:

1. App crashes
2. App is relaunched
3. `getLastRunEndState` returns "crashed"
4. App is sent to background
5. App is resumed, starting a new session
6. `getLastRunEndState` still returns "crashed"
7. App exits cleanly
8. App is relaunched
9. `getLastRunEndState` returns "clean exit"


**Important Notes**

:::warning Important
- The API can only be called after the SDK has been started. If a call is made prior to starting the Embrace SDK you will get a response of `INVALID`
- It will return that a crash occurred if the app crashed any time since the app last came to the foreground. This includes if the app crashed while running in the background.
:::

### Possible Values

```typescript
/// Used to represent the end state of the last run of the application.
export type SessionStatus = 'INVALID' | 'CRASH' | 'CLEAN_EXIT';
```