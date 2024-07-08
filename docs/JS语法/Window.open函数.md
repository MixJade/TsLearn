# Window.open函数

> 2024年7月5日12:00:04

## 一、简介

`window.open()` 是一个可以打开一个新窗口，或者重新加载已经存在的窗口的JavaScript函数。其基本语法如下：

```javascript
window.open(URL, name, specs, replace);
```

每个参数的含义如下：

- **URL**: 可选。需要打开的网页的网址。

- **name**: 可选。新打开的窗口的名字。该名字作为新打开窗口的 `target` 特性值，用于 `form` 或 `a`元素。其可以带有以下特殊值：

  - `_blank` 打开一个新的窚。

  - `_parent` 在父窗口中打开。

  - `_self` 在相同窗口打开。

  - `_top` 在整个窗口（顶层窗口）中打开。

- **specs**: 可选。一个逗号分隔的特性列表，如 `'width=300,height=300,resizable=yes,scrollbars=no'`。

- **replace**: 可选。一个Boolean值，表示新加载的网页是否应该替换浏览器的历史记录中的当前页面。

使用`window.open()`需要注意的一些细节：

1. Popup Blockers：一些浏览器或者安全软件可能会阻止script弹出新的窗口，用户需要明确授权才能允许网页自动打开新窗口。

2. 返回的Window对象：`window.open()`方法会返回一个对新打开的窗口的引用，并且这个引用存活在父窗口中，即使子窗口已经被关闭。

3. 相同的窗口名：如果用相同的名字调用`window.open()`方法，而该窗口已经存在，那么这个已存在的窗口将被用新的URL重新加载。

4. 不能通过`window.open()`方法打开本地文件(`file://...`)。

5. 在同源策略的限制下，其他网页无法通过JavaScript访问新打开窗口的DOM，只有当新窗口与原窗口同源（同域名，同协议，同端口）时才可以进行访问。

6. 通过`window.open()`打开新窗口时，得到的新窗口引用反馈较慢，特别是网络慢的时候，没有完全打开之前是得不到新窗口的引用。因此，需要注意在新窗口完全打开之前应该避免对新窗口进行操作，否则可能引发错误。

## 二、示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>windowOpen测试</title>
</head>
<body>
<p>window.open可以打开其它网站的页面,不会触发同源策略</p>
<p>参数“_blank”意为使用新窗口打开</p>
<p>但也只是单纯的打开页面，无法进行诸如读取dom等操作</p>
<button type="button" onclick="window.open('https://www.baidu.com/','_blank')">点击打开百度</button>
</body>
</html>
```

## 三、题外话

* 使用`window.open`往往是为了与其它系统对接。比如我在后端处通过http工具请求其它系统接口，返回了诸如“任务ID"、"其它系统的Token"这种参数，然后我需要在前端展示一个详情页面。
* 这时可以用`window.open`，但需要与该系统的开发人员沟通好，让他们将Token校验放在url里，这样我们才能通过url来打开对应页面。
* 另外：`window.open`作为与其它系统对接页面的方案，其实往往是先在后端通过像`hutool`这种库，发起http请求、调用一系列接口，得到token后，将查看详情页面所需的参数、Token一起给前端，前端就只负责最后的打开详情页面。
* 关于**后端调用http接口**，可以使用**hutool的httprequest**或者**Spring自带的restTemplate**
* 相关链接：
    * 1. [Spring Boot发送GET/POST请求](https://blog.csdn.net/weixin_50637551/article/details/120804096)
      2. [使用hutool发送POST请求](https://blog.csdn.net/acaSADag/article/details/124533943)

