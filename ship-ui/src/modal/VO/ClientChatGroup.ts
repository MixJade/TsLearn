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