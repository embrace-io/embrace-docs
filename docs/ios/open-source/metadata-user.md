---
title: Adding User Metadata
sidebar_position: 9
---

# Adding User Metadata

This tutorial covers the `MetadataHandler` for managing user metadata in your application. The provides a simple yet powerful interface for setting and clearing user-specific properties such as name, email, and identifier. This guide will walk you through how to use these properties effectively in your projects.

## Diagnosing Issues with User Metadata

Utilizing `userName`, `userEmail`, and `userIdentifier` can significantly enhance the diagnostic process when issues arise. By associating errors, performance metrics, or user feedback with specific user metadata, developers can:

- **Identify Patterns:** Recognize if issues are isolated to specific users or user groups, facilitating targeted troubleshooting.
- **Improve User Support:** Quickly access the history and context of a user's experience when they reach out for support, leading to more personalized and efficient assistance.
- **Enhance User Experience:** Monitor and optimize the performance and stability of the application for individual users or user segments.

These values are prominently displayed in the Embrace dashboard, providing a straightforward way for developers to correlate issues with specific users. This visibility is crucial for prioritizing fixes, understanding the impact of issues, and delivering a more reliable user experience.

### Visibility in the Embrace Dashboard

When you set `userName`, `userEmail`, and `userIdentifier`, these pieces of metadata become immediately available in the Embrace dashboard. This integration allows for:

- **Quick Filtering:** Easily filter logs, issues, and metrics by user properties to find relevant data.
- **User-Centric Insights:** Gain insights into how individual users or user segments interact with your application, including encountering errors or performance bottlenecks.
- **Streamlined Debugging:** Access detailed user sessions, including the actions leading up to an issue, to streamline the debugging process.

By leveraging user metadata, you can create a more responsive and user-focused development cycle, enhancing both the product and the support you provide to your users.

## Overview

The `MetadataHandler` object allows you to set and retrieve user metadata with ease. It supports three main properties:

- `userName`: The name of the current user.
- `userEmail`: The email address of the current user.
- `userIdentifier`: A unique identifier for the current user.

Additionally, it provides a method to clear all user properties:

- `clearUserProperties()`: Clears all user properties set via the `userName`, `userEmail`, and `userIdentifier` properties.

## Setting User Properties

> **Important Note:** The values assigned to `userName`, `userEmail`, and `userIdentifier` are not validated by the Embrace SDK to follow a specific format. It's crucial to ensure that these values accurately represent the user without directly storing Personally Identifiable Information (PII). Consider using references, aliases, or hashed values for these properties to maintain user privacy and comply with data protection regulations.

### Setting the User Name

To set the user's name, you can directly assign a `String` value to the `userName` property. This value is stored permanently until explicitly cleared.

```swift
Embrace.client?.metadata.userName = "John Doe"
```

### Setting the User Email

Similarly, to set the user's email, assign a `String` value to the `userEmail` property. Ensure the email address is valid and can be mapped to a user record in your system.

```swift
Embrace.client?.metadata.userEmail = "john.doe@example.com"
```

### Setting the User Identifier

To set a unique identifier for the user, assign a `String` value to the `userIdentifier` property. This identifier should be unique and can be used to track the user across sessions.

```swift
Embrace.client?.metadata.userIdentifier = "user-12345"
```

## Retrieving User Properties

You can retrieve the set properties using the same properties you use to set them. For example, to get the current user's name:

```swift
let userName = Embrace.client?.metadata.userName
```

## Clearing User Properties

To clear all user properties, call the `clearUserProperties()` method. This will remove all metadata associated with the user.

```swift
Embrace.client?.metadata.clearUserProperties()
```

## Conclusion

The `Embrace.client?.metadata` object a straightforward way to manage user metadata in your application. By following the practices outlined in this guide, you can effectively use this interface to set and clear user-specific properties, enhancing the user experience and personalization in your app.
