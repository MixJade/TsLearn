import {myReq} from "./myReq";
import {Result} from "@/model/Result";

/**
 * 获取随机名字
 */
export const reqRandomName = (): Promise<string> => myReq.text("/api/login/getRandomName")

/**
 * 当前用户登录
 */
export const reqToLogin = (username: string): Promise<Result> =>
    myReq.get<Result>(`/api/login/toLogin?user=${username}`)
