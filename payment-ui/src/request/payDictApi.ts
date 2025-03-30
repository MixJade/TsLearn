import {myReq} from "@/request/myReq";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";
import {TwoTypeOptVo} from "@/model/vo/TwoTypeOptVo";

/**
 * records页面查询二级下拉框选项
 */
export const reqOption = (): Promise<TypeSelectVo[]> =>
    myReq.get<TypeSelectVo[]>("/api/paymentDict/option")
/**
 * records页面查询二级下拉框选项
 */
export const reqTwoOption = (): Promise<TwoTypeOptVo> =>
    myReq.get<TwoTypeOptVo>("/api/paymentDict/twoOption")