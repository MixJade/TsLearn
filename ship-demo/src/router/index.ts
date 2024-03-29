import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"
import demo from "@/router/demo"
import {reception} from "@/router/reception";
import {backstage} from "@/router/backstage";
import {doctorPage} from "@/router/doctorPage";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/Login.vue')
    }, {
        path: '/findPwd',
        component: () => import('@/views/findPwd.vue')
    }, {
        path: '/register',
        component: () => import('@/views/register.vue')
    }, {
        path: '/demo',
        children: [...demo],
    }, {
        path: '/:pathMatch(.*)', // 404路由
        name: 'not-found',
        component: () => import('@/views/demo/Game.vue')
    }, {
        path: '/reception',
        children: [...reception],
    }, {
        path: '/backstage',
        component: () => import('@/views/backstage/index.vue'),
        children: [...backstage],
    }, {
        path: '/doctorPage',
        children: [...doctorPage],
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
