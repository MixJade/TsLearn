import {myReq} from "./myReq";

/**
 * 获取登录人名字
 */
export const reqUsername = (): Promise<string> =>
    myReq.text("/api/chat/getUsername")

/**
 * 获取历史消息
 */
export const reqSyncHistoryMsg = (): Promise<string[]> =>
    myReq.get<string[]>(`/api/chat/syncHistoryMsg`)

/**
 * 获取登录人列表
 */
export const reqLoginUserList = (): Promise<string[]> =>
    myReq.get<string[]>(`/api/chat/getLoginUserList`)
