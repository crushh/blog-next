---
title: this的指向
date: 2019-08-01 22:34:40
tags: ['js']
categories: ['js']
---

## this 既不指向函数自身，也不指向函数的作用域，它指向什么完全取决于函数在哪被调用。

#### 方法调用模式（the method invocation pattern）又称为隐式绑定

当一个函数被保存为一个对象的属性时，被称为‘方法’。当一个方法被调用时，this 被绑定到该对象。

```
function foo() {      console.log( this.a ); }

var obj = {      a: 2,     foo: foo  };

obj.foo(); // 2
```

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说：

```
function foo() {      console.log( this.a ); }

var obj2 = {      a: 42,     foo: foo  };

var obj1 = {      a: 2,     obj2: obj2  };

obj1.obj2.foo(); // 42

```

tips：隐式丢失：

```
function foo() {      console.log( this.a ); }

var obj = {      a: 2,     foo: foo  };

var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性

bar(); // "oops, global
```

这时候的 bar 只是引用了 foo 函数本身，因此此时的 bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

#### 函数调用模式(the function invocation pattern)又称为 默认调用

当函数并未一个对象的属性时，它被当作一个函数来调用。

```
function foo() {
      console.log( this.a );
}
var a = 2;
foo(); // 2

```

函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。虽然 this 的绑定规则完全取决于调用位置，但是只 有 foo() 运行在非 strict mode 下时，默认绑定才能绑定到全局对象

```
function foo() {      "use strict";

    console.log( this.a );  }

var a = 2;

foo(); // TypeError: this is undefine
```

#### 构造器调用模式

如果函数倾向于和 new 关键词一块使用，则我们称这个函数是 构造函数。 在函数内部，this 指向新创建的对象。

```
var Quo=function (string){
   this.status=string;
}
//给Quo的所有实例提供一个名为get_status的公共方法
Quo.prototype.get_status=function(){
return this.status;
};
var myQuo=new Quo('confused');
document.writeln(myQuo.get_status());//confused
```

or

```
function foo(a) {      this.a = a; }

var bar = new foo(2); console.log( bar.a ); // 2
```

#### apply or call 调用模式（显式绑定）

这两个方法是如何工作的呢？它们的第一个参数是一个对象，它们会把这个对象绑定到 this，接着在调用函数时指定这个 this。因为你可以直接指定 this 的绑定对象，因此我 们称之为显式绑定。

```
function foo() {      console.log( this.a ); }

var obj = {      a:2 };

foo.call( obj ); // 2

```

从 this 绑定的角度来说，call(..) 和 apply(..) 是一样的，它们的区别体现 在其他的参数上，但是现在我们不用考虑这些。

#### 总结：

1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。 var bar = new foo()
2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是 指定的对象。 var bar = foo.call(obj2)
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上 下文对象。 var bar = obj1.foo()
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到 全局对象。 var bar = foo()
