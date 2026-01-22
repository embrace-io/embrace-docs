---
title: Capture network requests
description: Automatically capture network requests made by your application
sidebar_position: 3
---

# Network requests

If you use the [http package](https://pub.dev/packages/http) or the [Dio package](https://pub.dev/packages/dio) to perform network operations, Embrace can capture that information with minimal modification to your codebase. If you're using other solutions, you can manually log network requests through the Embrace SDK.

## Use the http package

If you use the [http package](https://pub.dev/packages/http), use an instance of `EmbraceHttpClient` to perform network operations:

```dart
void main() async {
    final client = EmbraceHttpClient();
    final response = client.get(Uri.parse('https://embrace.io'));
    print(response.body);
}
```

You can also use this with existing `Client`s to add Embrace's logging functionality:

```dart
void main() async {
    final baseClient = MyCustomClient();
    final client = EmbraceHttpClient(innerClient: baseClient);
    final response = client.get(Uri.parse('https://embrace.io'));
    print(response.body);
}
```

Close your client when it's no longer needed by calling `client.close()`.

## Use Dio

When using the [Dio package](https://pub.dev/packages/dio), you can add an Embrace interceptor to automatically capture requests:

```dart
import 'package:dio/dio.dart';
import 'package:embrace_dio/embrace_dio.dart';

var dio = Dio();
dio.interceptors.add(EmbraceInterceptor());
```

You need to add the `embrace_dio` package to your `pubspec.yaml` to use `EmbraceInterceptor`.

## Manually log network requests

You can also log any network request using this method from the Embrace SDK:

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
    String? w3cTraceParent,
});
```
