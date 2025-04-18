import {UserVo} from "@/model/UserVo";

export interface Message {
    isSystem: boolean;//是否为系统发送
    userVo: UserVo;//发送者
    message: string;//信息
    sendTime: string;//发送时间
}