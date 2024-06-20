---
title: Identify Your Users
sidebar_position: 3
description: Get to know the users of your Android application with the Embrace SDK
---
# Know Your Users

Embrace offers two ways you can annotate sessions with information that will help developers and customer service agents find 
sessions for an unhappy user.

1. [**User Personas**](/android/features/identify-users#user-personas). This is data you can set and update about the user of a session.
1. [**Session Properties**](/android/features/session-properties). This is data you use to track information about the device or the session itself.

## User Personas

Embrace offers a set of methods to pass information about your users.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().addUserPersona("internal_user_id_123")
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().addUserPersona("internal_user_id_123");
```
</TabItem>
</Tabs>

:::warning Important
Remember that this data will be uploaded to Embrace, so think about the privacy of your users and only include data you are willing to share.
We recommend using an anonymized or hashed user ID that only your agents can search for.
:::

The above call annotates the session with a user identifier that you can use later to search for this user.
For more methods on setting user values, see the [API docs](/api/android/). 

You can also set customized values for specific use cases or segments of users.

<Tabs groupId="android-language" queryString="android-language">
<TabItem value="kotlin" label="Kotlin">
```kotlin
Embrace.getInstance().addUserPersona("high_value_cart")
```
</TabItem>
<TabItem value="java" label="Java">
```java
Embrace.getInstance().addUserPersona("high_value_cart");
```
</TabItem>
</Tabs>

In the above example, the session is annotated with `"high_value_cart"`.
This will help you identify users who have a certain dollar value in their shopping cart so you can prioritize fixing bugs that affect such users.

:::info
For a full set of APIs related to user identification, see the `io.embrace.android.embracesdk.Embrace` class in the [Android API](/api/android/) documentation.
:::