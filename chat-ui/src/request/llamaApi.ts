import {myReq} from "./myReq";
import {Result} from "@/model/Result";

/**
 * 打开ai对话
 */
export const reqOpenAi = (): Promise<Result> =>
    myReq.get<Result>("/api/llama/openAi")

/**
 * 检测是否存活
 */
export const reqIsAlive = (): Promise<Result> =>
    myReq.get<Result>("/api/llama/isAlive")


/**
 * 停止AI
 */
export const reqStopAi = (): Promise<Result> =>
    myReq.get<Result>("/api/llama/stopAi")