---
title: Traces
description: Track the duration and performance of custom operations in your web app
sidebar_position: 1
---

# Traces

Custom traces allow you to measure the duration of specific operations in your app, providing insights into performance
and behavior of code paths that matter to your business. See our
[Core Concepts section on Traces & Spans](/web/core-concepts/traces-spans.md) for a more detailed overview.

## Creating Spans

Each span:
- Has a name
- Tracks when the operation started and ended
- Can include attributes (key-value pairs) that provide context
- Can record that an error occurred during the operation
- Can have parent-child relationships with other spans
- **Must be ended** to properly capture the operation's duration and avoid memory leaks

### Basic Span Creation

The simplest way to create a span is with the `startSpan` method:

```typescript
import { trace } from '@embrace-io/web-sdk';

const span = trace.startSpan("span-name");

someAsyncOperation()
  .then(() => span.end())
  .catch(() => span.fail());
```

## Span Attributes

Add context to your spans with attributes:

```typescript
import { trace } from '@embrace-io/web-sdk';

// Adding attributes on start is recommended if they are known at that point
const span = trace.startSpan("span-name", {
  attributes: {
    "my-attr-on-create": "hello",
  },
});

// But they can also be added later on if needed as long as the span hasn't been ended
span.setAttribute("my-other-attr", "bye");
```

:::info
Embrace span attribute values must be strings even though the OTel interface allows for a wider range of types
:::

## Span Hierarchy

Create parent-child relationships between spans to represent nested operations:

```typescript
import { trace } from '@embrace-io/web-sdk';

const parentSpan = tracer.startSpan("the-parent");
const childSpan = tracer.startSpan("the-child", { parentSpan });

await someNestedOperation();
childSpan.end();

await finalStep();
parentSpan.end();
```

This creates a hierarchy that helps visualize the relationship between operations.

## Add an Event to a Span

If you just want to record that something interesting happened at a certain point in the span's lifetime rather than
a full child span you can instead add an event to the span:

```typescript
import { trace } from '@embrace-io/web-sdk';

const span = trace.startSpan("span-name");

span.addEvent("something-happened", {
  "some-event-attr": "event-attr-value",
});
```

### Recording a Completed Span

Sometimes you need to create a span for an operation that has already completed:

```typescript
import { trace } from '@embrace-io/web-sdk';

trace.startSpan("span-name", {
  startTime: previouslyStartedTime,
}).end(previouslyEndedTime);
```

## Best Practices

### Naming Conventions

Use clear, descriptive names for your spans. Consider a naming convention such as:
- Using consistent casing for span names and attributes
- Including the general category followed by the specific operation
- Being consistent across your codebase

### Granularity

Choose an appropriate level of granularity for your spans:
- Too coarse: `app-startup` (better to break into component parts)
- Too fine-grained: `increment-counter` (likely too small to be useful)
- Just right: `user-authentication`

### Capturing Meaningful Data

Add attributes that would be useful for troubleshooting:

```typescript
trace.startSpan("span-name", {
  attributes: {
    "user-tier": "premium",
    "data-size": dataSize.description,
    "retry-count": retryCount.description
  }
});
```
