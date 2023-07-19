import type {RouteRecordRaw} from "vue-router";

/**
 * 路由一的子路由
 * 父路径：/
 * 父文件：HELLO_01.vue
 */
const test0_children: RouteRecordRaw[] = [
    {
        path: "timer",
        component: () => import('@/views/hello1/TimerTest.vue')
    }, {
        path: "num",
        component: () => import('@/views/hello1/NumTest.vue')
    }, {
        path: "shake",
        component: () => import('@/views/hello1/Shake.vue')
    }, {
        path: '/showDiv',
        component: () => import('@/views/hello1/ShowDiv.vue')
    }
]

export default test0_children