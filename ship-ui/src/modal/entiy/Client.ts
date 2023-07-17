/**
 * 个人信息
 */
import {Page} from "@/modal/DO/Page";

export interface Client {
    clientId: number;
    clientUsername: string;
    clientPassword: string | null;
    clientName: string;
    clientGender: boolean;
    clientTel: string;
    clientAge: string;
    clientInfo: string;
    clientPhoto: string;
    createTime: string | null;
    updateTime: string | null;
    isDel: string | null;
}

/**
 * 前台查询当前登录用户
 */
export const exampleClient = (): Client => {
    return {
        "clientId": 1,
        "clientUsername": "ying",
        "clientPassword": "6b6864bf70c40ccbc2752cd9ef11e77b",
        "clientName": "莹",
        "clientGender": false,
        "clientTel": "sanyu0201@163.com",
        "clientAge": "2001-01-03",
        "clientInfo": "来自提瓦特❥(^_-)",
        "clientPhoto": "ying.jpg",
        "createTime": "2022-12-21T19:24:32",
        "updateTime": "2023-03-02T19:52:19",
        "isDel": "0"
    }
}
/**
 * 管理员列表
 */
export const exampleClientBack = (): Page<Client> => {
    return {
        "records": [
            {
                "clientId": 1,
                "clientUsername": "ying",
                "clientPassword": null,
                "clientName": "莹",
                "clientGender": false,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "2001-01-03",
                "clientInfo": "来自提瓦特❥(^_-)",
                "clientPhoto": "ying.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "clientId": 2,
                "clientUsername": "lei-jun",
                "clientPassword": null,
                "clientName": "雷军",
                "clientGender": false,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "1990-01-01",
                "clientInfo": "喜欢宅家撸猫",
                "clientPhoto": "lei-jun.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "clientId": 3,
                "clientUsername": "sanyu",
                "clientPassword": null,
                "clientName": "散玉",
                "clientGender": true,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "2000-01-01",
                "clientInfo": "作者",
                "clientPhoto": "san-yu.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "clientId": 4,
                "clientUsername": "fox",
                "clientPassword": null,
                "clientName": "狐狸",
                "clientGender": false,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "2000-01-07",
                "clientInfo": "粉毛狐狸",
                "clientPhoto": "ba-chong.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "clientId": 5,
                "clientUsername": "hong",
                "clientPassword": null,
                "clientName": "红中",
                "clientGender": true,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "2023-01-22",
                "clientInfo": "一个新用户",
                "clientPhoto": "zs.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "clientId": 6,
                "clientUsername": "bei",
                "clientPassword": null,
                "clientName": "北风",
                "clientGender": false,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "2000-01-03",
                "clientInfo": "黜聪明，拙肢体，同于大道",
                "clientPhoto": "zs.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            },
            {
                "clientId": 9,
                "clientUsername": "wang",
                "clientPassword": null,
                "clientName": "骰子",
                "clientGender": true,
                "clientTel": "sanyu0201@163.com",
                "clientAge": "2023-01-22",
                "clientInfo": "一个新用户",
                "clientPhoto": "zs.jpg",
                "createTime": null,
                "updateTime": null,
                "isDel": null
            }
        ],
        "total": 11
    }
}