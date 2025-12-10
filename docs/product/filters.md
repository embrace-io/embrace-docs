---
title: Filters Definitions
description: Complete definitions of all available filters for querying your data
slug: /product/filters
sidebar_position: 12.5
---

# Filter Definitions

Filters allow you to query and segment your data in the Embrace dashboard. Use filters to narrow down sessions, crashes, and other telemetry data based on specific criteria.

## Understanding Filter Table Columns

Each filter table in this page uses the same columns:

- **Filter** - Human-readable name of the filter, with the key used in APIs or programmatic queries shown below it in monospace (for example, `app_version`).
- **Description** - Plain-language explanation of what the filter represents and how it is typically used.
- **Type** - Describes the data shape, such as String, Choice (String), int, float, Boolean, Date/DateTime, property (key-value pair), or intrange (integer range).
- **Constraints** - Describes any documented limits on valid values for the filter, such as enumerated choices. If no constraints are listed, the filter accepts any value that matches its type.

---

## ANR Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Completion<br /><code class="filters-table__key">completion</code> | — | Choice (String) | Choices: `all`, `completed`, `exit` |
| Duration Bucket (Milliseconds)<br /><code class="filters-table__key">duration</code> | Duration of the ANR, bucketed by milliseconds. | intrange | — |
| Method<br /><code class="filters-table__key">method</code> | — | String | — |
| Sample Type<br /><code class="filters-table__key">sample_type</code> | — | Choice (String) | Choices: `first`, `best`, `ad` |

</div>

## App Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| App Version<br /><code class="filters-table__key">app_version</code> | Semantic version number of the app. | String | — |
| Build<br /><code class="filters-table__key">build</code> | — | String | — |
| Environment<br /><code class="filters-table__key">environment</code> | Deployment environment of the app. | String | — |
| Environment Detail<br /><code class="filters-table__key">environment_detail</code> | — | String | — |
| Last View<br /><code class="filters-table__key">last_view</code> | — | String | — |
| SDK Version<br /><code class="filters-table__key">sdk_version</code> | Embrace SDK semantic version. | String | — |

</div>

## Browser Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Bot<br /><code class="filters-table__key">bot</code> | — | Boolean | — |
| Browser Major Version<br /><code class="filters-table__key">browser_major_version</code> | — | int | — |
| Browser Name<br /><code class="filters-table__key">browser_name</code> | — | String | — |
| Browser Version<br /><code class="filters-table__key">browser_version</code> | — | String | — |

</div>

## Child Span Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Child Span Attribute Key<br /><code class="filters-table__key">child_attribute_key</code> | — | String | — |
| Child Span Duration (Milliseconds)<br /><code class="filters-table__key">child_duration</code> | — | int | — |
| Child Span Event Name<br /><code class="filters-table__key">child_event_name</code> | — | String | — |
| Child Span Name<br /><code class="filters-table__key">child_name</code> | — | String | — |
| Child Span Outcome<br /><code class="filters-table__key">child_outcome</code> | — | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Child Span Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Child Span Attribute Key/Value<br /><code class="filters-table__key">child_attribute</code> | — | property | — |

</div>

## Crash Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Crash ID<br /><code class="filters-table__key">crash_group_id</code> | — | String | — |
| File Name<br /><code class="filters-table__key">file</code> | — | String | — |
| Framework<br /><code class="filters-table__key">framework</code> | — | Choice (String) | Choices: `native`, `react_native`, `unity` |
| Message<br /><code class="filters-table__key">msg</code> | Message describing the crash. | String | — |
| Symbol<br /><code class="filters-table__key">symbol</code> | — | String | — |
| Tag Name<br /><code class="filters-table__key">tag_name</code> | — | String | — |
| Tag Name/Value<br /><code class="filters-table__key">tag</code> | — | property | — |

</div>

## Device Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Country ISO<br /><code class="filters-table__key">country</code> | Device's country as a two letter ISO country code. | String | — |
| Device Type<br /><code class="filters-table__key">device_type</code> | — | Choice (String) | Choices: `desktop`, `mobile`, `tablet` |
| Device Type<br /><code class="filters-table__key">model_type</code> | — | String | — |
| Jailbroken<br /><code class="filters-table__key">jailbroken</code> | Whether or not the device running an app is jailbroken. | Boolean | — |
| Js Patch<br /><code class="filters-table__key">js_patch</code> | — | String | — |
| Manufacturer<br /><code class="filters-table__key">manufacturer</code> | Name of the device hardware manufacturer. | String | — |
| Model Factory Name<br /><code class="filters-table__key">model</code> | Device hardware model identifier. | String | — |
| Model Name<br /><code class="filters-table__key">model_market_name</code> | — | String | — |
| Region<br /><code class="filters-table__key">region</code> | Geographic region within a country, such as a state or province. | String | — |

</div>

## Exception Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Group ID<br /><code class="filters-table__key">group_id</code> | The group ID for the ANR. | String | — |
| Is Handled<br /><code class="filters-table__key">is_handled</code> | — | Boolean | — |
| Severity Score<br /><code class="filters-table__key">severity_score</code> | — | float | — |

</div>

## Log Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Aggregated Message<br /><code class="filters-table__key">log_msg</code> | An aggregated form of the log message, with common patterns or high cardinality parts replaced. | String | — |
| File Attachment Error<br /><code class="filters-table__key">attachment_error</code> | — | Choice (String) | Choices: `ATTACHMENT_TOO_LARGE`, `OVER_MAX_ATTACHMENTS`, `UNKNOWN` |
| Group ID<br /><code class="filters-table__key">log_group_id</code> | — | String | — |
| Has File Attachment<br /><code class="filters-table__key">has_attachment</code> | — | Boolean | — |
| Has Logs<br /><code class="filters-table__key">has_log</code> | — | Choice (String) | Choices: `true` |
| Log Property Key<br /><code class="filters-table__key">log_property_key</code> | — | String | — |
| Message<br /><code class="filters-table__key">log_raw_msg</code> | — | String | — |
| Message<br /><code class="filters-table__key">raw_msg</code> | — | String | — |
| Type<br /><code class="filters-table__key">log_type</code> | — | Choice (String) | Choices: `info`, `warning`, `error`, `system` |
| Type<br /><code class="filters-table__key">type</code> | — | Choice (String) | Choices: `info`, `warning`, `error`, `system` |

</div>

## Log Property Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Log Property Key/Value<br /><code class="filters-table__key">log_property</code> | — | property | — |

</div>

## Network Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Connection Error<br /><code class="filters-table__key">connection_error</code> | — | Boolean | — |
| Domain<br /><code class="filters-table__key">domain</code> | Domain of the HTTP network request. | String | — |
| Duration Bucket (Milliseconds)<br /><code class="filters-table__key">duration_bucket</code> | — | int | — |
| First Party<br /><code class="filters-table__key">is_first_party</code> | — | Boolean | — |
| Has Connection Error<br /><code class="filters-table__key">has_connection_error</code> | — | Boolean | — |
| Path<br /><code class="filters-table__key">path</code> | Path element of the URL for an HTTP network request. | String | — |
| Status Code Range<br /><code class="filters-table__key">status_code</code> | Filter by a range of HTTP response status codes. | intrange | — |
| Status Code Single<br /><code class="filters-table__key">status_code_single</code> | Filter by a specific HTTP response status code. | int | — |

</div>

## OS Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| OS Major Version<br /><code class="filters-table__key">os_major_version</code> | The major version of the OS. | int | — |
| OS Name<br /><code class="filters-table__key">os_name</code> | Device operating system name. | String | — |
| OS Version<br /><code class="filters-table__key">os_version</code> | Full operation system version. | String | — |

</div>

## Root Span Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Root Span Duration (Milliseconds)<br /><code class="filters-table__key">root_span_duration</code> | — | int | — |
| Root Span Duration Bucket (Milliseconds)<br /><code class="filters-table__key">root_span_duration_bucket</code> | — | int | — |
| Root Span Event Name<br /><code class="filters-table__key">root_span_event_name</code> | — | String | — |
| Root Span Name<br /><code class="filters-table__key">root_span_name</code> | Name of the root span in a performance trace. | String | — |
| Root Span Outcome<br /><code class="filters-table__key">root_span_outcome</code> | — | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |
| Slow Root Span<br /><code class="filters-table__key">root_span_type_slow</code> | — | Boolean | — |

</div>

## Root Span Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Root Span Attribute Key/Value<br /><code class="filters-table__key">root_span_attribute</code> | — | property | — |

</div>

## Session Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Active Interval Count<br /><code class="filters-table__key">active_interval_count</code> | — | int | — |
| Breadcrumb Message<br /><code class="filters-table__key">breadcrumb_message</code> | — | String | — |
| Has ANR Exit<br /><code class="filters-table__key">has_anr</code> | True if the app exited while an ANR was occurring. | Boolean | — |
| Has ANR Exit<br /><code class="filters-table__key">has_anr_exit</code> | True if the app exited while an ANR was occurring. | Boolean | — |
| Has Cold Start<br /><code class="filters-table__key">is_cold</code> | True if this session is a cold start of the app. | Boolean | — |
| Has Crash<br /><code class="filters-table__key">has_crash</code> | True if the session had a crash. | Boolean | — |
| Has Low Memory Warning<br /><code class="filters-table__key">has_low_memory</code> | — | Boolean | — |
| Has OOM<br /><code class="filters-table__key">has_oom</code> | True if the session had an out-of-memory event. | Boolean | — |
| Inactive Interval Count<br /><code class="filters-table__key">inactive_interval_count</code> | — | int | — |
| Is First<br /><code class="filters-table__key">is_first</code> | True if this is the user's first session. | Boolean | — |
| Network Connectivity<br /><code class="filters-table__key">network_connectivity</code> | Type of network connection the device is using. | Choice (String) | Choices: `mixed`, `none`, `wan`, `wifi` |
| State<br /><code class="filters-table__key">state</code> | Whether the app was in the foreground or background. | Choice (String) | Choices: `foreground`, `background` |
| Was User Terminated<br /><code class="filters-table__key">has_user_terminated</code> | — | Boolean | — |

</div>

## Span Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Has Slow Root Span<br /><code class="filters-table__key">span_type_slow</code> | — | Boolean | — |
| Span Attribute Key<br /><code class="filters-table__key">span_attribute_key</code> | — | String | — |
| Span Duration (Milliseconds)<br /><code class="filters-table__key">span_duration</code> | — | int | — |
| Span Duration Bucket (Milliseconds)<br /><code class="filters-table__key">span_duration_bucket</code> | — | int | — |
| Span Event Name<br /><code class="filters-table__key">span_event_name</code> | — | String | — |
| Span Is Child<br /><code class="filters-table__key">is_child_span</code> | — | Boolean | — |
| Span Name<br /><code class="filters-table__key">span_name</code> | — | String | — |
| Span Outcome<br /><code class="filters-table__key">span_outcome</code> | — | Choice (String) | Choices: `successful`, `failure`, `user_abandon`, `unknown` |

</div>

## Span Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Span Attribute Key/Value<br /><code class="filters-table__key">span_attribute</code> | — | property | — |

</div>

## Surface Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Surface Name<br /><code class="filters-table__key">surface_name</code> | — | String | — |

</div>

## User Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Embrace ID<br /><code class="filters-table__key">device_id</code> | — | String | — |
| Persona<br /><code class="filters-table__key">persona</code> | — | String | — |
| User Email<br /><code class="filters-table__key">user_email</code> | App user's email address. | String | — |
| User ID<br /><code class="filters-table__key">user_id</code> | — | String | — |
| Username<br /><code class="filters-table__key">user_name</code> | App user's username. | String | — |

</div>

## User Flow Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| User Flow Duration (Milliseconds)<br /><code class="filters-table__key">user_flow_duration</code> | — | int | — |
| User Flow End Event Type<br /><code class="filters-table__key">user_flow_end_event_type</code> | — | Choice (String) | Choices: `breadcrumb`, `crash`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |
| User Flow Has Issue<br /><code class="filters-table__key">user_flow_has_issue</code> | — | Choice (String) | Choices: `anr`, `crash`, `error_log`, `network_error` |
| User Flow Name<br /><code class="filters-table__key">user_flow_name</code> | — | String | — |
| User Flow Name<br /><code class="filters-table__key">crash_user_flow_name</code> | — | String | — |
| User Flow Outcome<br /><code class="filters-table__key">user_flow_outcome</code> | — | Choice (String) | Choices: `abandon`, `complete`, `error` |
| User Flow Outcome Reason<br /><code class="filters-table__key">user_flow_outcome_reason</code> | — | Choice (String) | Choices: `app_exit`, `timeout`, `new_user_flow_started`, `crash` |
| User Flow Start Event Type<br /><code class="filters-table__key">user_flow_start_event_type</code> | — | Choice (String) | Choices: `breadcrumb`, `custom_view`, `log`, `network`, `session`, `span`, `user_tap`, `view`, `web_view` |

</div>

## User Flow Attribute Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| User Flow Attribute Key/Value<br /><code class="filters-table__key">user_flow_attribute</code> | — | property | — |

</div>

## Web Resource Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Render Blocking Status<br /><code class="filters-table__key">render_blocking_status</code> | — | Choice (String) | Choices: `blocking`, `non-blocking` |
| Resource Type<br /><code class="filters-table__key">resource_type</code> | — | Choice (String) | Choices: `script`, `stylesheet`, `image`, `font`, `video`, `audio`, `document`, `other` |

</div>

## Web Vital Filters

<div class="filters-table">

| Filter | Description | Type | Constraints |
| --- | --- | --- | --- |
| Web Vital Name<br /><code class="filters-table__key">name</code> | — | String | — |
| Web Vital Rating<br /><code class="filters-table__key">rating</code> | — | Choice (String) | Choices: `poor`, `needs_improvement`, `good` |

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
