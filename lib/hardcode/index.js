module.exports = {
  rules: {
    // eslint-disable-next-line global-require
    chinese: require('./rules/chinese'),
    // eslint-disable-next-line global-require
    hardcode: require('./rules/hardcode'),
  },
  configs: {
    rules: {
      hardcode: ['error'],
    },
  },
};
