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
        QuestCompletionData: {
            savedData: [{
                Name: string,
                Data: {
                    "HasBeenSeen": boolean,
                    "IsAccepted": boolean,
                    "CompletedCount": number,
                    "IsCompleted": boolean,
                    "WasEverCompleted": boolean
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
                "SceneName": string,
                "ID": string,
                "Value": boolean,
                "Mutator": number
            }]
        }
    }
}


// 3. 解析后返回的数据
export interface CollectInf {
    checkId: number;
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
}

export const parseJsonData = (jsonStr: string): ParseRes => {
    const parseRes: ParseRes = {boxList: [], heartList: [], metalList: [], silkList: [], berryList: []}
    try {
        // 解析JSON字符串为JavaScript对象
        const data = JSON.parse(jsonStr) as GameData;
        const storyEvents = data.playerData.StoryEvents
        const serializedList = data.sceneData.persistentBools.serializedList
        const questCompletionData = data.playerData.QuestCompletionData.savedData

        for (const cd of checkDataList) {
            let complete = false;
            // 判断是否完成
            if (cd.evi === 0) {
                // 场景
                const find = serializedList.find(scene => (scene.SceneName === cd.evidence1) && (scene.ID === cd.evidence2));
                if (find !== undefined && find.Value) {
                    complete = true;
                }
            } else if (cd.evi === 1) {
                // 购买
                if (cd.evidence2 === "1") {
                    complete = data.playerData.PurchasedBonebottomHeartPiece
                } else if (cd.evidence2 === "2") {
                    complete = data.playerData.PurchasedBonebottomToolMetal
                } else if (cd.evidence2 === "3") {
                    complete = data.playerData.PurchasedPilgrimsRestMemoryLocket
                } else if (cd.evidence2 === "4") {
                    complete = data.playerData.PurchasedBelltownMemoryLocket
                } else if (cd.evidence2 === "5") {
                    complete = data.playerData.PurchasedBelltownSpoolSegment
                } else if (cd.evidence2 === "6") {
                    complete = data.playerData.MerchantEnclaveShellFragment
                } else if (cd.evidence2 === "7") {
                    complete = data.playerData.purchasedGrindleSpoolPiece
                } else if (cd.evidence2 === "8") {
                    complete = data.playerData.MetCaravanTroupeLeaderJudge
                } else if (cd.evidence2 === "9") {
                    complete = data.playerData.MerchantEnclaveToolMetal
                } else if (cd.evidence2 === "10") {
                    complete = data.playerData.MerchantEnclaveSpoolPiece
                } else if (cd.evidence2 === "11") {
                    complete = data.playerData.bonetownAspidBerryCollected
                } else if (cd.evidence2 === "12") {
                    complete = data.playerData.mosstownAspidBerryCollected
                } else if (cd.evidence2 === "13") {
                    complete = data.playerData.bonegraveAspidBerryCollected
                }
            } else if (cd.evi === 2) {
                // 任务
                const find = questCompletionData.find(comp => (comp.Name === cd.evidence2))
                if (find !== undefined && (find.Data.IsCompleted) && (find.Data.WasEverCompleted)) {
                    complete = true;
                }
            }

            // 查看是否有获取事件
            let hasEvent = false;
            if (cd.type !== 4 && cd.type !== 5 && storyEvents !== undefined) {
                const find = storyEvents.find(comp => (comp.EventType === cd.type) && (comp.SceneName === cd.evidence1))
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
            const collect: CollectInf = {checkId: cd.checkId, scene: cd.scene, axis: cd.axis, resStr: checkRes}
            if (checkRes === "疑似BUG") {
                // 进第三幕后有变化的碎片(可能导致疑似Bug出现)
                const threeMuId = [5, 8, 25, 47];
                if (threeMuId.includes(cd.checkId)) {
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
            }
        }
    } catch (error) {
        console.error('JSON解析错误:', error);
    }
    return parseRes;
}