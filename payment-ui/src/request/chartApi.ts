import {myReq} from "./myReq";
import {MonthPayVo} from "@/model/chart/MonthPayVo";
import {DayPayVo} from "@/model/chart/DayPayVo";
import {YearLineVo} from "@/model/vo/YearLineVo";
import {ChartVo} from "@/model/vo/ChartVo";

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

/**
 * 获取一年中各个月份的收支总结(用于线形图)
 *
 * @param year 年份 2024
 */
export const reqYearLine = (year: number): Promise<YearLineVo> =>
    myReq.get<YearLineVo>(`/api/chart/yearLine?year=${year}`)

/**
 * 获取一年中不同大类收/支情况(用于饼、柱图)
 *
 * @param year 年份 2024
 * @param isIncome 收/支
 */
export const reqYearPie = (year: number, isIncome: boolean): Promise<ChartVo> =>
    myReq.get<ChartVo>(`/api/chart/yearPie?year=${year}&isIncome=${isIncome}`)

/**
 * 获取一年中不同大类收/支情况(用于饼、柱图)
 *
 * @param year 年份 2024
 * @param bigType 大类id
 * @param isIncome 收/支
 */
export const reqBigTypePie = (year: number, bigType: number, isIncome: boolean): Promise<ChartVo> =>
    myReq.get<ChartVo>(`/api/chart/bigTypePie?year=${year}&bigType=${bigType}&isIncome=${isIncome}`)