import limits from '@site/shared/limits/ios.json';

### Trace Limits

| Type | Limit |
|------|-------|
| Max number of attributes per span | {limits.traces.maxAttributesPerSpan} |
| Max number of events per span | {limits.traces.maxEventsPerSpan} |
| Max number of attributes per event | {limits.traces.maxAttributesPerEvent} |
| Max number of breadcrumbs per session | {limits.traces.maxBreadcrumbsPerSession} |
| Max length of span names | {limits.traces.maxSpanNameLength} characters |

If you exceed these limits, the operation with the limit-exceeding call will fail.
