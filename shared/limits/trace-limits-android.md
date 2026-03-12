import limits from '@site/shared/limits/android.json';

### Limits

| Type | Limit |
|------|-------|
| Max number of spans per session | {limits.traces.maxSpansPerSession} |
| Max number of attributes per span | {limits.traces.maxAttributesPerSpan} |
| Max number of events per span | {limits.traces.maxEventsPerSpan} |
| Max number of attributes per event | {limits.traces.maxAttributesPerEvent} |
| Max number of links per span | {limits.traces.maxLinksPerSpan} |
| Max length of attribute keys | {limits.traces.maxAttributeKeyLength} characters |
| Max length of attribute values | {limits.traces.maxAttributeValueLength} characters |
| Max length of span names | {limits.traces.maxSpanNameLength} characters |
| Max length of event names | {limits.traces.maxEventNameLength} characters |

There are no limits to the number of child spans you can have per root span, provided the total number of spans does not exceed the per-session maximum.
