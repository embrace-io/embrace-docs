// This Remark plugin replaces all {{ embrace_sdk_version platform="foo" }} inside
// ``` blocks with a version of "foo" from embrace.json so that we can easily insert
// the latest version of each SDK throughout.

const embrace = require('../../embrace.json');
const {visit} = require('unist-util-visit');

const plugin = (options) => {
  const transformer = async (ast) => {
    visit(ast, 'code', (node) => {
      const replacedCode = node.value.replace(/{{ embrace_sdk_version platform="(.*?)" }}/g, (match, key) => {
        // console.debug('embrace-sdk-version.js: found <sdk platform> for ' + key + ', which is ' + version);
        return embrace[key.trim()]['version']
      });
      node.value = replacedCode;
    });
  };
  return transformer;
};

module.exports = plugin;
