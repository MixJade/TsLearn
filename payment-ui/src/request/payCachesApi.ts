import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {PaymentCache} from "@/model/entity/PaymentCache";


/**
 * 查询缓存表
 * @param pageNum 页码
 * @param pageSize 页面大小
 */
export const reqPayCachePage = (pageNum: number, pageSize: number): Promise<IPage<PaymentCache>> =>
    myReq.get<IPage<PaymentCache>>(`/api/paymentCache?pageNum=${pageNum}&pageSize=${pageSize}`)


/**
 * 删除所有
 */
export const reqDelAllCache = (): Promise<Result> =>
    myReq.delete<Result>(`/api/paymentCache/delAll`)


/**
 * 上传微信导出的csv账单
 * @param file csv文件数据
 */
export const reqUploadCsv = (file: FormData): Promise<Result> =>
    myReq.upload<Result>("/api/paymentCache/upload-csv", file)