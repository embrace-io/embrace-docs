---
title: Breadcrumbs
description: Add lightweight logging context to your web app sessions with breadcrumbs
sidebar_position: 3
---

# Breadcrumbs

Breadcrumbs are a lightweight way to add context to user activity in a session.

## Basic Breadcrumb Usage

Here's how you add a breadcrumb to the session:

```typescript
import { session } from '@embrace-io/web-sdk';

session.addBreadcrumb("something happened");
```

:::info Character Limit
Breadcrumb messages must be 256 characters or less.
:::

### OpenTelemetry Foundation

Note that the `addBreacrumb` method adds an OpenTelemetry SpanEvent to the session Span. In the Embrace Dashboard these
are surfaced in-context in the User Timeline.

## Best Practices

### What to Log as Breadcrumbs

**Good candidates for breadcrumbs:**

- User interactions
- Important application state changes
- Business logic milestones

**Avoid logging as breadcrumbs:**

- Sensitive user data (passwords, personal information)
- High-frequency events (scroll events, timer ticks)
- Large data payloads

### Breadcrumb Naming Conventions

Use clear, consistent naming for your breadcrumbs:

```typescript
import { session } from '@embrace-io/web-sdk';

// Good: Clear and descriptive
session.addBreadcrumb("User started checkout process");
session.addBreadcrumb("Payment validation failed");
session.addBreadcrumb("Order confirmation displayed");

// Avoid: Vague or inconsistent
session.addBreadcrumb("Something happened");
session.addBreadcrumb("Error");
```

### Performance Considerations

Breadcrumbs are designed to be lightweight, but consider:

- **Frequency**: Don't add breadcrumbs in tight loops or high-frequency callbacks
- **Content**: Keep messages concise and properties minimal
- **Timing**: Add breadcrumbs at meaningful moments, not every minor state change

## Next Steps

- Learn about [Custom Logging](/web/manual-instrumentation/custom-logging.md) for more detailed logging
- Explore [Custom Traces](/web/manual-instrumentation/custom-traces.md) for performance monitoring
