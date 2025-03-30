import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/calendar.vue')
    },
    {
        path: '/payRecords',
        name: 'payRecords',
        component: () => import('@/views/payRecords.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
