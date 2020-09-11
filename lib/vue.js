module.exports = {
  rules: {
    'vue/attribute-hyphenation': 2,
    'vue/html-closing-bracket-newline': 2,
    'vue/html-closing-bracket-spacing': 2,
    'vue/html-end-tags': 2,
    // https://eslint.vuejs.org/rules/html-self-closing.html#vue-html-self-closing
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': 0,
    'vue/no-template-shadow': 2,
    'vue/singleline-html-element-content-newline': 0,
    'vue/v-bind-style': 2,
    'vue/v-on-style': 2,
    'vue/attributes-order': 0,
    'vue/no-v-html': 2,
    'vue/this-in-template': 2,
    // https://eslint.vuejs.org/rules/require-default-prop.html#vue-require-default-prop
    'vue/require-default-prop': 'off',
  },
};
