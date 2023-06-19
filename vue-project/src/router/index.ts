import {createRouter, createWebHashHistory} from "vue-router"
import test1_children from "@/router/test1_children";
import test0_children from "@/router/test0_children";

const routes = [
    {
        path: '/',
        component: () => import('@/views/HELLO_01.vue'),
        children: [...test0_children]
    },
    {
        path: '/test1',
        component: () => import('@/views/HELLO_02.vue'),
        children: [...test1_children],
    }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router