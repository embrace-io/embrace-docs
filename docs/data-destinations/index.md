---
title: Introduction
description: Learn about the Embrace integrations for viewing your data
sidebar_position: 0
---

# Embrace Data Destinations

As part of our Metrics Forwarding package, Embrace offers a number of Data Destinations to deliver your metrics to your
cross-platform observability tool of choice:

* [Chronosphere integration guide](/data-destinations/chronosphere-setup.md)
* [Datadog integration guide](/data-destinations/data-dog-setup.md)
* [Grafana Cloud integration guide](/data-destinations/grafana-cloud-setup.md)
  * [Grafana visualization suite integration guide](/embrace-api/grafana_integrations/)
* [Honeycomb integration guide](/data-destinations/honeycomb.md)
* [New Relic integration guide](/data-destinations/new-relic-setup.md)
* [Splunk integration guide](/data-destinations/splunk.md)

All data destinations receive a set of Standard metrics in daily, hourly, and five-minutely granularities:

| Data Destinations                                   | Metric Names                                                                                                             |                                                                                                                        
|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| Chronosphere, Datadog, Honeycomb, New Relic, Splunk | embrace.crash_total.five_minute, embrace.session_total.five_minute, embrace.crash_free_user_total.five_minute            |
| Chronosphere, Datadog, Honeycomb, New Relic, Splunk | embrace.crash_total.hourly, embrace.session_total.hourly, embrace.crash_free_user_total.hourly                           |
| Chronosphere, Datadog, Honeycomb, New Relic, Splunk | embrace.crash_total.daily, embrace.session_total.daily, embrace.crash_free_user_total.daily, , embrace.users_total.daily |
| Grafana Cloud                                       | embrace_crash_total_five_minute, embrace_session_total_five_minute, embrace_crash_free_user_total_five_minute            |
| Grafana Cloud                                       | embrace_crash_total_hourly, embrace_session_total_hourly, embrace.crash_free_user_total_hourly                           |
| Grafana Cloud                                       | embrace_crash_total_daily, embrace_session_total_daily, embrace_crash_free_user_total_daily, embrace_users_total_daily   |

To get started head to Settings -> Integrations in the dashboard and setup your first destination:

<img src={require('@site/static/images/data-destinations/settings_page_example.png').default} alt="Image showing the
settings page for data destinations" />

