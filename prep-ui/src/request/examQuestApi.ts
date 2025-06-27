import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {ExamQuest} from "@/model/entity/ExamQuest";
import {ExamQuestDto} from "@/model/dto/ExamQuestDto";
import {QuestImgListVo} from "@/model/vo/QuestImgListVo";


export const reqQuestPage = (pageNum: number, pageSize: number, questDto: ExamQuestDto): Promise<IPage<ExamQuest>> =>
    myReq.post<IPage<ExamQuest>>(`/api/examQuest/page?pageNum=${pageNum}&pageSize=${pageSize}`, questDto)

export const reqAddQuest = (data: ExamQuest): Promise<Result> =>
    myReq.post<Result>(`/api/examQuest`, data)

export const reqUpdQuest = (data: ExamQuest): Promise<Result> =>
    myReq.put<Result>(`/api/examQuest`, data)

export const reqDelQuest = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/examQuest/${id}`)

export const reqCateImg = (questId: number): Promise<QuestImgListVo> =>
    myReq.get<QuestImgListVo>(`/api/examQuest/cateImg?questId=${questId}`)

