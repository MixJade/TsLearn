import {ExamPaper} from "@/model/entity/ExamPaper";

export interface ExamPaperVo extends ExamPaper {
    categoryName: string;
}