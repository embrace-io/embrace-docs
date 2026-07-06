---
title: Migration Guide
description: Upgrading from the iOS 6.x SDK to the iOS 7.x SDK
sidebar_position: 0
---

## Migration Guide: 6.x to 7.x

This guide helps you upgrade an existing integration from the Embrace iOS 6.x SDK to 7.x. 7.0 is a major version with a number of breaking changes. Most are mechanical renames, but two are conceptual and worth reading in full: the [single entry point](#single-entry-point-embraceio) and the [redefined session model](#redefined-session-model).

### Key Changes Summary

- **Single entry point.** `EmbraceIO` is now the only public client. The lower-level `Embrace` client and `Embrace.Options` are no longer public.
- **One-step startup.** `Embrace.setup(options:).start()` / `EmbraceIO.setup(options:)` + `start()` are replaced by a single `try EmbraceIO.start(options:)`.
- **OpenTelemetry configuration changed.** Custom exporters move from `Options.export` to `Options.otel` (`EmbraceIO.OTelOptions`).
- **Embrace-owned public types.** Spans, logs, and related types are now Embrace types (`EmbraceSpan`, `EmbraceType`, etc.) instead of raw OpenTelemetry types. You no longer need to `import OpenTelemetryApi` in most cases.
- **Redefined sessions.** A "session" is now a **user session** made of one or more **session parts**.
- **Non-throwing APIs.** Most instrumentation calls (`log`, `setProperty`, personas, spans) no longer `throw`.
- **Removed options and APIs**, including `appGroupId`, `startNewSession()`/`endCurrentSession()`, `userName`/`userEmail`, and the `EmbraceOTelInternal` module.

### Single Entry Point: EmbraceIO

In 6.x there were two ways to use the SDK: the `EmbraceIO` convenience layer and the lower-level `Embrace` client (`Embrace.client?...`). In 7.x, `EmbraceIO` is the single public interface, and it configures and starts the SDK in one call. `Embrace.Options` is no longer public.

```swift
// 6.x
try Embrace
    .setup(options: Embrace.Options(appId: "YOUR_APP_ID"))
    .start()
// ...or via the convenience layer:
try EmbraceIO.setup(options: EmbraceIO.Options.withAppId("YOUR_APP_ID"))
try EmbraceIO.shared.start()

// 7.x
try EmbraceIO.start(
    options: EmbraceIO.Options.withAppId("YOUR_APP_ID")
)
```

Everywhere your code used `Embrace.client?.someMethod(...)`, use `EmbraceIO.shared.someMethod(...)` instead. Metadata methods that used to live under `Embrace.client?.metadata` are now directly on `EmbraceIO.shared`.

### Options Changes

`EmbraceIO.Options` is created through factory methods (`withAppId`, `withLocalConfiguration`) rather than a public initializer.

| 6.x                                    | 7.x                                                        |
| -------------------------------------- | ---------------------------------------------------------- |
| `appGroupId:`                          | **Removed**                                                |
| `crashReporter: EmbraceCrashReporter()`| `crashReporter: .embrace` (enum `.embrace`/`.crashlytics`/`.none`) |
| `endpoints: Embrace.Endpoints(...)`    | `endpoints: EmbraceEndpoints(...)`                         |
| `platform:` (`Platform`)               | `platform:` (`EmbracePlatform`)                            |
| `export: OpenTelemetryExport(...)`     | `otel: EmbraceIO.OTelOptions(...)`                         |
| `processors: [...]`                    | `otel: EmbraceIO.OTelOptions(spanProcessors:/logProcessors:)` |
| `runtimeConfiguration:`                | Use the `EmbraceIO.Options.withLocalConfiguration(...)` factory |

### OpenTelemetry Export

Custom exporters are the biggest structural change to `Options`. In 6.x they were passed via `export`; in 7.x they go through the `otel` option, which accepts **arrays** of exporters and processors:

```swift
// 6.x
Embrace.Options(
    appId: "YOUR_APP_ID",
    export: OpenTelemetryExport(
        spanExporter: myCustomSpanExporter,
        logExporter: myCustomLogRecordExporter
    )
)

// 7.x
EmbraceIO.Options.withAppId(
    "YOUR_APP_ID",
    otel: EmbraceIO.OTelOptions(
        spanExporters: [myCustomSpanExporter],
        logExporters: [myCustomLogRecordExporter]
    )
)
```

Your `SpanExporter` / `LogRecordExporter` implementations themselves do not change — they still come from `OpenTelemetrySdk`. Only the way you register them changes. See [OpenTelemetry Export](/ios/7x/advanced-features/opentelemetry-export.md).

For an integration with no Embrace App ID (export only), use `withLocalConfiguration`, where `otel` is required:

```swift
EmbraceIO.Options.withLocalConfiguration(
    otel: EmbraceIO.OTelOptions(
        spanExporters: [OtlpHttpTraceExporter(/* ... */)]
    )
)
```

### Embrace-Owned Types

7.x no longer exposes raw OpenTelemetry types in its public API. Where you previously imported and used OpenTelemetry types, use the Embrace equivalents (all re-exported by `EmbraceIO`):

| 6.x (OpenTelemetry)      | 7.x (Embrace)          |
| ------------------------ | ---------------------- |
| `Span` / `SpanBuilder`   | `EmbraceSpan`          |
| `SpanType`               | `EmbraceType`          |
| `SpanEvent`              | `EmbraceSpanEvent`     |
| `SpanStatus`             | `EmbraceSpanStatus`    |
| `SpanErrorCode`          | `EmbraceSpanErrorCode` |
| `LogSeverity`            | `EmbraceLogSeverity`   |
| `[String: String]` attrs | `EmbraceAttributes`    |

A practical consequence: to hold a span in a property you no longer need `import OpenTelemetryApi`.

```swift
// 6.x
import OpenTelemetryApi
var activitySpan: Span?

// 7.x
var activitySpan: EmbraceSpan?
```

### Traces and Spans

The span builder (`buildSpan(...).startSpan()`) is replaced by a single `createSpan(...)` call that returns an `EmbraceSpan?`.

```swift
// 6.x
let span = EmbraceIO.shared.buildSpan(name: "add-cart-item", type: .performance)
    .startSpan()
let child = EmbraceIO.shared.buildSpan(name: "ui-update")
    .setParent(span)
    .startSpan()
span?.addEvent(name: "quantity-changed")
span?.end(errorCode: .failure)

// 7.x
let span = EmbraceIO.shared.createSpan(name: "add-cart-item", type: .performance)
let child = EmbraceIO.shared.createSpan(name: "ui-update", parentSpan: span)
span?.addEvent(name: "quantity-changed", attributes: [:])
span?.end(errorCode: .failure)
```

Notes:

- `setParent(_:)` becomes the `parentSpan:` argument of `createSpan`.
- `EmbraceType` values are unchanged in spelling: `.performance`, `.ux`, `.system` (and semantic types like `.networkRequest`, `.view`).
- `span.end(errorCode:)` still works. The error code enum was renamed `SpanErrorCode` → `EmbraceSpanErrorCode` (the cases `.failure`, `.userAbandon`, `.unknown` are unchanged). You can also pass `autoTerminationCode:` to `createSpan` to have a span automatically end with an error code when the session ends.
- The `Embrace.recordSpan(name:) { ... }` closure helper is removed; create the span and end it yourself.
- `addEvent(name:attributes:)` requires the `attributes` argument (pass `[:]` if none).

### Logs

`log(...)` no longer throws, and its severity/attribute types changed.

```swift
// 6.x
try? EmbraceIO.shared.log("message", severity: .warning, attributes: ["k": "v"])

// 7.x
EmbraceIO.shared.log("message", severity: .warn, attributes: ["k": "v"])
```

- The severity type is `EmbraceLogSeverity`. Note the spelling `.warn` (not `.warning`). `.critical` is also available.
- Attributes are `EmbraceAttributes` (`[String: EmbraceAttributeValue]`), which now accepts `String`, `Int`, `Double`, and `Bool` values — not only strings.

### Breadcrumbs and Session Events

```swift
// 6.x
EmbraceIO.shared.add(event: .breadcrumb("checkout started"))
EmbraceIO.shared.add(event: SpanEvent(name: "milestone", attributes: [...]))

// 7.x
EmbraceIO.shared.addBreadcrumb("checkout started")
EmbraceIO.shared.addSessionEvent(name: "milestone", attributes: [...])
```

### Metadata and Personas

Metadata methods now live directly on `EmbraceIO.shared`, no longer throw, and personas are plain `String` values instead of `PersonaTag`.

```swift
// 6.x
try? Embrace.client?.metadata.add(persona: PersonaTag("authenticated"), lifespan: .session)
try? EmbraceIO.shared.setProperty(key: "tier", value: "gold", lifespan: .session)

// 7.x
EmbraceIO.shared.addPersona("authenticated", lifespan: .session)
EmbraceIO.shared.setProperty(key: "tier", value: "gold", lifespan: .session)
```

- `userName` and `userEmail` are removed. Only `userIdentifier` remains for user metadata (`EmbraceIO.shared.userIdentifier = "id"`; set to `nil` to clear).
- `clearUserProperties()` is removed. Clear state with `userIdentifier = nil`, `removeAllProperties(lifespans:)`, and/or `removeAllPersonas(lifespans:)`.
- `MetadataLifespan` (`.session` / `.process` / `.permanent`) is unchanged.

### Redefined Session Model

This is the most important conceptual change. In 6.x each foreground or background interval was a separate "session". In 7.x those intervals are **session parts**, and one or more parts are grouped into a **user session** bounded by a configurable maximum duration (default 12 hours) and inactivity timeout (default 30 minutes). See [Sessions](/ios/7x/core-concepts/sessions.md) for the full model.

API impact:

| 6.x                                       | 7.x                                     |
| ----------------------------------------- | --------------------------------------- |
| `currentSessionId` / `currentSessionId()` | `currentUserSessionId` (property)       |
| `startNewSession()`                       | **Removed**                             |
| `endCurrentSession()`                     | **Removed**                             |
| `endCurrentSession()` + `startNewSession()` | `endUserSession()`                    |

```swift
// 6.x
Embrace.client?.endCurrentSession()
Embrace.client?.startNewSession()

// 7.x
EmbraceIO.shared.endUserSession()
```

`endUserSession()` ends the current user session and immediately starts a new one (with the same foreground/background state). It is rate-limited to once every 5 seconds.

New attribute keys are emitted on session part spans and logs, including `emb.user_session_id`, `emb.session_part_id`, and `session.id`. The 6.x `emb.session_number` is superseded by `emb.user_session_part_number`.

### Crash Reporting

Crash reporting is now built into `EmbraceIO` and selected through the `crashReporter` enum.

```swift
// 6.x
EmbraceIO.Options.withAppId("YOUR_APP_ID", crashReporter: EmbraceCrashReporter())
// ...and, for Crashlytics, adding the EmbraceCrashlyticsSupport product plus:
// crashReporter: CrashlyticsReporter()

// 7.x
EmbraceIO.Options.withAppId("YOUR_APP_ID", crashReporter: .embrace)
// For Crashlytics (no extra product needed — it's bundled):
EmbraceIO.Options.withAppId("YOUR_APP_ID", crashReporter: .crashlytics)
// To install no crash reporter:
EmbraceIO.Options.withAppId("YOUR_APP_ID", crashReporter: .none)
```

Custom crash info is added with the non-throwing `EmbraceIO.shared.appendCrashInfo(key:value:)`.

### Capture Services

The capture-services builder was renamed and its registration methods changed.

```swift
// 6.x
let services = CaptureServiceBuilder()
    .add(.urlSession(options: URLSessionCaptureService.Options()))
    .addDefaults()
    .build()

// 7.x
let services = CaptureServicesOptionsBuilder()
    .addDefaults()
    .addUrlSessionCaptureService(withOptions: URLSessionCaptureService.Options())
    .build()

let options = EmbraceIO.Options.withAppId("YOUR_APP_ID", captureServices: services)
```

Per-service registration now uses dedicated methods: `addUrlSessionCaptureService(withOptions:)`, `addViewCaptureService(withOptions:)`, `addTapCaptureService(withOptions:)`, `addWebViewCaptureService(withOptions:)`, `addPushNotificationCaptureService(withOptions:)`, `addLowMemoryWarningCaptureService()`, `addLowPowerModeCaptureService()`, and `addHangCaptureService()`. See [Capture Services](/ios/7x/api-reference/capture-services.md).

### Modules and Installation

- Update your dependency to 7.x. For CocoaPods: `pod 'EmbraceIO', '~> 7.0.0'`.
- The `EmbraceOTelInternal` module is removed; the internal OTel bridge is now `EmbraceOTelBridge`. Users still just `import EmbraceIO`.
- There is no separate `EmbraceCrash` / `EmbraceCrashlyticsSupport` product to add — crash reporting (including Crashlytics support) is bundled and selected via the `crashReporter` option.
- Minimum requirements moved to **Swift 5.9 / Xcode 15+** (deployment targets are unchanged: iOS/iPadOS/tvOS 13+, macOS 13+, watchOS 6+). See [Requirements](/ios/7x/overview/requirements.md).

### Removed APIs Reference

| 6.x API                       | 7.x replacement                                   |
| ----------------------------- | ------------------------------------------------- |
| `Embrace.setup(...).start()`  | `EmbraceIO.start(options:)`                       |
| `EmbraceIO.setup(...)` + `start()` | `EmbraceIO.start(options:)`                  |
| `Embrace.client?.X`           | `EmbraceIO.shared.X`                              |
| `buildSpan(...).startSpan()`  | `createSpan(...)`                                 |
| `SpanErrorCode`               | `EmbraceSpanErrorCode` (`span.end(errorCode:)` unchanged) |
| `recordSpan(name:) { }`       | `createSpan(...)` + `span.end()`                  |
| `add(event:)`                 | `addBreadcrumb(_:)` / `addSessionEvent(...)`      |
| `OpenTelemetryExport`         | `EmbraceIO.OTelOptions`                           |
| `startNewSession()` / `endCurrentSession()` | `endUserSession()`                  |
| `currentSessionId`            | `currentUserSessionId`                            |
| `PersonaTag("x")`             | `"x"` (plain String)                              |
| `userName` / `userEmail`      | **Removed** (use `userIdentifier`)                |
| `clearUserProperties()`       | `removeAllProperties(lifespans:)` / `userIdentifier = nil` |
| `appGroupId`                  | **Removed**                                       |
| `resetUploadCache()`          | **Removed**                                       |
| `EmbraceOTelInternal`         | `EmbraceOTelBridge` (internal)                    |

### Next Steps

After migrating to 7.x, we recommend:

1. Review [Sessions](/ios/7x/core-concepts/sessions.md) to understand the new user-session/parts model
2. Confirm your custom exporters are registered through `EmbraceIO.OTelOptions`
3. Re-check any code that stored spans or referenced OpenTelemetry types directly

### Need Help?

If you encounter issues during migration, please reach out on the [community slack](https://community.embrace.io) or email [support@embrace.io](mailto:support@embrace.io).
