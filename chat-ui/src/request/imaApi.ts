import {myReq} from "./myReq";
import {Result} from "@/model/Result";

/**
 * 检测 IMA 对话是否开启
 */
export const reqImaIsAlive = (): Promise<Result> =>
    myReq.get<Result>("/api/ima/isAlive")

/**
 * 切换 IMA 对话开关
 */
export const reqImaToggleAlive = (): Promise<Result> =>
    myReq.get<Result>("/api/ima/toggleAlive")
