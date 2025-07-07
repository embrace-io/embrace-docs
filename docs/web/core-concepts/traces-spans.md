---
title: Traces & Spans
description: Understanding traces and spans in the Embrace Web SDK
sidebar_position: 2
---

# Traces & Spans

Traces are a powerful feature in the Embrace Web SDK that give you complete visibility into any operation you'd like to track in your application.

## What are Traces and Spans?

In the Embrace SDK (built on OpenTelemetry):

- A **trace** represents an entire operation or workflow in your application 
- A **span** represents a single unit of work within that trace
- Spans can be nested, forming parent-child relationships to create a trace

Traces help you identify, prioritize, and resolve performance issues by providing detailed information about operations in your app.

## Key Capabilities

With the Embrace Traces API, you can:

- Create real-time performance timers or record past operations
- Create child spans that can be attached to a parent
- Add attributes and events to each span for context
- Track success/failure states of operations

## Trace Limits

| Type                               | Limit           |
| ---------------------------------- |-----------------|
| Max number of spans per session    | 1,000           |
| Max number of attributes per span  | 50              |
| Max number of events per span      | 10              |
| Max number of attributes per event | 10              |
| Length of attribute keys           | 50 characters   |
| Length of attribute values         | 1024 characters |
| Length of Span names               | 50 characters   |
| Length of Event names              | 100 characters  |

## Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alpha-numeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span names and attribute keys.
You should never create a name with these prefixes.
:::

## Creating and Using Spans

See our [guide on instrumentating Traces](/docs/web/manual-instrumentation/custom-traces.md) for examples on
how to instrument your application.

## Best Practices

- Use meaningful names for spans that reflect the operation being performed
- Create parent-child relationships to represent operation hierarchies
- Add relevant attributes to provide context for operations
- Keep span names consistent across your application for better analytics
- Consider how spans relate to sessions in your application architecture
- End spans properly to ensure they're recorded correctly
