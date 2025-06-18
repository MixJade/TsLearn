import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {ExamSubject} from "@/model/entity/ExamSubject";


export const reqSubjectPage = (pageNum: number, pageSize: number): Promise<IPage<ExamSubject>> =>
    myReq.get<IPage<ExamSubject>>(`/api/examSubject/page?pageNum=${pageNum}&pageSize=${pageSize}`)

export const reqAddSubject = (data: ExamSubject): Promise<Result> =>
    myReq.post<Result>(`/api/examSubject`, data)

export const reqUpdSubject = (data: ExamSubject): Promise<Result> =>
    myReq.put<Result>(`/api/examSubject`, data)

export const reqDelSubject = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/examSubject/${id}`)
