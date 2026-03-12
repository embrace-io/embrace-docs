import limits from '@site/shared/limits/cross-platform.json';

:::warning Limits on Log Messages
* The maximum length for a log message is {limits.logs.maxMessageLength} characters. Messages are truncated if they exceed the limit.
* Properties are limited to {limits.logs.maxPropertiesPerLog} per log.
* Property keys have a limit of {limits.logs.maxPropertyKeyLength} characters.
* Property values have a limit of {limits.logs.maxPropertyValueLength} characters.
:::
