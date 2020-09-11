const basicRuleCheck = require('../utils/build-rule-checker');

module.exports = {
  meta: {
    docs: {
      description: 'Check custom hardcodes in your js/vue files.',
      category: 'optional',
      url: '',
    },
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          matcher: { type: 'string' },
          message: { type: 'string' },
          ignoreConsole: { type: 'boolean' },
        },
        required: ['matcher'],
        additionalProperties: false,
      },
    },
  },
  create(context) {
    const restricted = context.options.length
      ? context.options
      : [
          {
            matcher: '/[^\\w\\s-_@:.#$%\\/()\\[\\]{}]/',
          },
        ];

    return basicRuleCheck(context, restricted);
  },
};
