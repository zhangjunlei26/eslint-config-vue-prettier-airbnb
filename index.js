const { NODE_ENV } = process.env;

module.exports = {
    parserOptions: {
        parser: 'babel-eslint', // class properties
        ecmaVersion: 2020,
        sourceType: 'module', // es6 import/export
        ecmaFeatures: {
            jsx: true,
        },
    },
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true,
        jest: true,
    },
    extends: [
        require.resolve('./lib/index.js'),
        'airbnb-base',
        'plugin:vue/recommended',
        'plugin:prettier/recommended',
        'prettier/vue',
    ],
    plugins: ['import', 'vue', 'prettier'],
    /*
     ** 'off' 或 0 - 关闭规则
     ** "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
     ** "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    rules: {
        'no-debugger': NODE_ENV === 'production' ? 1 : 0, // 打包时禁止debugger
        'no-console': NODE_ENV === 'production' ? 1 : 0, // 打包时禁止console
        'no-alert': NODE_ENV === 'production' ? 1 : 0, // 打包时禁止console
        // https://prettier.io/docs/en/integrating-with-linters.html#use-eslint-to-run-prettier
        'prettier/prettier': [
            'error',
            {
                printWidth: 100, // 一行的字符数，如果超过会进行换行。默认80
                singleQuote: true, // 字符串是否使用单引号。默认false使用双引号
                trailingComma: 'all', // 在多行的数组/对象的情况下，是否加上行尾逗号，三个可选之’<none/es5/all>'
                tabWidth: 2, // tab 宽度,
                useTabs: false, // 是否使用 tab 进行缩进，默认为 false
                semi: true, // 行尾是否使用分号，默认为 true
                bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ foo: bar }
                endOfLine: 'lf', // 换行符，默认使用 linux 的 lf
            },
        ],
    },
};
