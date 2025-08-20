---
title: Code Samples
description: Learn how to create custom metrics using the Custom Metrics API
sidebar_position: 2
---

# Python Example

This example shows how to create custom metrics across multiple applications.

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
