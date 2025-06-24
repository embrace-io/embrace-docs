---
title: SwiftUI View Tracking
description: Monitor SwiftUI View lifecycle and performance in your iOS app
sidebar_position: 3
---

# SwiftUI View Tracking

The Embrace SDK provides tools to instrument SwiftUI view lifecycles and performance metrics, giving you insight into rendering behavior, visibility durations, and interactive readiness in SwiftUI apps.

## How View Tracking Works

The SwiftUI view tracking system automatically generates OpenTelemetry spans based on critical lifecycle events:

- **Render loop performance** - How efficiently your views update
- **View visibility** - When views appear and disappear (`onAppear` / `onDisappear`)
- **Time to first render** - How quickly users see your content
- **Time to content completion** - When async content finishes loading (optional)
- **`View.body` execution time** - Performance of your view building logic

These traces help you understand how your SwiftUI views behave in the system's rendering pipeline and measure how long users wait to see or interact with your content.

## SwiftUI Rendering Lifecycle

SwiftUI rendering is governed by a system-managed render loop that typically runs at 60 Hz (every ~16ms). When a frame deadline is missed—for example, if your `body` takes too long to compute—the result is a **hitch**: a visual stutter that users notice.

Embrace captures the following key phases of the SwiftUI render lifecycle:

### Render Loop Spans

Each update to a SwiftUI view creates a render loop trace with this structure:

- **`emb-swiftui.view.<name>.render-loop`**  
  *Root span* - Measures duration from view evaluation to the next run loop tick

  - **`emb-swiftui.view.<name>.body`**  
    *Child span* - Duration of SwiftUI body evaluation (building the view hierarchy)

  - **`emb-swiftui.view.<name>.appear`**  
    *Child span* - Time spent inside the `.onAppear` view modifier

  - **`emb-swiftui.view.<name>.disappear`**  
    *Child span* - Time spent inside the `.onDisappear` view modifier

### Time to First Render

- **`emb-swiftui.view.<name>.time-to-first-render`**  
  Measures how long it takes from when the system first initializes the view until it appears onscreen

### Time to First Content Complete (Optional)

- **`emb-swiftui.view.<name>.time-to-first-content-complete`**  
  Tracks duration from view creation until a flag (typically a Boolean or other `Equatable` value) indicates the view has finished rendering meaningful content

  > 📝 **Note:** Not available when using the macro-based API

## Configuration Options

You can add view instrumentation using any of these three approaches:

### 1. Macro (`@EmbraceTrace`) - Simplest

The easiest way to add view instrumentation—just annotate your struct with no additional configuration needed:

```swift
import EmbraceMacros

@EmbraceTrace
struct MyView: View {
    var body: some View {
        Text("Hello World")
    }
}
```

:::note
**Macro Limitations:** The macro cannot currently accept parameters like `name`, `attributes`, or `contentComplete`. Use the modifier or wrapper for customization.

**Setup Required:** Ensure you have added the `EmbraceMacros` module to your application.
:::

:::warning
The macro is only available through Swift Package Manager.
:::

### 2. View Modifier (`.embraceTrace`) - Most Flexible

Apply view tracing by adding a modifier to any view:

```swift
struct MyView: View {
    @State var loaded = false

    var body: some View {
        VStack {
            Text("Hello")
            Button("Finish Load") {
                loaded = true
            }
        }
        .embraceTrace(
            "MyView",                           // Custom name
            attributes: ["user_role": "admin"], // Optional metadata
            contentComplete: loaded             // Optional completion flag
        )
    }
}
```

### 3. View Wrapper (`EmbraceTraceView`) - Alternative Syntax

Apply view tracing by wrapping your view:

```swift
struct MyView: View {
    @State var loaded = false

    var body: some View {
        EmbraceTraceView(
            "MyView",                           // Custom name
            attributes: ["user_role": "admin"], // Optional metadata
            contentComplete: loaded             // Optional completion flag
        ) {
            VStack {
                Text("Hello")
                Button("Finish Load") {
                    loaded = true
                }
            }
        }
    }
}
```

:::warning
**Dashboard Setup:** If you're using the Embrace Dashboard, contact Embrace support to enable this feature through remote configuration.

**Custom Configuration:** If you're not using the Embrace Dashboard, enable this by passing a custom `EmbraceConfigurable` with `isSwiftUiViewInstrumentationEnabled` set to `true` when initializing the SDK.
:::

## Best Practices

- **Start simple:** Use the macro (`@EmbraceTrace`) for basic tracking, then upgrade to the modifier when you need custom names or attributes
- **Track meaningful completion:** Use the `contentComplete` parameter for views that load data asynchronously to measure when users can actually interact with your content
- **Avoid over-instrumentation:** Don't nest multiple instrumented views unnecessarily—each generates its own trace tree and can impact performance

## Common Use Cases

- **Find layout bottlenecks** - Identify slow `body` render spans that cause UI hitches
- **Measure screen load times** - Track how long users wait to see your SwiftUI screens
- **Reduce user abandonment** - Understand when users leave before content finishes loading
- **Compare view performance** - Benchmark different view hierarchies and implementation approaches