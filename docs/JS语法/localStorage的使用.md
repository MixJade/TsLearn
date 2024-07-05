# localStorage的使用

> 2024-7-5 11:16:14

* 我用来存Token

localStorage 是 HTML5 提供的用于本地存储的功能，它是一个对象，提供一系列的方法，比如 setItem 和 getItem 来存储和读取数据。

localStorage.setItem 方法接收两个参数：
- key（字符串）：用于标识要存储的数据的名称
- value（字符串）：要存储的具体数据
这个方法会将一对 key-value 存储在本地。

例如：`localStorage.setItem('myKey', 'myValue');`

localStorage.getItem 方法接收一个参数：
- key（字符串）：要取出的数据的名称
这个方法会返回以该 key 存储的 value。

例如：`let value = localStorage.getItem('myKey');`

这里需要注意的细节有：

1、只能存储字符串类型的数据。如果要储存其他类型的值，比如对象、数组等，需要先将其转换为 JSON 格式的字符串再存储，取出时再进行反转换。

例如：
```javscript
let obj = { name: 'John', age: 30 };
localStorage.setItem('myKey', JSON.stringify(obj));
let value = JSON.parse(localStorage.getItem('myKey'));
```

2、localStorage 中的数据是持久化的，关闭页面或浏览器后，数据依然存在，除非主动删除数据，所以在处理敏感信息时需要谨慎使用。

3、每个浏览器、不同协议、不同域存储的数据是相互独立的，比如无法在 http 页面读取 https 页面的数据。

4、localStorage 的存储容量有限，大约为5MB-10MB，超出会报错。

5、localStorage中存储的数据页面刷新不会丢失，页面之间可以共享同一个sessionStorage对象。

6、对于 localStorage 并没有事件可以监听其变化，如果需要的话可以尝试用 setInterval 轮询的方式去检测变化。