# README

> 2024年5月30日15:15:33

专门编译sass的项目

## 一、编译命令详解

```shell
sass --no-source-map --style=compressed src/:out-css/ --watch
```

* `--no-source-map`：不生成css-map
* `--style=compressed`：去除所有注释，压缩css代码
* `src/:out-css/`：编译`src`目录，并将输出的css生成到`out-css`目录中
* `--watch`：实时编译源文件,写完了去命令终端点一下就自动编译