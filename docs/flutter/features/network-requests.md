---
title: Capturing network requests
description: Automatically capture network requests made by your application
sidebar_position: 3
---

# Network Requests

If you are using the [http package](https://pub.dev/packages/http) or the [Dio package](https://pub.dev/packages/dio) to perform your network operations, Embrace can capture that information with minimal modification to your codebase. Also, if you are using other method, network requests can be manually logged through the Embrace SDK.

## Using the http package

If you are using the [http package](https://pub.dev/packages/http), you should use an instance of `EmbraceHttpClient` to perform 
network operations, like this:

```dart
void main() async {
    final client = EmbraceHttpClient();
    final response = client.get(Uri.parse('https://embrace.io'));
    print(response.body);
}
```

This can also be used with existing `Client`s to add in Embrace's logging functionality. For example:

```dart
void main() async {
    final baseClient = MyCustomClient();
    final client = EmbraceHttpClient(innerClient: baseClient);
    final response = client.get(Uri.parse('https://embrace.io'));
    print(response.body);
}
```

Be sure to close your client when it's no longer needed by calling `client.close()`.

## Using Dio

When using the [Dio package](https://pub.dev/packages/dio), an Embrace interceptor can be added to allow for automatic capture of the requests:

```dart
import 'package:dio/dio.dart';
import 'package:embrace_dio/embrace_dio.dart';

var dio = Dio();
dio.interceptors.add(EmbraceInterceptor());
```

Keep in mind that you will need to add the `embrace_dio` package to your `pubspec.yaml` to be able to use `EmbraceInterceptor`.

## Manually logging network requests

Alternatively, you can log any network request using this method from the Embrace SDK:

```dart
/// Log a network request.
///
/// Use the [error] parameter to pass the reason phrase or exception message
/// for requests that are not successful.
///
/// [startTime] and [endTime] should be Unix timestamps, or the
/// number of milliseconds since 1970-01-01T00:00:00Z (UTC),
/// e.g. `DateTime.now.millisecondsSinceEpoch`.
void logNetworkRequest({
    required String url,
    required HttpMethod method,
    required int startTime,
    required int endTime,
    required int bytesSent,
    required int bytesReceived,
    required int statusCode,
    String? error,
    String? traceId,
});
```
