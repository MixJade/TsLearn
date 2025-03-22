# Sass&Ts说明

> 2025-03-19 09:54:59

* 更新软件包版本命令

```shell
npm install sass@latest --save-dev
```

## Sass说明

> 2024年5月30日15:15:33

### 编译命令详解

```shell
sass --no-source-map --style=compressed sassTes/:out-css/ --watch
```

* `--no-source-map`：不生成css-map
* `--style=compressed`：去除所有注释，压缩css代码
* `src/:out-css/`：编译`src`目录，并将输出的css生成到`out-css`目录中
* `--watch`：实时编译源文件,写完了去命令终端点一下就自动编译

## Ts说明

> 2024-03-29 22:18

### 编译命令

```shell
npx tsc -V # 查看本项目TS版本(去掉npx则是全局ts)
cd typeTes/ts # 跳转文件夹
npx tsc 第一次.ts # 编译特定文件
npx tsc # 编译全部文件
```

配置文件的参考网站：[tsconfig.json属性详解](https://juejin.cn/post/6844903684032184327)

### 本地全局

* 安装方式的区别

```sh
npm install -d typescript
```
（等价于 `npm install --save-dev typescript`。

将 TypeScript 安装到当前项目的 node_modules 中（仅本地可用）。

不会将 tsc 命令添加到系统的 PATH 环境变量中。

```sh
npm install -g typescript
```


全局安装 TypeScript，将 tsc 命令添加到系统的 PATH 中（所有项目都可以直接使用）。
- 直接运行 `tsc -v` 时，系统会优先查找全局安装的 `tsc`（因为 PATH 环境变量中全局路径优先级更高）。
- 本地安装的需要通过以下方式执行：

  - **方式一**：使用 `npx tsc -v`（npx 会自动查找项目本地的 `node_modules/.bin/tsc`）。
  - **方式二**：直接指定路径运行：`./node_modules/.bin/tsc -v`。