# 破解Js无限回调控制台

> 2024-08-29 20:59:01

参考教程：[js逆向--无限debugger的原理有逆向 -  博客园 ](https://www.cnblogs.com/liyuanhong/articles/18210072)

## 一、概述

对网页进行调试时，发现网站使用循环调取debugger模式，以此防止调试网页

甚至你打开调试会出现这个：

```js
(function anonymous(
) {
debugger
})
```

最后你追根溯源，发现造成这种情况的代码如下：

```js
try {
    setInterval(function() {
        Function("debugger")()
    }, 50)
} catch (e) {}
```

## 二、解决方法

1. 在代码的右侧面板的【调用堆栈】，点击跳转其源代码

2. 在源代码上打断点，比如：

   ```js
   try {
   (断点)setInterval(function() {
           Function("debugger")()
       }, 50)
   } catch (e) {}
   ```

3. 在【源码】面板的右上角，有一个禁用图标，叫【禁用所有断点】，点一下就行