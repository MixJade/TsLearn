import {checkDataList} from './collectCheckData'

// 解析后返回的数据
export interface CollectInf {
    cId: number
    nm: string
    vd: string
    res: string
}

interface ParseRes {
    oldCoreList: CollectInf[] // 老旧核心
    heartList: CollectInf[] // 镀层部件
    elderList: CollectInf[] // 先祖遗产
    giftList: CollectInf[] // 蜡烛
    serialList: CollectInf[] // 序列号
    // 添加字符串索引签名
    [key: string]: CollectInf[];
}

export const parseSaveData = (saveStr: string): ParseRes => {
    // 先初始化数据
    const parseRes: ParseRes = {elderList: [], giftList: [], heartList: [], oldCoreList: [], serialList: []}
    // 定义 type 与 parseRes 中数组的映射关系
    const typeToArrMap: { [key: number]: string } = {
        0: 'oldCoreList',
        1: 'heartList',
        2: 'elderList',
        3: 'giftList',
        4: 'serialList'
    }
    for (const cd of checkDataList) {
        const collect: CollectInf = {cId: cd.cId, nm: cd.nm, vd: cd.vd, res: "未完成"}
        // 根据类型放入不同列表
        const arrName = typeToArrMap[cd.type];
        parseRes[arrName].push(collect)
    }
    try {
        // 解析字符串为JavaScript对象
        // 1. 将完整字符串按换行符拆分为行数组（兼容不同系统的换行符：\n / \r\n）
        const allLines = saveStr.split(/\r?\n/);
        // 2. 标记是否进入 Saved_entries 区块
        let inSavedEntries = false;
        // 3. 逐行处理
        allLines.forEach(line => {
            const trimmedLine = line.trim();
            // 跳过空行
            if (!trimmedLine) return;
            // 匹配 Saved_entries 开始标记
            if (trimmedLine.startsWith('Saved_entries {')) {
                inSavedEntries = true;
                return;
            }
            // 匹配 Saved_entries 结束标记（闭合大括号）
            if (inSavedEntries && trimmedLine === '}') {
                inSavedEntries = false;
                return;
            }
            // 如果在Saved_entries区块内，执行判断逻辑
            if (inSavedEntries) {
                for (const cd of checkDataList) {
                    if (trimmedLine.includes(cd.ev)) {
                        // 根据类型放入不同列表
                        const arrName = typeToArrMap[cd.type];
                        const targetObj = parseRes[arrName].find(obj => obj.cId === cd.cId);
                        if (targetObj) {
                            targetObj.res = "已完成";
                        }
                        break;
                    }
                }
            }
        });
    } catch (error) {
        console.error('Save解析错误:', error);
    }
    return parseRes;
}