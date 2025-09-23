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
    complete: boolean
    hasEvent: boolean
}

interface ParseRes {
    boxList: CollectInf[]
    silkList: CollectInf[]
    heartList: CollectInf[]
    metalList: CollectInf[]
}

export const parseJsonData = (jsonStr: string): ParseRes => {
    const parseRes: ParseRes = {boxList: [], heartList: [], metalList: [], silkList: []}
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
                }
            } else if (cd.evi === 2) {
                // 任务
                const find = questCompletionData.find(comp => (comp.Name === cd.evidence1))
                if (find !== undefined && (find.Data.IsCompleted) && (find.Data.WasEverCompleted)) {
                    complete = true;
                }
            }

            // 查看是否有获取事件
            let hasEvent = false;
            if (cd.type !== 4) {
                const find = storyEvents.find(comp => (comp.EventType === cd.type) && (comp.SceneName === cd.evidence1))
                if (find !== undefined) {
                    hasEvent = true;
                }
            }

            // 根据类型放入不同列表
            const collect: CollectInf = {checkId: cd.checkId, scene: cd.scene, complete: complete, hasEvent: hasEvent}
            if (cd.type === 0) {
                parseRes.heartList.push(collect)
            } else if (cd.type === 1) {
                parseRes.silkList.push(collect)
            } else if (cd.type === 3) {
                parseRes.boxList.push(collect)
            } else if (cd.type === 4) {
                parseRes.metalList.push(collect)
            }
        }
    } catch (error) {
        console.error('JSON解析错误:', error);
    }
    return parseRes;
}