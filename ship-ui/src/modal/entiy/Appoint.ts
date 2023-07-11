/**
 * 挂号单信息
 */
export interface Appoint {
    appointmentId: number;
    clientId: number | null;
    petId: number | null;
    appointmentDate: string;
    departmentId: number | null;
    doctorId: number | null;
    appointmentInfo: string;
    isSuc: boolean | null;
    createTime: string | null;
    updateTime: string | null;
    isDel: string | null;
    clientName: string | null;
    petName: string;
    departmentName: string | null;
    doctorName: string | null;
}

/**
 * 个人中心的挂号信息
 */
export const exampleClientAppoint = (): Appoint[] => {
    return [
        {
            "appointmentId": 4,
            "clientId": 1,
            "petId": 3,
            "appointmentDate": "2023-01-16T21:24:00",
            "departmentId": null,
            "doctorId": 4,
            "appointmentInfo": "查看骨骼",
            "isSuc": null,
            "createTime": "2023-01-16T21:24:51",
            "updateTime": null,
            "isDel": null,
            "clientName": null,
            "petName": "心海",
            "departmentName": "中兽科",
            "doctorName": "汤姆"
        },
        {
            "appointmentId": 1,
            "clientId": 1,
            "petId": 5,
            "appointmentDate": "2022-12-22T11:17:54",
            "departmentId": null,
            "doctorId": 1,
            "appointmentInfo": "严重的肛裂",
            "isSuc": null,
            "createTime": "2022-12-22T11:18:04",
            "updateTime": null,
            "isDel": null,
            "clientName": null,
            "petName": "雷电小兵",
            "departmentName": "犬猫科",
            "doctorName": "童德统"
        }
    ]
}

/**
 * 用户查看医生挂号的样例数据
 */
export const exampleDoctorAppoint = (doctorId: number): Appoint[] => {
    console.log("所接收的医生ID是", doctorId)
    return [
        {
            "appointmentId": 1,
            "clientId": null,
            "petId": null,
            "appointmentDate": "2022-12-22T11:17:54",
            "departmentId": null,
            "doctorId": null,
            "appointmentInfo": "严重的肛裂",
            "isSuc": null,
            "createTime": null,
            "updateTime": null,
            "isDel": null,
            "clientName": "莹",
            "petName": "雷电小兵",
            "departmentName": null,
            "doctorName": null
        }, {
            "appointmentId": 2,
            "clientId": null,
            "petId": null,
            "appointmentDate": "2022-12-22T11:17:54",
            "departmentId": null,
            "doctorId": null,
            "appointmentInfo": "严重的蛋疼",
            "isSuc": null,
            "createTime": null,
            "updateTime": null,
            "isDel": null,
            "clientName": "得到",
            "petName": "雷电将军",
            "departmentName": null,
            "doctorName": null
        },
    ]
}