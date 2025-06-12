import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {ExamSubject} from "@/model/entity/ExamSubject";


/**
 * 查询图源文件夹表
 */
export const reqSubjectPage = (pageNum: number, pageSize: number): Promise<IPage<ExamSubject>> =>
    myReq.get<IPage<ExamSubject>>(`/api/examSubject/page?pageNum=${pageNum}&pageSize=${pageSize}`)

/**
 * 向文件夹表新增
 */
export const reqAddSubject = (data: ExamSubject): Promise<Result> =>
    myReq.post<Result>(`/api/examSubject`, data)

/**
 * 向文件夹表修改
 */
export const reqUpdSubject = (data: ExamSubject): Promise<Result> =>
    myReq.put<Result>(`/api/examSubject`, data)

/**
 * 向文件夹表删除
 */
export const reqDelSubject = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/examSubject/${id}`)
