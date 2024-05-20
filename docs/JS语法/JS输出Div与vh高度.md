# JS输出Div与vh高度

> 2024年5月20日20:34:32

在JavaScript中，你可以通过以下方式获取一个div的高度，假设div的id是"myDiv"：

```javascript
// 使用定时器防止动态加载的元素获取不准
setTimeout(() => {
    // Div高度
    let div = document.getElementById("tb-main2");
    let divHeight = div.offsetHeight;
    console.log("Div高度：", divHeight);
}, 1000)
```
`offsetHeight`属性返回元素的像素高度，包含元素的边框、内边距 和 水平滚动条（如果存在的话）。

要得到100vh（视口的高度）的像素数，你可以这样做：

```javascript
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
console.log(vh);
```
这将返回视口的高度，以像素为单位。这里使用 `Math.max()` 是为了确保能得到有效的视口高度，无论是在标准模式还是混合模式的浏览器。

注意：这里的代码假设你的HTML文档是有效的并且符合标准模式（即含有合适的DOCTYPE）。在非标准或混合模式的浏览器，这可能提供不正确的结果。