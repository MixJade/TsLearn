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
    // 选项顺序没有独立字段：数组顺序即选项顺序（后端按 opt_id 升序返回），A/B/C 由前端按位置生成
}
