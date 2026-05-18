---
title: Elastic Integration
description: Learn about the Embrace <> Elastic integration
sidebar_position: 3
---

## Elastic Integration

### Prerequisites

- Have an active Elastic account with hosted OTLP ingest available (serverless projects, or hosted cloud on AWS 9.2.x+).

### Configuration

#### Pulling your Elastic API Key ([Elastic documentation](https://www.elastic.co/docs/api/doc/elasticsearch/authentication))

1. Log into your Elastic account.
2. Create an API key with permission to ingest OTel data into your deployment.
3. Elastic provides the API key in encoded form (a base64 string of `<id>:<key>`). Copy this encoded value to use it on the Embrace dashboard.

#### Pulling your Elastic Server URL

1. In Elastic, onboard OTel app data for your deployment. Elastic surfaces the hostname of the hosted OTLP ingest endpoint alongside the API key.
2. The hostname follows the pattern `https://<deployment_id>.ingest.<region>.<cloud>.elastic.cloud:443`. Use this value (including the `:443` port) as the Server URL on the Embrace dashboard.

### Querying your data

#### Metrics

Your metrics will be prefixed with `embrace.`. You can visualize your data using the "Dashboards" view under the "Analytics" section of the hamburger menu. Below is a sample dashboard panel and the configuration for it.

<img src={require('@site/static/images/data-destinations/elastic_metrics.png').default} alt="Image showing Elastic panel with metrics" width="50%"/>
<img src={require('@site/static/images/data-destinations/elastic_metric_config.png').default} alt="Image showing Elastic panel configuration" width="30%" style={{"padding": "20px"}} />

#### Network Spans

You can explore your forwarded spans under the "APM" page under the "Observability" section. You should see `embrace-trace-forwarder`
as the service.

<img src={require('@site/static/images/data-destinations/elastic_traces.png').default} alt="Image showing Traces in Elastic dashboard" />
