# Vue学习笔记【2】

## 0 参考网站

参考网站：

* VUE官网：[快速上手 | Vue.js (vuejs.org)](https://cn.vuejs.org/guide/quick-start.html)
* Element-Plus官网：[Button 按钮 | Element Plus (gitee.io)](https://element-plus.gitee.io/zh-CN/component/button.html#基础用法)
* Sass官网：[Sass教程 Sass中文文档 | Sass中文网](https://www.sass.hk/docs/)
* Sass教程：[Sass 嵌套规则与属性 | 菜鸟教程 (runoob.com)](https://www.runoob.com/sass/sass-nesting.html)
* 启动后端：[在无Java环境下运行jar文件_ds_surk的博客-CSDN博客](https://blog.csdn.net/hunt_er/article/details/81427804)
* 将json转化为ts接口：[⚡any-type, 傻瓜化操作, json数据生成typescript类型 - 掘金 (juejin.cn)](https://juejin.cn/post/7055097715994132516)

## 1 项目初始化
### 1.1 使用vite建立Vue项目

打开vite官网：[开始 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/)

运行如下命令：

```text
  npm create vite@latest
```

然后将以下运行一遍

```text
  cd ship-ui
  npm install
  npm run dev
```

配置package.json，让项目启动时自动打开网页。

```text
  "dev": "vite --open",   // 在后面加上--open
```

### 1.2 引入Element-Plus

```text
  npm install element-plus --save
```

启动Element-Plus按需引用的插件

```text
  npm install -D unplugin-vue-components unplugin-auto-import
```

在vite.config.ts中导入

```ts
  import {defineConfig} from 'vite'
  import vue from '@vitejs/plugin-vue'
  import AutoImport from 'unplugin-auto-import/vite'
  import Components from 'unplugin-vue-components/vite'
  import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
  
  // https://vitejs.dev/config/
  export default defineConfig({
      plugins: [vue(),
          AutoImport({
              resolvers: [ElementPlusResolver()],
          }),
          Components({
              resolvers: [ElementPlusResolver()],
          }),
      ],
  })
```

然后如此使用

```vue
<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
</script>
<template>
  <el-row class="mb-4">
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </el-row>

  <el-row>
    <el-button :icon="Search" circle/>
    <el-button type="primary" :icon="Edit" circle/>
    <el-button type="success" :icon="Check" circle/>
    <el-button type="info" :icon="Message" circle/>
    <el-button type="warning" :icon="Star" circle/>
    <el-button type="danger" :icon="Delete" circle/>
  </el-row>
</template>
```

### 1.3 配置环境文件

新建文件`.env.development`

输入以下内容：

```tex
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '查尔斯顿'
VITE_BACK_URL = 'http://localhost:8080/'
```

然后如此引用：

```tex
console.log(import.meta.env.VITE_BACK_URL)
```

`.env`文件名的后缀可以不是development，可以叫`.env.dev`

然后在package.json中的`scripts`如此设置：`"dev": "vite --open --mode dev",`

### 1.4 配置SASS

首先如此下载

```text
npm install -D sass
```

然后这样使用：

* 注意：这样会警告text属性未定义，这是BUG，其实仍然可以编译成功并生效
* 但为了赏心悦目，实际使用建议在定义属性时不使用嵌套属性

```vue
<template>
  <div class="am-card">
    <div>那个</div>
    <div>你好</div>
    <div>在吗</div>
    <div>不在</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
$father: #e9e9f5;
$div-w: 60px;
$child-1: #2b772b;
$child-2: #228371;
$child-3: #a9695a;
$child-4: #bb8c38;

.am-card {
  background-color: $father;

  div {
    text: {
      align: center;
      shadow: #213547;
    }
    width: $div-w;
  }

  :nth-child(1) {
    color: $child-1;
  }

  :nth-child(2) {
    color: $child-2;
  }

  :nth-child(3) {
    color: $child-3;
  }

  :nth-child(4) {
    color: $child-3;
  }
}
</style>
```

### 1.5 下载axios

```tex
npm install axios
```

设置请求响应拦截器：

【同时也可以封装一个api文档，将请求地址、请求方法、返回的数据格式都封装起来】

案例：

```typescript
//进行axios二次封装:使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'
//第一步:利用axios对象的create方法,去创建axios实例(其他的配置:基础路径、超时的时间)
const request = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000, //超时的时间的设置
})
//第二步:request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  //返回配置对象
  return config
})

//第三步:响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default request
```

### 1.6 设置src别名

在`vite.config.ts`中如此配置

```typescript
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [...],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
```

在`tsconfig.json`中如此设置:

```json
{
  "compilerOptions": {
    // 乱七八糟的配置
    /*设置编译时转化src别名*/
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
}
```

### 1.7 引入路由 

```shell
npm i -D vue-router@4
```

接着在main.ts中定义应用路由

```ts
import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
// 路由
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

然后新建文件夹`router`，再在下面新建文件`index.ts`

```ts
import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: () => import('@/views/HELLO_01.vue')
    },
    {
        path: '/test1',
        name: "test1",
        component: () => import('@/views/HELLO_02.vue')
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
```

接着新建文件夹views，专门放路由组件

里面建立两个组件`HELLO_02.vue`与`HELLO_01.vue`

然后在App.vue中使用路由

```vue
<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="nav">
    <ul>
      <li @click="router.push('/test1')">测试路由1</li>
      <li @click="router.push('/')">测试路由2</li>
      <li>jj</li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  background-color: #282828;
}

ul {
  position: relative;
  display: flex;
}

ul li {
  list-style: none;
  width: 80px;
  color: whitesmoke;
  line-height: 40px;
  text-align: center;
  cursor: default;
}

</style>
```