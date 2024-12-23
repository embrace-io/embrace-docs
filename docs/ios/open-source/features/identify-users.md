---
title: Identify Users
sidebar_position: 4
---


# Identify your users

Months after your app has been released and your user base is growing, you are going to want to start triaging issues you find in your app based on segments of your user base. Setting the stage for that activity now means you will be well positioned to do that work when the time comes.

It is important that you annotate your sessions with enough information so that developers and other agents can find problem sessions when required. You will also want to be able to answer questions about a session to help you understand the severity of an issue. Embrace offers two mechanisms for annotating sessions in a searchable way:

- [User Personas](./#user-personas). This is data you can set and update about the user of a session.
- [Session Properties](./#session-properties). This is data you use to track information about the device or the session itself.

These mechanisms annotate the session so that you can subsequently filter and sort on this data.

## User Personas

The `MetadataHandler` provides an [extension](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/Metadata/MetadataHandler%2BPersonas.swift) for managing User Personas. User Personas allow you to dynamically segment app users and their sessions according to their behavior, characteristics, or other criteria that you create. This feature helps with analyzing user segments, understanding variations or poor performance in user behavior, and tailoring the application experience to meet the diverse of ways that users use your application.

### Interface

#### Retrieving Current User Personas

To retrieve the current set of persona tags, use the `currentPersonas` property. This property fetches persona tags from the storage that apply to the user at the current point in time.

```swift
let personas = Embrace.client?.metadata.currentPersonas
```

#### Adding User Personas in the Embrace SDK

User Personas in the Embrace SDK allow you to tag sessions with specific user traits or behaviors. This can help you prioritize fixing bugs that affect certain user segments. 

There is are [pre-defined tags](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/Metadata/PersonaTag.swift#L8-L17) that we think are useful, and you can feel free to add your own. Here are some examples on how to add user personas:

```swift
try? Embrace.client?.metadata.add(persona: PersonaTag.mvp, lifespan: .permanent)

try? Embrace.client?.metadata.add(persona: "completed_purchase", lifespan: .session)
```

It's recommended to extend `PersonaTag` when you define your own persona tags. This is a good practice to make sure these values stay consistent wherever they are used.

```swift
extension PersonaTag {
  static let authenticated: PersonaTag = "authenticated"

  static func bucket(name: StaticString) -> PersonaTag {
    return PersonaTag("bucket_\(name)")
  }
}
```

## Session Properties
Session Properties are another way to annotate the session. The difference between session properties and user personas is that the former are for items relating to the session or the device, and not necessarily to the user. Although, you are free to use both mechanisms interchangeably.

Here is an example of setting a session property:

```swift
Embrace.client?
        .metadata
        .addProperty(key: "launch type", value: "normal", lifespan: .session)
```

## Overview of the Metadata Lifespan

When you add Embrace metadata, you can apply a [lifespan](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Public/Metadata/MetadataHandler.swift#L9-L17) to that value. Sometimes it can be very useful to let contextual data "auto-expire" when no longer relevant, and at other times you want that data to exist for the user's entire time in your app. 

There are three metadata lifespans:

1. **Session**: Metadata with a `session` lifespan is tied to a single user session. When the session ends, this metadata is automatically cleared. This option is ideal for temporary states or conditions that are only relevant to a specific interaction period. For instance, if a user completes a purchase, it can be useful to mark the session with a persona to mark the "`completed_purchase`" in order to identify behaviors across users that led to that purchase.

1. **Process**: A `process` lifespan is scoped to the lifetime of the application process. If the application restarts, `process` lifespan metadata will no longer apply. This can be useful for conditions that should persist across sessions but not continue into the next cold start of the application. An example of this could be a "`first_launch`" persona to mark any sessions that occur when the user first installs the app.

1. **Permanent**: Metadata marked as `permanent` remains associated with the user across multiple sessions until explicitly removed. This is useful for long-term attributes, such as user roles or subscription statuses, that affect the user experience over time. You may want to use a "`vip`" persona to mark users that you'd like to make sure have a seamless experience. This could be your company's CEO so that you recognize the issues that somehow only ever seems to occur to them. Maybe you'll have a fix **before** you get that pesky email...

## Conclusion

User Personas and Session Properties provide a flexible way to tag and categorize user sessions for better analysis and personalization. By leveraging this functionality, developers can gain insights into user behavior and improve the application experience based on user segments.
