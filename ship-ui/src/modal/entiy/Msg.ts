/**
 * 聊天记录
 */
export interface Msg {
    msgId: number;
    clientId: number;
    doctorId: number;
    isClient: boolean;
    msgContent: string;
    isImg: boolean;
    createTime: string;
    clientName: string;
    clientPhoto: string;
    doctorName: string;
    doctorPhoto: string;
}

/**
 * 用户的聊天记录
 * @param doctorId 当前聊天的医生ID
 */
export const exampleMsg = (doctorId: number): Msg[] => {
    console.log("所接收到的医生ID是:",doctorId)
    return [
        {
            "msgId": 9,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "童医生，你好",
            "isImg": false,
            "createTime": "2023-03-03T22:55:24",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 13,
            "clientId": 1,
            "doctorId": 1,
            "isClient": false,
            "msgContent": "你好",
            "isImg": false,
            "createTime": "2023-03-06T13:15:36",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 14,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "我的鱼的鳞片为什么都竖起来了",
            "isImg": false,
            "createTime": "2023-03-06T21:54:27",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 15,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "前两天还好好的",
            "isImg": false,
            "createTime": "2023-03-06T21:54:57",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 16,
            "clientId": 1,
            "doctorId": 1,
            "isClient": false,
            "msgContent": "可能染上了立鳞病",
            "isImg": false,
            "createTime": "2023-03-06T21:56:26",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 17,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "立鳞病？那是什么",
            "isImg": false,
            "createTime": "2023-03-07T16:09:39",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 18,
            "clientId": 1,
            "doctorId": 1,
            "isClient": false,
            "msgContent": "其会使病鱼体表肿胀，部分鳞片向外张开使鳞片竖起。",
            "isImg": false,
            "createTime": "2023-03-07T16:11:48",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 19,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "真的吗",
            "isImg": false,
            "createTime": "2023-03-07T16:12:06",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 20,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "那怎么办啊",
            "isImg": false,
            "createTime": "2023-03-07T16:14:37",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 24,
            "clientId": 1,
            "doctorId": 1,
            "isClient": false,
            "msgContent": "你发张照片我看看",
            "isImg": false,
            "createTime": "2023-03-07T17:16:24",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 25,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "这样行吗？",
            "isImg": false,
            "createTime": "2023-03-08T13:30:33",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 26,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "ms-img-01.png",
            "isImg": true,
            "createTime": "2023-03-09T12:58:19",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 27,
            "clientId": 1,
            "doctorId": 1,
            "isClient": false,
            "msgContent": "ms-img-02.png",
            "isImg": true,
            "createTime": "2023-03-09T12:58:51",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        },
        {
            "msgId": 28,
            "clientId": 1,
            "doctorId": 1,
            "isClient": true,
            "msgContent": "ms-img-03.png",
            "isImg": true,
            "createTime": "2023-03-09T12:59:03",
            "clientName": "莹",
            "clientPhoto": "ying.jpg",
            "doctorName": "童德统",
            "doctorPhoto": "doctor-1.jpg"
        }
    ]
}