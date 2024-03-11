# JS使用正则表达式从列表提取元素

> 2024年3月11日15:10:38

在js中获取一个数组中的元素(内部元素格式：xxxxRolexxx)，我希望将Role前面的xxxx取出来，成为一个新的列表。



可以用 `Array.prototype.map()` 方法配合正则表达式来实现这个功能。

```javascript
let arr = ["abcRole123", "xyzRole456", "pqrRole789"];

let newArr = arr.map(item => item.match(/.*(?=Role)/g)[0]);

console.log(newArr); // 输出 ["abc", "xyz", "pqr"]
```

这个代码中， `arr.map()` 方法会遍历数组 `arr` 中的每个元素并对每个元素执行提供的函数（这个函数就是将每个字符串从Role前面部分取出来）然后返回一个新的数组。

 `.match()` 方法用于在字符串中寻找匹配正则表达式的内容。 `/.*(?=Role)/g` 是一个正则表达式，它用于匹配所有直到 'Role' 的字符串部分。在这种情况下，它会匹配 Role 前面的所有部分。

`[0]` 是因为`.match()`方法返回的是一个数组，我们需要的数据是第一个元素。所以要获取第一个。

注意: 如果你确定数组项都含有"Role"并且"Role"之前至少有一个字符，那么上述代码没问题，但如果有数组项不满足这个条件，上述代码就会报错。为此，你需要加一些错误处理的代码，可以参考下述代码：

```javascript
let newArr = arr.map(item => {
    let match = item.match(/.*(?=Role)/g);
    return match ? match[0] : '';
});
```
在这里，我们检查了 `match` 是否存在。如果匹配到了结果，则返回 `match[0]`；否则返回空字符串。