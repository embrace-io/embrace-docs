---
title: Identify Your Users
sidebar_position: 4
description: Get to know the users of your Android application with the Embrace SDK
---

# Know your users

Embrace offers two ways you can annotate sessions with information that will help developers and customer service agents find  
sessions for an unhappy user.

- [**User personas and identifiers**](/android/features/identify-users#user-personas). This is data you can set and update about the user of a session.
- [**Session properties**](/android/features/session-properties). This is data you use to track information about the device or the session itself.

## User personas and identifiers {#user-personas}

Embrace offers a set of methods to pass information about your users. You can set a "persona" for the session's user, such as tester or VIP. You can also add a user identifier, which will be an Embrace-specific ID for identifying the session in the dashboard.

```kotlin
Embrace.addUserPersona("internal_user")
Embrace.setUserIdentifier("internal_user_id_123")
```

:::warning Important
Remember that this data will be uploaded to Embrace, so think about the privacy of your users and only include data you are willing to share.
We recommend using an anonymized or hashed user ID that only your agents can search for.
:::

The above call annotates the session with a user identifier that you can use later to search for this user.
For more methods on setting user values, see the [API docs](/api/android/).  

You can also set customized values for specific use cases or segments of users.

```kotlin
Embrace.addUserPersona("high_value_cart")
```

In the above example, the session is annotated with `"high_value_cart"`.
This will help you identify users who have a certain dollar value in their shopping cart so you can prioritize fixing bugs that affect such users.

:::info
For a full set of APIs related to user identification, see the `io.embrace.android.embracesdk.Embrace` class in the [Android API](/api/android/) documentation.
:::
