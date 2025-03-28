import {myReq} from "@/request/myReq";
import {PayRecordPageDto} from "@/model/dto/PayRecordPageDto";
import {IPage} from "@/model/vo/IPage";
import {PayRecordVo} from "@/model/vo/PayRecordVo";

/**
 * 下载某个月份的账单
 * @param year 年份
 * @param month 月份
 */
export const reqDownInsertSql = (year: number, month: number): void => {
    const fileName = `paymentRecord(${year}-${month}).sql`
    // noinspection JSIgnoredPromiseFromCall
    myReq.down(`/api/paymentRecord/downInsertSql?year=${year}&month=${month}`, fileName)
}

/**
 * 查询主表
 * @param pageNum 页码
 * @param pageSize 页面大小
 * @param data 请求体
 */
export const reqPayRecordPage = (pageNum: number, pageSize: number, data: PayRecordPageDto): Promise<IPage<PayRecordVo>> =>
    myReq<IPage<PayRecordVo>>.post(`/api/paymentRecord/page?pageNum=${pageNum}&pageSize=${pageSize}`, data)