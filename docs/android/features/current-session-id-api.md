---
title: Current session ID API
sidebar_position: 9
description: Track the current session by getting its ID.
---

## Current session ID API

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

### Integration steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using at least version `9.0.0` of the Embrace SDK.
   - There is a similar method in older versions called `Embrace.currentSessionId` that will return the ID of the session part.
2. Implement the API call to obtain the current session ID. The method will return either a `String` that is the session ID, or null if there is no active session.

```kotlin
Embrace.currentUserSessionId
```

import CallSupport from '@site/shared/call-support.md';

<CallSupport />
