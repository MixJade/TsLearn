import {myReq} from "./myReq";
import {MonthPayVo} from "@/model/vo/MonthPayVo";

/**
 * (日历图)获取各月份的收支总结
 * @param year 年份
 */
export const reqCalendarMonth = (year: number): Promise<MonthPayVo[][]> =>
    myReq.get<MonthPayVo[][]>(`/api/chart/calendarMonth?year=${year}`)