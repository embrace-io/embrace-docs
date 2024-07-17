---
title: Working with User Personas
sidebar_position: 10
---


# Making use of User Personas

The `MetadataHandler` extension for managing user personas allows for the dynamic tagging of sessions with persona information. This feature is crucial for understanding user behavior and segmenting users based on their interactions within your application.

## Overview

User personas are tags that you can assign to categorize the user them according to their behavior, characteristics, or any other criteria relevant to your application. These tags help in analyzing user segments and tailoring the application experience to meet diverse user needs.


## Retrieving Current User Personas

To retrieve the current set of persona tags, use the `currentPersonas` property. This property fetches persona tags from the storage that apply to the user at the current point in time.

```swift
let personas = Embrace.client?.metadata.currentPersonas
```

## Adding User Personas in the Embrace SDK

User Personas in the Embrace SDK allow you to tag sessions with specific user traits or behaviors. This can help you prioritize fixing bugs that affect certain user segments. Here are some examples on how to add user personas:

```swift
try? Embrace.client?.metadata.add(persona: "completed_purchase", lifespan: .session)

try? Embrace.client?.metadata.add(persona: PersonaTag.mvp, lifespan: .permanent)
```

Its recommended to extend `PersonaTag` to define your own tags. This is a good practice to make sure these values stay consistent wherever they are used.

```swift
extension PersonaTag {
  static let authenticated: PersonaTag = "authenticated"

  static func bucket(name: StaticString) -> PersonaTag {
    return PersonaTag("bucket_\(name)")
  }
}
```

### Overview of the MetadataLifespan

When you add metadata, you can apply a lifespan to that value. Sometimes it can be very useful to let this contextual data "auto-expire" when no longer relevant. There are three different lifespans:

1. **Session**: Metadata with a `session` lifespan is tied to a single user session. When the session ends, this metadata is automatically cleared. This option is ideal for temporary states or conditions that are only relevant to a specific interaction period. For instance, if a user completes a purchase, it can be useful to mark the session with a persona to mark the "`completed_purchase`" in order to identify behaviors across users that led to that purchase.

1. **Process**: A `process` lifespan is scoped to the lifetime of the application process. If the application restarts, `process` lifespan metadata will no longer apply. This can be useful for conditions that should persist across sessions but not continue into the next cold start of the application. An example of this could be a "`first_launch`" persona to mark any sessions that occur when the user first installs the app.

1. **Permanent**: Metadata marked as `permanent` remains associated with the user across multiple sessions until explicitly removed. This is useful for long-term attributes, such as user roles or subscription statuses, that affect the user experience over time. You may want to use a "`vip`" persona to mark users that you'd like to make sure have a seamless experience. This could be your company's CEO so that you recognize the issues that somehow only ever seems to occur to them. Maybe you'll have a fix **before** you get that pesky email...

## Conclusion

User Personas provide a flexible way to tag and categorize user sessions for better analysis and personalization. By leveraging this functionality, developers can gain insights into user behavior and improve the application experience based on user segments.
