/**
 * 依赖版本：
 *   eslint ^6.8.0
 *   babel-eslint ^10.0.3
 *   @typescript-eslint/parser ^2.31.0
 *   @typescript-eslint/eslint-plugin ^2.31.0
 *   eslint-plugin-import ^2.19.1
 *
 *
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-dupe-class-members': 'off',
    'no-empty-function': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/491
    'no-invalid-this': 'off',
    'no-magic-numbers': 'off',
    'no-unused-vars': 'off',
    'react/sort-comp': 'off',
    /**
     * 重载的函数必须写在一起
     * @reason 增加可读性
     */
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    /**
     * 类的只读属性若是一个字面量，则必须使用只读属性而不是 getter
     */
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
    /**
     * 类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）
     * @reason <Type> 容易被理解为 jsx
     */
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    /**
     * 优先使用 interface 而不是 type
     */
    '@typescript-eslint/consistent-type-definitions': 'off',
    /**
     * 必须设置类的成员的可访问性
     * @reason 将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
     */
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    /**
     * 指定类成员的排序规则
     * @reason 优先级：
     * 1. static > instance
     * 2. field > constructor > method
     * 3. public > protected > private
     */
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'static-field',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'static-method',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-field',
          'protected-field',
          'private-field',
          'instance-field',
          'field',
          'constructor',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-method',
          'protected-method',
          'private-method',
          'instance-method',
          'method',
        ],
      },
    ],
    /**
     * 接口中的方法必须用属性的方式定义
     */
    '@typescript-eslint/method-signature-style': 'off',
    /**
     * 禁止定义空的接口
     */
    '@typescript-eslint/no-empty-interface': 'error',
    /**
     * 禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型
     * @reason 可以简化代码
     */
    '@typescript-eslint/no-inferrable-types': 'warn',
    /**
     * 禁止使用 namespace 来定义命名空间
     * @reason 使用 es6 引入模块，才是更标准的方式。
     * 但是允许使用 declare namespace ... {} 来定义外部命名空间
     */
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],
    /**
     * 禁止在 optional chaining 之后使用 non-null 断言（感叹号）
     * @reason optional chaining 后面的属性一定是非空的
     */
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    /**
     * 禁止给类的构造函数的参数添加修饰符
     */
    '@typescript-eslint/no-parameter-properties': 'off',
    /**
     * 禁止使用 require
     * @reason 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
     */
    '@typescript-eslint/no-require-imports': 'error',
    /**
     * 禁止将 this 赋值给其他变量，除非是解构赋值
     */
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
      },
    ],
    /**
     * 禁止无用的表达式
     */
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    /**
     * 禁止出现没必要的 constructor
     */
    '@typescript-eslint/no-useless-constructor': 'warn',
    /**
     * 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环
     * @reason for of 循环更加易读
     */
    '@typescript-eslint/prefer-for-of': 'warn',
    /**
     * 使用函数类型别名替代包含函数调用声明的接口
     */
    '@typescript-eslint/prefer-function-type': 'warn',
    /**
     * 禁止使用 module 来定义命名空间
     * @reason module 已成为 js 的关键字
     */
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    /**
     * 使用 optional chaining 替代 &&
     */
    '@typescript-eslint/prefer-optional-chain': 'error',
    /**
     * 禁止使用三斜杠导入文件
     * @reason 三斜杠是已废弃的语法，但在类型声明文件中还是可以使用的
     */
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always',
      },
    ],
    /**
     * 在类型注释周围需要一致的间距
     */
    '@typescript-eslint/type-annotation-spacing': 'error',
    /**
     * interface 和 type 定义时必须声明成员的类型
     */
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: false,
        memberVariableDeclaration: false,
        objectDestructuring: false,
        parameter: false,
        propertyDeclaration: true,
        variableDeclaration: false,
      },
    ],
    /**
     * 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明
     */
    '@typescript-eslint/unified-signatures': 'error',
  },
};
