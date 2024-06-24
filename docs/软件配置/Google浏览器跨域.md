# Google浏览器跨域

> 2024年6月24日20:18:21

## 一、命令配置

新建一个浏览器的快捷方式，
在目标栏的后面加上:
`--disable-web-security --user-data-dir=C:\kua-yu`
记得在前面空一格

比如我的浏览器就是：

```sh
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=D:\kua-yu
```

## 二、脚本启动

> 有的时候，修改快捷方式的跨越，可能会提示你没有读写权限
>
> (比如：你无权对D:\kua-yu进行读写)

* 通过cmd脚本启动可以绕过这个没有读写权限的问题

```bash
@echo off
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir=D:\kua-yu
```

