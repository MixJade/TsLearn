import {createRouter, createWebHashHistory} from "vue-router"

const routes = [
    {
        path: '/demo02',
        component: () => import('@/views/demo02.vue')
    }, {
        path: '/demo01',
        component: () => import('@/views/demo01.vue')
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router
