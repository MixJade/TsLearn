import {myReq} from "./myReq";
import {Result} from "@/model/Result";

/**
 * 检测AI是否存活
 */
export const reqIsAlive = (): Promise<Result> =>
    myReq.get<Result>("/api/llama/isAlive")
