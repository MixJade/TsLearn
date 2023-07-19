import type {RouteRecordRaw} from "vue-router";
import {createRouter, createWebHashHistory} from "vue-router"
import test1_children from "@/router/test1_children";
import test0_children from "@/router/test0_children";
import {hello3_child} from "@/router/hello3_child";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/HELLO_01.vue'),
        children: [...test0_children]
    },
    {
        path: '/test1',
        component: () => import('@/views/HELLO_02.vue'),
        children: [...test1_children],
    }, {
        path: '/hello3',
        component: () => import('@/views/HELLO_03.vue'),
        children: [...hello3_child],
    },
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router