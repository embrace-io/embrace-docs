---
title: "Web Thread Monitoring"
description: Embrace can monitor the JavaScript threads in your WKWebViews
weight: 6

---

# Web Thread Monitoring

WKWebView allows your application to display html and JavaScript content using the full power of the Safari browser engine. To make this work, Apple uses out-of-process threads to optimize the performance of these views and protect your application from crashes. You can read more about how this works on our [our blog](https://blog.embrace.io/webview-thread-terminations/).

Embrace will automatically track those threads and add logs to your session when the threads crash. These logs can help you understand the impact to your users and decide whether you should work on improving the JavaScript code or not.

When JavaScript threads terminate, your users see a blank white view where your content used to be. Embrace can automatically reload your content if you set this flag in your `Embrace-Info.plist` file:

```sh
ENABLE_WK_AUTO_RELOAD
```

Keep in mind that reloading web content is not always the best option. This is especially if you rely on third party advertising sdks, reloading that content could interfere with other reporting systems. Only use this flag if you are sure that reloading the content is safe for your application. You can further customize this behavior by implementing `WKNavigationDelegate`'s `webViewWebContentProcessDidTerminate` method.  
