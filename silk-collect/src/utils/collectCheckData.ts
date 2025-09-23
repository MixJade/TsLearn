// 2. 用于校验的数据
interface CheckData {
    checkId: number;
    type: number; // 0面具,1丝轴,3盒子,4金属
    scene: string; // 场景名称
    evi: number; // 证据来源 0场景 1购买 2任务
    evidence1: string; // 用以确认的证据
    evidence2: string; // 用以确认的证据
    axis: string; // 场景坐标(没有就写任务或商店)
}

export const checkDataList: CheckData[] = [
    {checkId: 1, type: 4, scene: "骸骨洞窟", evi: 0, evidence1: "Bone_07", evidence2: "Collectable Item Pickup - Tool Metal", axis: "Bone_07(37, 5)"},
    {checkId: 2, type: 4, scene: "深钨", evi: 0, evidence1: "Dock_03", evidence2: "Collectable Item Pickup", axis: "Dock_03(_,_)"},
    {checkId: 3, type: 3, scene: "猎人小径", evi: 0, evidence1: "Ant_20", evidence2: "Collectable Item Pickup", axis: "Ant_20(_,_)"},
    {checkId: 4, type: 0, scene: "远野", evi: 0, evidence1: "Bone_East_20", evidence2: "Heart Piece", axis: "Bone_East_20(_,_)"},
    {checkId: 5, type: 0, scene: "骸底买面具", evi: 1, evidence1: "Bonetown", evidence2: "1", axis: "/"},
    {checkId: 6, type: 4, scene: "骸底买金属", evi: 1, evidence1: "Bonetown", evidence2: "2", axis: "/"},
    {checkId: 7, type: 0, scene: "沙虫道", evi: 0, evidence1: "Crawl_02", evidence2: "Heart Piece", axis: "Crawl_02(_,_)"},
    {checkId: 8, type: 3, scene: "朝圣者息所", evi: 1, evidence1: "Bone_East_10_Room", evidence2: "3", axis: "/"},
    {checkId: 9, type: 0, scene: "甲木林", evi: 0, evidence1: "Crawl_02", evidence2: "Heart Piece", axis: "Shellwood_14(_,_)"},
    {checkId: 10, type: 3, scene: "骨髓洞窟", evi: 0, evidence1: "Bone_18", evidence2: "Collectable Item Pickup", axis: "Bone_18(_,_)"},
    {checkId: 11, type: 0, scene: "洞窟与深钨之间", evi: 0, evidence1: "Dock_08", evidence2: "Heart Piece", axis: "Dock_08(54,20)"},
    {checkId: 12, type: 3, scene: "骸底提交暴烈燧甲虫任务", evi: 2, evidence1: "Bonetown", evidence2: "Rock Rollers", axis: "/"},
    {checkId: 13, type: 1, scene: "出生点织巢", evi: 0, evidence1: "Weave_11", evidence2: "Silk Spool", axis: "Weave_11(15,24)"},
    {checkId: 14, type: 3, scene: "钟镇购买盒子", evi: 1, evidence1: "Belltown", evidence2: "4", axis: "/"},
    {checkId: 15, type: 3, scene: "工厂忏悔机旁光源", evi: 0, evidence1: "Under_08", evidence2: "Collectable Item Pickup", axis: "Under_08(61,18)"},
    {checkId: 16, type: 1, scene: "圣煲工厂", evi: 0, evidence1: "Under_10", evidence2: "Silk Spool", axis: "Under_10(22,6)"},
    {checkId: 17, type: 1, scene: "圣扉巨门顶部", evi: 0, evidence1: "Song_19_entrance", evidence2: "Silk Spool", axis: "Song_19_entrance(22,94)"},
    {checkId: 18, type: 3, scene: "圣煲钟道顶部", evi: 0, evidence1: "Bellway_City", evidence2: "Collectable Item Pickup", axis: "Bellway_City(68,26)"},
    {checkId: 19, type: 1, scene: "圣煲工厂底部", evi: 0, evidence1: "Library_11b", evidence2: "Silk Spool", axis: "Library_11b(22,7)"},
    {checkId: 20, type: 4, scene: "圣煲工厂", evi: 0, evidence1: "Under_19b", evidence2: "Collectable Item Pickup - Tool Metal", axis: "Under_19b(10,7)"},
    {checkId: 21, type: 1, scene: "灰沼顶部", evi: 0, evidence1: "Greymoor_02", evidence2: "Silk Spool", axis: "Greymoor_02(30,137)"},
]
