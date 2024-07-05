# VUE获取env变量细节

> 2024年7月5日11:05:59

* 转载自：[vue中 process.env.XXX环境变量不生效（获取不到数据）_process.env获取不到-CSDN博客](https://blog.csdn.net/zlfjavahome/article/details/131313158)

.env文件中的配置：

```bash
NODE_ENV=development
VUE_APP_PREVIEW=true
VUE_APP_BASE_API = 'http://127.0.0.1:8080/admin-api'
VUE_DOC_BASE_API = 'http://127.0.0.1:8080'
```


代码中获取方式

```js
axios.defaults.docURL = process.env.VUE_DOC_BASE_API;
```

问题：使用`process.env.XXX`时获取不到环境变量的值：

`axios.defaults.docURL = undefind`

解决：
`.env.development`和`.env.production`环境配置文件中变量名必须以VUE_APP_开头

正确配置：

```bash
NODE_ENV=development
VUE_APP_PREVIEW=true
#VUE_APP_BASE_API = 'https://module.niurenjianzhan.com/admin-api'
VUE_APP_BASE_API = 'http://127.0.0.1:8080/admin-api'

#自己加的必须以VUE_APP_ 开头
VUE_APP_DOC_BASE_API = 'http://127.0.0.1:8080'
```