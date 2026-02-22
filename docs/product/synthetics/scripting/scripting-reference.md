---
title: Scripting Reference
description: A reference guide for scripting synthetic tests
sidebar_position: 0
---

## 1. Getting started

Before you get started, refer to the [scripting guide](./index.md) for a review of how to add synthetic scripts to your test configuration. Here you will find the basics you need to know before writing your first script.

```text
// Comments like these are ignored
// So are blank lines
```

- Each line of the script contains a command and any parameters.

- Parameters are tab delimited

- A script timeout of 120 seconds is enforced for all tests

## 2. Operating on the DOM

Commands operating on the DOM identify the element with a format of `attribute=value`
If you are filling out a form and you want to populate an element like this:

`<input type="text" class="tabInputFields" id="lgnId1" value="" tabindex="1"
maxlength="99" name="loginId"/>`

You can identify the element as `id=lgnld1`, `name=loginId` or `tabindex=1`. The `class` attribute is special and is referenced as `className`. Use the `name` attribute when possible for form fields.

In addition to attribute matching, you can match on `innerText` and `innerHtml`. Both will match the contents of the DOM element instead of the attributes.

`<div dojoattachpoint="containerNode" class="label">Delete</div>`

This can be identified by `innerText=Delete`. Matching is case sensitive and matches on the full string.

## 3. Multi-step scripts

Embrace does not report data for multi-step scripts separately. If scripting a multi-step transaction, you need to disable data logging for intermediate steps.

```text
// Suppress data logging
logData 0
​
// Navigate through a user journey
navigate  https://www.yoursite.com
navigate  https://www.yoursite.com/pagetwo

// Enable data logging
logData 1
​
// Record this step
navigate  https://www.yoursite.com/lastpage
```

## 4. Working with variables

In order to simplify your scripts and help with script maintenance, variable may be used.

Replacing URL for a test using %URL%. The %URL% is the initial URL defined in your site settings.

```text
//URL being tested is https://example.com
navigate %URL%
// output: navigate  https://example.com
```

Host of the URL for the test (not including protocol) using %HOST%

```text
//URL being tested is https://example.com
setDnsName %HOST% dns.example
// output: setDnsName  example.com dns.example
```

Origin of the URL (includes protocol and port if defined) using %ORIGIN%

```text
//URL being tested is https://example.com/blog
setCookie  %ORIGIN% foo=bar
// output: setCookie https://example.com foo=bar
​
//URL being tested is https://example.com:8080/blog
setCookie  %ORIGIN% foo=bar
// output: setCookie https://example.com:8080 foo=bar
```

%HOST_REGEX% – Using HOST compatible with regular expressions by escaping dots

```text
//URL being tested is https://example.com
setHeader  Foo: Bar  %HOST_REGEX%
// output: setHeader Foo: Bar  example\.com
```

%HOSTR% – Using the final host name of the URL after following redirects

```text
//URL being tested is https://redirect.example.com
setDnsName %HOSTR% dns.example
// output: setDnsName  example.com dns.example
```

%TEST_ID% – replaced with the id of the current test

```text
// URL being tested is https://example.com
navigate  %URL%/?tag=%TEST_ID%
// output: navigate https://example.com/?tag=230518_XF_3
```

## 5. Command reference

### Navigating and Interacting with the DOM

#### navigate

Navigates the browser to the provided url.

```text
// usage: navigate <url>
navigate  https://example.com
```

NOTE: there is the hard limit of 20 `navigate` and `...AndWait` (f.i. `execAndWait`, `clickAndWait` etc.) commands added to the script. Once this limit is reached, the test will fail to execute.

#### click

Triggers a click event for the identified element. This **DOES NOT** have an implied wait after the event.

```text
// usage: click <attribute=value>
click id=Go
```

#### clickAndWait

Triggers a click event for the identified element and waits for the browser activity to complete.

```text
// usage: clickAndWait <attribute=value>
clickAndWait  innerText=Publish
```

#### selectValue

Selects a value from a dropdown list of the element.

```text
// usage: selectValue <attribute=value> <value>
selectValue id=country  usa
```

#### sendClick / sendClickAndWait

Creates a JavaScript OnClick event and sends it to the indicated element.

```text
// usage: sendClickAndWait  <attribute=value>
sendClickAndWait  innerText=Send
```

#### sendKeyDown / sendKeyUp / sendKeyPress (AndWait)

Creates a JavaScript keyboard event (OnKeyDown, OnKeyUp, OnKeyPress) and sends it to the indicated element.

```text
// usage: sendKeyDownAndWait  <attribute=value>    <key>
// <key> - Key command to send (special values are ENTER, DEL, DELETE, BACKSPACE,
//TAB, ESCAPE, PAGEUP, PAGEDOWN)
sendKeyDownAndWait  name=user    x
```

#### setInnerHTML

Sets the innerHTML of the given DOM element to the provided value. INCLUDES HTML formatting.

```text
// usage: setInnerHTML  <attribute=value> <value>
setInnerHTML  myContent %MSG%
```

#### setInnerText

Sets the innerText of the given DOM element to the provided value. DOES NOT INCLUDE HTML formatting.

```text
// usage: setInnerText  <attribute=value> <value>
setInnerText  myContent %MSG%
```

#### setOPTValue

Generates a six digit Time-Based One Time Password (TOTP) and sets the value attribute of the given DOM element to the generated value.

```text
// usage: setOTPValue <attribute=value> <seed value>
setOTPValue id=totpmfa  I65VU7K5ZQL7WB4E
```

Here's an example of it's use with an example TOTP page (to see the whole flow in one test remove the `logData` commands and place a `combineSteps` command at the start)

```text
logData 0
navigate  https://authenticationtest.com/totpChallenge/
setValue  id=email  totp@authenticationtest.com
setValue  id=password pa$$w0rd
setOTPValue id=totpmfa  I65VU7K5ZQL7WB4E
logData 1
clickAndWait  type=submit
```

#### setValue

Sets the value attribute of the given DOM element to the provided value. Currently only "input" and "textArea" element types are supported.

```text
// usage: setValue  <attribute=value> <value>
setValue  name=loginId  userName
```

#### setValueEx

Sets the value attribute of the given DOM element to the provided value and updates the Virtual DOM value too.

```text
// usage: setValueEx  <attribute=value> <value>
setValueEx  name=username demo
```

Writing scripts for forms on pages that use frameworks with a Virtual DOM is verbose and can be error prone.

Typically scripts have used the `exec` command with a JavaScript snippet like this to complete a form field and then fire an input event to update the VDOM.

```text
exec  el = document.querySelector('[name="username"]'); proto = Object.getPrototypeOf(el); set = Object.getOwnPropertyDescriptor(proto, 'value').set; set.call(el, 'demo'); el.dispatchEvent(new Event('input', { bubbles: true }));
```

`setValueEx` attempts to simplify the script by populating the input field and then firing both input and change events to signal it's been updated so the VDOM updates too.

In the example below the _username_ and _password_ fields are both set to the value of _demo_ without needing the JavaScript snippet.

```text
logData 0
navigate  %URL%
setValueEx  name=username demo
setValueEx  name=password demo
logData 1
clickAndWait  type=submit
```

**This is an experimental script command**

If we're happy with its reliability then we will change the main `setValue` command to have the same behavior.

#### submitForm

Triggers a submit event for the identified form.

```text
// usage: submitForm  <attribute=value>
example: submitForm name=AOLLoginForm
```

#### exec

Executes JavaScript.

```text
// usage: exec  <JavasSript code>
exec  window.setInterval('window.scrollBy(0,600)', 1000);
```

#### execAndWait

Executes JavaScript and waits for the browser to complete any activity generated from the action. Only use this if the action will cause network activity. If the action does not cause a page transition use `exec` instead.

```text
// usage: execAndWait <JavaScript code>
execAndWait window.setInterval('window.scrollBy(0,600)', 1000);
```

NOTE: there is the hard limit of 20 `navigate` and `...AndWait` (e.g. `execAndWait`, `clickAndWait` etc.) commands added to the script. Once this limit is reached, the test will fail to execute.

#### injectScript

Queues a JavaScript snippet to be executed soon after the next navigation.

```text
// usage: injectscript  <JavaScript code>
injectscript  (function () { style = document.createElement('style'); style.innerHTML = "p {filter: blur(5px) !important}"; document.head.appendChild(style); })();
// navigate to the final URL where the p elements will be blurred
navigate https://example.com
```

When there is more than one `injectScript` command the scripts are executed in the order they're listed.

Each script is executed only once, but the command can be repeated before later navigation steps too.

If the script contains variables, consider wrapping it in an IIFE (Immediately Invoked Function Expression) to prevent these variables polluting the global namespace i.e.`(function () { insert js code here })();`

This is only supported in Chrome and the emulated mobile browsers which are based on Chrome.

### End conditions

#### setABM

Sets the "Activity Based Measurement" mode.
Valid values are:

- 0 - Disabled (Web 1.0 - Measure based off of document complete)

- 1 - Enabled (Web 2.0 - Measure until activity stops)
The default if not specified in the script is 1 (Enabled) Browser Support: IE, Chrome, Firefox

```text
// usage: setABM  <mode>
setABM  0
```

#### setActivityTimeout

Overrides the timeout value for the time after the last network activity before a test is considered complete (defaults to 2000 which is 2 seconds).

```text
// usage: setActivityTimeout  <timeout in milliseconds>
setActivityTimeout  5000
```

#### setTimeout

Overrides the timeout value for the individual script steps.

```text
// usage: setTimeout  <timeout in seconds>
setTimeout  60
```

### Request Manipulation

#### block

Blocks individual requests from loading. The command matches the list of things to block against the full url of each request (including host name). Takes a space-delimited list of requests to block.

```text
// usage: block    <block strings>
block    adswrapper.js addthis.com
```

#### blockDomains

Blocks all requests from the given domains from loading. Takes a space-delimited list of full domains to block.

```text
// usage: blockDomains    <block domains>
blockDomains    adswrapper.js addthis.com
```

#### blockDomainsExcept

Blocks all requests not from one of the given domains from loading. Takes a space-delimited list of full domains to allow.

```text
// usage: blockDomainsExcept    <allow domains>
blockDomainsExcept    www.example.com cdn.example.com
```

#### setCookie

Stores a browser cookie to be used while navigating.

```text
// usage: setCookie <path>  <value>
setCookie http://www.example.com zip=80212
// setting multiple cookies for a path
setCookie http://www.example.com TestData = Test; expires = Sat,01-Jan-2031 00:00:00 GMT
```

#### setDns

Allows for overriding the IP address to be used for a host name. The override is effectively the same as populating an entry in the hosts file and will eliminate the DNS lookup times.

```text
// usage: setDns  <host name> <IP Address>
setDns  www.example.com  127.0.0.1
```

#### setDNSName

Allows for overriding a host name (creating a fake CNAME). Browser Support: IE, Chrome, Firefox

```text
// usage: setDnsName  <name to override>  <real name>
setDnsName  mark.example.com www.example.com
```

#### setUserAgent

Overrides the User Agent string sent by the browser.

:::warning
You will still be using the same browser engine so you are still limited by the capabilities and behavior of that browser even if you are spoofing another browser.
:::

```text
// usage: setUserAgent    <user agent string>
setUserAgent    Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3
```

#### overrideHost

Replaces the value of the Host: HTTP header for the given host with the provided replacement. It also adds a new header (x-Host:) with the original value.

```text
// usage: overrideHost  <host>    <new host>
overrideHost  www.example.com    www.not.example.com
```

#### addHeader

Adds the specified header to every http request (in addition to the headers that exist, DOES NOT overwrite an existing header).

```text
// usage: addHeader <header>    {filter}
addHeader Pragma: akamai-x-cache-on
```

The optional filter uses a url pattern, for example:

`https://www.example.com/*` applies the header to all requests that start with [https://www.example.com]

`https://www.example.com/` applies the header to just the request to [https://www.example.com/]

`https://*.example.com/*` applies the header to all requests to [https://www.example.com], [https://app.example.com] and [https://support.example.com]

`*://*/*` applies the header to all requests and is the default when no pattern is specified.

The default pattern may result in CORS failures as the header is applied to all requests.

#### setHeader

Adds the specified header to every http request, overriding the header if it already exists.

```text
// usage: setHeader <header>    {filter}
setHeader UA-CPU: none-ya
```

See `addHeader` for usage of the optional filter pattern

#### resetHeaders

Clears any headers that were specified through addHeaders or setHeaders (in case you want to only override headers for part of a script).

```text
// usage: resetHeaders
resetHeaders
```

### Misc

#### clearDocument

Destroys the current page but can also be used to blank out the current page in the filmstrip when navigating from one page to another.

```text
// Destroy the current document
clearDocument
```

As it destroys the current document then it's not possible to click on links or interact with any other elements in the page.

Any network requests scheduled by `sendBeacon` should fire when the current page is destroyed so they shouldn't be seen in the waterfall for the destination page – this is the main use case for it but `clearDocument` sometimes needs to be followed by a `sleep` command to give the browser time to fire those requests.

#### clearScreen

Makes the contents of the current page invisible by setting it's opacity to 0

```text
// Visually clears the screen, underlying HTML document is still present
clearScreen
```

It's useful when creating scripts that navigate from one page to another but you want to blank out the initial page from the filmstrip.

As the document still exists, it's possible to click on links and other elements in the page. Network requests that might be fired as the page is unloaded e.g. analytics data sent via `sendBeacon`, will still be sent and seen in the waterfall for the destination page

#### combineSteps

Causes multiple script steps to be combined into a single "step" in the results. Please note if you use combineSteps and any of the network requests in the test error, the test will fail.

```text
// usage: combineSteps  [count]
combineSteps
```

​

```text
// Sample Script:
combineSteps
navigate  www1.example.com
navigate  www2.example.com
navigate  www3.example.com
```

#### setLanguage

Sets the locale used in the `accept-language` HTTP header, and `navigator.language` DOM property

Setting is applied when Chrome is launched so must appear at the start of the script

Useful for reducing appearance of popups which ask whether the visitor wants to switch sites that are sometimes shown in tests

```text
// Set the locale to be German language in Austria
setLanguage de-AT
```

#### setLocation

Specifies a geolocation override position.

```text
// usage: setLocation <lat>,<lng>    <accuracy>
setLocation    38.954980,-77.447956    10
```

#### sleep

Pauses the script operation for a given number of seconds.

```text
// usage: sleep <seconds to sleep>
example: sleep  5
```

#### speedcurve_removePTST

Removes PTST/SpeedCurve from the User Agent string

```text
// Usage: remove PTST/SpeedCurve from User Agent string
speedcurve_removePTST 1
```

#### speedcurve_clearcerts

Clears the OS certificate caches which causes IE to do OCSP/CRL checks during SSL negotiation if the certificates are not already cached.

```text
// Usage: Clears certificate cache in IE
speedcurve_clearcerts 1
```
