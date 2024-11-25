---
title: Metrics migration (2023-10-23)
description: How-to update your queries to the latest Metrics
sidebar_position: 5
---

# Metrics migration (2023-10-23)

Embrace is updating its beta Metrics API to support interoperability.  This means all metrics, both the pre-built or Standard and Custom Metrics, can be combined in any analyses you plan on doing.  Sum across time-ranges and other dimensions, compare one Metric with another, or use multiple metrics to compute relevant rates.

Unfortunately this means some metrics will no longer be supported, and others will be brought into our standardized data environment and naming conventions.

## Metrics being deprecated

### daily_crash_free_session_rate
"Rates" are no longer being supported in the Embrace Metrics API, because they are by definition not compatible with other metrics or themselves.

**You can still calculate rates on your end!**

To build this rate, you can update your query:

`daily_crash_free_session_rate` => `1 - daily_crashes_total / daily_sessions_total`


### sessions_by_device_model_total
"_by_device_" is now supported by _ALL_ Metrics.

To build this cut, you can update your query:

`sessions_by_device_model_total` => `daily_sessions_total`
