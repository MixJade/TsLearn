# Js闭包

> 2024年5月22日14:16:30

## 一、隔离式闭包

* 常用的闭包，用于代码隔离
* 但里面的函数无法供外部调用

```javascript
(() => {
    // 这里的函数外部无法使用
    const say = () => {
        console.log("NiH")
    }
})();
```

## 二、暴露式闭包

* 主要是将第一个闭包变成一个模块，调用通过`模块名.方法`这样调用
* 在前面加上const、在末尾加上return即可。

```javascript
const yourModule = (() => {
    const say = () => {
        console.log("NiH")
    }

    // 最后return的函数外部才能调用
    return {
        say
    }
})();

// 如此外部调用
yourModule.say();
```

