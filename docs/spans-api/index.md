---
title: Introduction
description: Learn about the Embrace Spans API to retrieve spans information
sidebar_position: 0
---

# Embrace Spans API

The Spans API allows you to query your spans using TraceQL. To get started, take a look at [Grafana Integration guide](/spans-api/grafana_integrations/).
The API implements the Tempo HTTP API, for more information you can read [here](https://grafana.com/docs/tempo/latest/api_docs/#tempo-http-api).
## Prerequisites

- Embrace Spans API Token. This is a different token than the Metrics API token and from the Custom Metrics token. Contact an Embrace onboarding specialist to get this token for your organization. Once you receive the token, you can proceed independently retrieving spans information.

:::info
If you want to get a feel of the API, you can use the Sandbox token: ``
This token will get artificial data for you to test the API and see how it works.
:::

## API Endpoints

All the endpoints have the same authentication and authorization method and url. Use the Spans API token provided by an Embrace onboarding specialist to get spans information.
- `URL`: `https://api.embrace.io/spans`

### Authorization

Headers:
- `Authorization`: we are going to use a Bearer token to authorize and authenticate our requests. 
i.e.: `Authorization: Bearer 7bd49186fed24af699cf93069fc64f03`.


### /search
This endpoint allows you to search for spans based on a TraceQL query.
Parameters:
- `q = (TraceQL query)`: Url encoded [TraceQL query](https://grafana.com/docs/tempo/latest/traceql/#query-with-traceql).
- `limit` = (integer) Optional. Limit the number of search results. Default is 20
- `start` = (unix epoch seconds) Optional. Along with `end` define a time range from which spann should be returned.
- `end` = (unix epoch seconds) Optional. Along with `start`, define a time range from which spans should be returned. Providing both start and end will change the way that Tempo searches. If the parameters are not provided, then it will search the most recent spans.
- `spss` = (integer) Optional. Limit the number of spans on the results. Default value is 3.
To speed up the search, you can filter using the `span.emb.app_id` attribute.

```bash
curl -G 'https://api.embrace.io/spans/api/search?start=1712861280&end=1712861400&spss=5&limit=1' \
--header 'Authorization: Bearer TOKEN' \
--data-urlencode 'q={duration>1s && span.emb.app_id="SpanA" }'
```

Response:
```json
{
  "traces": [
    {
      "traceID": "4d67df900d474c740eb302939b596c3d",
      "rootServiceName": "spans-api",
      "rootTraceName": "GetScreenActivity",
      "startTimeUnixNano": "1713209095273999872",
      "durationMs": 1145,
      "spanSet": {
        "spans": [
          {
            "spanID": "b93e6a12e2c0f376",
            "startTimeUnixNano": "1713209095273999872",
            "durationNanos": "1145683200",
            "attributes": [
              {
                "key": "emb.app_id",
                "value": {
                  "stringValue": "SpanA"
                }
              }
            ]
          }
        ],
        "matched": 1
      },
      "spanSets": [
        {
          "spans": [
            {
              "spanID": "b93e6a12e2c0f376",
              "startTimeUnixNano": "1713209095273999872",
              "durationNanos": "1145683200",
              "attributes": [
                {
                  "key": "emb.app_id",
                  "value": {
                    "stringValue": "SpanA"
                  }
                }
              ]
            }
          ],
          "matched": 1
        }
      ]
    }
  ],
  "metrics": {
    "inspectedBytes": "4105140",
    "completedJobs": 1,
    "totalJobs": 1
  }
}
```

#### Search specific span
To search for a specific span you need to add in the query parameter the span id you want to search for
using `span.emb.span_id` attribute.

```bash

curl -G 'https://api.embrace.io/spans/api/search' \
--header 'Authorization: Bearer TOKEN' \
--data-urlencode 'q={span.emb.span_id="1f8ecc91e9c89cc4" && span.emb.app_id="SpanA"}' | jq
```

Response:
```json
{
  "traces": [
    {
      "traceID": "622fe24d0340364fe58707642fa51ec",
      "rootServiceName": "spans-api",
      "rootTraceName": "GetScreenApi",
      "startTimeUnixNano": "1713207459947000064",
      "durationMs": 240,
      "spanSet": {
        "spans": [
          {
            "spanID": "1f8ecc91e9c89cc4",
            "startTimeUnixNano": "1713207459947000064",
            "durationNanos": "240393728",
            "attributes": [
              {
                "key": "emb.span_id",
                "value": {
                  "stringValue": "1f8ecc91e9c89cc4"
                }
              },
              {
                "key": "emb.app_id",
                "value": {
                  "stringValue": "SpanA"
                }
              }
            ]
          }
        ],
        "matched": 1
      },
      "spanSets": [
        {
          "spans": [
            {
              "spanID": "1f8ecc91e9c89cc4",
              "startTimeUnixNano": "1713207459947000064",
              "durationNanos": "240393728",
              "attributes": [
                {
                  "key": "emb.span_id",
                  "value": {
                    "stringValue": "1f8ecc91e9c89cc4"
                  }
                },
                {
                  "key": "emb.app_id",
                  "value": {
                    "stringValue": "SpanA"
                  }
                }
              ]
            }
          ],
          "matched": 1
        }
      ]
    }
  ],
  "metrics": {
    "inspectedBytes": "63930534",
    "completedJobs": 1,
    "totalJobs": 1
  }
}
```

### /traces
To get a specific trace you can use the `/traces` endpoint. You need to provide the trace id in the url:
```bash
curl 'https://api.embrace.io/spans/api/traces/4d67df900d474c740eb302939b596c3d' \
--header 'Authorization: Bearer TOKEN' | jq
```


```json
{
  "batches": [
    {
      "resource": {
        "attributes": [
          {
            "key": "deployment.environment",
            "value": {
              "stringValue": "prod"
            }
          },
          {
            "key": "service.version",
            "value": {
              "stringValue": "1.0"
            }
          },
          {
            "key": "telemetry.sdk.language",
            "value": {
              "stringValue": "go"
            }
          },
          {
            "key": "telemetry.sdk.name",
            "value": {
              "stringValue": "opentelemetry"
            }
          },
          {
            "key": "telemetry.sdk.version",
            "value": {
              "stringValue": "1.24.0"
            }
          },
          {
            "key": "service.name",
            "value": {
              "stringValue": "spans-api"
            }
          }
        ]
      },
      "scopeSpans": [
        {
          "scope": {
            "name": "spans-api",
            "version": "1.0"
          },
          "spans": [
            {
              "traceId": "TWffkA1HTHQOswKTm1lsPQ==",
              "spanId": "uT5qEuLA83c=",
              "name": "GetScreenAction",
              "kind": "SPAN_KIND_CLIENT",
              "startTimeUnixNano": "1713209095273999872",
              "endTimeUnixNano": "1713209096419683072",
              "attributes": [
                {
                  "key": "emb.app_id",
                  "value": {
                    "stringValue": "SpanA"
                  }
                },
                {
                  "key": "emb.app_version",
                  "value": {
                    "stringValue": "2.286"
                  }
                },
                {
                  "key": "emb.os",
                  "value": {
                    "stringValue": "android"
                  }
                },
                {
                  "key": "emb.os_version",
                  "value": {
                    "stringValue": "13"
                  }
                },
                {
                  "key": "emb.region",
                  "value": {
                    "stringValue": "Attica"
                  }
                },
                {
                  "key": "emb.country_iso",
                  "value": {
                    "stringValue": "GR"
                  }
                },
                {
                  "key": "emb.framework",
                  "value": {
                    "stringValue": "native"
                  }
                },
                {
                  "key": "emb.device_id",
                  "value": {
                    "stringValue": "CF5EC6DCD5B14E1BB6743782651F1862"
                  }
                },
                {
                  "key": "emb.sdk_version",
                  "value": {
                    "stringValue": "6.2.1"
                  }
                },
                {
                  "key": "emb.session_start_time",
                  "value": {
                    "stringValue": "2024-04-15 19:24:55.213 +0000 UTC"
                  }
                },
                {
                  "key": "emb.session_end_time",
                  "value": {
                    "stringValue": "2024-04-15 19:25:14.762 +0000 UTC"
                  }
                },
                {
                  "key": "emb.span_id",
                  "value": {
                    "stringValue": "b93e6a12e2c0f377"
                  }
                },
                {
                  "key": "emb.dashboard_session",
                  "value": {
                    "stringValue": "https://dash.embrace.io/app/otiLr/grouped_sessions/day/CF5EC6DCD5B14E1BB6743782651F1862/67C89355BE094433981F2B7BA4CEFEC9@/67C89355BE094433981F2B7BA4CEFEC9"
                  }
                },
                {
                  "key": "emb.session_prop_experiment_remove_phone_number_google_signup_android",
                  "value": {
                    "stringValue": "off"
                  }
                },
                {
                  "key": "emb.session_prop_simCountryIso",
                  "value": {
                    "stringValue": "gr"
                  }
                }
              ],
              "status": {
                "code": "STATUS_CODE_OK"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

### Embrace Attributes
These are the attributes that you can use to filter your spans:
- emb.app_id
- emb.app_version
- emb.os
- emb.os_version
- emb.region
- emb.country_iso
- emb.framework
- emb.device_id
- emb.sdk_version
- emb.session_start_time
- emb.session_end_time
- emb.span_id
- emb.parent_span_id
- emb.dashboard_session
- emb.session_prop_{key} for every key on session properties
