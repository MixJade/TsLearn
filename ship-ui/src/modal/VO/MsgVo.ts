/**
 * 聊天记录
 */
export interface MsgVo {
    msgId: number;
    mineID: number;
    youID: number;
    isMine: boolean;
    msgContent: string;
    isImg: boolean;
    createTime: string;
    mineName: string;
    minePhoto: string;
    youName: string;
    youPhoto: string;
}

/**
 * 用户的聊天记录
 * @param mineID 当前聊天的医生ID
 */
export const exampleMsg = (mineID: number): MsgVo[] => {
    console.log("所接收到的医生ID是:", mineID)
    return [
        {
            "msgId": 9,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "童医生，你好",
            "isImg": false,
            "createTime": "2022-03-03T22:55:24",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 13,
            "mineID": 1,
            "youID": 1,
            "isMine": false,
            "msgContent": "你好",
            "isImg": false,
            "createTime": "2023-03-06T13:15:36",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 14,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "我的鱼的鳞片为什么都竖起来了",
            "isImg": false,
            "createTime": "2023-03-06T21:54:27",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 15,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "前两天还好好的",
            "isImg": false,
            "createTime": "2023-03-06T21:54:57",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 16,
            "mineID": 1,
            "youID": 1,
            "isMine": false,
            "msgContent": "可能染上了立鳞病",
            "isImg": false,
            "createTime": "2023-03-06T21:56:26",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 17,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "立鳞病？那是什么",
            "isImg": false,
            "createTime": "2023-03-07T16:09:39",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 18,
            "mineID": 1,
            "youID": 1,
            "isMine": false,
            "msgContent": "其会使病鱼体表肿胀，部分鳞片向外张开使鳞片竖起。",
            "isImg": false,
            "createTime": "2023-03-07T16:11:48",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 19,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "真的吗",
            "isImg": false,
            "createTime": "2023-03-07T16:12:06",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 20,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "那怎么办啊",
            "isImg": false,
            "createTime": "2023-03-07T16:14:37",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 24,
            "mineID": 1,
            "youID": 1,
            "isMine": false,
            "msgContent": "你发张照片我看看",
            "isImg": false,
            "createTime": "2023-03-07T17:16:24",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 25,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "这样行吗？",
            "isImg": false,
            "createTime": "2023-03-08T13:30:33",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 26,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "ms-img-01.png",
            "isImg": true,
            "createTime": "2023-03-09T12:58:19",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 27,
            "mineID": 1,
            "youID": 1,
            "isMine": false,
            "msgContent": "ms-img-02.png",
            "isImg": true,
            "createTime": "2023-03-09T12:58:51",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 28,
            "mineID": 1,
            "youID": 1,
            "isMine": true,
            "msgContent": "ms-img-03.png",
            "isImg": true,
            "createTime": "2023-07-14T12:59:03",
            "mineName": "莹",
            "minePhoto": "lei-jun.jpg",
            "youName": "童德统",
            "youPhoto": "doctor-ex.jpg"
        }
    ]
}
/**
 * 医生的聊天记录
 * @param youID 当前聊天的医生ID
 */
export const exampleDMsg = (youID: number): MsgVo[] => {
    console.log("聊天的用户ID是：", youID)
    return [
        {
            "msgId": 9,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "童医生，你好",
            "isImg": false,
            "createTime": "2023-03-03T22:55:24",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 13,
            "youID": 1,
            "mineID": 1,
            "isMine": false,
            "msgContent": "你好",
            "isImg": false,
            "createTime": "2023-03-06T13:15:36",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 14,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "我的鱼的鳞片为什么都竖起来了",
            "isImg": false,
            "createTime": "2023-03-06T21:54:27",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 15,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "前两天还好好的",
            "isImg": false,
            "createTime": "2023-03-06T21:54:57",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 16,
            "youID": 1,
            "mineID": 1,
            "isMine": false,
            "msgContent": "可能染上了立鳞病",
            "isImg": false,
            "createTime": "2023-03-06T21:56:26",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 17,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "立鳞病？那是什么",
            "isImg": false,
            "createTime": "2023-03-07T16:09:39",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 18,
            "youID": 1,
            "mineID": 1,
            "isMine": false,
            "msgContent": "其会使病鱼体表肿胀，部分鳞片向外张开使鳞片竖起。",
            "isImg": false,
            "createTime": "2023-03-07T16:11:48",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 19,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "真的吗",
            "isImg": false,
            "createTime": "2023-03-07T16:12:06",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 20,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "那怎么办啊",
            "isImg": false,
            "createTime": "2023-03-07T16:14:37",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 24,
            "youID": 1,
            "mineID": 1,
            "isMine": false,
            "msgContent": "你发张照片我看看",
            "isImg": false,
            "createTime": "2023-03-07T17:16:24",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 25,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "这样行吗？",
            "isImg": false,
            "createTime": "2023-03-08T13:30:33",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 26,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "ms-img-01.png",
            "isImg": true,
            "createTime": "2023-03-09T12:58:19",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 27,
            "youID": 1,
            "mineID": 1,
            "isMine": false,
            "msgContent": "ms-img-02.png",
            "isImg": true,
            "createTime": "2023-03-09T12:58:51",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        },
        {
            "msgId": 28,
            "youID": 1,
            "mineID": 1,
            "isMine": true,
            "msgContent": "ms-img-03.png",
            "isImg": true,
            "createTime": "2023-03-09T12:59:03",
            "youName": "莹",
            "youPhoto": "lei-jun.jpg",
            "mineName": "童德统",
            "minePhoto": "doctor-ex.jpg"
        }
    ]
}
