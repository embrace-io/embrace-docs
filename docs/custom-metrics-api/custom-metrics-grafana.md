---
title: Custom Metrics in Grafana
description: Access your Custom Metrics via your Grafana dashboards
sidebar_position: 1
---

# Embrace Custom Metrics 

Custom Metrics you create in Embrace are available for use in Grafana.

To set up: follow [our instructions](/embrace-api/grafana_integrations/) for integrating Embrace's Metrics API as a data source in Grafana.

Then every Custom Metric you make will automatically be available when you use Grafana's "Metrics Explorer" in the Visualization builder.

Names will only show up once data begins populating the metric.  This means there's a delay for 5-minute, hourly, and daily results to be aggregated.
