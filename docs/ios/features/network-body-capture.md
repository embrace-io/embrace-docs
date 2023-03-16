---
title: Network Body Capture
description: Embrace can capture network body requests and responses
sidebar_position: 5

---
# Network Body Capture

Embrace's SDK uploads basic information about network requests into your sessions to help you understand and troubleshoot networking problems. Embrace can also capture the network body, including the request, response and any headers. 

This feature can only be enabled by your Embrace CS representative, so reach out to them on Slack or create a network body capture request by using the button in the dash. Once configured, your requests will be uploaded to Embrace's servers and delivered to you.

If your application handles sensitive or private data of any kind, you can protect that data by encrypting the network body capture payloads that are uploaded. 

In your `Embrace-Info.plist` file, first create a new Dictionary entry titled:

```sh
NETWORK
```

Within that dictionary, place a new string entry with the key titled:

```sh
CAPTURE_PUBLIC_KEY
```

RSA encryption uses two keys: a private and a public key. You may already be familiar with this protocol and the security team in your organization may already have public keys available for you to use. Before generating new keys, check with your organization.  

There are many ways to generate working key pairs. For these instructions we will use the CLI opensll tool installed by default on most linux-like systems:

```sh
openssl genrsa -des3 -out private.pem 2048
```

You can use any size key that is compatible with the iOS platforms you target, which is currently a minimum of 1024 and a max of 4096. The above command uses a key size of 2048.

The file you just made should never be shared with anyone outside your organization and should be kept in a safe place. This file is required to decrypt network body data captured by Embrace. Embrace will not have a copy of this. Only you can decrypt the files, and if you lose the private key you also lose the ability to decrypt any data captured by the SDK.

You'll be providing Embrace a public version of the key. This is a derived key that you can safely distribute. Anyone, including Embrace, can use the public key to encrypt data into a form that only your private key can decrypt -- even Embrace cannot read the contents of the encrypted data.

To make the public key run the following command:

```sh
openssl rsa -in private.pem -outform PEM -pubout -out public.pem
```

The file public.pem contains the public key. Use the command `cat public.pem` to view the key. Below is an example we generated while writing this documentation. Remember: it is completely safe to share public keys. Only the private key needs to be protected.

```sh
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2st+1ouwmsYLOF+kZ/LE
uZ+jzFuMv+AatKYWXQCwOWP9U02gbXDDOw1rvpeXFUapF1iGF9SASsyBZj4uTfJH
whalFCZnNasuPbOIKAKtLYCCXyIAjUR6sUAvw+53/tGNPChiMnkYluycwrvd3kyR
L/Qma6y54sZOiPjNywcmS2Z+IeeJFgJGAtuOgIT9VxwhxGWRIVgH+lmymRvShnLF
Oj2JGKswFxFaTAjvOWev5mgfg4IbdzFZosy2Llp5JomHWnuAA4D8gh0Fwn7L49tM
sxX6/KOMRMFzrf0xSfmQH8jsSpE8dAZnUCRDmiFCN63GEoevbGA1rkWIjj65YYXv
/wIDAQAB
-----END PUBLIC KEY-----
```

Above is an example of a valid, public RSA key in text form. Each aspect of that form is important: including the dashes at the beginning and end, and the placement of the return characters after each line. It is important to leave the key in this format and leave the formatting in place.

Now copy that entire string from the first dash, through all the return characters and including the final dash. Copy that into the value of the `CAPTURE_PUBLIC_KEY` entry in your `Embrace-Info.plist` file.

At this point Embrace is setup to encrypt network body captures. If you'd like to test this feature before going live, setup a session with your customer support representative. We can inspect a captured session and send you the encrypted data for verification.
