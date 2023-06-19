import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 路由
import router from './router'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
