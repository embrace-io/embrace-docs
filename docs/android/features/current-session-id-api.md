---
title: Current Session ID API
sidebar_position: 9
description: Track the current Embrace session by getting its ID.
---

# Current Session ID API

import GetSessionId from '@site/shared/get-session-id.md';

<GetSessionId />

## Integration Steps

In order to use this feature, you will need to follow two steps:

1. Make sure your app is using at least version `5.24.0` of the Embrace SDK.
2. Implement the API call to obtain the current Session ID. The method will return either a `String` that is the SessionId, or null if there is no active session.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().currentSessionId
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().getCurrentSessionId();
```
</TabItem>
</Tabs>

:::warning Important
If you call `Embrace.getInstance().getCurrentSessionId()` within the `onForeground()` or `onBackground()` events of your `LifecycleObserver`; keep in mind that this is the moment when the session is ending, and a new one is starting. Therefore, there is a high chance that you will get the session ID of the session that is still ending. You might need to delay the call or obtain the session ID at any other point of the app lifecycle to make sure the session ID you get is the one you are looking for.
:::

import CallSupport from '@site/shared/call-support.md';

<CallSupport />
