---
title: Elastic Integration
description: Learn about the Embrace <> Elastic integration
sidebar_position: 3
---

# Elastic Integration

## Prerequisites

- Have an active Elastic account
- Have an [APM server setup](https://www.elastic.co/guide/en/fleet/7.15/fleet-quick-start-traces.html) (You may have a
default APM integration setup already).

## Configuration 

### Get Secret Token for APM

If you have set a [secret token already](https://www.elastic.co/guide/server/current/secret-token.html) you can use that
token. Otherwise, you can use the default token in your integration. The instructions below are for the default token.

1. Click the hamburger menu to open the menu and select "Management".
2. Select "Fleet", then "Agent policies". You should see a default policy.
3. Click into the default policy, and select the "Elastic APM integration policy".
4. Scroll down to the Agent authorization section and select the secret token.

### Find Server URL

If you have an APM server URL already configured you can use that. Otherwise, you can use the default server URL in your
integration. The instructions below are for the default server URLs.

1. Click the hamburger menu to open the menu and select Management.
2. Select Fleet, then Agent policies. You should see a default policy.
3. Click into the default policy, and select the Elastic APM integration policy.
4. Select the APM Agents tab, and scroll down to the OpenTelemetry section. Use the value for the `OTEL_EXPORTER_OTLP_ENDPOINT`.

## Querying your data

### Metrics

Your metrics will be prefixed with `embrace.`. You can visualize your data using the "Dashboards" view under the "Analytics" section of the hamburger menu. Below is a sample dashboard panel and the configuration for it.

<img src={require('@site/static/images/data-destinations/elastic_metrics.png').default} alt="Image showing Elastic panel with metrics" width="50%"/>
<img src={require('@site/static/images/data-destinations/elastic_metric_config.png').default} alt="Image showing Elastic panel configuration" width="30%" style={{"padding": "20px"}} />

### Network Spans

You can explore your forwarded spans under the "APM" page under the "Observability" section. You should see `embrace-trace-forwarder`
as the service.

<img src={require('@site/static/images/data-destinations/elastic_traces.png').default} alt="Image showing Traces in Elastic dashboard" />

### Logs

You can explore your logs under the "Discovery" page, you should choose "logs-*" as data view.

<img src={require('@site/static/images/data-destinations/elastic_logs.png').default} alt="Image showing Logs in Elastic dashboard" />
