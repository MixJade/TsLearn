import {myReq} from "@/request/myReq";

/**
 * 下载某个月份的账单
 * @param year 年份
 * @param month 月份
 */
export const reqDownInsertSql = (year: number, month: number): void => {
    const fileName = `paymentRecord(${year}-${month}).sql`
    myReq.down(`/api/paymentRecord/downInsertSql?year=${year}&month=${month}`, fileName)
}