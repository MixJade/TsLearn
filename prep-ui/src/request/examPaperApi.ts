import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {ExamPaper} from "@/model/entity/ExamPaper";
import {ExamPaperVo} from "@/model/vo/ExamPaperVo";


export const reqPaperList = (): Promise<ExamPaperVo[]> =>
    myReq.get<ExamPaperVo[]>('/api/examPaper/list')

export const reqAddPaper = (data: ExamPaper): Promise<Result> =>
    myReq.post<Result>(`/api/examPaper`, data)

export const reqUpdPaper = (data: ExamPaper): Promise<Result> =>
    myReq.put<Result>(`/api/examPaper`, data)

export const reqDelPaper = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/examPaper/${id}`)
