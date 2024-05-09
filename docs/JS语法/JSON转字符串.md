# JSON转字符串

> 2024年5月8日15:20:01

可以使用`JSON.stringify()`函数将一个JSON对象转化为字符串。例如：

```javascript
var obj = {name: "John", age: 30, city: "New York"};
var myJSON = JSON.stringify(obj);
console.log(myJSON);
```

以上代码将输出：

```text
{"name":"John","age":30,"city":"New York"}
```
