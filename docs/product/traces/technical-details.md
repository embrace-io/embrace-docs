---
title: Technical Details
sidebar_position: 1
---

# Technical Details

## Definitions

**Trace**: Describes the end-to-end journey of one or more connected spans.

**Span**: Describes an operation or "work" taking place on a service. Spans can describe broad operations - for example, the operation of an app fetching and rendering an image in the UI - or as granular as a single invocation of a function.

**Root Span**: A span that doesn't have a parent that represents the entire workflow at a high level.

**Span Instance**: A specific occurrence of a workflow, representing an individual run of it, identified by a unique Span ID.

**Child Spans**: Spans that list a given span as their parent. When filtering, a matching child span includes its parent.

<img src={require('@site/static/images/span-relationships.png').default} alt="Spans: Parent-Child Relationship"/>

## Span Outcomes

- **Successful** (definition and if it’s auto or manual set)
- **Error**: Spans encountered an error.
- **User Abandon**: User navigated away before completion.
- **Unknown**: Insufficient data to determine outcome.
