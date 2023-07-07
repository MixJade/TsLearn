import {createRouter, createWebHashHistory} from "vue-router"
import demo from "@/router/demo"
import {reception} from "@/router/reception";

const routes = [
    {
        path: '/',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/hello2',
        name: "hello2",
        component: () => import('@/views/Index.vue')
    }, {
        path: '/demo',
        children: [...demo],
    }, {
        path: '/reception',
        children: [...reception],
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router