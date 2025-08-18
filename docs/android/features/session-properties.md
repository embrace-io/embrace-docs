---
title: Session Properties
sidebar_position: 5
description: Get to know the users of your Android application with the Embrace SDK
---

# Session Properties

Session Properties are another way to annotate the session.
The difference between session properties and [user personas](/android/features/identify-users#user-personas) is that the former are for items relating to the session or the device and not necessarily to the user.
However, you are free to use both mechanisms interchangeably.

Here is an example of setting a session property:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">

```kotlin
Embrace.getInstance().addSessionProperty("launch type", "normal", permanent: false)
```

</TabItem>
<TabItem value="java" label="Java">

```java
Embrace.getInstance().addSessionProperty("launch type", "normal", permanent: false);
```

</TabItem>
</Tabs>

import PropertyLimit from '@site/shared/property-limit.md';

<PropertyLimit />

In the above, the `"launch type"` property is set with a value of `"normal"`.
This is to indicate normal launches by the user.
When the app is launched via a push notification tap, you can set the value `"push"`.
This can help to understand issues that are hurting push notification adoption rates.
For example, you could prioritize fixing the issues that affect customers that use push notifications, since they generally provide higher lifetime value.
