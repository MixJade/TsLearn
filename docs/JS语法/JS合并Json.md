# JS合并Json

> 2024年5月8日15:15:27

在JavaScript中，可以使用Object.assign()方法来合并两个或多个 JSON 对象。

例如：

```javascript
let json1 = {"name": "John"};
let json2 = {"age": 30};

let result = Object.assign(json1, json2);

console.log(result); // 输出 {"name": "John", "age": 30}
```

如果存在相同的键，那么后面的对象的值将覆盖前面的对象的值。

此外，还可以使用扩展运算符(...)与字面量对象一起使用来合并JSON对象：

```javascript
let json1 = {"name": "John"};
let json2 = {"age": 30};

let result = {...json1, ...json2};

console.log(result); // 输出 {"name": "John", "age": 30}
```

请注意，这些方法只能合并一级的 JSON 对象。如果你需要深层次的合并，可能需要使用其他库。