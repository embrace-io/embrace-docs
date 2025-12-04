---
title: Embrace Custom Metrics API
description: Learn about the Embrace Custom Metrics API to manage custom metrics
sidebar_position: 110
---

# Embrace Custom Metrics API

The Embrace Custom Metrics API allows you to manage (create, get and delete) the custom metrics of your organization.

Any Custom Metrics you create are available via the [Embrace Metrics API](/metrics-forwarding/metrics-api), which is a separate interface. These metrics can also be forwarded to your organization's [observability platform of choice](/data-destinations). You can follow [this guide](/metrics-forwarding/metrics-api/code-samples) to see how to query custom metrics in the Metrics API.

## Prerequisites

- Embrace Custom Metrics API Token. This is a different token than the Metrics API token. Contact an Embrace onboarding specialist to get this token for your organization. Once you receive the token, you can proceed independently with creating custom metrics.

## API Endpoints

All the endpoints have the same authentication, authorization method, url and parameters. Use the Custom Metrics API token provided by an Embrace onboarding specialist to create custom metrics.

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
  "children": [{"field_op": "eq", "key": "os_version", "val": "12"}]
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
    "filters": {"op":"and", "children":[{"field_op":"eq","key":"os_version","val":"12"}]},
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
    "children": [{"field_op": "eq", "key": "os_version", "val": "12"}]
  },
  "group_by": ["app_version"],
  "time_granularity": ["five_minute", "hourly"],
  "data_destination": ["metrics_api", "newrelic"]
}
```

#### Error (500)

```json
{"message": "we had an internal error, please try again later"}
```

#### Filters Examples

| Type     | Example                                                                                             |
|----------|-----------------------------------------------------------------------------------------------------|
| string   | `{"key": "app_version", "field_op": "eq", "val": "3.2.0"}`                                          |
| int      | `{"key": "os_major_version", "field_op": "gt", "val": 9}`                                           |
| boolean  | `{"key": "has_anr", "field_op": "eq", "val": true}`                                                 |
| range    | `{"key": "status_code", "field_op": "eq", "val": {"start": 400", "end": 499}}`                      |
| property | `{"key": "type", "field_op": "eq", "val": {"property_key": "k1", "property_values": ["v1", "v2"]}}` |

#### Filters using `duration_bucket`

For some custom metrics the API allows you to filter data based on the `duration_bucket` parameter, which categorizes data according to specific `duration` ranges. Each `duration_bucket` value corresponds to a specific range of `duration` values. Here's how it works:

| Duration Range                  | Duration Bucket |
|---------------------------------|-----------------|
| 0ms to 100ms                    | 0               |
| 100ms to 200ms                  | 100             |
| 200ms to 300ms                  | 200             |
| 300ms to 400ms                  | 300             |
| 400ms to 500ms                  | 400             |
| 500ms to 600ms                  | 500             |
| 600ms to 700ms                  | 600             |
| 700ms to 800ms                  | 700             |
| 800ms to 900ms                  | 800             |
| 900ms to 1000ms                 | 900             |
| 1000ms to 2000ms                | 1000            |
| 2000ms to 3000ms                | 2000            |
| 3000ms to 4000ms                | 3000            |
| 4000ms to 5000ms                | 4000            |
| 5000ms to 10000ms               | 5000            |
| 10000ms to 15000ms              | 10000           |
| Greater than 15000ms            | 15000           |

**Caution:** When filtering with conditions such as `duration_bucket` < 1100, please be aware that the behavior is based on the order of conditions and the first condition that matches.
In this case, if `duration_bucket` is less than 1100, it will match the condition `duration_bucket` < 1000, and the `duration` filter will be < 2000. Ensure that your conditions are structured to achieve your intended filtering accurately.

If you want to filter all durations less or equal than 999 you should create this filter:

```json
{
  "op": "and",
  "children": [{"key": "duration_bucket", "val": 999, "field_op": "lte"}]
}
```

#### Group by using `session_property`, `log_property` or `root_span_attribute`

For some custom metrics the API allows you to group by data based on the `session_property`, `log_property` or `root_span_attribute` parameters.

If you want to group by on the property "city" and "state" for `session_property`, you should create this group by:

```json
{
  "group_by": ["session_property.city", "session.property.state"]
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
      "group_by": ["app_version"],
      "time_granularity": ["five_minute", "hourly"],
      "data_destination": ["metrics_api", "datadog", "grafana_cloud"]
    }
  ]
}
```

#### Error (400)

```json
{"message": "app id can't be empty"}
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
{"message": "metric sessions_total_v1 doesn't exist"}
```

### Get metrics and parameters supported

To determine which metrics and parameters are supported for creation using the API, you can utilize the following request:

#### Request

```bash
curl --location 'https://api.embrace.io/custom-metrics/api/v1/app/appID1/custom-metrics/parameters' \
--header 'Authorization: Bearer 1b6be81cd01c4b08833295efadccafdc'
```

:::info
Refer to this [page](/metrics-forwarding/custom-metrics/#supported-metrics) if you want to see supported metrics without using the API.
:::

#### Query Parameter

`name`: metric name you want to see the parameters supported. i.e.: `sessions_total`

Example URL:

```text
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
    "filters": [{"name": "has_anr", "supported_ops": ["eq"], "type": "boolean"}],
    "group_by": ["app_version"],
    "time_granularity": ["five_minute"],
    "data_destination": ["metrics_api"]
  }
]
```

#### Error (500)

```json
{"message": "we had an internal error, please try again later"}
```

## Code samples

### Python Example

This example shows how to create custom metrics using the API across multiple applications.

```python
import json
import logging
import os

import requests
from dotenv import load_dotenv
from prometheus_api_client import PrometheusConnect

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(funcName)s - %(message)s",
)

logger = logging.getLogger(__name__)

load_dotenv()

CUSTOM_METRICS_TOKEN = os.getenv(key="CUSTOM_METRICS_TOKEN")
METRICS_API_ENDPOINT = "https://api.embrace.io/metrics/"
CUSTOM_METRICS_API_ENDPOINT = (
    f"https://api.embrace.io/custom-metrics/api/v1/app/APP_ID/custom-metrics"
)

APP_IDS = [
    "app_id_1",
    "app_id_2",
]


def api_connection(api_endpoint: str, token: str) -> object:
    """
    Creates a connection to a Prometheus API endpoint.

    Args:
        api_endpoint (str): The URL of the Prometheus API endpoint
        token (str): Authentication token for the API

    Returns:
        object: A PrometheusConnect instance configured with the provided endpoint and token
    """
    conn = PrometheusConnect(
        url=api_endpoint, headers={"Authorization": f"Bearer {token}"}
    )
    return conn


def delete_custom_metric(
    name: str,
    endpoint: str = CUSTOM_METRICS_API_ENDPOINT,
    token: str = CUSTOM_METRICS_TOKEN,
) -> None:
    """
    Deletes a custom metric from the specified endpoint.

    Args:
        name (str): Name of the metric to delete
        endpoint (str, optional): API endpoint URL. Defaults to CUSTOM_METRICS_API_ENDPOINT.
        token (str, optional): Authentication token. Defaults to CUSTOM_METRICS_TOKEN.

    Raises:
        requests.exceptions.RequestException: If the deletion request fails
    """
    url = f"{endpoint}/{name}"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

    logging.info(f"URL: {url}")

    try:
        response = requests.delete(url=url, headers=headers)
        response.raise_for_status()
        logging.info(f"Metric '{name}' deleted successfully.")
    except requests.exceptions.RequestException as e:
        logging.error(f"Error deleting custom metric: {e}")
        if response:
            logging.error(f"Response Status Code: {response.status_code}")
            logging.error(f"Response Text: {response.text}")


def create_custom_metric(
    name: str,
    metric: str,
    time_granularity: list,
    data_destination: list,
    endpoint: str = CUSTOM_METRICS_API_ENDPOINT,
    token: str = CUSTOM_METRICS_TOKEN,
    filters: dict = {},
    group_by: list = [],
) -> dict:
    """
    Creates a new custom metric with the specified configuration.

    Args:
        name (str): Name of the metric
        metric (str): Type of metric to create
        time_granularity (list): List of time intervals for metric collection (e.g., ["five_minute", "hourly"])
        data_destination (list): List of destinations where metric data should be sent
        endpoint (str, optional): API endpoint URL. Defaults to CUSTOM_METRICS_API_ENDPOINT.
        token (str, optional): Authentication token. Defaults to CUSTOM_METRICS_TOKEN.
        filters (dict, optional): Filtering conditions for the metric. Defaults to {}.
        group_by (list, optional): Fields to group the metric by. Defaults to [].

    Returns:
        dict: API response data if successful, empty dict if failed

    Raises:
        requests.exceptions.RequestException: If the creation request fails
    """
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {
        "name": name,
        "metric": metric,
        "filters": filters,
        "group_by": group_by,
        "time_granularity": time_granularity,
        "data_destination": data_destination,
    }
    # Convert payload to JSON string
    payload_json = json.dumps(obj=payload)

    # Create a PreparedRequest
    req = requests.Request(
        method="POST", url=endpoint, headers=headers, data=payload_json
    )
    prepared = req.prepare()

    logging.info(prepared.url)
    logging.info(f"Body: {prepared.body}")

    try:
        with requests.Session() as session:
            response = session.send(request=prepared)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        match response if "response" in locals() and response is not None else None:
            case None:
                logging.error(f"Error creating custom metric: {e}")
            case r if r.status_code == 409:
                logging.warning(
                    f"Metric '{name}' already exists for this application. Skipping creation."
                )
            case r if r.status_code in {400, 401, 403, 404}:
                logging.error(f"Client error ({r.status_code}): {e}")
                logging.error(f"Response Text: {r.text}")
            case r if r.status_code in {500, 502, 503}:
                logging.error(f"Server error ({r.status_code}): {e}")
                logging.error(f"Response Text: {r.text}")
            case r:
                logging.error(f"Unexpected error ({r.status_code}): {e}")
                logging.error(f"Response Text: {r.text}")
        return {}


def generate_tasks(app_ids: list, metrics: list[dict]) -> list[dict]:
    """
    Generate a list of tasks for creating metrics across multiple applications.

    Args:
        app_ids (list): List of application IDs to create metrics for
        metrics (list[dict]): List of metric configurations, where each configuration is a dictionary
            containing the metric parameters (name, metric type, time_granularity, etc.)

    Returns:
        list[dict]: List of tasks, where each task is a dictionary containing the parameters
            needed for create_custom_metric()

    Example metric configuration:
        {
            "name": "Sessions_by_ClientPlatform",
            "metric": "sessions_total",
            "time_granularity": ["five_minute", "hourly", "daily"],
            "data_destination": ["metrics_api", "grafana_cloud"],
            "filters": {...},
            "group_by": [...]
        }
    """
    tasks = []
    for app_id in app_ids:
        endpoint = CUSTOM_METRICS_API_ENDPOINT.replace("APP_ID", app_id)

        # Extend the task list with all metric configurations for the current app_id
        tasks.extend(
            [
                {
                    "name": metric_config["name"],
                    "metric": metric_config["metric"],
                    "time_granularity": metric_config["time_granularity"],
                    "data_destination": metric_config["data_destination"],
                    "endpoint": endpoint,
                    "filters": metric_config.get("filters", {}),
                    "group_by": metric_config.get("group_by", []),
                }
                for metric_config in metrics
            ]
        )
    return tasks


def create_metrics_for_all_apps(
    tasks: list[dict], token: str = CUSTOM_METRICS_TOKEN
) -> None:
    """
    Executes a list of tasks to create custom metrics across multiple applications.

    Args:
        tasks (list[dict]): List of tasks generated by generate_tasks()
        token (str, optional): Authentication token. Defaults to CUSTOM_METRICS_TOKEN.

    Note:
        Each task in the tasks list should contain all necessary parameters for create_custom_metric()
    """
    """
    Executes each task to create a custom metric.
    """
    for task in tasks:
        logging.info(f"Creating metric '{task['name']}' at endpoint {task['endpoint']}")
        response = create_custom_metric(
            name=task["name"],
            metric=task["metric"],
            time_granularity=task["time_granularity"],
            data_destination=task["data_destination"],
            endpoint=task["endpoint"],
            token=token,
            filters=task["filters"],
            group_by=task["group_by"],
        )
        logging.info(f"Response for metric '{task['name']}': {response}")


def main():
    # Define multiple metrics to be created
    metrics = [
        {
            "name": "Sessions_by_session_property_key",
            "metric": "sessions_total",
            "time_granularity": ["five_minute", "hourly", "daily"],
            "data_destination": ["metrics_api", "grafana_cloud"],
            "filters": {
                "op": "and",
                "children": [
                    {
                        "key": "session_property_key",
                        "val": "session_property_value",
                        "field_op": "eq",
                    }
                ],
            },
            "group_by": ["session_property_value"],
        },
    ]

    # Generate tasks for all app IDs and metrics
    tasks = generate_tasks(APP_IDS, metrics)

    # Execute each task to create metrics
    create_metrics_for_all_apps(tasks)


if __name__ == "__main__":
    main()

```
