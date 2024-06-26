# CSS波浪加号大于号

> 2024年4月11日18:00:16

## ~（波浪号）

~（波浪号）：A ~ B表示选择A标签后的所有B标签，但是A和B标签必须有相同的父元素。

```xml
<style>
        h3~h5{
            color: red;
        }
</style>

<body>
    <div>
        <h1>我是第1行</h1>
        <h2>我是第2行</h2>
        <div>
            <h3>我是第3行</h3>
            <h5>我是测试行</h5>
            <h4>我是第6行</h4>
            <h5>我是测试行</h5>
        </div>
        <h4>我是第4行</h4>
        <h5>我是第5行</h5>
    </div>
</body>
```

h3~h5选择前面有`<h3>`元素的每个`<h5>`元素，即选择h3之后出现的所有h5，两种元素必须拥有相同的*父元素*，但h5不必紧随h3。

说明：这里的h5，h3也可以换成实际项目中的其他标签的类名、标签名或id等。

## +（加号）

~（加号）加号又被称作兄弟选择器。A+B表示选择紧邻在A后面的B元素，且A和B必须拥有相同的父元素，所选到的仅为一个B元素标签。

```xml
<style>
        h3+h5{
            color: red;
        }
</style>

<body>
    <div>
        <h1>我是第1行</h1>
        <h2>我是第2行</h2>
        <div>
            <h3>我是第3行</h3>
            <h5>我是测试行</h5>
            <h4>我是第6行</h4>
            <h5>我是测试行</h5>
        </div>
        <h4>我是第4行</h4>
        <h5>我是第5行</h5>
    </div>
</body>
```

## >（大于号）

大于号表示某个元素的下一代元素。A>B指选择A元素里面的B元素，其中B元素是A元素的第一代。

```xml
<style>
		// 选择类myDiv里面的第一代h3。
        .myDiv>h3{
            color: red;
        }
</style>

<body>
    <div>
        <h1>我是第1行</h1>
        <h2>我是第2行</h2>
        <div class="myDiv">
            <h3>我是测试行</h3>
            <div>
                <h3>我也是测试行</h3>
            </div>
        </div>
        <h4>我是第4行</h4>
        <h5>我是第5行</h5>
    </div>
</body>
```