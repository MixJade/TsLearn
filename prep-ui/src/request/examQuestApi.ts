import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {ExamQuest} from "@/model/entity/ExamQuest";
import {QuestImgListVo} from "@/model/vo/QuestImgListVo";
import {QuestAndOptVo} from "@/model/vo/QuestAndOptVo";


export const reqQuestAll = (paperId: number): Promise<ExamQuest[]> =>
    myReq.get<ExamQuest[]>(`/api/examQuest/all?paperId=${paperId}`)

export const reqGetView = (questId: number): Promise<QuestAndOptVo> =>
    myReq.get<QuestAndOptVo>(`/api/examQuest/${questId}`)

export const reqAddQuest = (data: ExamQuest): Promise<Result> =>
    myReq.post<Result>(`/api/examQuest`, data)

export const reqUpdQuest = (data: ExamQuest): Promise<Result> =>
    myReq.put<Result>(`/api/examQuest`, data)

export const reqDelQuest = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/examQuest/${id}`)

export const reqCateImg = (questId: number): Promise<QuestImgListVo> =>
    myReq.get<QuestImgListVo>(`/api/examQuest/cateImg?questId=${questId}`)

