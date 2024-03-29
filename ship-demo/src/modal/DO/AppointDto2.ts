import {AppointDto} from "@/modal/DO/AppointDto";

/**
 * 医生个人中心挂号信息
 */
export interface AppointDto2 extends AppointDto {
    petPhoto: string;
    petVariety: string;
    petStatus: string;
    petSex: boolean;
    petAge: string;
}

export const exampleAppointDto2 = (): AppointDto2[] => {
    return [
        {
            "appointmentId": 7,
            "clientId": 3,
            "petId": 12,
            "appointmentDate": "2023-02-18T14:30:00",
            "departmentId": 8,
            "doctorId": 4,
            "appointmentInfo": "测试挂号",
            "isSuc": false,
            "createTime": "2023-02-18T14:30:21",
            "updateTime": null,
            "isDel": null,
            "clientName": "散玉",
            "petName": "二橘",
            "departmentName": "中兽科",
            "doctorName": null,
            "petPhoto": "280906db-7875-44f7-babc-da106823b59e.jpg",
            "petVariety": "橘猫",
            "petStatus": "频繁掉毛",
            "petSex": true,
            "petAge": "2009-12-24"
        },
        {
            "appointmentId": 6,
            "clientId": 3,
            "petId": 12,
            "appointmentDate": "2023-02-13T23:49:00",
            "departmentId": 8,
            "doctorId": 4,
            "appointmentInfo": "熬夜写网页",
            "isSuc": true,
            "createTime": "2023-02-13T21:49:47",
            "updateTime": null,
            "isDel": null,
            "clientName": "散玉",
            "petName": "二橘",
            "departmentName": "中兽科",
            "doctorName": null,
            "petPhoto": "280906db-7875-44f7-babc-da106823b59e.jpg",
            "petVariety": "橘猫",
            "petStatus": "健康",
            "petSex": true,
            "petAge": "2009-12-24"
        },
        {
            "appointmentId": 4,
            "clientId": 1,
            "petId": 3,
            "appointmentDate": "2023-01-16T21:24:00",
            "departmentId": 8,
            "doctorId": 4,
            "appointmentInfo": "查看骨骼",
            "isSuc": true,
            "createTime": "2023-01-16T21:24:51",
            "updateTime": null,
            "isDel": null,
            "clientName": "莹",
            "petName": "心海",
            "departmentName": "中兽科",
            "doctorName": null,
            "petPhoto": "f66eb858-e13c-438a-b235-8889d2d416be.png",
            "petVariety": "观赏鱼",
            "petStatus": "发电",
            "petSex": false,
            "petAge": "2000-01-13"
        },
        {
            "appointmentId": 3,
            "clientId": 3,
            "petId": 12,
            "appointmentDate": "2023-01-08T23:30:00",
            "departmentId": 8,
            "doctorId": 4,
            "appointmentInfo": "熬夜写网页",
            "isSuc": true,
            "createTime": "2023-01-08T23:31:23",
            "updateTime": null,
            "isDel": null,
            "clientName": "散玉",
            "petName": "二橘",
            "departmentName": "中兽科",
            "doctorName": null,
            "petPhoto": "280906db-7875-44f7-babc-da106823b59e.jpg",
            "petVariety": "橘猫",
            "petStatus": "健康",
            "petSex": true,
            "petAge": "2009-12-24"
        }
    ]
}
