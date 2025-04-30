import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {PaymentCache} from "@/model/entity/PaymentCache";
import {CacheToRecordDto} from "@/model/dto/CacheToRecordDto";
import {PayCachePageDto} from "@/model/dto/PayCachePageDto";


/**
 * 查询缓存表
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @param data 请求体
 */
export const reqPayCachePage = (pageNum: number, pageSize: number, data: PayCachePageDto): Promise<IPage<PaymentCache>> =>
    myReq.post<IPage<PaymentCache>>(`/api/paymentCache/page?pageNum=${pageNum}&pageSize=${pageSize}`, data)


/**
 * 删除所有
 */
export const reqDelAllCache = (): Promise<Result> =>
    myReq.delete<Result>(`/api/paymentCache/delAll`)

/**
 * 向记录表新增(缓存转正)
 * @param data 请求体
 */
export const reqAddRec = (data: CacheToRecordDto): Promise<Result> =>
    myReq.post<Result>(`/api/paymentCache/addRec`, data)

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