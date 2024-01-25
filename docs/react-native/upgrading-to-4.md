# Upgrade guide

# Upgrading to 4.x

## Updated Embrace Package
Please note we've changed the package so you will need to install the new Embrace SDK - [see details here](/react-native/integration/add-embrace-sdk/)

## Asyncronous methods (Promises)
Since version 4.0, all our methods promises. Therefore, if you need to retrieve a value, such as the session ID, you should use await/then to wait for the response.

## Replace usage of deprecated methods with new ones

Version 4.0 of the Embrace React Native SDK renames some functions. This has been done to reduce
confusion & increase consistency across our SDKs.


| Old API                                               | New API                                                             | Comments                                                              |
|-------------------------------------------------------|---------------------------------------------------------------------|:----------------------------------------------------------------------|
| `setUserPersona(String)`        | `addUserPersona(String)`                      | Renamed function to better describe functionality.                    |
| `logBreadcrumb(String)`         | `addBreadcrumb(String)`                       | Renamed function to better describe functionality.                    |
| `startEvent()`                  | `startMoment(String)`                         | Renamed function to better describe functionality.                    |
| `endEvent()`                    | `endMoment(String)`                           | Renamed function to better describe functionality.                    |
| `logInfo(String, ...)`          | `logMessage(...)`                             | Altered function signature to standardise behavior.                   |
| `logWarning(String, ...)`       | `logMessage(...)`                             | Altered function signature to standardise behavior.                   |
| `logError(String, ...)`         | `logMessage(...)`                             | Altered function signature to standardise behavior.                   |
| `logNetworkCall()`              | `recordNetworkRequest(...)` | Renamed function to better describe functionality.                    |
| `logNetworkRequest()`              | `recordNetworkRequest(...)` | Renamed function to better describe functionality.                    |

### Previously deprecated APIs that have been removed

| Old API                                     | Comments                                                 |
|---------------------------------------------|----------------------------------------------------------|
| `startMomentAllowingScreenshot`             | Deprecated API that is no longer supported.              |
| `logMessage(..., allowScreenshot)`          | Deprecated API that is no longer supported.              |
