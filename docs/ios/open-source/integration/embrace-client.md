---
title: The Embrace Client
sidebar_position: 2
---

# The Embrace Client

Unlike the previous version, Embrace's 6.x SDK does not use a `.plist` file to configure your application. Instead, the SDK is centered around and configured through the [`Embrace`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Embrace.swift) class.

The `Embrace` class is the main interface for the Embrace SDK. It provides methods to configure, start, and interact with the SDK. The SDK is configured using an [`Embrace.Options`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Options/Embrace%2BOptions.swift) instance passed in the setup static method. Once the SDK is set up, it can be started by calling the start instance method. Please note that an Embrace session will not begin until `.start` is called, meaning data may not be correctly attached.

## Initializing the Embrace Client

Embrace should be configured and started as close to the launch of the application as you are able to. Below is an example launch for a straightforward SwiftUI application.

First, import `EmbraceIO` to add our capabilities. 

When deciding where to initialize Embrace, we chose to override the App's `init` method. 

The call to configure the Embrace SDK is `Embrace.setup`, which takes an `Embrace.Options` object and returns an `Embrace` object. The configuration options in the `Embrace.Options` object are explained in the next article. That `Embrace` object must then be started using the `Embrace.start` call below.

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
        do {
            try Embrace
                .setup(
                    options: Embrace.Options(
                        appId: //Your App ID from Embrace Dash
                        // Other configuration options
                    )
                )
                .start()
        } catch let e {
            print("Error starting Embrace \(e.localizedDescription)")
        }
    }
}
```

## Using the Embrace Client

The `setup` and `start` methods both return a non-optional instance of the `Embrace` class.
Feel free to store a reference to this object:

```swift
let embrace = try Embrace
                .setup(options: embraceOptions)
                .start()

// later on
embrace.buildSpan(name: "my-operation")
  .startSpan()
```

Once `setup` has succeeded, you can access this same instance via the static `Embrace.client` property.

```swift
try Embrace
    .setup(options: embraceOptions)
    .start()

// later on. Same functionality as above
Embrace.client?.buildSpan(name: "my-operation")
  .startSpan()
```

## Do you have to `try?`

Both the `.setup` and the `.start` methods for the Embrace client are throwing functions, so depending on your app's startup process, you may wish to handle these in some manner. These functions throw because while it is unlikely that the SDK fails during startup, it is possible. The most notable reasons are storage-related: in the edge cases where no disk space is available for Embrace's data stores, or if the data stores have been corrupted, the client will throw an error and `.setup` will fail.

Above we used a `do-try-catch` statement to initialize the Embrace client, which requires direct handling of the error during `.setup`. It is also possible for `.setup` to fail quietly using Swift's [Optional try](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling/#Converting-Errors-to-Optional-Values). 

```swift
import EmbraceIO
import SwiftUI

struct NewEmbraceApp: App {
    init() {
            try? Embrace
                    .setup(options: yourEmbraceOptions)
                    .start()
    }
}
```

Since the `Embrace.client` instance is optional, it will return nil if `.setup` has never been called or if `.setup` throws an error. Using the instance later in your code will simply not do anything.

```swift
// If setup fails...
    try? Embrace
        .setup(options: .init(appId: "myApp"))
        .start()

// ...you can leverage optional behavior later- this does not create a span
    let span = Embrace.client?.buildSpan("app-did-finish-launching", type: .performance)
    // ...
    span?.end()

    return true
}
```

## Stopping Embrace

If you want to prevent the Embrace SDK from capturing data after it was initialized and started, simply call the `stop()` method:

```swift
// Stopping Embrace
try? Embrace.client.stop()
```

:::info
If the `start()` method is called when the SDK is already started, nothing will happen.
If the `stop()` method is called when the SDK is already stopped, nothing will happen.
:::

:::warning
Both the `start()` and `stop()` methods need to be called from the main thread.
If they are called fron any other thread, they will throw the `EmbraceSetupError.invalidThread` error.
:::

## See SDK status

If you specifically need to know whether the SDK has started or not, you can access the [`Embrace.client?.started`](https://github.com/embrace-io/embrace-apple-sdk/blob/main/Sources/EmbraceCore/Embrace.swift#L43) Bool value.