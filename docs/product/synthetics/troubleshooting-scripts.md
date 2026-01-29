---
title: Troubleshooting scripts
description: Addressing common issues with test scripts
sidebar_position: 5
---

## Debugging tips

* **Tabs** - Scripts should be tab delimited with only some options accepting spaces between values. This is often the main cause of issues, so check your script in an IDE with invisible characters shown to ensure the formatting is correct**.**

* **Hidden errors** - Many scripts use **"logData 0"** to hide steps. If you're having issues try commenting out the **"logData 0"** command so that you can identify where in the script the test is failing (via Detailed Results).

* Use the **"exec"** command for manipulating the page rather than the built-in commands like **"setValue"**. The **"exec"** command runs arbitrary JavaScript, which means you can test and debug the JS in the console of your browser's DevTools before using it in a test script.

* If the script is **completing forms** and the page uses **React or another framework that uses a VirtualDOM** (vdom), then the script will also need to dispatch input events too. 

* Only use the **"andWait"** version of commands like **"execAndWait"** when the command will cause a page transition.

* **Multi-step scripts** - SpeedCurve does not yet support extracting waterfall charts from multi-step scripts. Instead use "**logData 0"** at the beginning of the script and then **"logData 1"** just before your final step to record just a single step or navigate command.

## What to do when a script stops working

If you have a script that used to work, but suddenly stops working, the following tips might help:

1. Comment out the "logData 0" commands, this will highlight which part of the script is failing.
2. Run each of the steps in the console of your browser's DevTools. Check that each step produces the desired result.
3. Check that all of the element selectors used in the script still exist on the page.

:::info
###Need extra help?

We try to help out where we can, but we don't provide support for deep debugging of test scripts. We can recommend consultants who are experts in scripting and can help out if you're interested.
:::
