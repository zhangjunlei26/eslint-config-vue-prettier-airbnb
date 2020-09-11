const hasChinese = require('../utils/has-chinese');
const basicRuleCheck = require('../utils/build-rule-checker');

module.exports = {
  meta: {
    docs: {
      description: 'Check Chinese hardcodes in your js/vue files.',
      category: 'strongly-recommended',
      url: '',
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignoreConsole: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const option = context.options[0] || {};
    return basicRuleCheck(context, [
      {
        matcher: hasChinese,
        message: 'Chinese hardcode detected: {{ value }}',
        ignoreConsole: option.ignoreConsole,
      },
    ]);
  },
};
