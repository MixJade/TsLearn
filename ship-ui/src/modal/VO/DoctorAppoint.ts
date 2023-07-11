/**
 * 单个医生界面中，用于展示的挂号信息
 */
export interface DoctorAppoint {
    appointmentId: number;
    appointmentDate: string;
    appointmentInfo: string;
    clientName: string;
    petName: string;
}

/**
 * 样例数据
 */
export const exampleDoctorAppoint = (doctorId: number): DoctorAppoint[] => {
    console.log("所接收的医生ID是", doctorId)
    return [
        {
            "appointmentId": 1,
            "appointmentDate": "2022-12-22T11:17:54",
            "appointmentInfo": "严重的肛裂",
            "clientName": "莹",
            "petName": "雷电小兵",
        }, {
            "appointmentId": 2,
            "appointmentDate": "2022-12-22T11:17:54",
            "appointmentInfo": "严重的发给",
            "clientName": "莹",
            "petName": "雷电小是兵",
        },
    ]
}
