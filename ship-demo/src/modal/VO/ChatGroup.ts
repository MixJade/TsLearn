/**
 * 用户聊天的医生分组
 */
export interface ChatGroup {
    flag: number;
    roleId: number;
    roleName: string;
}

export const exampleClientChat = (doctorID: number): ChatGroup[] => {
    console.log("当前医生的ID是:", doctorID)
    return [
        {"flag": 0, "roleId": 1, "roleName": "童德统"},
        {"flag": 1, "roleId": 4, "roleName": "汤姆"},
        {"flag": 1, "roleId": 2, "roleName": "爱丽丝"}
    ]
}

/**
 * 医生信息分组
 */
export const exampleDChatGroup = (clientId: number): ChatGroup[] => {
    console.log("收到的用户ID：" + clientId)
    return [
        {"flag": 0, "roleId": 1, "roleName": "莹"},
        {"flag": 1, "roleId": 2, "roleName": "撒"},
        {"flag": 1, "roleId": 3, "roleName": "撒啊"},
    ]
}
