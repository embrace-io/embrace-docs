---
title: Tracking Sessions
sidebar_position: 9
description: Track the current Embrace session by getting its ID.
---
# Tracking Sessions

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using at least version `5.24.0` of the Embrace SDK.
2. Implement the API call to obtain the current Session ID.
3. The method will return a String with the SessionId or null if there is no active session.

#### Java

```java
Embrace.getInstance().getCurrentSessionId()
```

#### Kotlin

```kt
Embrace.getInstance().currentSessionId
```

import CallSupport from '@site/shared/call-support.md';

<CallSupport />