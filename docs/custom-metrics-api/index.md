---
title: Introduction
description: Learn about the Embrace Custom Metrics API to manage custom metrics
sidebar_position: 0
---

# Embrace Custom Metrics API

The Embrace Custom Metrics API allows you to manage (create, get and delete) the custom metrics of your organization.
These will be available via the Metrics API and can also be forwarded to your
organization's [observability platform of choice](/data-destinations).

You can follow [this](/embrace-api/code_samples) guide to see how queries custom metrics.

## Prerequisites

- Embrace Custom Metrics API Token. This is a different token than the Metrics API token. Contact an Embrace onboarding specialist to get this token for your organization. Once you receive the token, you can proceed independently with creating custom metrics.

## API Endpoints

All the endpoints have the same authentication and authorization method, url and parameters. Use the Custom Metrics API token provided by an Embrace onboarding specialist to create custom metrics.
- `URL`: `https://api.embrace.io/custom-metrics`

### Request

Headers:
- `Authorization`: we are going to use a Bearer token to authorize and authenticate our requests. 
i.e.: `Authorization: Bearer 7bd49186fed24af699cf93069fc64f03`.

URL Params:
- `app_id`: application id in which we are going to manage the custom metrics. i.e.: `appID1`
- `custom_metric_name`: custom metric name that we use to identify it. i.e.: `my_custom_metric_name`

Body Params:
- `name`: name you want to provide this new metric i.e.: `my_custom_metric_name`
- `metric`: base Embrace metric this new metric will be built from. i.e.: `sessions_total`.
- `group_by`: list of group by that we are going to use to group the metric. It can be empty.
  i.e.: `["os_version", "app_version"]`.
- `filters` list of filters that we are going to apply on the metric. It can be empty. i.e.:
```json
{
  "op": "and",
  "children": [
    {
      "field_op": "eq",
      "key": "os_version",
      "val": "12"
    }
  ]
}
```
- `time_granularity`: list of granularity that we are going to support on this metric. If it is empty, by default hourly
  is turned on. i.e.: `["five_minute", "hourly", "daily"]`
- `data_destination`: list of data destination to which we are going to send this metric. If it is empty, by default metrics_api
    is turned on. i.e.: `["metrics_api", "newrelic", "datadog", "grafana_cloud"]`

### Response

Body Params:
- `custom_metric_id`: the unique ID for the metric created. i.e.: `XZ5BDQk`

Status codes:
- `200`: request was successful and we return a body with new information.
- `204`: request was successful and we don't return a body.
- `400`: the url params and body were not correct.
- `403`: you don't have access to execute that operation.
- `404`: metric that you are trying to consume doesn't exist.
- `409`: metric that you are trying to create already exists.
- `500`: there was an internal error and you should retry later.

### Get metrics and parameters supported
To determine which metrics and parameters are supported for creation using the API, you can utilize the following endpoint:
#### Request
```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics/parameters' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

#### Query Parameter
 `name`: metric name you want to see the parameters supported. i.e.: `sessions_total`

Example URL: 
```
https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics/parameters?name=sessions_total
```
If the name is not provided or the metric is not supported, the endpoint will return all the supported metrics and parameters.

#### Response
Status codes: `200` and `500`.

#### OK (200)
```json
[
  {
    "metric": "sessions_total",
    "filters": [
      {
        "name": "has_anr",
        "supported_ops": [
          "eq"
        ],
        "type": "boolean"
      },
      {
        "name": "app_version",
        "supported_ops": [
          "eq",
          "neq",
          "in"
        ],
        "type": "string"
      },
      {
        "name": "os_version",
        "supported_ops": [
          "eq",
          "neq",
          "in"
        ],
        "type": "string"
      },
      {
        "name": "os_major_version",
        "supported_ops": [
          "eq",
          "neq",
          "gt",
          "gte",
          "lt",
          "lte",
          "in"
        ],
        "type": "int"
      },
      {
        "name": "country",
        "supported_ops": [
          "eq",
          "neq",
          "in"
        ],
        "type": "string"
      },
      {
        "name": "model",
        "supported_ops": [
          "eq",
          "neq",
          "like",
          "nlike",
          "in"
        ],
        "type": "string"
      }
    ],
    "group_by": [
      "app_version",
      "os_version",
      "os_major_version",
      "country",
      "top_n_market_name"
    ],
    "time_granularity": [
      "five_minute",
      "hourly",
      "daily"
    ],
    "data_destination": [
      "metrics_api",
      "newrelic",
      "datadog",
      "grafana_cloud"
    ]
  }
]
```

#### Error (500)
```json
{
  "message": "we had an internal error, please try again later"
}
```

### Filter Parameter Examples

| Type     | Example                                                                                             |
|----------|-----------------------------------------------------------------------------------------------------|
| string   | `{"key": "app_version", "field_op": "eq", "val": "3.2.0"}`                                          |
| int      | `{"key": "os_major_version", "field_op": "gt", "val": 9}`                                           |
| boolean  | `{"key": "has_anr", "field_op": "eq", "val": true}`                                                 |
| range    | `{"key": "status_code", "field_op": "eq", "val": {"start": 400", "end": 499}}`                      |
| property | `{"key": "type", "field_op": "eq", "val": {"property_key": "k1", "property_values": ["v1", "v2"]}}` |



### Create custom metric

#### Request

```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc' \
--data '{
    "name": "sessions_total_v1",
    "metric": "sessions_total",
    "group_by": ["app_version"],
    "filters": {
        "op":"and",
        "children":[{"field_op":"eq","key":"os_version","val":"12"}]
    },
    "time_granularity": ["five_minute", "hourly"],
    "data_destination": ["metrics_api", "newrelic"]
}'
```

#### Response

Status codes: `200`, `400`, `403`, `409` and `500`.

#### OK
```json 
{
  "custom_metric_id": "y8vayvn",
  "app_id": "appID1",
  "name": "sessions_total_v1",
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
  ],
  "data_destination": [
    "metrics_api",
    "newrelic"
  ]
}
```

#### Error (500)
```json
{
  "message": "we had an internal error, please try again later"
}
```

### Get custom metrics

#### Request
```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

#### Response
Status codes: `200`, `400`, `409` and `500`.

#### OK (200)
```json
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
      ],
      "data_destination": [
        "metrics_api",
        "datadog",
        "grafana_cloud"
      ]
    }
  ]
}
```

#### Error (400)
```json
{
  "message": "app id can't be empty"
}
```

### Delete custom metrics

#### Request
```bash
curl -X DELETE --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics/sessions_total_v1' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

#### Response
Status codes: `204`, `400`, `403`, `404`, `409` and `500`.

#### OK (204), body is empty

#### Error (404)
```json
{
  "message": "metric sessions_total_v1 doesn't exist"
}
```



