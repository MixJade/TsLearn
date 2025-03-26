import {myReq} from "./myReq";
import {MonthPayVo} from "@/model/vo/MonthPayVo";
import {DayPayVo} from "@/model/vo/DayPayVo";

/**
 * (日历图)获取各月份的收支总结
 * @param year 年份
 */
export const reqCalendarMonth = (year: number): Promise<MonthPayVo[][]> =>
    myReq.get<MonthPayVo[][]>(`/api/chart/calendarMonth?year=${year}`)
/**
 * (日历图)获取一月每天的收支总结
 * @param year  年份 2024
 * @param month 月份 01
 */
export const reqCalendarDay = (year: number, month: number): Promise<DayPayVo[][]> =>
    myReq.get<DayPayVo[][]>(`/api/chart/calendarDay?year=${year}&month=${month}`)