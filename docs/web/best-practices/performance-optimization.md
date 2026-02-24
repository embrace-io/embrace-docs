---
title: Performance Optimization
description: Tips for optimizing performance with the Embrace Web SDK
sidebar_position: 1
---

# Performance Optimization

The Embrace Web SDK is designed to have minimal impact on your application's performance. However, there are several
best practices you can follow to ensure the SDK operates efficiently.

## Limit Custom Attributes

Be mindful of the number and size of custom attributes you add to sessions, logs, or spans:

```typescript
// Good practice: use small, relevant attributes
session.addProperty("user-tier", "premium");

// Avoid: large string values or too many attributes
// This could impact memory usage
session.addProperty("user-full-details", largeJSONString);
```

## Avoid Excessive Logging

Use logs strategically and avoid excessive logging, particularly for high-frequency events:

```typescript
// Avoid logging high-frequency events like scrolling
onTableScroll(() => {
  // Don't do this:
  log.message('User scrolled table view', 'info');

  // Instead, maybe log only significant scroll events
  if (reachedBottom) {
    log.message('User reached end of content', 'info');
  }
});
```

## Batch Operations

For operations that may generate many spans, consider representing using a single parent span:

```typescript
const processItems = items => {
  // Start a parent span...
  const span = trace.startSpan("process-items-batch");

  // ...instead of starting/ending many small spans
  items.forEach(item => {
    processItem(item);
  });

  // End the parent span
  span.end()
};
```

## Use Trace Sampling

For very high-volume operations, consider implementing trace sampling to reduce the volume of data:

```typescript
// Only trace some percentage of a high-frequency operation
function highFrequencyOperation() {

  // Simple sampling approach
  const shouldTrace = Math.random() < 0.1; // 10% sample rate

  if (shouldTrace) {
    const span = trace.startSpan("high-frequency-operation");

    // Perform operation
    // ...

    span.end()
  } else {
    // Just perform operation without tracing
  }
}
```

## Summary

- Be selective with what you monitor and log
- Limit the size and frequency of custom attributes
- Use batching for high-frequency operations

By following these guidelines, you can ensure that the Embrace SDK provides valuable insights into your app's
performance without negatively impacting the user experience.
