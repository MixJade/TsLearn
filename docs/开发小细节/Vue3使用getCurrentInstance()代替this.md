# Vue3使用getCurrentInstance()代替this

> 时间：2024年3月1日15:46:20

```ts
// 又名：为什么使用proxy来代替this
const proxy = getCurrentInstance()?.proxy as this;
```

## 一、背景:不愿了解最新规范

因公司前端的代码写的特别乱，用vue3的setup，但又按vue2的写法使用`this`调用，所以公司就推崇使用`const proxy = getCurrentInstance()?.proxy as this;`来代替`this`。

## 二、规范:官方不推荐

实际上，Vue官方是不推荐使用`getCurrentInstance()`的。

官方解说： 

* 因为 setup() 是在解析其它组件选项之前被调用的，所以 setup() 内部的 this 的行为与其它选项中的 this 完全不同。
* 且 Vue3 的 Composition API 强调的就是业务的解耦和复用性，依赖组件实例属性并不是很好的开发方式。
* 所以Vue为了避免我们错误的使用，直接将setup函数中的this修改成了`undefined`。

## 三、为什么用不了this

> 简单来说，这个时候this指向的对象还没创建

在Vue3中，setup 在生命周期 beforecreate 和 created 前执行，此时 vue 对象还未创建。

因此，无法使用我们在 vue2.x 常用的 this。

在生产环境内可能会获取不到该实例!!,而且我们确实不应该用该方法去代替this
