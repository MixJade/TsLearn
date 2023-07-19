import type {RouteRecordRaw} from "vue-router";

/**
 * 路由2的子路由，
 * 父路径：/test1
 * 父文件：HELLO_02.vue
 */
const test1_children: RouteRecordRaw[] = [
    {
        path: 'life',
        component: () => import('@/views/hello2/LifeTerm.vue')
    }, {
        path: 'prop/:roll',
        name: 'propTest',
        props: ({query}: any): object => ({role: query.role}),
        component: () => import('@/views/hello2/MyHello.vue')
    }, {
        path: 'query',
        component: () => import('@/views/hello2/QueryTest.vue')
    }, {
        path: 'query02', // 即使使用name，仍然需要path
        name: 'query02', // 可以使用name，这样引用就不用加父前缀
        component: () => import('@/views/hello2/QueryTest02.vue')
    },
]

export default test1_children