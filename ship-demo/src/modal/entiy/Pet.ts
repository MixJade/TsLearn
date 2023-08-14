import {Page} from "@/modal/DO/Page";

/**
 * 宠物详情
 */
export interface Pet {
    petId: number;
    petName: string;
    petVariety: string;
    petSex: boolean;
    petAge: string;
    petStatus: string;
    petInfo: string;
    clientId: number | null;
    petPhoto: string;
    createTime: string | null;
    updateTime: string | null;
    isDel: string | null;
}

/**
 * 宠物详情的示例
 */
export const examplePetDetail = (petId: number): Pet => {
    console.log("所接收的宠物ID是", petId)
    if (petId == 15 || petId == 3) {
        console.log("你好")
        return exampleClientPet()[1]
    }
    return {
        "petId": 7,
        "petName": "波一斯",
        "petVariety": "波斯猫",
        "petSex": false,
        "petAge": "2016-12-15",
        "petStatus": "频繁掉毛",
        "petInfo": "等待有缘人领养",
        "clientId": null,
        "petPhoto": "boss-cat.jpg",
        "createTime": "2022-12-23T11:03:06",
        "updateTime": "2023-02-18T14:28:14",
        "isDel": "0"
    }
}

/**
 * 个人中心：宠物详情的示例2
 */
export const exampleClientPet = (): Pet[] => {
    return [{
        "petId": 15,
        "petName": "波一斯",
        "petVariety": "波斯猫",
        "petSex": false,
        "petAge": "2016-12-15",
        "petStatus": "频繁掉毛",
        "petInfo": "等待有缘人领养",
        "clientId": 1,
        "petPhoto": "boss-cat.jpg",
        "createTime": "2022-12-23T11:03:06",
        "updateTime": "2023-02-18T14:28:14",
        "isDel": "0"
    }, {
        "petId": 3,
        "petName": "心海",
        "petVariety": "观赏鱼",
        "petSex": false,
        "petAge": "2000-01-13",
        "petStatus": "非常健康",
        "petInfo": "心海十分开心",
        "clientId": 1,
        "petPhoto": "f66eb858-e13c-438a-b235-8889d2d416be.png",
        "createTime": "2022-11-30T15:55:04",
        "updateTime": "2023-04-03T22:16:54",
        "isDel": "0"
    }]
}

// 主页样例：宠物卡片
export const examplePetFour = (): Page<Pet> => {
    return {
        "records": [
            {
                "petId": 7,
                "petName": "波一斯",
                "petVariety": "波斯猫",
                "petSex": false,
                "petAge": "2016-12-15",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "boss-cat.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 8,
                "petName": "波二斯",
                "petVariety": "波斯猫",
                "petSex": true,
                "petAge": "2016-12-17",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "fd1cdd8a-3411-4b95-a20d-5ad3993c94af.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 9,
                "petName": "波三斯",
                "petVariety": "波斯猫",
                "petSex": false,
                "petAge": "2013-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "a943938f-7d21-49d3-a909-22f2c2dc2c9b.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 11,
                "petName": "大橘莹",
                "petVariety": "橘猫",
                "petSex": false,
                "petAge": "2007-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "ju-cat.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            }
        ],
        "total": 20
    }
}

// 查看所有领养宠物
export const examplePetSee = (): Page<Pet> => {
    return {
        "records": [
            {
                "petId": 7,
                "petName": "波一斯",
                "petVariety": "波斯猫",
                "petSex": false,
                "petAge": "2016-12-15",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "boss-cat.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 8,
                "petName": "波二斯",
                "petVariety": "波斯猫",
                "petSex": true,
                "petAge": "2016-12-17",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "fd1cdd8a-3411-4b95-a20d-5ad3993c94af.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 9,
                "petName": "波三斯",
                "petVariety": "波斯猫",
                "petSex": false,
                "petAge": "2013-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "a943938f-7d21-49d3-a909-22f2c2dc2c9b.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 11,
                "petName": "大橘莹",
                "petVariety": "橘猫",
                "petSex": false,
                "petAge": "2007-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "ju-cat.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 13,
                "petName": "三橘",
                "petVariety": "橘猫",
                "petSex": false,
                "petAge": "2009-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "42e28f7b-c1ab-49fd-a486-4f4ce35c565b.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 14,
                "petName": "四橘",
                "petVariety": "橘猫",
                "petSex": true,
                "petAge": "2010-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "3e56e4f8-5459-4559-85af-f7b0ecc2ff1d.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 16,
                "petName": "五橘",
                "petVariety": "橘猫",
                "petSex": false,
                "petAge": "2012-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "cf037563-88bd-40dd-b139-908b8ac72fbd.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "petId": 17,
                "petName": "六橘",
                "petVariety": "橘猫",
                "petSex": true,
                "petAge": "2012-12-23",
                "petStatus": "身体健康",
                "petInfo": "等待有缘人领养",
                "clientId": null,
                "petPhoto": "a6f7dc61-0f4f-47b9-bfee-535d5c6d80f6.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            }
        ],
        "total": 20
    }
}