import {myReq} from "@/request/myReq";
import {PayRecordPageDto} from "@/model/dto/PayRecordPageDto";
import {IPage} from "@/model/vo/IPage";
import {PayRecordVo} from "@/model/vo/PayRecordVo";
import {Result} from "@/model/vo/Result";
import {PaymentRecord} from "@/model/entity/PaymentRecord";

/**
 * 下载某个年份的账单
 * @param year 年份
 */
export const reqDownInsertSql = (year: number): void => {
    // noinspection JSIgnoredPromiseFromCall
    myReq.down(`/api/paymentRecord/downInsertSql?year=${year}`, `paymentRecord(${year}).sql`)
}

/**
 * 查询主表
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @param data 请求体
 */
export const reqPayRecordPage = (pageNum: number, pageSize: number, data: PayRecordPageDto): Promise<IPage<PayRecordVo>> =>
    myReq.post<IPage<PayRecordVo>>(`/api/paymentRecord/page?pageNum=${pageNum}&pageSize=${pageSize}`, data)

/**
 * 向记录表新增
 * @param data 请求体
 */
export const reqAddRecord = (data: PaymentRecord): Promise<Result> =>
    myReq.post<Result>(`/api/paymentRecord`, data)

/**
 * 向记录表修改
 * @param data 请求体
 */
export const reqUpdRecord = (data: PaymentRecord): Promise<Result> =>
    myReq.put<Result>(`/api/paymentRecord`, data)

/**
 * 向记录表删除
 * @param id 记录主键
 */
export const reqDelRecord = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/paymentRecord/${id}`)

/**
 * 上传导出的sql文件
 * @param file sql文件数据
 */
export const reqUploadSql = (file: FormData): Promise<Result> =>
    myReq.upload<Result>("/api/paymentRecord/upload-sql", file)