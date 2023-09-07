---
title: Grafana Cloud Integration
description: Learn about the Embrace <> Grafana Cloud integration
sidebar_position: 2
---

# Data Destinations Grafana Cloud Integration

## Prerequisites

- Have an active Grafana Cloud account

## What you will need to share

To initiate the integration, you'll need to share your Grafana Cloud API Key, instance ID, and zone with an Embrace onboarding specialist.

## Pulling your Grafana Cloud API Key

> Only Grafana.com administrators can create or delete API keys. See [Grafana Cloud roles and permissions](https://grafana.com/docs/grafana-cloud/authentication-and-permissions/cloud-roles/) for more information.

<img src={require('@site/static/images/data-destinations/grafana_cloud_api_keys.png').default} alt="Image showing Grafana cloud api key tab" />

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

## Pulling your Instance ID and Zone

1. Log into your [Grafana Cloud account](https://grafana.com/auth/sign-in) to access the **Cloud Portal**.
2. Select the organization you want the instance ID and zone, by selecting from the dropdown in the top left.
3. Click **Details** from the Grafana stack and copy the instance ID and zone.
4. Share the instance ID and zone with an Embrace onboarding specialist.

<img src={require('@site/static/images/grafana_cloud_details.png').default} alt="Image showing Grafana Cloud fields needed" />
