import {myReq} from "./myReq";
import {Result} from "@/model/Result";

/**
 * 检测AI是否存活
 */
export const reqIsAlive = (): Promise<Result> =>
    myReq.get<Result>("/api/llama/isAlive")

/**
 * 切换AI存活状态
 */
export const reqToggleAlive = (): Promise<Result> =>
    myReq.get<Result>("/api/llama/toggleAlive")
