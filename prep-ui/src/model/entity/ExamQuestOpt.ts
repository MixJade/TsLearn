/**
 * 题目选项表
 */
export interface ExamQuestOpt {
    optId: number; // 选项主键
    questId: number; // 题目主键
    optCont: string; // 选项内容
    haveImg: boolean; // 存在图片
    imgName: string; // 图片名称
    isCorrect: boolean; // 是否正确选项
    optNo: number; // 选项排序(1,2,3)
    optName: string; // 选项名称(A,B,C)
}
