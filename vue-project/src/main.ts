import {createApp} from 'vue'
import App from './App.vue'
import './assets/main.css'
// 路由
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
