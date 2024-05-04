# JS的Fetch函数

> 2024年5月4日10:50:09

## Get请求

```js
fetch('https://api.example.com/items')
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
```

## POST请求

```js
fetch('https://api.example.com/items', {
    method: 'POST', // 或 'PUT'
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // data 可以是 `string` 或者 `object`，不同的 'Content-Type' 处理方式会不同
})
    .then(resp => resp.json())
    .catch((error) => console.error('Error:', error))
    .then((resp) => console.log('Success:', resp)); 
```

## DELETE请求

```js
fetch('https://api.example.com/items/1', {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
```

