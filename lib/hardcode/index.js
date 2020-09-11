module.exports = {
  rules: {
    chinese: require('./rules/chinese'),
    hardcode: require('./rules/hardcode'),
  },
  configs: {
    rules: {
      hardcode: ['error'],
    },
  },
};
