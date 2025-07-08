import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/yearCalendar.vue')
    },
    {
        path: '/monthCalendar',
        component: () => import('@/views/monthCalendar.vue')
    },
    {
        path: '/payRecords',
        name: 'payRecords',
        component: () => import('@/views/payRecords.vue')
    },
    {
        path: '/payCaches',
        component: () => import('@/views/payCaches.vue')
    },
    {
        path: '/payDicts',
        component: () => import('@/views/payDicts.vue')
    },
    {
        path: '/yearReport',
        component: () => import('@/views/yearReport.vue')
    },
    {
        path: '/monthReport',
        component: () => import('@/views/monthReport.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
