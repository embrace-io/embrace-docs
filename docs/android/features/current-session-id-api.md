---
title: Current user session ID API
sidebar_position: 9
description: Track the current user session by getting its ID.
---

# Current user session ID API

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

## Integration steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using at least version `5.24.0` of the Embrace SDK.
2. Implement the API call to obtain the current user session ID. The method will return either a `String` that is the user session ID, or null if there is no active user session.

```kotlin
Embrace.currentUserSessionId
```

import CallSupport from '@site/shared/call-support.md';

<CallSupport />
