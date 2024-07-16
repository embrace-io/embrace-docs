# Migrating from Moments to Traces

## Moments have been replaced by Traces

[Moments](/docs/ios/5x/features/moments.md) have not been added to the Embrace Apple SDK, and will not be available when upgrading from version 5 to version 6. We made this decision as part of our migration to build on top of OpenTelemetry APIs and to standardize the telemetry coming from our SDKs.

Luckily, [Performance Traces](/docs/ios/open-source/tracing.md) serve the same purposes as Moments, with greatly enhanced capabilities. Built on [OTel Spans](https://opentelemetry.io/docs/concepts/signals/traces/), Performance Traces capture end-to-end journeys made of multiple spans. Traces can contain many spans as "children", as well as attributes and events that off flexibility on the client and numerous aggregation options on the backend. This allows you trace an entire process by breaking it down into smaller units of work.

A span is simply an operation occurring over a period of time. Using spans, you can track how long operations within the app take, and more. Note that, in building on existing OTel APIs, the Embrace Apple SDK does not have instrumentation for an object called a "trace". Instead, it is the root span for a given workflow.

## Sample usage

Here is an example of how spans and traces replace and enhance the existing Moment feature:

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">
<TabItem value="swift" label="Swift">

```swift
// Using Moments in Embrace iOS 5
Embrace.sharedInstance().startMoment(withName: "add-cart-item")
Embrace.sharedInstance().endMoment(withName: "add-cart-item")

// Using Traces in Embrace Apple 6
// First, unwrap the Embrace instance
guard let embraceInstance = Embrace.client else { return }
            

//Add a root span
let addCartParentSpan = embraceInstance
            .buildSpan(name: "add-to-cart")
            .markAsKeySpan() //makes the parent trace
            .startSpan()

// Add child spans
let addCartTapSpan = embraceInstance
            .buildSpan(name: "add-cart-tapped")
            .setParent(addCartParentSpan)
            .startSpan()

let addCartRequestSpan = embraceInstance
            .buildSpan(name: "add-cart-request")
            .setParent(addCartParentSpan)
            .startSpan()

let addCartUpdateUISpan = embraceInstance
            .buildSpan(name: "add-cart-update-ui")
            .setParent(addCartParentSpan)
            .startSpan()

//when tap event ends
addCartTapSpan.end()

//when network response is received
addCartRequestSpan.end()

//when the UI is updated and you've determined the add cart interaction is over
addCartUpdateUISpan.end()
addCartParentSpan.end()
```

</TabItem>
</Tabs>


Traces can be instrumented in the same places as your Moments, but provide much more.