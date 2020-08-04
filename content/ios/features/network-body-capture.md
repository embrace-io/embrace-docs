---
title: Network Body Capture
description: Embrace can capture network body requests and responses
weight: "5"

---
# Network Body Capture

Embrace's SDK uploads basic information about network requests into your sessions to help you understand and troubleshoot networking problems. Embrace can also capture the network body, including the request, response and any headers.  

This feature can only be enabled by your Embrace CS representative, so reach out to them on slack or create a network body capture request by using the button in the dash. Once configured, your requests will be uploaded to Embrace's servers and delivered to you.

If your application handles sensitive or private data of any kind, you can protect that data by encrypting the network body capture payloads that are uploaded.  

In your Embrace-Info.plist file, include a public RSA key as a string in this field:

```sh
CAPTURE_PUBLIC_KEY
```

Make sure to only inlcude the public key, and to include the entire key as displayed by the cat command in CLI, for example:

```sh
cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDQzL6+6tvCyV7PZmNM4saG6h/7HiLxhiF7xpiNw8zaMNG+ZR0UeVRlpjoJX42ZhV1G3EstfdUF3KXpt62jhrqk2rVNgGL350uZblsqEzh4W+NY+Ztr66MxL/RTagc+C9qqdJJLs4CwoSGOVbVLl+Ohj93z+FhQFYlFuCsNOdkUC4QrQcKd6A+a+Gn9B9VF4FT/Wf31jevGNowWbvAmN3tCMQXBYRfylP+4c6V31B7SFuwa+t26qUrWR3dy/avKn/pIaFWSwfSZhNFowT170BUFJG8Ny6W+R//5QuHuX87Ebr1rvzoHrZ0v0Iimhz7oxTJK9O2JFZ0KuJeW5J52Ni92gc7DwZauLeIOc7GoyysvqKFv0cqDMSkkYY0I7EmgTLDMX7PQlqax/uvRokgjlOQTZr2u8nNXtgufBFvTlfE51EQkv0kzo0RBuPOCPSsuS07gJBaoKOoQZXsVlX2WCtQNa23GGmzmYBwJAka/8yYwHYkoJGoX5o6GHb6hSFIPEOS+edm246AID3uK32i1568FEhQJ6tEHwhhJTzHzyFcHx0T0z8JUyoKzGsSP4zCsj1OHRGPufSPbUQgqzvuV7HL9iCMyRictpfAhx7af+7qzZnOrcBl21CLSV8+BBwctWx4sh7IJzN+S83Qb+dXGmPKH0892YriO5Q5WVhQNTcgmvw== eric.lanz@embrace.io
```

You can use any size key that is compatible with the iOS platforms you target, which is currently a minimum of 1024 and a max of 4096.

If configured this way, the Embrace SDK will encrypt the captured object, including headers, into a single payload that only you can decrypt.