import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/main.vue')
    }, {
        path: '/sourceCate',
        component: () => import('@/views/sourceCate.vue')
    }, {
        path: '/sourceImg',
        component: () => import('@/views/sourceImg.vue')
    }, {
        path: '/examSubject',
        component: () => import('@/views/examSubject.vue')
    }, {
        path: '/examPaper',
        component: () => import('@/views/examPaper.vue')
    }, {
        path: '/examQuest',
        component: () => import('@/views/examQuest.vue')
    }, {
        path: '/dealQuest',
        component: () => import('@/views/dealQuest.vue')
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
