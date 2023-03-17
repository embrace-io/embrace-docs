---
title: Identify Your Users
sidebar_position: 2
description: Get to know the users of your Android application with the Embrace SDK
aliases:
  - /android/identify-users/
---
# Know Your Users

Embrace offers two ways you can annotate sessions with information that will help developers and customer service agents find 
sessions for an unhappy user.

1. [**User Personas**](/android/features/identify-users#user-personas). This is data you can set and update about the user of a session.
1. [**Session Properties**](/android/features/identify-users#session-properties). This is data you use to track information about the device or the session itself.

:::info

For a full set of APIs related to user identification, see the `io.embrace.android.embracesdk.Embrace` class in the [Android API]({{< api android >}}) documentation.

:::

## User Personas

Embrace offers a set of methods to pass information about your users.

```java
Embrace.getInstance().setUserIdentifier("internal_random_id_1234");
```

:::warning

Remember that this data will be uploaded to Embrace, so think about the privacy of your users and only include data you are willing to share.
We recommend using an anonymized or hashed user ID that only your agents can search for.

:::

The above call annotates the session with a user identifier that you can use later to search for this user.
For more methods on setting user values, see the [API docs]({{< api android >}}). 

You can also set customized values for specific use cases or segments of users.

```java
Embrace.getInstance().setUserPersona("high_value_cart");
```

In the above example, the session is annotated with `"high_value_cart"`.
This will help you identify users who have a certain dollar value in their shopping cart so you can prioritize fixing bugs that affect such users.


## Session Properties

Session Properties are another way to annotate the session.
The difference between session properties and [user personas](/android/features/identify-users#user-personas) is that the former are for items relating to the session or the device and not necessarily to the user.
However, you are free to use both mechanisms interchangeably.

Here is an example of setting a session property:

```java
Embrace.getInstance().addSessionProperty("launch type", "normal", permanent: false)
```
:::warning
{{< readFile file="shared/property-limit.md" >}}
:::

In the above, the `"launch type"` property is set with a value of `"normal"`.
This is to indicate normal launches by the user.
When the app is launched via a push notification tap, you can set the value `"push"`.
This can help to understand issues that are hurting push notification adoption rates.
For example, you could prioritize fixing the issues that affect customers that use push notifications, since they generally provide higher lifetime value.
