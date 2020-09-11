# eslint-config-vue-prettier-airbnb

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/jsdchenye/eslint-config-airbnb-vue/master.svg
[travis-url]: https://travis-ci.org/jsdchenye/eslint-config-airbnb-vue
[npm-image]: https://img.shields.io/npm/v/eslint-config-airbnb-vue.svg
[npm-url]: https://npmjs.org/package/eslint-config-airbnb-vue
[downloads-image]: https://img.shields.io/npm/dm/eslint-config-airbnb-vue.svg
[downloads-url]: https://npmjs.org/package/eslint-config-airbnb-vue

## 安装

The config is based on `eslint-config-airbnb-base` and `eslint-plugin-vue` and `eslint-config-prettier`.

Then, add this to your .eslintrc file:

```shell
npm install @loverosen/eslint-config-vue-prettier-airbnb --save-dev
```

_.eslintrc.js:_

```javascript
module.exports = {
  extends: ['@loverosen/eslint-config-vue-prettier-airbnb'],
};
```

typescript support

```shell
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser --save-dev
```

_.eslintrc.js:_

```javascript
module.exports = {
  extends: [
    '@loverosen/eslint-config-vue-prettier-airbnb',
    '@loverosen/eslint-config-vue-prettier-airbnb/ts',
  ],
};
```

## VSCode Setup

### install extension for your VSCode

```shell
Vetur
Vue.js Extension Pack
Prettier
Sort HTML attrbutes

```

## vs configuration

```json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```

## JavaScript 编码规范

- [JavaScript 编码规范](./docs/js编码规范.md)
- [Typescript 编码规范](./docs/Typescript编码规范.md)
