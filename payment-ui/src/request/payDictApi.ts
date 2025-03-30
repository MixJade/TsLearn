import {myReq} from "@/request/myReq";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";

/**
 * records页面查询二级下拉框选项
 */
export const reqOption = (): Promise<TypeSelectVo[]> =>
    myReq.get<TypeSelectVo[]>("/api/paymentDict/option")