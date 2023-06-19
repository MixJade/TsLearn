import {createRouter, createWebHashHistory} from "vue-router"
import demo from "@/router/demo"

const routes = [
    {
        path: '/',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/hello2',
        name: "hello2",
        component: () => import('@/views/Index.vue')
    },{
        path: '/demo',
        // component: () => import('@/views/HELLO_02.vue'),
        children: [...demo],
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router