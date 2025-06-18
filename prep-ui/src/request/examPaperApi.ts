import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {ExamPaper} from "@/model/entity/ExamPaper";
import {ExamPaperDto} from "@/model/dto/ExamPaperDto";


export const reqPaperPage = (pageNum: number, pageSize: number, dto: ExamPaperDto): Promise<IPage<ExamPaper>> =>
    myReq.post<IPage<ExamPaper>>(`/api/examPaper/page?pageNum=${pageNum}&pageSize=${pageSize}`, dto)

export const reqAddPaper = (data: ExamPaper): Promise<Result> =>
    myReq.post<Result>(`/api/examPaper`, data)

export const reqUpdPaper = (data: ExamPaper): Promise<Result> =>
    myReq.put<Result>(`/api/examPaper`, data)

export const reqDelPaper = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/examPaper/${id}`)
