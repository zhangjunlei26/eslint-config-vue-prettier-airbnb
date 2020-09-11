function normalizeStringHardcodeMatcher(matcher) {
  if (typeof matcher === 'function') {
    return matcher;
  }
  if (Object.prototype.toString.call(matcher) === '[object RegExp]') {
    return (value) => matcher.test(value);
  }
  if (matcher.charAt(0) !== '/' && matcher.charAt(matcher.length - 1) !== '/') {
    return (value) => value === matcher;
  }
  // stringified regexp
  const tester = new RegExp(matcher.slice(1, -1));
  return (value) => tester.test(value);
}

function isRequireOrImport(node) {
  const { parent } = node;
  if (!parent) return false;
  if (parent.type === 'ImportDeclaration') {
    return true;
  }
  if (
    parent.type === 'CallExpression' &&
    parent.callee.type === 'Identifier' &&
    parent.callee.name === 'require'
  ) {
    return true;
  }
  return false;
}

function isConsole(node) {
  const { parent } = node;
  if (!parent) return false;
  return (
    parent.type === 'CallExpression' &&
    parent.callee.type === 'MemberExpression' &&
    parent.callee.object.name === 'console'
  );
}

module.exports = function buildRuleChecker(context, checkers = []) {
  const normalizedCheckers = checkers.map(({ matcher, message, ignoreConsole }) => ({
    matcher: normalizeStringHardcodeMatcher(matcher),
    message: message || 'Hardcode detected: {{ value }}',
    ignoreConsole,
  }));

  function visitor(node) {
    // require('package') 或 import 'package' 的情况，不做检测
    if (isRequireOrImport(node)) return;
    let value;
    if (node.type === 'TemplateElement') {
      value = node.value.raw;
    } else {
      value = node.value;
    }
    // 仅字符串可能是 hardcode
    if (typeof value !== 'string') {
      return;
    }

    for (let i = 0; i < normalizedCheckers.length; i++) {
      const { matcher, message, ignoreConsole } = normalizedCheckers[i];
      // 外部可以选择性忽略 console
      if (ignoreConsole && isConsole(node)) continue;

      if (matcher(value)) {
        context.report({
          node,
          loc: node.loc,
          data: {
            value,
          },
          message: typeof message === 'function' ? message(value, node, context) : message,
        });
      }
    }
  }

  const { defineTemplateBodyVisitor } = context.parserServices;
  // 解析器是 vue-eslint-parser
  if (defineTemplateBodyVisitor) {
    // vue-eslint-parser 的 AST 类型参照
    // HTML 节点: https://github.com/mysticatea/vue-eslint-parser/blob/master/src/html/tokenizer.ts
    // VNode: https://github.com/mysticatea/vue-eslint-parser/blob/master/src/ast/nodes.ts
    // JSX: https://github.com/babel/babel-eslint/blob/master/lib/babylon-to-espree/toToken.js
    return defineTemplateBodyVisitor(
      {
        VText: visitor,
        HTMLText: visitor,
        Literal: visitor,
        TemplateElement: visitor,
        VLiteral: visitor,
      },
      {
        JSXText: visitor,
        Literal: visitor,
        TemplateElement: visitor,
      },
    );
  }

  // 非 vue-eslint-parser，我们支持 espree 和 babel-eslint 的规则
  return {
    JSXText: visitor,
    Literal: visitor,
    TemplateElement: visitor,
  };
};
