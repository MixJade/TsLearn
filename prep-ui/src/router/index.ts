import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/main.vue')
    },{
        path: '/sourceCate',
        component: () => import('@/views/sourceCate.vue')
    }, {
        path: '/sourceImg',
        component: () => import('@/views/sourceImg.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
