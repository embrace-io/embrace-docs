---
title: Traces
description: Record spans to monitor the production performance and success rates of operations within your mobile app.
sidebar_position: 2
---

# Traces

## Overview

Embrace’s Traces gives you complete visibility into any customized operation you’d like to track, enabling you to identify, prioritize, and resolve any performance issue. With our tool, you can quickly spot any bottlenecks in your app’s architecture, pinpoint areas you need to troubleshoot with high precision, and ultimately deliver a truly optimized user

## Feature Support

The Embrace Traces API allows you to:

- Create real-time performance timers or record past operations.
  - For real-time tracing, we use a “Stopwatch” concept that enables you to start and stop the timing of a span manually
  - To record a past operation, you can pass in start and end times during span creation.
- Create child spans that can be attached to a parent.
- Add attributes and events to each span
  - Attributes have `String` keys and `String` values
  - Events also have a set of attributes that have `String` keys and values.

There is no limit on the duration of spans, but **if a crash occurs during a span that is in progress, that span will not be recorded.**

### Limits

| Type                               | Limit          |
| ---------------------------------- | -------------- |
| Max number of spans per session    | 100            |
| Max number of spans per Root Span  | 10             |
| Max number of attributes per span  | 50             |
| Max number of events per span      | 10             |
| Max number of attributes per event | 10             |
| Length of attribute keys           | 50 characters  |
| Length of attribute values         | 200 characters |
| Length of Span names               | 50 characters  |
| Length of Event names              | 100 characters |

:::warning Exceeding Limits
If you exceed the listed limits, the operation with the limit-exceeding call will fail and return a value indicating that there is a failure. See the API documentation for details.
:::

### Naming Conventions

- Span Names are **case-sensitive** and are a **max of 50 characters.**
- Key Names are **case-sensitive**, have a **max of 50 characters**, and are **alpha-numeric**

:::warning Internal Prefixes
The `emb-` and `emb.` prefixes are reserved for internal Embrace span names and attribute keys. You should never create a name with `emb-` and `emb.` prefixes
:::

## Integration Steps

To use this feature:

1. Instrument your app using the reference guide in this sections to start adding spans to your operations.
2. See the spans in the Traces section of the Embrace dashboard.

### Install the Tracer Provider package

npm:

```sh
npm install @embrace-io/react-native-tracer-provider
```

yarn:

```sh
yarn add @embrace-io/react-native-tracer-provider
```

For iOS you will also need to install or update pods for the application:

```sh
cd ios && pod install --repo-update
```

## API Usage Examples

### Getting a Tracer

Spans are created from a Tracer which you can get from the `useEmbraceNativeTracerProvider` hook:

```javascript
import { useEmbraceNativeTracerProvider } from '@embrace-io/react-native-tracer-provider';
import { Tracer } from '@opentelemetry/api';

const { isLoading, isError, error, tracerProvider } =
	useEmbraceNativeTracerProvider();

const tracer =
	(useMemo < Tracer) |
	(undefined >
		(() => {
			if (tracerProvider) {
				return tracerProvider.getTracer('span-test', '1.0');
			}
		},
		[tracerProvider]));
```

See the [package README](https://github.com/embrace-io/embrace-react-native-sdk/tree/main/packages/react-native-tracer-provider)
for more details.

### Create and end a Span

```javascript
const span = tracer.startSpan('span-name');

someAsyncOperation().then(() => span.end());
```

### Create a Span that started in the past

```javascript
const span = tracer.startSpan('span-name', {
	startTime: new Date().getTime()
});
```

### Add an Attribute to a Span

```javascript
// Add an attribute on create
const span = tracer.startSpan('span-name', {
	attributes: {
		'my-attr-on-create': 'hello'
	}
});

// Add an attribute later on
span.setAttribute('my-other-attr', 'bye');
```

### Add an Event to a Span

```javascript
const span = tracer.startSpan('span-name');

span.addEvent('my-event', {
	'some-event-attr': 'event-attr-value'
});
```

### Stop a Span for an operation that ended earlier

```javascript
span.end(new Date().getTime());
```

### Stop a Span for an operation that failed

```javascript
import { endAsFailed } from '@embrace-io/native-tracer-provider';

endAsFailed(span);
```

### Set a parent-child Span relationship

```javascript
import { asParent } from '@embrace-io/native-tracer-provider';

const parentSpan = tracer.startSpan('the-parent');
const childSpan = tracer.startSpan('the-child', {}, asParent(parentSpan));

childSpan.end();
parentSpan.end();
```

### Recording a completed Span

If an operation you wish to track has already completed you can use the `recordCompletedSpan` convenience function to
start and stop a span in a single call passing along all the relevant options for the span:

```javascript
import { recordCompletedSpan } from '@embrace-io/native-tracer-provider';

recordCompletedSpan(tracer, 'my-completed-span', {
	startTime: previouslyStartedTime,
	endTime: previouslyEndedTime,
	attributes: {
		'my-attr': 'foo'
	},
	events: [
		{
			name: 'completed-span-event',
			attributes: { 'event-attr': 'bar' },
			timeStamp: spanEventTime
		}
	],
	parent: someParentSpan
});
```

## Support

If you have any questions or if something is not working as intended, please get in touch with your Customer Success Manager.
