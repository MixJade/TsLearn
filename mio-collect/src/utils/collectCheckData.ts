// 2. 用于校验的数据
interface CheckData {
    cId: number;
    type: number; // 0老旧核心 1镀层部件 2先祖遗产 3蜡烛 4序列号
    nm: string; // 场景名称
    ev: string; // 证据
    vd: string; // 视频坐标
}

export const checkDataList: CheckData[] = [
    // 老旧核心
    {cId: 11, type: 0, nm: "老旧核心11：打完母贝雕刻师直走", ev: "CARCASS:Carcass_LQ_ruins_intro_S1", vd: "p=156"},
    {cId: 12, type: 0, nm: "老旧核心12：居所滑雪", ev: "CARCASS:Carcass_LQ_ruins_intro_C2", vd: "p=157"},
    {cId: 13, type: 0, nm: "老旧核心13：鸟笼中花坛下冲", ev: "CARCASS:Carcass_GA_bou_crop_P2", vd: "p=158"},
    {cId: 16, type: 0, nm: "老旧核心16：钟楼观景电梯旁", ev: "CARCASS:Carcass_GA_bou_up_F1", vd: "p=161"},
    {cId: 17, type: 0, nm: "老旧核心17：野生灌丛中部", ev: "CARCASS:Carcass_GA_root_center_P1", vd: "p=162"},
    {cId: 19, type: 0, nm: "老旧核心19：安港（息左侧树叶下冲）", ev: "CARCASS:Carcass_GA_bou_chill_S1", vd: "p=164"},
    {cId: 20, type: 0, nm: "老旧核心20：安港（钟楼之底）", ev: "CARCASS:Carcass_GA_bou_intro_F6", vd: "p=165"},
    {cId: 21, type: 0, nm: "老旧核心21：野生灌丛和阿周那对话", ev: "DIALOG:TXT_GA_ROOT_WRONGTURN", vd: "p=166"},
    {cId: 23, type: 0, nm: "老旧核心23：安港和欧兰忒对话", ev: "DIALOG:TXT_GA_BOU_MINDYOURSTEP", vd: "p=168"},
    {cId: 24, type: 0, nm: "老旧核心24：野生灌丛右侧台阶内", ev: "CARCASS:Carcass_GA_root_conex_P1", vd: "p=169"},
    // 镀层部件
    {cId: 2, type: 1, nm: "镀层部件2：居所滑雪的镀层部件", ev: "SHIELD_FRAGMENT:14", vd: "p=129"},
    {cId: 3, type: 1, nm: "镀层部件3：脊左侧需要闪避才能进入的房间，经过一场强制战斗后从容器中获取", ev: "SHIELD_FRAGMENT:18", vd: "p=130"},
    {cId: 4, type: 1, nm: "镀层部件4：希伊托举右侧", ev: "SHIELD_FRAGMENT:19", vd: "p=131"},
    {cId: 5, type: 1, nm: "镀层部件5：野生灌丛中部机器人残骸", ev: "SHIELD_FRAGMENT:10", vd: "p=132"},
    {cId: 9, type: 1, nm: "镀层部件9：安港钟楼大厅", ev: "SHIELD_FRAGMENT:12", vd: "p=136"},
    {cId: 10, type: 1, nm: "镀层部件10：野生灌丛勾锚点", ev: "SHIELD_FRAGMENT:11", vd: "p=137"},
    {cId: 11, type: 1, nm: "镀层部件11：野生灌丛右上角", ev: "SHIELD_FRAGMENT:21", vd: "p=138"},
    {cId: 19, type: 1, nm: "镀层部件19：梅尔购买 1", ev: "SHIELD_FRAGMENT:0", vd: ""},
    {cId: 20, type: 1, nm: "镀层部件20：梅尔购买 2", ev: "SHIELD_FRAGMENT:1", vd: ""},
    // 先祖遗产
    {cId: 1, type: 2, nm: "先祖遗产1：居所滑雪场（伊赛）", ev: "ATTACK_POWER:0", vd: "p=2"},
    {cId: 2, type: 2, nm: "先祖遗产2：脊上方房间（格尔）", ev: "ATTACK_POWER:1", vd: "p=3"},
    // 蜡烛
    {cId: 2, type: 3, nm: "蜡烛2：安港遭遇战后开箱", ev: "CANDLE:0", vd: "p=34"},
    {cId: 7, type: 3, nm: "蜡烛7：安港（需神行步）", ev: "CANDLE:7", vd: "p=39"},
]