---
title: Introduction
description: Learn about the Embrace integrations for viewing your data
sidebar_position: 0
---

# Data Destinations

As part of our Metrics Forwarding package, Embrace offers a number of Data Destinations to deliver your metrics to your
cross-platform observability tool of choice:

* [Chronosphere integration guide](/data-destinations/chronosphere-setup.md)
* [Datadog integration guide](/data-destinations/data-dog-setup.md)
* [Elastic integration guide](/data-destinations/elastic-setup.md)
* [Grafana Cloud integration guide](/data-destinations/grafana-cloud-setup.md)
    * [Grafana visualization suite integration guide](/embrace-api/grafana_integrations/)
* [Honeycomb integration guide](/data-destinations/honeycomb.md)
* [New Relic integration guide](/data-destinations/new-relic-setup.md)
* [Splunk integration guide](/data-destinations/splunk.md)

## Metrics

Metric name follows the format `embrace.<metric_name>.<granularity>` or `embrace_<metric_name>_<granularity>` depending
on the data destination conventions. Some data destinations apply changes on the metric name. For example, Grafana Cloud
receives the metric name as `embrace_sessions_total_five_minute` but it converts it into `embrace_sessions_five_minute_total`.

All data destinations receive the following Standard metrics:

| Data Destinations | Metric Names                                                                                                           |                                                                                                                        
|-------------------|------------------------------------------------------------------------------------------------------------------------|
| Grafana Cloud     | embrace_crash_five_minute_total, embrace_session_five_minute_total, embrace_crash_free_user_five_minute_total          |
| Grafana Cloud     | embrace_crash_hourly_total, embrace_session_hourly_total, embrace_crash_free_user_hourly_total                         |
| Grafana Cloud     | embrace_crash_daily_total, embrace_session_daily_total, embrace_crash_free_user_daily_total, embrace_users_daily_total |
| Others            | embrace.crash_total.hourly, embrace.session_total.hourly, embrace.crash_free_user_total.hourly                         |
| Others            | embrace.crash_total.daily, embrace.session_total.daily, embrace.crash_free_user_total.daily, embrace.users_total.daily |
| Others            | embrace.crash_total.five_minute, embrace.session_total.five_minute, embrace.crash_free_user_total.five_minute          |

## Get Started

Head
to [Settings -> Integrations -> Data Destinations](https://dash.embrace.io/settings/organization/integrations/data_destinations)
in the dashboard and setup your first data destination:

<img src={require('@site/static/images/data-destinations/settings_page_example.png').default} alt="Image showing the
settings page for data destinations" />

