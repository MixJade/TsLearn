/**
 * 用户聊天的医生分组
 */
export interface ClientChatGroup {
    flag: number;
    doctorId: number;
    doctorName: string;
}

export const exampleClientChat = (doctorID: number): ClientChatGroup[] => {
    console.log("当前医生的ID是:", doctorID)
    return [
        {
            "flag": 0,
            "doctorId": 1,
            "doctorName": "童德统"
        },
        {
            "flag": 1,
            "doctorId": 4,
            "doctorName": "汤姆"
        },
        {
            "flag": 1,
            "doctorId": 2,
            "doctorName": "爱丽丝"
        }
    ]
}

/**
 * 医生信息分组
 */
export interface DoctorChatGroup {
    flag: number;
    clientId: number;
    clientName: string;
}

export const exampleDChatGroup = (clientId: number): DoctorChatGroup[] => {
    console.log("收到的用户ID：" + clientId)
    return [
        {"flag": 0, "clientId": 1, "clientName": "莹"},
        {"flag": 1, "clientId": 2, "clientName": "撒"},
        {"flag": 1, "clientId": 3, "clientName": "撒啊"},
    ]
}
