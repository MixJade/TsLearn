/**
 * 用户页面的路由
 * 父路径：/reception
 */
export const reception = [
    {
        path: "petSee",
        component: () => import('@/views/reception/petSee.vue')
    },{
        path: "doctorSee",
        component: () => import('@/views/reception/doctorSee.vue')
    },
]