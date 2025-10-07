import {checkDataList} from './collectCheckData'

// 1. 解析存档所用的json结构
interface GameData {
    playerData: {
        PurchasedBonebottomHeartPiece: boolean, // 骸底买面具
        PurchasedBonebottomToolMetal: boolean, // 骸底买金属
        PurchasedPilgrimsRestMemoryLocket: boolean, // 朝圣者息所买盒子
        PurchasedBelltownMemoryLocket: boolean, // 钟镇买盒子
        PurchasedBelltownSpoolSegment: boolean, // 钟镇买丝轴
        MerchantEnclaveShellFragment: boolean, // 圣歌盟地买面具
        purchasedGrindleSpoolPiece: boolean, // 蚀阶小偷买丝轴
        MetCaravanTroupeLeaderJudge: boolean, // 解救14只跳蚤
        MerchantEnclaveToolMetal: boolean, // 圣歌盟地买金属
        MerchantEnclaveSpoolPiece: boolean, // 圣歌盟地买丝轴
        bonetownAspidBerryCollected: boolean, // 骸底镇上空苔莓
        mosstownAspidBerryCollected: boolean, // 德鲁伊下方苔莓
        bonegraveAspidBerryCollected: boolean, // 漫游者教堂上空苔莓
        SavedFlea_Bone_East_05: boolean, // 跳蚤：深坞_冲刺能力旁
        SavedFlea_Dock_16: boolean, // 跳蚤：深坞_车站隐藏墙
        SavedFlea_Dock_03d: boolean, // 跳蚤：深坞右下方隐藏房（需飞针）
        SavedFlea_Bone_East_17b: boolean, // 跳蚤：远野左侧笼子
        SavedFlea_Bone_East_10_Church: boolean, // 跳蚤：朝圣者憩所右侧门内(需从远野车站隐藏通道进入)
        SavedFlea_Greymoor_15b: boolean, // 跳蚤：灰沼_腐囊虫庭附近
        SavedFlea_Greymoor_06: boolean, // 跳蚤：灰沼塔顶
        CaravanLechSaved: boolean, // 跳蚤：灰沼_中途酒馆上方隐藏墙（色跳蚤）
        SavedFlea_Shellwood_03: boolean, // 跳蚤：甲木林拿螳螂爪路上
        SavedFlea_Belltown_04: boolean, // 跳蚤：钟心镇上方钟道顶部
        SavedFlea_Bone_06: boolean, // 跳蚤：骸骨洞窟
        SavedFlea_Ant_03: boolean, // 跳蚤：猎人小径左侧（下劈红豆上去）
        SavedFlea_Dust_12: boolean, // 跳蚤：罪途左侧笼子
        SavedFlea_Peak_05c: boolean, // 跳蚤：雪山跳蚤
        SavedFlea_Under_21: boolean, // 跳蚤：圣堡工厂下层（全是炸弹人的房间）
        SavedFlea_Under_23: boolean, // 跳蚤：圣堡工厂底部(火灵竹林出来)
        SavedFlea_Coral_35: boolean, // 跳蚤：蚀阶_车站左侧房间顶部
        SavedFlea_Coral_24: boolean, // 跳蚤：蚀阶_去往椅子路上
        SavedFlea_Crawl_06: boolean, // 跳蚤：沙虫道_门上方隐藏墙
        SavedFlea_Slab_Cell: boolean, // 跳蚤：罪石监狱_小房间
        SavedFlea_Slab_06: boolean, // 跳蚤：罪石监狱_车站旁椅子上方
        tamedGiantFlea: boolean, // 跳蚤：忆廊顶部（大跳蚤）
        MetTroupeHunterWild: boolean, // 跳蚤：腐殖渠（龙牙跳蚤，救出可解锁全部跳蚤位置）
        SavedFlea_Shadow_10: boolean, // 跳蚤：腐汁泽隐藏椅子上方跳蚤
        SavedFlea_Shadow_28: boolean, // 跳蚤：腐汁泽下方隐藏墙
        SavedFlea_Dust_09: boolean, // 跳蚤：废旧管风琴（打完boss左走）
        SavedFlea_Song_14: boolean, // 跳蚤：圣咏殿跳蚤（从餐厅往左走）
        SavedFlea_Song_11: boolean, // 跳蚤：圣咏殿隐藏墙跳蚤（下方隐藏墙有风扇）
        SavedFlea_Library_09: boolean, // 跳蚤：圣歌盟地右侧（需从图书馆隐藏墙上去）
        SavedFlea_Library_01: boolean, // 跳蚤：图书馆推箱子
        QuestCompletionData: {
            savedData: [{
                Name: string,
                Data: {
                    HasBeenSeen: boolean,
                    IsAccepted: boolean,
                    CompletedCount: number,
                    IsCompleted: boolean,
                    WasEverCompleted: boolean
                }
            }]
        },
        StoryEvents: [{
            EventType: number,
            SceneName: string,
            PlayTime: number
        }]
    };
    sceneData: {
        persistentBools: {
            serializedList: [{
                SceneName: string,
                ID: string,
                Value: boolean,
                Mutator: number
            }]
        }
    }
}


// 3. 解析后返回的数据
export interface CollectInf {
    cId: number;
    scene: string
    axis: string
    resStr: string
}

interface ParseRes {
    boxList: CollectInf[]
    silkList: CollectInf[]
    heartList: CollectInf[]
    metalList: CollectInf[]
    berryList: CollectInf[]
    fleaList: CollectInf[]
}

export const parseJsonData = (jsonStr: string): ParseRes => {
    const parseRes: ParseRes = {boxList: [], heartList: [], metalList: [], silkList: [], berryList: [], fleaList: []}
    try {
        // 解析JSON字符串为JavaScript对象
        const data = JSON.parse(jsonStr) as GameData;
        const playerData = data.playerData;
        const storyEvents = playerData.StoryEvents
        const serializedList = data.sceneData.persistentBools.serializedList
        const questCompletionData = playerData.QuestCompletionData.savedData

        for (const cd of checkDataList) {
            let complete = false;
            // 判断是否完成
            if (cd.ev === 0) {
                // 场景
                const find = serializedList.find(scene => (scene.SceneName === cd.ev1) && (scene.ID === cd.ev2));
                if (find !== undefined && find.Value) {
                    complete = true;
                }
            } else if (cd.ev === 1) {
                // 购买
                if (cd.ev2 === "1") {
                    complete = playerData.PurchasedBonebottomHeartPiece
                } else if (cd.ev2 === "2") {
                    complete = playerData.PurchasedBonebottomToolMetal
                } else if (cd.ev2 === "3") {
                    complete = playerData.PurchasedPilgrimsRestMemoryLocket
                } else if (cd.ev2 === "4") {
                    complete = playerData.PurchasedBelltownMemoryLocket
                } else if (cd.ev2 === "5") {
                    complete = playerData.PurchasedBelltownSpoolSegment
                } else if (cd.ev2 === "6") {
                    complete = playerData.MerchantEnclaveShellFragment
                } else if (cd.ev2 === "7") {
                    complete = playerData.purchasedGrindleSpoolPiece
                } else if (cd.ev2 === "8") {
                    complete = playerData.MetCaravanTroupeLeaderJudge
                } else if (cd.ev2 === "9") {
                    complete = playerData.MerchantEnclaveToolMetal
                } else if (cd.ev2 === "10") {
                    complete = playerData.MerchantEnclaveSpoolPiece
                } else if (cd.ev2 === "11") {
                    complete = playerData.bonetownAspidBerryCollected
                } else if (cd.ev2 === "12") {
                    complete = playerData.mosstownAspidBerryCollected
                } else if (cd.ev2 === "13") {
                    complete = playerData.bonegraveAspidBerryCollected
                } else if (cd.ev2 === "14") {
                    complete = playerData.SavedFlea_Bone_East_05
                } else if (cd.ev2 === "15") {
                    complete = playerData.SavedFlea_Dock_16
                } else if (cd.ev2 === "16") {
                    complete = playerData.SavedFlea_Dock_03d
                } else if (cd.ev2 === "17") {
                    complete = playerData.SavedFlea_Bone_East_17b
                } else if (cd.ev2 === "18") {
                    complete = playerData.SavedFlea_Bone_East_10_Church
                } else if (cd.ev2 === "19") {
                    complete = playerData.SavedFlea_Greymoor_15b
                } else if (cd.ev2 === "20") {
                    complete = playerData.SavedFlea_Greymoor_06
                } else if (cd.ev2 === "21") {
                    complete = playerData.CaravanLechSaved
                } else if (cd.ev2 === "22") {
                    complete = playerData.SavedFlea_Shellwood_03
                } else if (cd.ev2 === "23") {
                    complete = playerData.SavedFlea_Belltown_04
                } else if (cd.ev2 === "24") {
                    complete = playerData.SavedFlea_Bone_06
                } else if (cd.ev2 === "25") {
                    complete = playerData.SavedFlea_Ant_03
                } else if (cd.ev2 === "26") {
                    complete = playerData.SavedFlea_Dust_12
                } else if (cd.ev2 === "27") {
                    complete = playerData.SavedFlea_Peak_05c
                } else if (cd.ev2 === "28") {
                    complete = playerData.SavedFlea_Under_21
                } else if (cd.ev2 === "29") {
                    complete = playerData.SavedFlea_Under_23
                } else if (cd.ev2 === "30") {
                    complete = playerData.SavedFlea_Coral_35
                } else if (cd.ev2 === "31") {
                    complete = playerData.SavedFlea_Coral_24
                } else if (cd.ev2 === "32") {
                    complete = playerData.SavedFlea_Crawl_06
                } else if (cd.ev2 === "33") {
                    complete = playerData.SavedFlea_Slab_Cell
                } else if (cd.ev2 === "34") {
                    complete = playerData.SavedFlea_Slab_06
                } else if (cd.ev2 === "35") {
                    complete = playerData.tamedGiantFlea
                } else if (cd.ev2 === "36") {
                    complete = playerData.MetTroupeHunterWild
                } else if (cd.ev2 === "37") {
                    complete = playerData.SavedFlea_Shadow_10
                } else if (cd.ev2 === "38") {
                    complete = playerData.SavedFlea_Shadow_28
                } else if (cd.ev2 === "39") {
                    complete = playerData.SavedFlea_Dust_09
                } else if (cd.ev2 === "40") {
                    complete = playerData.SavedFlea_Song_14
                } else if (cd.ev2 === "41") {
                    complete = playerData.SavedFlea_Song_11
                } else if (cd.ev2 === "42") {
                    complete = playerData.SavedFlea_Library_09
                } else if (cd.ev2 === "43") {
                    complete = playerData.SavedFlea_Library_01
                }
            } else if (cd.ev === 2) {
                // 任务
                const find = questCompletionData.find(comp => (comp.Name === cd.ev2))
                if (find !== undefined && (find.Data.IsCompleted) && (find.Data.WasEverCompleted)) {
                    complete = true;
                }
            }

            // 查看是否有获取事件
            let hasEvent = false;
            if ([0, 1, 3].includes(cd.type) && storyEvents !== undefined) {
                const find = storyEvents.find(comp => (comp.EventType === cd.type) && (comp.SceneName === cd.ev1))
                if (find !== undefined) {
                    hasEvent = true;
                }
            } else {
                // 金属\苔莓的获取没有事件，所以等于其是否完成
                hasEvent = complete
            }
            // 统一设置文本
            let checkRes = "未完成";
            if (complete && hasEvent) {
                checkRes = "已完成";
            } else if (complete && !hasEvent) {
                // 已完成但没有获取事件的，就是有问题
                checkRes = "疑似BUG";
            }

            // 根据类型放入不同列表
            const collect: CollectInf = {cId: cd.cId, scene: cd.scene, axis: cd.axis, resStr: checkRes}
            if (checkRes === "疑似BUG") {
                // 进第三幕后有变化的碎片(可能导致疑似Bug出现)
                if ([5, 8, 25].includes(cd.cId)) {
                    collect.scene += "——可能已在小偷处购买"
                }
            }

            if (cd.type === 0) {
                parseRes.heartList.push(collect)
            } else if (cd.type === 1) {
                parseRes.silkList.push(collect)
            } else if (cd.type === 3) {
                parseRes.boxList.push(collect)
            } else if (cd.type === 4) {
                parseRes.metalList.push(collect)
            } else if (cd.type === 5) {
                parseRes.berryList.push(collect)
            } else if (cd.type === 6) {
                parseRes.fleaList.push(collect)
            }
        }
    } catch (error) {
        console.error('JSON解析错误:', error);
    }
    return parseRes;
}