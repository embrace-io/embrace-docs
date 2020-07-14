---
title: "Identify your users"
description: Get to know the users of your iOS application with the Embrace SDK
weight: 11
---

# Know Your Users

Months after your app has been released and you user base is growing, you are going to want to start triaging issues you find in your app based on segments of your user base.
Setting the stage for that activity now means you will be well positioned to do that work when the time comes.

It is important that you annotate your sessions with enough information so that developers and other agents can find problem sessions when required.
You will also want to be able to answer questions about a session to help you understand the severity of an issue.
Embrace offers two mechanisms for annotating sessions in a searchable way:

1. [**User Personas**]({{< relref "/ios/identify-users#user-personas" >}}). This is data you can set and update about the user of a session.
1. [**Session Properties**]({{< relref "/ios/identify-users#session-properties" >}}). This is data you use to track information about the device or the session itself.  

These mechanisms annotate the session so that you can subsequently filter and sort on this data.

## User Personas

We offer a set of methods to set the username, the email address, or a user identifier.

{{< hint warning >}}

Remember that this data will be uploaded to Embrace, so think about the privacy of your users and only include data you are willing to share.
We recommend including an anonymized user ID that only your agents can search for.

{{< /hint >}}

```swift
Embrace.sharedInstance()?.setUserIdentifier("internal_user_id_1234");
```

The above call annotates the session with a user identifier that we can use later to search for this user.
If the user contacts our customer service department, those agents will look the user up by the identifier to find sessions in the Embrace dashboard to investigate.

Sometimes you need to set customized values for specific use cases or user segmentation scenarios:

```swift
Embrace.sharedInstance()?.setUserPersona("high_value_cart");
```

The session is annotated with `"high_value_cart"` in the above example.
This property helps you to identify users who have a certain dollar value in their shopping cart so 
you can prioritize fixing bugs that affect such users.

## Session Properties

Session Properties are another way to annotate the session.
The difference between session properties and [user personas]({{< relref "/ios/identify-users#user-personas" >}}) is that the former are for items relating to the session or the device, and not necessarily to the user.
Although, you are free to use both mechanisms interchangeably.

Here is an example of setting a session property:

```swift
Embrace.sharedInstance()?.addSessionProperty("normal", withKey: "launch type", permanent: false)
```

In the above, the `"launch type"` property is set with a value of `"normal"`.
This is to indicate normal launches by the user.
When the app is launched via a push notification tap, you can set the value `"push"`.
This can help to understand issues that are hurting push notification adoption rates.
For example, you could prioritize fixing the issues that affect customers that use push notifications, since they generally provide higher lifetime value.

---

Finally, use OS Log data to augment your sessions and help you understand even more about your app.

{{< button relref="/ios/augment-sessions" >}}Augment Sessions using OS Log{{< /button >}}
