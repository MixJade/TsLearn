import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/entrance.vue')
    }, {
        path: '/chat',
        component: () => import('@/views/chat.vue')
    }, {
        path: '/fileUp',
        component: () => import('@/views/fileUp.vue')
    }, {
        path: '/qrCode',
        component: () => import('@/views/qrCode.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
