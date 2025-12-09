---
title: Filters Definitions
description: Complete definitions of all available filters for querying your data
slug: /definitions/filters
sidebar_class_name: hidden-filter-reference
---

# Filter Definitions

Filters allow you to query and segment your data in the Embrace dashboard. Use filters to narrow down sessions, crashes, and other telemetry data based on specific criteria.

## How to Use Filters

Each filter supports different operations and data types. When building queries:

- **Equals** - Exact match
- **Not Equals** - Exclude matches
- **Greater Than** - Numeric comparison (value must be greater)
- **Less Than** - Numeric comparison (value must be less)
- **Contains** - Text contains the specified substring
- **In** - Value is in a list of options

## Understanding Filter Table Columns

Each filter table in this page uses the same columns:

- **Filter** - Human-readable name of the filter, with the key used in APIs or programmatic queries shown below it in monospace (for example, `app_version`).
- **Description** - Plain-language explanation of what the filter represents and how it is typically used.
- **Operations** - The comparison operations available for the filter. Common operations include Equals (`eq`), Not Equals (`neq`), Greater Than / Greater Than or Equal (`gt`, `gte`), Less Than / Less Than or Equal (`lt`, `lte`), In / Not In (`in`, `nin`), Contains (`contains`), and pattern-based operators like like / nlike.
  - Use **Not Equals** when you want to exclude one specific exact value.
  - Use **nlike** when you want to exclude any value that contains or matches a certain text pattern anywhere in the field.
- **Type** - Describes the data shape, such as String, Choice (String), int, float, Boolean, Date/DateTime, property (key-value pair), or intrange (integer range).
- **Constraints** - Describes any documented limits on valid values for the filter, such as enumerated choices. If no constraints are listed, the filter accepts any value that matches its type.

---

## ANR Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Completion<br /><span class="filters-table__key">completion</span> | Whether the ANR completed or resulted in app exit. | Equals | Choice (String) | Choices: `all`, `completed`, `exit` |
| Duration Bucket (Milliseconds)<br /><span class="filters-table__key">duration</span> | Duration of the ANR, bucketed by milliseconds. | Equals | intrange | — |
| Method<br /><span class="filters-table__key">method</span> | The method name where the ANR occurred. | Equals, like | String | — |
| Sample Type<br /><span class="filters-table__key">sample_type</span> | Type of ANR sample - first occurrence, most representative, or anomaly detection. | Equals, Not Equals | Choice (String) | Choices: `first`, `best`, `ad` |

</div>

## App Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| App Version<br /><span class="filters-table__key">app_version</span> | Semantic version number of the app. | Equals, Not Equals | String | — |
| Build<br /><span class="filters-table__key">build</span> | Build number or identifier of the app. | Equals, Not Equals | String | — |
| Environment<br /><span class="filters-table__key">environment</span> | Deployment environment of the app. | Equals, Not Equals | String | — |
| Environment Detail<br /><span class="filters-table__key">environment_detail</span> | Additional details about the deployment environment. | Equals, Not Equals | String | — |
| Last View<br /><span class="filters-table__key">last_view</span> | The last screen or view the user visited before an event. | Equals, Not Equals, like, nlike | String | — |
| SDK Version<br /><span class="filters-table__key">sdk_version</span> | Embrace SDK semantic version. | Equals, Not Equals | String | — |

</div>

## Browser Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Bot<br /><span class="filters-table__key">bot</span> | Whether the session was identified as bot traffic. | Equals, Not Equals | Boolean | — |
| Browser Major Version<br /><span class="filters-table__key">browser_major_version</span> | Major version number of the web browser. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Browser Name<br /><span class="filters-table__key">browser_name</span> | Name of the web browser. | Equals, Not Equals, like, nlike | String | — |
| Browser Version<br /><span class="filters-table__key">browser_version</span> | Full version string of the web browser. | Equals, Not Equals, like, nlike | String | — |

</div>

## Child Span Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Child Span Attribute Key<br /><span class="filters-table__key">child_attribute_key</span> | Key name of a custom attribute on a child span. | Equals | String | — |
| Child Span Duration (Milliseconds)<br /><span class="filters-table__key">child_duration</span> | Duration of the child span in milliseconds. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Child Span Event Name<br /><span class="filters-table__key">child_event_name</span> | Name of an event within the child span. | Equals, Not Equals, like, nlike | String | — |
| Child Span Name<br /><span class="filters-table__key">child_name</span> | Name of the child span. | Equals, Not Equals, like, nlike | String | — |
| Child Span Outcome<br /><span class="filters-table__key">child_outcome</span> | Outcome status of the child span (successful, failure, etc.). | Equals | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Child Span Attribute Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Child Span Attribute Key/Value<br /><span class="filters-table__key">child_attribute</span> | Key-value pair of custom attributes on a child span. | Equals, Not Equals | property | — |

</div>

## Crash Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Crash ID<br /><span class="filters-table__key">crash_group_id</span> | Unique identifier for a specific crash instance. | Equals | String | — |
| File Name<br /><span class="filters-table__key">file</span> | Source code file name where the crash occurred. | Equals, Not Equals, like, nlike | String | — |
| Framework<br /><span class="filters-table__key">framework</span> | The app framework used (native, React Native, Unity, Flutter). | Equals | Choice (String) | Choices: `native`, `react_native`, `unity` |
| Message<br /><span class="filters-table__key">msg</span> | Message describing the crash. | like | String | — |
| Symbol<br /><span class="filters-table__key">symbol</span> | The function symbol name from the crash stack trace. | Equals, Not Equals, like, nlike | String | — |
| Tag Name<br /><span class="filters-table__key">tag_name</span> | Custom tag name attached to the crash. | Equals, Not Equals | String | — |
| Tag Name/Value<br /><span class="filters-table__key">tag</span> | Key-value pair of custom tags attached to the crash. | Equals, Not Equals | property | — |

</div>

## Device Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Country ISO<br /><span class="filters-table__key">country</span> | Device's country as a two letter ISO country code. | Equals, Not Equals | String | — |
| Device Type<br /><span class="filters-table__key">device_type</span> | Type of device (desktop, mobile, tablet). | Equals | Choice (String) | Choices: `desktop`, `mobile`, `tablet` |
| Device Type<br /><span class="filters-table__key">model_type</span> | Type classification of the device model. | Equals, Not Equals | String | — |
| Jailbroken<br /><span class="filters-table__key">jailbroken</span> | Whether or not the device running an app is jailbroken. | Equals, Not Equals | Boolean | — |
| Js Patch<br /><span class="filters-table__key">js_patch</span> | JavaScript patch version for React Native apps. | Equals, Not Equals, like, nlike | String | — |
| Manufacturer<br /><span class="filters-table__key">manufacturer</span> | Name of the device hardware manufacturer. | Equals, Not Equals, like, nlike | String | — |
| Model Factory Name<br /><span class="filters-table__key">model</span> | Device hardware model identifier. | Equals, Not Equals, like, nlike | String | — |
| Model Name<br /><span class="filters-table__key">model_market_name</span> | Consumer-facing marketing name of the device model. | Equals, Not Equals, like, nlike | String | — |
| Region<br /><span class="filters-table__key">region</span> | Geographic region within a country, such as a state or province. | Equals, Not Equals | String | — |

</div>

## Exception Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Group ID<br /><span class="filters-table__key">group_id</span> | The group ID for the ANR. | Equals | String | — |
| Is Handled<br /><span class="filters-table__key">is_handled</span> | Whether the exception was caught and handled by the app. | Equals, Not Equals | Boolean | — |
| Severity Score<br /><span class="filters-table__key">severity_score</span> | Numerical severity score assigned to the exception. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | float | — |

</div>

## Log Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Aggregated Message<br /><span class="filters-table__key">log_msg</span> | An aggregated form of the log message, with common patterns or high cardinality parts replaced. | like | String | — |
| File Attachment Error<br /><span class="filters-table__key">attachment_error</span> | Type of error encountered when attaching files to logs. | Equals | Choice (String) | Choices: `ATTACHMENT_TOO_LARGE`, `OVER_MAX_ATTACHMENTS`, `UNKNOWN` |
| Group ID<br /><span class="filters-table__key">log_group_id</span> | Unique identifier grouping similar log messages together. | Equals | String | — |
| Has File Attachment<br /><span class="filters-table__key">has_attachment</span> | Whether the log has a file attachment. | Equals | Boolean | — |
| Has Logs<br /><span class="filters-table__key">has_log</span> | Whether the session contains any log messages. | Equals | Choice (String) | Choices: `true` |
| Log Property Key<br /><span class="filters-table__key">log_property_key</span> | Key name of a custom property attached to the log. | Equals | String | — |
| Message<br /><span class="filters-table__key">log_raw_msg</span> | The log message text. | like | String | — |
| Message<br /><span class="filters-table__key">raw_msg</span> | The log message text. | like | String | — |
| Type<br /><span class="filters-table__key">log_type</span> | Severity level of the log (info, warning, error, system). | Equals | Choice (String) | Choices: `info`, `warning`, `error`, `system` |
| Type<br /><span class="filters-table__key">type</span> | Severity level of the log (info, warning, error, system). | Equals | Choice (String) | Choices: `info`, `warning`, `error`, `system` |

</div>

## Log Property Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Log Property Key/Value<br /><span class="filters-table__key">log_property</span> | Key-value pair of custom properties attached to the log. | Equals, Not Equals | property | — |

</div>

## Network Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Connection Error<br /><span class="filters-table__key">connection_error</span> | Whether the network request had a connection error. | Equals | Boolean | — |
| Domain<br /><span class="filters-table__key">domain</span> | Domain of the HTTP network request. | Equals, Not Equals, like, nlike | String | — |
| Duration Bucket (Milliseconds)<br /><span class="filters-table__key">duration_bucket</span> | Duration of the network request grouped into time buckets. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| First Party<br /><span class="filters-table__key">is_first_party</span> | Whether the network request is to a first-party domain. | Equals | Boolean | — |
| Has Connection Error<br /><span class="filters-table__key">has_connection_error</span> | Whether any connection error occurred during the network request. | Equals, Not Equals | Boolean | — |
| Path<br /><span class="filters-table__key">path</span> | Path element of the URL for an HTTP network request. | Equals, like | String | — |
| Status Code Range<br /><span class="filters-table__key">status_code</span> | Filter by a range of HTTP response status codes. | Equals | intrange | — |
| Status Code Single<br /><span class="filters-table__key">status_code_single</span> | Filter by a specific HTTP response status code. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |

</div>

## OS Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| OS Major Version<br /><span class="filters-table__key">os_major_version</span> | The major version of the OS. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| OS Name<br /><span class="filters-table__key">os_name</span> | Device operating system name. | Equals, Not Equals, like, nlike | String | — |
| OS Version<br /><span class="filters-table__key">os_version</span> | Full operation system version. | Equals, Not Equals | String | — |

</div>

## Root Span Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Root Span Duration (Milliseconds)<br /><span class="filters-table__key">root_span_duration</span> | Duration of the root span in milliseconds. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Root Span Duration Bucket (Milliseconds)<br /><span class="filters-table__key">root_span_duration_bucket</span> | Duration of the root span grouped into time buckets. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Root Span Event Name<br /><span class="filters-table__key">root_span_event_name</span> | Name of an event within the root span. | Equals, Not Equals, like, nlike | String | — |
| Root Span Name<br /><span class="filters-table__key">root_span_name</span> | Name of the root span in a performance trace. | Equals, Not Equals, like, nlike | String | — |
| Root Span Outcome<br /><span class="filters-table__key">root_span_outcome</span> | Outcome status of the root span (successful, failure, etc.). | Equals | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |
| Slow Root Span<br /><span class="filters-table__key">root_span_type_slow</span> | Whether the root span exceeds the slow threshold. | Equals, Not Equals | Boolean | — |

</div>

## Root Span Attribute Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Root Span Attribute Key/Value<br /><span class="filters-table__key">root_span_attribute</span> | Key-value pair of custom attributes on the root span. | Equals, Not Equals | property | — |

</div>

## Session Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Active Interval Count<br /><span class="filters-table__key">active_interval_count</span> | Number of active time intervals during a session. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Breadcrumb Message<br /><span class="filters-table__key">breadcrumb_message</span> | Text content of a breadcrumb event recorded during the session. | Equals, like | String | — |
| Has ANR Exit<br /><span class="filters-table__key">has_anr</span> | True if the app exited while an ANR was occurring. | Equals | Boolean | — |
| Has ANR Exit<br /><span class="filters-table__key">has_anr_exit</span> | True if the app exited while an ANR was occurring. | Equals | Boolean | — |
| Has Cold Start<br /><span class="filters-table__key">is_cold</span> | True if this session is a cold start of the app. | Equals, Not Equals | Boolean | — |
| Has Crash<br /><span class="filters-table__key">has_crash</span> | True if the session had a crash. | Equals, Not Equals | Boolean | — |
| Has Low Memory Warning<br /><span class="filters-table__key">has_low_memory</span> | Whether the session experienced a low memory warning. | Equals, Not Equals | Boolean | — |
| Has OOM<br /><span class="filters-table__key">has_oom</span> | True if the session had an out-of-memory event. | Equals, Not Equals | Boolean | — |
| Inactive Interval Count<br /><span class="filters-table__key">inactive_interval_count</span> | Number of inactive time intervals during a session. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Is First<br /><span class="filters-table__key">is_first</span> | True if this is the user's first session. | Equals, Not Equals | Boolean | — |
| Network Connectivity<br /><span class="filters-table__key">network_connectivity</span> | Type of network connection the device is using. | Equals | Choice (String) | Choices: `mixed`, `none`, `wan`, `wifi` |
| State<br /><span class="filters-table__key">state</span> | Whether the app was in the foreground or background. | Equals, Not Equals | Choice (String) | Choices: `foreground`, `background` |
| Was User Terminated<br /><span class="filters-table__key">has_user_terminated</span> | Whether the session ended because the user force-quit the app. | Equals, Not Equals | Boolean | — |

</div>

## Span Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Has Slow Root Span<br /><span class="filters-table__key">span_type_slow</span> | Whether the root span is classified as slow. | Equals, Not Equals | Boolean | — |
| Span Attribute Key<br /><span class="filters-table__key">span_attribute_key</span> | Key name of a custom attribute on a span. | Equals | String | — |
| Span Duration (Milliseconds)<br /><span class="filters-table__key">span_duration</span> | Duration of the span in milliseconds. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Span Duration Bucket (Milliseconds)<br /><span class="filters-table__key">span_duration_bucket</span> | Duration of the span grouped into time buckets. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| Span Event Name<br /><span class="filters-table__key">span_event_name</span> | Name of an event within the span. | Equals, Not Equals, like, nlike | String | — |
| Span Is Child<br /><span class="filters-table__key">is_child_span</span> | Whether the span is a child of another span. | Equals, Not Equals | Boolean | — |
| Span Name<br /><span class="filters-table__key">span_name</span> | Name identifying the span. | Equals, Not Equals, like, nlike | String | — |
| Span Outcome<br /><span class="filters-table__key">span_outcome</span> | Outcome status of the span (successful, failure, etc.). | Equals | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Span Attribute Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Span Attribute Key/Value<br /><span class="filters-table__key">span_attribute</span> | Key-value pair of custom attributes on a span. | Equals, Not Equals | property | — |

</div>

## Surface Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Surface Name<br /><span class="filters-table__key">surface_name</span> | Name of the UI surface or screen. | Equals, Not Equals, like, nlike | String | — |

</div>

## User Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Embrace ID<br /><span class="filters-table__key">device_id</span> | Unique identifier assigned by Embrace to the device. | Equals, Not Equals | String | — |
| Persona<br /><span class="filters-table__key">persona</span> | Custom user segment or persona identifier. | Equals, Not Equals, like, nlike | String | — |
| User Email<br /><span class="filters-table__key">user_email</span> | App user's email address. | Equals, Not Equals | String | — |
| User ID<br /><span class="filters-table__key">user_id</span> | — | Equals, Not Equals | String | — |
| Username<br /><span class="filters-table__key">user_name</span> | App user's username. | Equals, Not Equals | String | — |

</div>

## User Flow Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| User Flow Duration (Milliseconds)<br /><span class="filters-table__key">user_flow_duration</span> | Duration of the user flow in milliseconds. | Equals, Not Equals, Greater Than, Greater Than or Equal, Less Than, Less Than or Equal | int | — |
| User Flow End Event Type<br /><span class="filters-table__key">user_flow_end_event_type</span> | Type of event that ended the user flow. | Equals, Not Equals | Choice (String) | Choices: `breadcrumb`, `crash`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |
| User Flow Name<br /><span class="filters-table__key">user_flow_name</span> | Name of the user flow. | Equals, Not Equals | String | — |
| User Flow Outcome<br /><span class="filters-table__key">user_flow_outcome</span> | Final outcome of the user flow (complete, abandon, error). | Equals, Not Equals | Choice (String) | Choices: `abandon`, `complete`, `error` |
| User Flow Outcome Reason<br /><span class="filters-table__key">user_flow_outcome_reason</span> | Reason for the user flow outcome (timeout, crash, etc.). | Equals, Not Equals | Choice (String) | Choices: `app_exit`, `timeout`, `new_user_flow_started`, `crash` |
| User Flow Start Event Type<br /><span class="filters-table__key">user_flow_start_event_type</span> | Type of event that started the user flow. | Equals, Not Equals | Choice (String) | Choices: `breadcrumb`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |

</div>

## User Flow Attribute Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| User Flow Attribute Key/Value<br /><span class="filters-table__key">user_flow_attribute</span> | Key-value pair of custom attributes on the user flow. | Equals, Not Equals | property | — |

</div>

## Web Resource Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Render Blocking Status<br /><span class="filters-table__key">render_blocking_status</span> | Whether the resource blocks initial page rendering. | Equals | Choice (String) | Choices: `blocking`, `non-blocking` |
| Resource Type<br /><span class="filters-table__key">resource_type</span> | Type of web resource loaded (script, stylesheet, image, etc.). | Equals | Choice (String) | Choices: `script`, `stylesheet`, `image`, `font`, `video`, `audio`, `document`, `other` |

</div>

## Web Vital Filters

<div class="filters-table">

| Filter | Description | Operations | Type | Constraints |
| --- | --- | --- | --- | --- |
| Web Vital Name<br /><span class="filters-table__key">name</span> | Name of the web vital metric (LCP, FID, CLS, etc.). | Equals, Not Equals, like, nlike | String | — |
| Web Vital Rating<br /><span class="filters-table__key">rating</span> | Performance rating of the web vital (good, needs improvement, poor). | Equals | Choice (String) | Choices: `poor`, `needs_improvement`, `good` |

</div>

## Common Filter Combinations

Here are some examples of commonly used filter combinations:

### Debug a Specific Version

- **App Version** equals `2.1.0`
- Combine with other filters to narrow down issues

### Find Users in a Specific Country

- **Country ISO** equals `US` (or any two-letter country code)
- Use with **App Version** to see regional adoption

### Analyze Latest Version Performance

- **App Version Set** equals `latest`
- Compare metrics against previous versions
