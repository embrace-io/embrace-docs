---
title: Grafana Cloud Integration
description: Learn about the Embrace <> Grafana Cloud integration
sidebar_position: 4
---

# Grafana Cloud Integration

## Prerequisites

- Have an active Grafana Cloud account.

## Configure integration

### Pulling your Grafana Cloud API Key or Access Policy / Token

Grafana Cloud migrated from [API Keys to Access Policies](https://grafana.com/docs/grafana-cloud/account-management/authentication-and-permissions/access-policies/#grafana-cloud-migration-from-api-keys-to-access-policies).  
It depends on your Grafana Cloud version the information that you need to share with us.

> Only Grafana administrators can create or delete API Keys and Access Policies. See [Grafana Cloud roles and permissions](https://grafana.com/docs/grafana-cloud/authentication-and-permissions/cloud-roles/) for more information.

#### Access Policy/Token

<img src={require('@site/static/images/data-destinations/grafana_cloud_access_policies.png').default} alt="Image showing Grafana cloud access policy tab" />

1. Log into your [Grafana Cloud account](https://grafana.com/auth/sign-in) to access the **Cloud Portal**.
2. Select the organization that you want to add an Access Policy Token to, by selecting from the dropdown in top left.
3. Click **Access Policies** from the SECURITY section on the left.
4. Click **Create Access Policy**.
   <img src={require('@site/static/images/data-destinations/grafana_cloud_access_policy.png').default} alt="Image showing Grafana cloud access policy tab" />
5. In **Display Name** and **Name**, enter a name for your Access Policy.
6. In **Realms**, choose the organization in which you want the metrics.
7. In **Scopes**, select `write` for Metrics, Logs and Traces. (this only gives permission to send metric, log and trace data to Grafana Cloud).
8. Click **Create** when finished.
   <img src={require('@site/static/images/data-destinations/grafana_cloud_token.png').default} alt="Image showing Grafana cloud token tab" />
9. Click **Add token** to generate it associated with the access policy.
10. In **Token Name**, enter a name for the token.
11. In **Expiration Date**, select `No expiry`.

#### API Key

<img src={require('@site/static/images/data-destinations/grafana_cloud_api_keys.png').default} alt="Image showing Grafana Cloud API key tab" />

1. Log into your [Grafana Cloud account](https://grafana.com/auth/sign-in) to access the **Cloud Portal**.
2. Select the organization that you want to add an API key to, by selecting from the dropdown in top left.
3. Click **API Keys** from the SECURITY section on the left.
4. Click **+Add API Key**.
5. In **API Key Name**, enter a name for your API key.
6. In **Role**, select  `MetricsPublisher` (is only given permission to send metric, log, and trace data to Grafana Cloud).
7. Click **Create API Key**.
8. A token is created and displayed. Copy the token and store it in a safe place, because it will not be displayed again.
9. Share the token with an Embrace onboarding specialist.
10. Click **Close** when finished.

### Pulling your Instance ID and Zone

1. Log into your [Grafana Cloud account](https://grafana.com/auth/sign-in) to access the **Cloud Portal**.
2. Select the organization you want the instance ID and zone, by selecting from the dropdown in the top left.
3. Click **Details** from the Grafana stack and copy the instance ID and zone.
4. Share the instance ID and zone with an Embrace onboarding specialist.

   <img src={require('@site/static/images/grafana_cloud_details.png').default} alt="Image showing Grafana Cloud fields needed" />

## Selecting the correct data source for Embrace Metrics

:::tip
If you are using the Embrace Metrics API, ensure that you configure Grafana to treat the Embrace Metrics API as a data source, rather than setting up your own Prometheus instance. You can reference this [guide](/embrace-api/grafana_integrations.md#setting-up-embrace-as-a-data-source).
:::

Embrace provides two main options for viewing metrics within Grafana: using the **Embrace Metrics API** (pull method) or setting up a **Data Destination** (push method).

For Data Destination ensure that you are selecting the correct prometheus datasource. For example:

<img src={require('@site/static/images/data-destinations/grafana_cloud_prometheus_data_source.png').default} alt="Image showing Grafana Cloud datasource" />

<img src={require('@site/static/images/data-destinations/grafana_cloud_prometheus_data_source_selection.png').default} alt="Image showing the Prometheus data source selection" />

### Embrace Metrics API vs. Data Destination

- **Embrace Metrics API**: Alternatively, you can configure Grafana to pull metrics from Embrace using PromQL queries via the Embrace Metrics API. However, this method requires Grafana to be set up with the Embrace Metrics API as a data source and is typically only used if you have specific requirements for on-demand metrics retrieval.

- **Data Destination**: Embrace can push metrics directly to your Grafana Cloud instance as a data destination. This setup leverages Grafana Cloud's managed Prometheus services, enabling seamless integration without the need for an additional Prometheus instance. This method is ideal for most users who prefer a simple, automated approach to access Embrace metrics within Grafana Cloud.

## Backlinking from Grafana to Embrace

Embrace offers a backlinking feature that enables customers to seamlessly navigate from Grafana panels visualizing Embrace data to the Embrace dashboard.

The destination within the Embrace dashboard depends on the metric being visualized. For example, if the metric represents session data, the user will be redirected to the Sessions page.

This functionality is powered by an API endpoint that can be configured in Grafana visualizations as a "data link", and redirects users to the corresponding Embrace dashboard, preserving the selected time range and aggregations.

### Supported Options

Embrace supports a subset of the filters that may be active in the Grafana visualization where the data link is configured. Please note that any unsupported filters will be ignored when following the backlink to the Embrace dashboard.

Supported options:

- Time range. Embrace will use the same time range on the Embrace dashboard. If the time range is specified in relative format (e.g. "Last 12 hours"), it will be converted to absolute time stamps.
- Aggregations. For example, if the metric is aggregated by `os_version` and `country` (e.g. `sum by(app_id, country, os_version, embrace_metric_name) (embrace_crash_hourly_total)`), Embrace will use those filters with the `equal` operator on the Embrace dashboard.

Unsupported options:

- The following aggregations are ignored when Embrace generates the dashboard backlink:
  - `duration_bucket`, `group_id`, `log_property_value`, `moment_property_value`, `root_span_attribute_value`, `root_span_duration_bucket`,
  `session_property_value`, `status_code`, `tag_value`.
- [Top N](/embrace-api/supported_metrics_and_queries/#dimension-reduction---other) aggregations. Embrace converts these since the `other` value cannot be mapped to a specific value on the Embrace dashboard. Aggregations that are converted:
  - `device_model` converted to `model_market_name` (Model Name).
  - `top_n_domain` converted to `domain`.
  - `top_n_market_name` converted to `model_market_name` (Model Name).
  - `top_n_path` converted to `path`.
- Label filters. For example, a metric that is filtered by `os_version` and `country`, but these labels are not in the aggregation clause (e.g. `sum by(app_id, embrace_metric_name) (embrace_crash_hourly_total{os_version="12", country="US"})`). In this case, Embrace is unable to access the filters in the backlink.
- Filters that are part of the metric specification. Any filters that were configured when the custom metric is initially configured in the Embrace dashboard are not supported by the backlink. For example, a custom metric `sessions_total` that is grouped by `os_version` and filtered by `app_version = 1.2.3` on the Embrace dashboard, and visualized within Grafana as `sum by (app_id, os_version, embrace_metric_name) (embrace_session_hourly_total)` will use `os_version` filter in the backlink, but not the `app_version`.

### Configuring backlinks

1. Go to the Grafana Dashboard where you visualize your Embrace metrics.
2. Go to the Grafana Visualization where you want to add the Embrace dashboard backlink.
  - Ensure that all Embrace metrics are aggregated by `app_id` and `embrace_metric_name`. Embrace uses those aggregations to generate
    the Embrace dashboard backlink. Example: this (`sum by (os_version) (embrace_session_hourly_total)`) doesn't work and this
    (`sum by (os_version, app_id, embrace_metric_name) (embrace_session_hourly_total)`) works.
3. Hover over the Grafana Visualization to reveal the three dot menu in the top-right and select "edit".
4. In the right sidebar menu, scroll down to the "Data Links" section. Click the "+ Add link" button, and enter the following details:
  - **Title**: Embrace.
  - **URL**: `https://api.embrace.io/data-destinations/api/v1/grafana_cloud/dashboard-backlink?labels=${__field.labels}&from=${__from}&to=${__to}`
  - **Open in new tab**: `on`.
    <img src={require('@site/static/images/data-destinations/grafana_cloud_dashboard_backlink.png').default} alt="Image showing the Data Links section backlink" />
