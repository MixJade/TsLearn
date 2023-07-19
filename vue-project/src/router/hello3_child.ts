import type {RouteRecordRaw} from "vue-router";

/**
 * 父路径：/hello3
 */
export const hello3_child: RouteRecordRaw[] = [
    {
        path: "flow_01",
        component: () => import('@/views/hello3/flow_01.vue')
    },
]