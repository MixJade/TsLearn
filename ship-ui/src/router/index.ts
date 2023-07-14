import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"
import demo from "@/router/demo"
import {reception} from "@/router/reception";
import {backstage} from "@/router/backstage";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/Login.vue')
    }, {
        path: '/demo',
        children: [...demo],
    }, {
        path: '/reception',
        children: [...reception],
    }, {
        path: '/backstage',
        component: () => import('@/views/backstage/index.vue'),
        children: [...backstage],
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router