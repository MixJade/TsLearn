import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/sourceCate.vue')
    }, {
        path: '/imgSource',
        component: () => import('@/views/imgSource.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
