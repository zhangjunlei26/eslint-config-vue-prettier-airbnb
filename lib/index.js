module.exports = {
  extends: [require.resolve('./base.js'), require.resolve('./import.js')],
  // plugins: [require.resolve('./hardcode'),],
  rules: {
    camelcase: 'off',
    // 'hardcode/chinese': ['error', { ignoreConsole: true }],
    'import/no-commonjs': ['warn'],
    'no-restricted-imports': [
      'warn',
      {
        patterns: ['lodash/**', 'underscore/**'],
        paths: [
          // lodash
          {
            name: 'lodash',
            message: 'Please use `lodash-es` instead.',
          },
          {
            name: 'underscore',
            message: 'Please use `lodash-es` instead.',
          },
          {
            name: 'superagent',
            message: 'Do not use use multiple ajax libs. Please use `axios` instead.',
          },
          // async requests
          {
            name: 'whatwg-fetch',
            message: 'Do not use use multiple ajax libs. Please use `axios` instead.',
          },
          // others external dependencies
          {
            name: 'scriptjs',
            message: 'scriptjs is dead. Please use `loadjs` instead.',
          },
          {
            name: 'highcharts',
            message: '`highcharts` is not fully free for commercial. Please use `echarts` instead.',
          },
          // internal deprecated packages
          {
            name: '@rosenzhang/we-cookie',
            message: 'Please use `js-cookie` instead.',
          },
          {
            name: '@rosenzhang/we-url',
            message: 'Please use `qs` instead.',
          },
        ],
      },
    ],
  },
};
