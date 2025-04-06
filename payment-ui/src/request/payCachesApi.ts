import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {PaymentCache} from "@/model/entity/PaymentCache";
import {CacheToRecordDto} from "@/model/dto/CacheToRecordDto";


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
 * 向记录表新增(缓存转正)
 * @param data 请求体
 */
export const reqAddCache = (data: CacheToRecordDto): Promise<Result> =>
    myReq.post<Result>(`/api/paymentCache`, data)

/**
 * 向缓存表删除
 * @param id 记录主键
 */
export const reqDelCache = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/paymentCache/${id}`)

/**
 * 上传微信导出的csv账单
 * @param file csv文件数据
 */
export const reqUploadCsv = (file: FormData): Promise<Result> =>
    myReq.upload<Result>("/api/paymentCache/upload-csv", file)

/**
 * 下载一个样例csv
 */
export const reqSampleCsv = (): void => {
    const fileName = `样例csv(微信导出账单).csv`
    // noinspection JSIgnoredPromiseFromCall
    myReq.down("/api/paymentCache/sample-csv", fileName)
}