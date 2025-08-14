---
title: Observe Integration
description: Learn about the Embrace <> Observe integration
sidebar_position: 6
---

# Observe Integration

## Prerequisites

- Have an active Observe account
- Have a [datastream](https://docs.observeinc.com/en/latest/content/data-ingestion/datastreams.html) configured and token to publish to that datastream
- Have your customer ID ready. Your customer ID is a numerical ID that can be found in the URL of your observe dashboard:
```shell
# Format:
https://<customer_id>.collect.observeinc.com

# Example:
https://123456789012.collect.observeinc.com
```
## Create Observe Data Destination

1. Navigate to the [Data Destinations](https://dash.embrace.io/settings/organization/integrations/data_destinations) and select
Add Data Destination.  
1. Select Observe in the dropdown and the apps that you want to forward.
1. Input the token and the customer ID.  

<img src={require('@site/static/images/data-destinations/observe_config.png').default} alt="Image showing Observe data destination form" width="50%"/>
