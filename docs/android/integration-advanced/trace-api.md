---
title: Recording Traces
sidebar_position: 3
description: Trigger alerts for your Android application using traces with the Embrace SDK
---

# Record traces

You can use Embrace's tracing API to measure the performance of an operation with a defined start and end (spans).
A simple example is shown below:

```kotlin
val span = Embrace.startSpan("load-activity") ?: return
span.addAttribute("image-name", image.name)

val image = fetchImage()

// record important event at point in time
span.addEvent("network-request-finished")

processImage(image)

// end the span
span.end()
```

In this example a trace measures how long it takes to fetch and process an image. The captured span will have attributes and events
added to it, along with the start/end time.

The tracing API is very powerful. For further examples and detail, please see the [feature reference docs](/android/features/traces/).
