import {ExamQuest} from "@/model/entity/ExamQuest";
import {ExamQuestOpt} from "@/model/entity/ExamQuestOpt";

/**
 * 通过题目编号查询题目详情
 */
export interface QuestAndOptVo {
    examQuest: ExamQuest;
    examQuestOpts: ExamQuestOpt[];
}
