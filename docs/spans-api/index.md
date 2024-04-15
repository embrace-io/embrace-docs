---
title: Introduction
description: Learn about the Embrace Spans API to retrieve spans information
sidebar_position: 0
---

# Embrace Spans API

The Spans API allows you to query your spans using TraceQL. To get started, take a look at [Grafana Integration guide](/spans-api/grafana_integrations/).

## Prerequisites

- Embrace Spans API Token. This is a different token than the Metrics API token and from the Custom Metrics token. Contact an Embrace onboarding specialist to get this token for your organization. Once you receive the token, you can proceed independently retrieving spans information.

## API Endpoints

All the endpoints have the same authentication and authorization method and url. Use the Spans API token provided by an Embrace onboarding specialist to get spans information.
- `URL`: `https://api.embrace.io/spans`

### Request

Headers:
- `Authorization`: we are going to use a Bearer token to authorize and authenticate our requests. 
i.e.: `Authorization: Bearer 7bd49186fed24af699cf93069fc64f03`.

URL Params:
Parameters supported for all searches

- `limit` = (integer) Optional. Limit the number of search results. Default is 20
- `start` = (unix epoch seconds) Optional. Along with end define a time range from which spann should be returned.
- `end` = (unix epoch seconds) Optional. Along with start, define a time range from which spans should be returned. Providing both start and end will change the way that Tempo searches. If the parameters are not provided, then Tempo will search the recent trace data stored in the ingesters. If the parameters are provided, it will search the backend as well.
- `spss` = (integer) Optional. Limit the number of spans per span-set. Default value is 3.


Parameters for TraceQL Search

`q = (TraceQL query)`: Url encoded TraceQL query.
Parameters for Tag Based Search

`tags = (logfmt)`: logfmt encoding of any span-level or process-level attributes to filter on. The value is matched as a case-insensitive substring. Key-value pairs are separated by spaces. If a value contains a space, it should be enclosed within double quotes.
`minDuration = (go duration value)` Optional. Find traces with at least this duration. Duration values are of the form 10s for 10 seconds, 100ms, 30m, etc.
`maxDuration = (go duration value)` Optional. Find traces with no greater than this duration. Uses the same form as minDuration.

[//]: # (## Response status codes:)

[//]: # (- `200`: request was successful and we return a body with new information.)

[//]: # (- `403`: you don't have access to execute that operation.)

[//]: # (- `500`: there was an internal error and you should retry later.)

### /search
This endpoint allows you to search for spans based on a TraceQL query. 
To speed up the search, you can use the `start` and `end` parameters to define a time range from which spans should be returned.
Also 

```bash
# search example
curl -G 'https://api.embrace.io/spans/api/search?start=1712861280&end=1712861400&spss=5&limit=1' \
--header 'Authorization: Bearer TOKEN' \
--data-urlencode 'q={duration>1s && span.emb.app_id="app" }'
```

#### Search specific span
To search for a specific span you need to add in the query parameter the span id you want to search for
as the `.emb.span_id` attribute.

```bash

curl -G 'https://api.embrace.io/spans/api/search' \
--header 'Authorization: Bearer TOKEN' \
--data-urlencode 'q={span.emb.span_id="1f8ecc91e9c89cc4" && span.emb.app_id="app"}' | jq
```

## Tags
### Tag keys

Query parameter:
- `scope` = (string) Optional. The scope of the tags to return. Can be one of `resource`, `span`, or `intrinsic`. If nothing is provided, the endpoint will return all resource and span tags.

```bash
curl 'https://api.embrace.io/spans/api/v2/search/tags' \
--header 'Authorization: Bearer TOKEN' \
| jq

```

### Tag values

To get all the tag values from a tag key, you have to replace `:tag` with the tag you want to get the values from.
```bash
curl 'https://api.embrace.io/spans/api/v2/search/tag/:tag/values' \
--header 'Authorization: Bearer TOKEN' \
| jq
````

Query parameter:
- `q` = (string) Optional.URL-encoded TraceQL query. If provided, the tag values returned by the API are filtered to only return values seen on spans matching your filter parameters.

Only queries with a single selector (`{}`) and AND (`&&`) operators are supported.

Example supported: `{ .cluster = "us-east-1" && .service = "frontend" }`
Example unsupported: `{ .cluster = "us-east-1" || .service = "frontend" } && { .cluster = "us-east-2" }`





