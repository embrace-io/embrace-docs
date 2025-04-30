---
title: Monitoring GraphQL Requests
description: Best practices for monitoring GraphQL network requests with the Embrace SDK
sidebar_position: 10
---

# Monitoring GraphQL Requests

Generally, network requests made to a REST API each hit its own unique endpoint.
From a monitoring perspective, this is helpful because developers can clearly
see rolled up network metrics by path.

GraphQL is a bit different in that each request hits the same `/graphql` endpoint.
Thus, it can be difficult to monitor requests that may perform different
actions.

Here we will show you how to configure your integration so you see different
GraphQL requests broken out by "path" in the Dashboard.

## Override Paths of Requests

It's possible to override the path of a network request that the Embrace SDK. iOS 5.X and Android
allows this override by setting the `x-emb-path` header on the request. For example, if your network request is made
to `https://example.com/graphql`, and you set the `x-emb-path` header to `/graphql/friends_list`, the request will
be reported as `https://example.com/graphql/friends_list`.

In iOS 6.X, you can hook into a callback that lets you modify the captured request directly.

:::warning Important
**The x-emb-path value must meet the following requirements or it will be ignored.**

* Must be a string with a length in the range from 1 to 1024 characters
* Must start with a /
* Must only contain ASCII characters
:::

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<Tabs groupId="ios-language" queryString="ios-language">

<TabItem value="swift-ios-6" label="Swift (6.X)">
```swift
import EmbraceIO

/* Create class to handle modifying captured requests */
class ApolloDataSource: NSObject, URLSessionRequestsDataSource {
    func modifiedRequest(for request: URLRequest) -> URLRequest {

        if let header = request.value(forHTTPHeaderField: "X-APOLLO-OPERATION-NAME") {
            var modified = request
            modified.url = request.url?.appendingPathComponent(header)  // modify the URL that is recorded
            return modified
        }

        return request
    }
}

/* When initializing Embrace, pass this object to the URLSessionCaptureServce */
let options = Embrace.Options(
                // ...
                captureServices:
                    CaptureServiceBuilder()
                        .addDefaults()
                        .add( .urlSession(options: .init(requestsDataSource: ApolloDataSource())) )
                        .build()
                ,
                // ...
              )
```
</TabItem>

<TabItem value="swift" label="Swift (5.X)">
```swift
import Foundation
import Apollo

// MARK: - Singleton Wrapper

class Network {
  static let shared = Network()

  // Configure the network transport to use the singleton as the delegate.
  private lazy var networkTransport = HTTPNetworkTransport(
    url: URL(string: "http://localhost:8080/graphql")!,
    delegate: self
  )

  // Use the configured network transport in your Apollo client.
  private(set) lazy var apollo = ApolloClient(networkTransport: self.networkTransport)
}

// MARK: - Pre-flight delegate

extension Network: HTTPNetworkTransportPreflightDelegate {

  func networkTransport(_ networkTransport: HTTPNetworkTransport,
                        willSend request: inout URLRequest) {

    // Get the existing headers, or create new ones if they're nil
    var headers = request.allHTTPHeaderFields ?? [String: String]()
    let gqlQueryNameOpt = headers["X-APOLLO-OPERATION-NAME"]
    // Add any new headers you need
    if let gqlQueryName = gqlQueryNameOpt {
        headers["x-emb-path"] = "/graphql/" + gqlQueryName

        // Re-assign the updated headers to the request.
        request.allHTTPHeaderFields = headers
    }
}
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
httpClient.addInterceptor(chain -> {
    Request originalRequest = chain.request();
    Request.Builder newRequestBuilder = originalRequest.newBuilder();
    /*
     * If the request was made by the Apollo GraphQL library, they will take our query name
     * and apply it as one of their headers. We can pull that out, and pass that to
     * `x-emb-path` so that stats are broken out for each unique GraphQL query.
     */
    String combinedPath = ""
    String gqlQueryName = originalRequest.headers().get("X-APOLLO-OPERATION-NAME");
    if (gqlQueryName != null && !gqlQueryName.isEmpty()) {
        combinedPath = "/graphql/" + gqlQueryName;
        newRequestBuilder.header("x-emb-path", combinedPath);
    }
    Request newRequest = newRequestBuilder.build();
    try {
        return chain.proceed(newRequest);
    } catch (Exception e) {
        throw new EmbraceCustomPathException(combinedPath, e);
    }
});
```

</TabItem>
</Tabs>
