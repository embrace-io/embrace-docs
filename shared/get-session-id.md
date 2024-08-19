## Overview

Embrace SDK’s API enables customers to programmatically obtain the current Embrace Session ID. Depending on your use case, having the ability to obtain the Embrace Session ID will enable you to share that ID with other observability tools in order to build a URL to that specific session in the Embrace dashboard and make that link available on those third-party tools.

To build the URL to a speficfic session please insert your app id and the provided session id into the following: https://dash.embrace.io/app/{app_id}/open?session_id={session_id}

**When should I call the Current Session ID method?** 

If you call the method before the SDK has started, it will return null. So, you need to call it once the SDK has been started. 

**Can I call this method in the background?**

You can also call this method when the app is in the background. If **Background Activity** is enabled for your app, you’ll get the Session ID for that background activity; if it’s disabled, you’ll get `null/nil`.
