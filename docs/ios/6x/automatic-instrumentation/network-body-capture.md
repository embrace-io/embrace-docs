---
title: Network Body Capture
description: Embrace can capture network body requests and responses
sidebar_position: 4

---
# Network Body Capture

Embrace's SDK uploads basic information about network requests into your sessions to help you understand and troubleshoot networking problems. Embrace can also capture the network body, including the request, response and any headers. 

This feature can only be enabled by your Embrace CS representative, so reach out to them on Slack or create a network body capture request by using the button in the dash. Once configured, your requests will be uploaded to Embrace's servers and delivered to you.

Since this data can be sensitive, the Embrace SDK will encrypt the data before uploading it to our servers. You'll have to provide to your Embrace CS representative a public key that will be used to encrypt the captured data before being stored.

### Generating a Public Key

RSA encryption uses two keys: a private and a public key. You may already be familiar with this protocol and the security team in your organization may already have public keys available for you to use. Before generating new keys, check with your organization.  

There are many ways to generate working key pairs. For these instructions we will use the CLI opensll tool installed by default on most linux-like systems:

```shell-session
openssl genrsa -out private.pem 2048
```
The file you just made should never be shared with anyone outside your organization and should be kept in a safe place. This file is required to decrypt network body data captured by Embrace. Embrace will not have a copy of this. Only you can decrypt the files, and if you lose the private key you also lose the ability to decrypt any data captured by the SDK.

You'll be providing Embrace a public version of the key. This is a derived key that you can safely distribute. Anyone, including Embrace, can use the public key to encrypt data into a form that only your private key can decrypt -- even Embrace cannot read the contents of the encrypted data.

To make the public key run the following command:

```shell-session
openssl rsa -in private.pem -pubout -out public.pem
```

The file public.pem contains the public key. Use the command `cat public.pem` to view the key. Below is an example we generated while writing this documentation. Remember: it is completely safe to share public keys. Only the private key needs to be protected.

```
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

### OpenTelemetry Format

After the Embrace SDK encrypts the network data, it sends it as an OpenTelemetry log containing the following attributes:
```
{
    "key": "emb.type",
    "value": "sys.network_capture"
},
{
    "key": "url",
    "value": "<url_of_the_network_request>"
},
{
    "key": "encryption-mechanism",
    "value": "hybrid"
},
{
    "key": "payload-algorithm",
    "value": "aes-256-cbc"
},
{
    "key": "encrypted-payload",
    "value": "<encrypted_data>"
},
{
    "key": "key-algorithm",
    "value": "RSA.PKCS1"
},
{
    "key": "encrypted-key",
    "value": "<encrypted_key>"
},
{
    "key": "aes-iv",
    "value": "<iv_used_for_decryption>"
}
```

You'll need the `encrypted-key`, `aes-iv` and `encrypted-payload` values to decrypt the network data.

### Decryption

The Embrace SDK uses hybrid encryption to secure the data. This means there are actually 2 steps of encryption.

The network data is encrypted using the `aes-256-cbc` algorithm using a randomly generated key. This random key is then encrypted using the public key you provided. In order to decrypt the data, you'll need to decrypt the random key using your private RSA key. After that you'll use this key to decrypt the actual data.

Here's an example script to achieve this:

```
#!/bin/bash

POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -in)
      IN_PATH="$2"
      shift # past argument
      shift # past value
      ;;
    -out)
      OUT_PATH="$2"
      shift # past argument
      shift # past value
      ;;
    -k)
      KEY_PATH="$2"
      shift # past argument
      shift # past value
      ;;
    -iv)
      IV_PATH="$2"
      shift # past argument
      shift # past value
      ;;
    -pk)
      PRIVATE_KEY_PATH="$2"
      shift # past argument
      shift # past value
      ;;
    -h|--help)
      echo "Usage: $0 -in PATH_TO_ECRYPTED_DATA_FILE -k PATH_TO_ENCRYPTED_KEY_FILE -iv PATH_TO_IV_FILE -pk PATH_TO_PRIVATE_KEY_FILE -out PATH_TO_DECRYPTED_DATA_FILE"
      echo ""
      exit 0
      ;;
    -*|--*)
      echo "Unknown option $1"
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1") # save positional arg
      shift # past argument
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}" # restore positional parameters

TMP_PATH="./decryption_tmp"
rm -rf ${TMP_PATH}
mkdir ${TMP_PATH}

TMP_DATA_PATH="./decryption_tmp/data.bin"
TMP_KEY_PATH="./decryption_tmp/key.bin"

# base64 decode payload and key
openssl base64 -d -A <${IN_PATH} >${TMP_DATA_PATH}
openssl base64 -d -A <${KEY_PATH} >${TMP_KEY_PATH}

# decrypt symmetric key using private key
KEY=$(openssl pkeyutl -decrypt -inkey ${PRIVATE_KEY_PATH} -in ${TMP_KEY_PATH})

# read iv file
IV=$(cat ${IV_PATH})

# # decrypt data
openssl aes-256-cbc -d -K ${KEY} -iv ${IV} -in ${TMP_DATA_PATH} -out ${OUT_PATH}

# clean up
rm -rf ${TMP_PATH}
```

Note that this script expects the `encrypted-key`, `aes-iv` and `encrypted-payload` values to be extracted from the log and placed in individual text files.

Example usage: `sh decrypt.sh -in encrypted_payload.txt -k encrypted_key.txt -iv iv.txt -pk private.pem -out decrypted.txt`

### Payload format

Once decrypted, the payload will be a json containing the following keys:

```
{
    url                 // url of the network request (string)
    http-method         // http method of the network request (string)

    start-time          // start time of the network request in nanoseconds (number)
    end-time            // end time of the network request in nanoseconds (number)

    matched-url         // the url regex from the body capture rule (string)
    session-id          // identifier of the active session when the network request was executed (string)

    request-body        // body of the network request (string)
    request-body-size   // size of the request body (number)
    request-query       // query from the request (string)    
    request-headers     // headers of the network request (map)  

    response-body       // body of the network response (string) 
    response-body-size  // size of the response body (number)
    response-headers    // headers of the network response (map)   
    response-status     // status code (number)

    error-message       // error message if the request fails (string)  
}
```