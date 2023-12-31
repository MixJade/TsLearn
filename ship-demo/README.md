# Vue 3 + TypeScript + Vite

> 小DEMO

## 宠物医院管理系统的前端原型

> 这是一个纯前端UI，数据都是假的

* 四处缝合，找到一个不错的组件UI就往里面缝
* 参考网站，写的时候所参考的一些网站，包括前端知识、缝合对象、开发工具

## 目录结构

> * 注：Linux下查看树命令：` tree -d -L 3`
> * 意思是：只查看文件夹(`-d`)，只查看3层的目录(`-L 3`)

```text
├── node_modules 「依赖包，运行npm install下载」
├── public 「公共资源，包括css文件、图标、图片」
│    ├── css 「公共css文件，主要是一些没必要封装成组件但又复用的样式」
│    ├── icon
│    └── picture
└── src
    ├── components 「公共组件」
    │    ├── button 「按钮样式组件」
    │    ├── card 「卡片样式组件」
    │    ├── chat 「聊天相关的组件」
    │    ├── row 「内容在一行的组件」
    │    ├── show 「单纯为了展示，不做任何处理的组件」
    │    └── zoneView 「部分页面的主要内容封装的组件」
    ├── model 「数据模型」
    │    ├── DO 「从后端传来的数据模型，大部分继承entiy」
    │    ├── entiy 「数据库中表的模型，主要用于新增修改」
    │    └── VO 「向后端传参的模型，一般只有一两个参数」
    ├── router 「vue路由」
    ├── utils 「工具类」
    └── views 「展示的页面，里面的组件都在router中注册」
        ├── backstage 「后台管理员相关页面」
        ├── doctorPage 「后台医生相关页面」
        └── reception 「前台用户相关页面」
```