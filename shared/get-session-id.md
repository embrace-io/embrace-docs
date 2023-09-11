## Current Session ID

Embrace SDK’s API enables customers to programmatically obtain the current Embrace Session ID. Depending on your use case, having the ability to obtain the Embrace Session ID will enable you to share that ID with other observability tools in order to build a URL to that specific session in the Embrace dashboard and make that link available on those third-party tools.

**When should I call the Current Session ID method?** 

If you call the method before the SDK has started, it will return null. So, you need to call it once the SDK has been started. 

**Can I call this method in the background?**

You can also call this method when the app is in the background. If **Background Activity** is enabled for your app, you’ll get the Session ID for that background activity; if it’s disabled, you’ll get `null/nil`.

:::warning Important
- The API can only be called after the SDK has been started. If a call is made prior to starting the Embrace SDK, you will get a response of `null/nil`
- It will return the Embrace Session ID, when the app is in foreground and when it is in background if you have `Background Activity` enabled.
- If you use the Session ID to form a `URL` that points to the session view in our dashboard, please consider that the URL is suitable to be updated at any time.
:::