---
title: Logging
description: Capture log messages with different severity levels in your web app
sidebar_position: 2
---

# Logging

Embrace's logging capabilities allow you to capture log messages with different severity levels, providing valuable
context for troubleshooting and debugging issues in your app. See our
[Core Concepts section on Logs](/docs/web/core-concepts/logs.md) for a more detailed overview.

## Basic Logging

You can log a message through the `message` method:

```typescript
import { log } from '@embrace-io/web-sdk';

log.message('Loading not finished in time', 'error');
```

Embrace supports multiple log severity levels:

- **Info**: General information about app operation
- **Warning**: Potential issues that didn't prevent functionality
- **Error**: Issues that affected functionality but didn't cause an exception to be thrown. See
[Logging Handled Exceptions](#logging-handled-exceptions) below for dealing with actual Error 
objects

:::info
Stack traces are automatically captured for warning and error level logs. This can be overridden using the
`includeStacktrace` property on the method's optional third argument.
:::

## Adding Attributes to Logs

```typescript
import { log } from '@embrace-io/web-sdk';

log.message('Purchase attempt failed', {
  attributes: {
    productID,
    price,
    paymentMethod: "card",
  }
});
```

Properties help you filter and search logs more effectively.

## Logging Handled Exceptions

The SDK automatically captures unhandled exceptions. For exceptions that are caught and handled by your code you can
log these manually using the `logException` method:

```typescript
import { log } from '@embrace-io/web-sdk';

try {
  // some operation...
} catch (e) {
  log.logException(e as Error, {
    attributes: {
      errorCode: '301',
    }
  });
}
```

## Best Practices for Logging

### Contextual Information

Include relevant context in logs:
- User actions that preceded the log
- Relevant IDs (user ID, session ID, request ID)
- State information that helps understand the context
- Error codes and descriptions

### Performance Considerations

Embrace will batch emitted logs together however unlike Spans they can trigger additional network requests within a
session so be mindful of excessive logging in performance-critical paths as it can impact app performance and increase
data transmission.

If you simply want to note that an event occurred within a user's session and don't require the full grouping and
querying capabilities provided by logs then [Breadcrumbs](/docs/web/manual-instrumentation/breadcrumbs.md) may be a
better lightweight option.

### Sensitive Information

Never log sensitive data:
- Authentication credentials
- Personal identifiable information (PII)
- Payment information
- Access tokens

### Structured Logging

Use a consistent structure for log messages:
- Start with the event or action being logged
- Use properties for structured data rather than concatenating into the message
- Group related logs using consistent naming
