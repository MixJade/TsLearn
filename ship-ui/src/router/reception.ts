/**
 * 用户页面的路由
 * 父路径：/reception
 */
export const reception = [
    {
        // 查看所有待领养宠物
        path: "petSee",
        component: () => import('@/views/reception/petSee.vue')
    }, {
        // 查看所有医生
        path: "doctorSee",
        component: () => import('@/views/reception/doctorSee.vue')
    }, {
        // 查看单个宠物
        path: "petOne/:petId",
        props: true,
        component: () => import('@/views/reception/petOne.vue')
    },
]