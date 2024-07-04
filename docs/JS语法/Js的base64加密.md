# Js的base64加密

> 2024年7月4日17:22:16

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>测试base64加密</title>
</head>
<body>
<p>在node.js中没有window对象,只能放html调用</p>
<p>虽然node.js可以用global代替window，但会警告，故不推荐</p>
</body>
<script>
    let count = 2488;
    const base64Str = window.btoa(String(count));
    console.log(base64Str);
</script>
</html>
```

