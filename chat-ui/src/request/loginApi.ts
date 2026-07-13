import {myReq} from "./myReq";
import {Result} from "@/model/Result";

/**
 * 获取随机名字
 */
export const reqUserName = (): Promise<string> => myReq.text("/api/login/getUserName")

/**
 * 当前用户登录
 */
export const reqToLogin = (username: string): Promise<Result> =>
    myReq.get<Result>(`/api/login/toLogin?user=${username}`)
