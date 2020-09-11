# TypeScript 编码规范

[TOC]

## 前言

为前端开发提供良好的基础编码风格修行指南。

基于 [Airbnb](https://github.com/airbnb/javascript#table-of-contents) 编码规范。所有规范分为三个等级：**必须**、**推荐**、**可选**。

**必须（Mandatory）** 级别要求员工必须严格按照规范的编码格式编写，否则会在代码扫描和自动化构建中报错。

**推荐（Preferable）** 级别希望员工尽量按照规范编写，但如有特殊情况，可以不采用。

**可选（Optional）** 级别并不对员工编码提出要求，一般是 JavaScript 常识以及 ES6、ES7 的新语法，但仍希望员工按参考规范编写。

## 1. 类

[1.1](#class-literal-property-style) **【必须】** 类的只读属性若是一个字面量，则必须使用只读属性而不是 getter

```javascript
//bad
class Foo1 {
  public get bar() {
      return 1;
  }
}

//good
class Foo2 {
  public readonly bar = 1;
}
```

[1.2](#explicit-member-accessibility) **【推荐】** 必须设置类的成员的可访问性

> 原因？
> 1、将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
> 2、将暴露出去的设置为 public 的，类和外界的联系一目了然

```javascript
//bad
class Foo2 {
  static foo = 'foo';
  static getFoo() {
      return Foo2.foo;
  }
  constructor() {}
  bar = 'bar';
  getBar() {}
  get baz() {
      return 'baz';
  }
  set baz(value) {
      console.log(value);
  }
}

//good
class Foo2 {
  private static foo = 'foo';
  public static getFoo() {
      return Foo2.foo;
  }
  public constructor() {}
  protected bar = 'bar';
  public getBar() {}
  public get baz() {
      return 'baz';
  }
  public set baz(value) {
      console.log(value);
  }
}
```

[1.3](#member-ordering) **【必须】** 指定类成员的排序规则

> 优先级：

1. static > instance
2. field > constructor > method
3. public > protected > private

```javascript
  //bad
class Foo1 {
    private getBar3() {
      return this.bar3;
    }
    protected getBar2() {}
    public getBar1() {}
    public constructor() {
       console.log(Foo1.getFoo3());
       console.log(this.getBar3());
    }
     private bar3 = 'bar3';
     protected bar2 = 'bar2';
     public bar1 = 'bar1';
     private static getFoo3() {
       return Foo1.foo3;
     }
     protected static getFoo2() {}
     public static getFoo1() {}
     private static foo3 = 'foo3';
     protected static foo2 = 'foo2';
     public static foo1 = 'foo1';
}

//good
class Foo2 {
   public static foo1 = 'foo1';
   protected static foo2 = 'foo2';
   private static foo3 = 'foo3';
   public static getFoo1() {}
   protected static getFoo2() {}
   private static getFoo3() {
       return Foo2.foo3;
   }
   public bar1 = 'bar1';
   protected bar2 = 'bar2';
   private bar3 = 'bar3';
   public constructor() {
       console.log(Foo2.getFoo3());
       console.log(this.getBar3());
   }
   public getBar1() {}
   protected getBar2() {}
   private getBar3() {
       return this.bar3;
   }
}

```

[1.4](#no-parameter-properties) **【可选】** 禁止给类的构造函数的参数添加修饰符

> 原因？强制所有属性都定义到类里面，比较统一

```javascript
//bad
class Foo1 {
  constructor(private name: string) {}
}

//good
class Foo2 {
  constructor(name: string) {}
}
```

[1.5](#no-useless-constructor) **【推荐】** 禁止出现没必要的 constructor

```javascript
//bad
class Foo1 {
  constructor() {}
}

class Bar1 extends Foo1 {
  constructor() {
    super();
  }
}

//good
class Foo2 {
  constructor() {
    this.doSomething();
  }
  doSomething() {}
}

class Bar2 extends Foo1 {
  constructor() {
    super();
    this.doSomething();
  }
  doSomething() {}
}
```

## 2. 函数

[2.1](#adjacent-overload-signatures) **【必须】** 重载的函数必须写在一起，增强可读性。

```javascript
// bad
declare namespace NSFoo1 {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function bar(): void;
  export function foo(sn: string | number): void;
}

type TypeFoo1 = {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
};

interface IFoo1 {
  foo(s: string): void;
  foo(n: number): void;
  bar(): void;
  foo(sn: string | number): void;
}


// good
declare namespace NSFoo2 {
  export function foo(s: string): void;
  export function foo(n: number): void;
  export function foo(sn: string | number): void;
  export function bar(): void;
}

type TypeFoo2 = {
  foo(s: string): void;
  foo(n: number): void;
  foo(sn: string | number): void;
  bar(): void;
};

interface IFoo2 {
  foo(s: string): void;
  foo(n: number): void;
  foo(sn: string | number): void;
  bar(): void;
}
```

[2.2](#unified-signatures) **【必须】** 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明

```javascript
//bad
function foo1(x: number): void;
function foo1(x: string): void;
function foo1(x: any): any {
  return x;
}

//good
function foo2(x: number | string): void;
function foo2(x: any): any {
  return x;
}
```

## 3. 类型

[3.1](#consistent-type-assertions) **【必须】** 类型断言必须使用 as Type，禁止使用 \<Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）

> 原因？避免 Type 被理解为 jsx

```javascript
//bad
let bar1: string | number;
const foo1 = <string>bar1;

//good
let bar2: string | number;
const foo2 = bar2 as string;

//bad
const baz1 = {
  bar: 1
} as object;

//good


  bar: 1
} as object;
let bar2: string | number;
const foo2 = bar2 as string;

const baz2 = {
  bar: 1
} as any;
```

[3.2](#no-inferrable-types) **【推荐】** 禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型, 可以简化代码

```javascript
//bad
let foo1: number = 1;
let bar1: string = '';

//good
const foo2 = 1;
const bar2 = '';
```

[3.3](#typedef) **【必须】** interface 和 type 定义时必须声明成员的类型

```javascript
//bad
type Foo1 = {
  bar;
  baz;
};

//good
type Foo2 = {
  bar: boolean;
  baz: string;
};
```

[3.4](#prefer-function-type) **【推荐】** 使用函数类型别名替代包含函数调用声明的接口

```javascript
//bad
interface Foo1 {
  (): string;
}

//good
type Foo2 = () => string;
```

## 4. 接口

[4.1](#consistent-type-definitions) **【可选】** 优先使用 interface 而不是 type

> 需要被 implement, extend 或者 merge 的建议定义为 interface

```javascript
type Foo1 = {
  foo: string,
};

//或者

interface Foo2 {
  foo: string;
}
```

[4.2](#method-signature-style) **【可选】** 接口中的方法必须用属性的方式定义

> 原因？配置了 strictFunctionTypes 之后，用属性的方式定义方法可以获得更严格的检查

```javascript
//bad
interface Foo1 {
  bar(): number;
}

//good
interface Foo1 {
  bar: () => number;
}
```

[4.3](#no-empty-interface) **【必须】** 禁止定义空的接口

```javascript
//bad
interface Foo1 {}

//good

interface Foo2 {
  foo: string;
}
```

## 5. 命名空间

[5.1](#no-namespace) **【必须】** 禁止使用 namespace 来定义命名空间

> 原因？使用 es6 引入模块，才是更标准的方式。
> 但是允许使用 declare namespace ... {} 来定义外部命名空间

```javascript
//bad
namespace foo1 {}

//good
declare namespace foo1 {}

```

[5.2](#prefer-namespace-keyword) **【必须】** 禁止使用 module 来定义命名空间

> 原因？module 已成为 js 的关键字

```javascript
//bad
module Foo1 {}

//good
namespace Foo2 {}
```

## 6. 语法

[6.1](#no-non-null-asserted-optional-chain) **【必须】** 禁止在 optional chaining 之后使用 non-null 断言（感叹号）

> 原因？optional chaining 后面的属性一定是非空的

```javascript
//bad
let foo1: { bar: { baz: string } } | undefined;
console.log(foo1?.bar!.baz);

//good
let foo2: { bar: { baz: string } } | undefined;
console.log(foo2?.bar.baz);
```

[6.2](#no-this-alias) **【必须】** 禁止将 this 赋值给其他变量，除非是解构赋值

```javascript
//bad
function foo() {
  const self = this;
  setTimeout(function () {
    self.doWork();
  });
}

//good
function foo() {
  const { bar } = this;
  setTimeout(() => {
    this.doWork();
  });
}
```

[6.3](#no-unused-expressions) **【必须】** 禁止无用的表达式

```javascript
//bad
declare const foo1: any;
declare const bar1: any;
declare const baz1: any;
1;
foo1;
('foo1');
foo1 && bar1;
foo1 || bar1;
foo1 ? bar1 : baz1;
`bar1`;

//good
'use strict';
declare const foo2: any;
declare const bar2: any;
declare const baz2: any;
foo2 && bar2();
foo2 || bar2();
foo2 ? bar2() : baz2();
foo2`bar2`;

```

[6.4](#prefer-optional-chain) **【必须】** 使用 optional chaining 替代 &&

> 原因？简化代码

```javascript
//bad
let foo1: any;
console.log(foo1 && foo1.a && foo1.a.b && foo1.a.b.c);

//good
let foo2: any;
console.log(foo2?.a?.b?.c);
```

## 7. 导入

[7.1](#triple-slash-reference) **【必须】** 禁止使用三斜杠导入文件

```javascript
//bad
/// <reference path="./Animal">

//good
import Animal from './Animal';
```

[7.2](#no-require-imports) **【必须】** 禁止使用 require

> 原因？统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入

```javascript
//bad
const fs = require('fs');

//good
import * as fs from 'fs';
```

## 8. 代码风格

[8.1](#prefer-for-of) **【推荐】** 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环

```javascript
//bad
const arr1 = [1, 2, 3];

for (let i = 0; i < arr1.length; i++) {
  console.log(arr1[i]);
}

//good
const arr2 = [1, 2, 3];
for (const x of arr2) {
  console.log(x);
}
for (let i = 0; i < arr2.length; i++) {
  // i is used to write to arr, so for-of could not be used.
  arr2[i] = 0;
}
for (let i = 0; i < arr2.length; i++) {
  // i is used independent of arr, so for-of could not be used.
  console.log(i, arr2[i]);
}
```

[8.2](#type-annotation-spacing) **【必须】** 在类型注释周围需要一致的间距

```javascript
//bad
let foo: string = 'bar';
let foo: string = 'bar';
let foo: string = 'bar';

function foo(): string {}
function foo(): string {}
function foo(): string {}

class Foo {
  name: string;
}

class Foo {
  name: string;
}

class Foo {
  name: string;
}

type Foo = () => {};

//good
let foo: string = 'bar';

function foo(): string {}

class Foo {
  name: string;
}

type Foo = () => {};
```

[更多信息](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214#7365214)
