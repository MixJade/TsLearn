import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'calendar',
        component: () => import('@/views/calendar.vue')
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
        name: 'yearReport',
        component: () => import('@/views/yearReport.vue')
    },
    {
        path: '/monthReport',
        name: 'monthReport',
        component: () => import('@/views/monthReport.vue')
    },
    {
        path: '/monthBarRep',
        name: 'monthBarRep',
        component: () => import('@/views/monthBarRep.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
