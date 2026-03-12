import limits from '@site/shared/limits/web.json';

### Trace Limits

| Type | Limit |
|------|-------|
| Max number of spans per session | {limits.traces.maxSpansPerSession.toLocaleString()} |
| Max number of attributes per span | {limits.traces.maxAttributesPerSpan} |
| Max number of events per span | {limits.traces.maxEventsPerSpan} |
| Max number of attributes per event | {limits.traces.maxAttributesPerEvent} |
| Max length of attribute keys | {limits.traces.maxAttributeKeyLength} characters |
| Max length of attribute values | {limits.traces.maxAttributeValueLength} characters |
| Max length of span names | {limits.traces.maxSpanNameLength} characters |
| Max length of event names | {limits.traces.maxEventNameLength} characters |
