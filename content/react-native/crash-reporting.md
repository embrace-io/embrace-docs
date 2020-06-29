---
title: "Crash Reporting"
weight: 6
---

# Collect your first crash report 

## Setting up the Crash Reporter

If you've been following along, you should be setup to collect native crash reports. 
To upload crash reports from unhandled JavaScript exceptions, add the following in the entrypoint of the React app.

```javascript
import {initialize} from 'react-native-embrace'

initialize();
```

This will setup a hook that gets called and uploads a crash report when the application crashes because of an unhandled JavaScript exception.
You can also pass in a patch number to the `initialize` function to use along side the version of the app to pinpoint which JavaScript bundle the user was running when the app crashed.

```javascript
initialize({patch: 'v1'});
```

{{< hint info >}}
**Note for iOS**

If you'd like to use Embrace's internal crash reporter,
set the `CRASH_REPORT_ENABLED` field to true in the `Embrace-Info.plist` file that you created earlier (as
described in the [Adding the Embrace SDK]({{< relref "/react-native/add-embrace-sdk" >}}) page).
If you're using Crashlytics, set this value to false.
{{< /hint >}}

## Triggering a Crash

Now we're ready to trigger a crash.
Either crash the app organically, or add the following code to make it crash.

```javascript
throw new Error('This is a crash');
```

Embrace only uploads crash reports for applications that are running in release mode.
Build and run your application in release mode.

Remember that Embrace sessions only upload on subsequent launches.
This means that after seeing the application crash, you must now launch the application again for that crashed session to upload to the Embrace servers.

Once uploaded you should notice that your session is marked with the "crashed" icon.
Additionally your crash is visible in the crashes section of the dashboard.

---

In the next section, you'll be learning how to annotate sessions with user identifiers. 

{{< button relref="/react-native/identify-users" >}}Learn How to Identify Your Users{{< /button >}}
