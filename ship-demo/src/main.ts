import {App as Vpp, createApp} from 'vue'
import './style.css'
import App from './App.vue'
// 路由
import router from './router'
// ElementPlus
import {pushElement} from "@/push-element";

const app: Vpp = createApp(App)
app.use(router)
pushElement(app)// 注册Element-Plus组件
app.mount('#app')
