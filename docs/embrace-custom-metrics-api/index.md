---
title: Introduction
description: Learn about the Embrace Custom Metrics API to manage custom metrics 
sidebar_position: 0
---

# Embrace Custom Metrics API

The Embrace Custom Metrics API allows you to manage (create, get and delete) the custom metrics of you organization. 
These will be available via the Metrics API and can also be forwarded to your organization's [observability platform of choice](/data-destinations).

## Prerequisites

- Embrace Custom Metrics API Token. You need to contact our team (TODO Scott) to get this token.

## Supported Metrics

The following metrics are supported to create using the API.

| Metric                            | Description                                               | Filters                               | Time granularity           |           
|-----------------------------------|-----------------------------------------------------------|---------------------------------------|----------------------------|
| sessions_total                    | Number of sessions                                        | app_version, os_version               | five_minute, hourly, daily |

## API Endpoints

All the endpoints have the same authentication and authorization method, url and parameters.
- `URL`: `https://api.embrace.io/custom-metrics/api/v1/app/{app_id}/custom-metrics`

### Request

Headers
- `Authorization`: token that we created on the dashboard api to authorize our requests. ex: `Authorization: Bearer 7bd49186fed24af699cf93069fc64f03`.

URL Params
- `app_id`: application id in which we are going to manage the custom metrics. ex: `appID1`
- `custom_metric_name`: custom metric name that we use to identify it. ex: `my_custom_metric_name`

Body
- `name`: custom metric name that we use to identify it. ex: `my_custom_metric_name`
- `metric`: metric name. ex: `sessions_total`.
- `group_by`: list of group by that we are going to use to group the metric. It can be empty. ex: `["os_version", "app_version"]`.
- `filters` list of filters that we are going to apply on the metric. It can be empty. ex:
```json
{
  "op":"and",
  "children":[{"field_op":"eq","key":"os_version","val":"12"}]
}
```
- `time_granularity`: list of granularity that we are going to support on this metric. If it is empty, by default hourly is turned on. ex: `["five_minute", "hourly", "daily"]`

### Response

Body:
`custom_metric_id`: the unique ID for the metric created. ex: `XZ5BDQk`

Status code:
`200`: request was successful and we return a body with new information.
`204`: request was successful and we don't return a body.
`400`: the url params and body are not correct. ex: name of the metric doesn't exist, app_id is empty, etc.
`403`: you don't have access to this app id.
`404`: metric that you are trying to consume doesn't exist.
`409`: metric that you are trying to create already exists with that app id and custom metric name.
`500`: there was an internal error and you should retry later.

### Create custom metric

```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc' \
--data '{
    "name": "sessions_total_v3",
    "metric": "sessions_total",
    "group_by": ["app_version"],
    "filters": {
        "op":"and",
        "children":[{"field_op":"eq","key":"os_version","val":"12"}]
    },
    "time_granularity": ["five_minute", "hourly"]
}'
```

```bash
status_code: 200
body: 
{
  "custom_metric_id": "y8vayvn",
  "app_id": "appID1",
  "name": "sessions_total_v3",
  "metric": "sessions_total",
  "filters": {
    "op": "and",
    "children": [
      {
        "field_op": "eq",
        "key": "os_version",
        "val": "12"
      }
    ]
  },
  "group_by": [
    "app_version"
  ],
  "time_granularity": [
    "five_minute",
    "hourly"
  ]
}
```

Possible status codes:
- `200`
- `400` body or url params are wrong.
- `403` you don't have permissions.
- `409` custom metric already exists.
- `500` internal server error.
- 
### Get custom metrics

```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

```bash
status_code: 200
body: 
{
  "results": [
    {
      "custom_metric_id": "XZ5BDQk",
      "app_id": "appID1",
      "name": "sessions_total_v1",
      "metric": "sessions_total",
      "filters": {},
      "group_by": [
        "app_version"
      ],
      "time_granularity": [
        "five_minute",
        "hourly"
      ]
    }
  ]
}
```

Possible status codes:
- `200`
- `400` url params are wrong
- `403` you don't have permissions.
- `500` internal server error.
- 
### Delete custom metrics

```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics/sessions_total_v1' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

Possible status codes:
- `204`
- `400` url params are wrong
- `403` you don't have permissions.
- `404` custom metric doesn't exist.
- `500` internal server error.

