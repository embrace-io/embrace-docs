---
title: Technical Details
sidebar_position: 1
---

## Technical Details for Performance Tracing

### Definitions

**Trace**: Describes the end-to-end journey of one or more connected spans.

**Span**: Describes an operation or "work" taking place on a service. Spans can describe broad operations - for example, the operation of an app fetching and rendering an image in the UI - or as granular as a single invocation of a function.

**Root Span**: A span that doesn't have a parent that represents the entire workflow at a high level.

**Span Instance**: A specific occurrence of a workflow, representing an individual run of it, identified by a unique Span ID.

**Child Spans**: Spans that list a given span as their parent. When filtering, a matching child span includes its parent.

<img src={require('@site/static/images/span-relationships.png').default} alt="Spans: Parent-Child Relationship"/>


### Span Outcomes

- **Successful** (definition and if it’s auto or manual set)
- **Error** (definition and if it’s auto or manual set)
- **User Abandon** (definition and if it’s auto or manual set)
- **Unknown** (definition and if it’s auto or manual set)

### Span Filters

- **All Spans**: Shows all Spans
- **Slowest Spans**: Spans completed successfully with duration > p95.
- **Fastest Spans**: Spans completed successfully and not slow (with duration < p95).

### Types of Unsuccessful Spans:

- **Error**: Spans encountered an error.
- **Unknown**: Insufficient data to determine outcome.
- **User Abandon**: User navigated away before completion.