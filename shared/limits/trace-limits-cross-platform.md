import limits from '@site/shared/limits/cross-platform.json';

### Limits

| Type | Limit |
|------|-------|
| Max number of spans per session | {limits.traces.maxSpansPerSession} |
| Max number of attributes per span | {limits.traces.maxAttributesPerSpan} |
| Max number of events per span | {limits.traces.maxEventsPerSpan} |
| Max number of attributes per event | {limits.traces.maxAttributesPerEvent} |
| Max length of attribute keys | {limits.traces.maxAttributeKeyLength} characters |
| Max length of attribute values | {limits.traces.maxAttributeValueLength} characters |
| Max length of span names | {limits.traces.maxSpanNameLength} characters |
| Max length of event names | {limits.traces.maxEventNameLength} characters |

:::warning Exceeding Limits
If you exceed the listed limits, the operation with the limit-exceeding call will fail. See the API documentation for details.
:::
