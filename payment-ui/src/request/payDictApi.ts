import {myReq} from "@/request/myReq";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";
import {TwoTypeOptVo} from "@/model/vo/TwoTypeOptVo";
import {PayBigType} from "@/model/entity/PayBigType";
import {IPage} from "@/model/vo/IPage";
import {PayDictPageDto} from "@/model/dto/PayDictPageDto";
import {PaymentDictVo} from "@/model/vo/PaymentDictVo";
import {Result} from "@/model/vo/Result";
import {PaymentDict} from "@/model/entity/PaymentDict";

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
/**
 * dict页面查询大类
 */
export const reqBigType = (): Promise<PayBigType[]> =>
    myReq.get<PayBigType[]>("/api/paymentDict/bigType")
/**
 * dict页面查询大类
 */
export const reqDictPage = (pageNum: number, pageSize: number, data: PayDictPageDto): Promise<IPage<PaymentDictVo>> =>
    myReq.post<IPage<PaymentDictVo>>(`/api/paymentDict/page?pageNum=${pageNum}&pageSize=${pageSize}`, data)

/**
 * 向记录表删除
 * @param id 记录主键
 */
export const reqDelDict = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/paymentDict/${id}`)

/**
 * 向记录表新增
 * @param data 请求体
 */
export const reqAddDict = (data: PaymentDict): Promise<Result> =>
    myReq.post<Result>(`/api/paymentDict`, data)

/**
 * 向记录表修改
 * @param data 请求体
 */
export const reqUpdDict = (data: PaymentDict): Promise<Result> =>
    myReq.put<Result>(`/api/paymentDict`, data)
