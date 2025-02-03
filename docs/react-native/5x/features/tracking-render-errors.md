---
title: Tracking Render Errors
description: Ensure meaningful screen names in render errors by configuring Metro bundler.
sidebar_position: 7
---

# Tracking Render Errors

If the Embrace SDK detects a component stack trace in a React Native rendering error it will log it automatically. The
resulting log will have a stack trace similar to:

```text
 * in Screen2
 * in RCTView
 * in Screen1
 * in AppContainer
 ```

In release builds you may see some "Unknown" entries for view names that could not be retrieved:

```text
 * in Unknown
 * in RCTView
 * in Unknown
 * in AppContainer
```

## Preserving screen names

Making sure components have their `displayName` should help, in addition it is possible to modify your `metro.config.js`
to include the following:

```javascript
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    minifierConfig: {
      keep_classnames: true,
      keep_fnames: true,
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

- **`keep_classnames: true` and `keep_fnames: true`**: These options ensure that class names and function names are
preserved during the minification process.  
- **`mangle`**: Prevents the renaming of class and function names.  

Though note that these settings will likely increase your bundle size. If you apply these then we strongly recommend
testing your project to confirm that any added bundle size due to this configuration is acceptable.
To analyze the bundle size, run the following command:

```bash
npx react-native bundle \
  --platform <platform> \
  --dev false \
  --entry-file index.js \
  --bundle-output ./output/main.bundle.js \
  --assets-dest ./output
```

Replace `<platform>` with either `android` or `ios`. This command generates the bundle and assets, allowing you to
compare the size with and without the Metro configuration.