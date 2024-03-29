import {RouteRecordRaw} from "vue-router";

/**
 * 路由一的子路由
 * 父路径：/demo
 */
const demo: RouteRecordRaw[] = [
    {
        path: "testScss",
        component: () => import('@/views/demo/TestScss.vue')
    }, {
        path: "hello",
        component: () => import('@/views/demo/HelloWorld.vue')
    }, {
        path: "lifeTerm",
        component: () => import('@/views/demo/LifeTerm.vue')
    }, {
        path: "strataCard",
        component: () => import('@/views/demo/StrataCard.vue')
    }, {
        path: "testRoll",
        component: () => import('@/views/demo/TestRoll.vue')
    }, {
        path: "game",
        component: () => import('@/views/demo/Game.vue')
    }, {
        path: "threeCircle",
        component: () => import('@/views/demo/ThreeCircle.vue')
    },
]

export default demo
