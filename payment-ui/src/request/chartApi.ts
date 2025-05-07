import {myReq} from "./myReq";
import {MonthPayVo} from "@/model/chart/MonthPayVo";
import {DayPayVo} from "@/model/chart/DayPayVo";
import {YearLineVo, YearPayDo} from "@/model/vo/YearLineVo";
import {ChartVo} from "@/model/vo/ChartVo";
import {DayPayBarVo} from "@/model/chart/DayPayBarVo";

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
 * (柱状图)获取一月每天的收支总结
 * @param year  年份 2024
 * @param month 月份 01
 */
export const reqBarDay = (year: number, month: number): Promise<DayPayBarVo> =>
    myReq.get<DayPayBarVo>(`/api/chart/barDay?year=${year}&month=${month}`)

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
 * 获取一年中不同大类收/支情况(用于圆环图)
 *
 * @param year 年份 2024
 * @param bigType 大类id
 * @param isIncome 收/支
 */
export const reqBigTypePie = (year: number, bigType: number, isIncome: boolean): Promise<ChartVo> =>
    myReq.get<ChartVo>(`/api/chart/bigTypePie?year=${year}&bigType=${bigType}&isIncome=${isIncome}`)

/**
 * 获取一月中不同大类收/支情况(用于饼、柱图)
 *
 * @param year     年份 2024
 * @param month    月份 01
 * @param isIncome 收入/支出
 */
export const reqMonthPie = (year: number, month: number, isIncome: boolean): Promise<ChartVo> =>
    myReq.get<ChartVo>(`/api/chart/monthPie?year=${year}&month=${month}&isIncome=${isIncome}`)

/**
 * 获取一月的收支总结(用于月度报告)
 *
 * @param year  年份 2024
 * @param month 月份 1
 */
export const reqMonthMoney = (year: number, month: number): Promise<YearPayDo> =>
    myReq.get<YearPayDo>(`/api/chart/monthMoney?year=${year}&month=${month}`)

/**
 * 获取一月中某大类的具体情况(用于圆环图)
 *
 * @param year     年份 2024
 * @param month    月份 01
 * @param bigType  大类id
 * @param isIncome 收/支
 */
export const reqBigTypePieMonth = (year: number, month: number, bigType: number, isIncome: boolean): Promise<ChartVo> =>
    myReq.get<ChartVo>(`/api/chart/bigTypePieMonth?year=${year}&month=${month}&bigType=${bigType}&isIncome=${isIncome}`)