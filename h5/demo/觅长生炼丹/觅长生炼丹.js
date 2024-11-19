"use strict";
(() => {
    const formulaList = [
        {
            ind: 0,
            name: "化淤丹",
            level: 1,
            info: "20血",
            main: "活血",
            mainNeed: 1,
            pu1: "培元",
            pu1Need: 1.0,
            leadIn: 1
        },
        { ind: 1, name: "洗髓丹", level: 1, info: "修为+180", main: "生息", mainNeed: 15, leadIn: 1 },
        {
            ind: 2,
            name: "生骨丹",
            level: 1,
            info: "35血",
            main: "活血",
            mainNeed: 1,
            pu1: "固元",
            pu1Need: 3.0,
            leadIn: 1
        },
        {
            ind: 3,
            name: "冰心丹",
            level: 1,
            info: "心境+1",
            main: "聚元",
            mainNeed: 6,
            pu1: "清心",
            pu1Need: 3.0,
            leadIn: 3
        },
        {
            ind: 4,
            name: "凝神丹",
            level: 1,
            info: "下场战斗神识+1",
            main: "振气",
            mainNeed: 3,
            pu1: "凝神",
            pu1Need: 1.0,
            leadIn: 3
        },
        {
            ind: 5,
            name: "龙虎丹",
            level: 1,
            info: "第1回合伤害+1",
            main: "振气",
            mainNeed: 6,
            pu1: "混元",
            pu1Need: 3.0,
            leadIn: 1
        },
        {
            ind: 6,
            name: "引灵丹",
            level: 1,
            info: "抽1张灵气牌",
            main: "振气",
            mainNeed: 3,
            pu1: "聚灵",
            pu1Need: 3.0,
            leadIn: 1
        },
        {
            ind: 7,
            name: "聚甲丹",
            level: 1,
            info: "下场战斗获得1点护罩",
            main: "御气",
            mainNeed: 6,
            pu1: "固元",
            pu1Need: 3.0,
            leadIn: 1
        },
        {
            ind: 8,
            name: "龟灵丹",
            level: 1,
            info: "下场战斗获得减伤*1",
            main: "御气",
            mainNeed: 3,
            pu1: "混元",
            pu1Need: 4.0,
            leadIn: 3
        },
        {
            ind: 9,
            name: "培元丹",
            level: 2,
            info: "70血",
            main: "活血",
            mainNeed: 6,
            pu1: "固元",
            pu1Need: 3.0,
            leadIn: 3
        },
        {
            ind: 10,
            name: "养气丹",
            level: 2,
            info: "修为+553",
            main: "生息",
            mainNeed: 9,
            pu1: "养气",
            pu1Need: 21.0,
            leadIn: 3
        },
        {
            ind: 11,
            name: "疾行丹",
            level: 2,
            info: "战斗中遁速+5",
            main: "振气",
            mainNeed: 3,
            pu1: "神行",
            pu1Need: 3.0,
            leadIn: 1
        },
        {
            ind: 12,
            name: "黄龙丹",
            level: 2,
            info: "150血",
            main: "活血",
            mainNeed: 3,
            pu1: "培元",
            pu1Need: 18.0,
            leadIn: 3
        },
        { ind: 13, name: "炼血丹", level: 2, info: "修为+6000", main: "炼魔", mainNeed: 9, leadIn: 3 },
        {
            ind: 14,
            name: "锐金丹",
            level: 2,
            info: "战斗中金伤害+1",
            main: "振气",
            mainNeed: 3,
            pu1: "强金",
            pu1Need: 3.0,
            pu2: "混元",
            pu2Need: 3.0,
            leadIn: 3
        },
        {
            ind: 15,
            name: "乙木丹",
            level: 2,
            info: "战斗中木伤害+1",
            main: "振气",
            mainNeed: 3,
            pu1: "强木",
            pu1Need: 3.0,
            pu2: "混元",
            pu2Need: 3.0,
            leadIn: 3
        },
        {
            ind: 16,
            name: "葵水丹",
            level: 2,
            info: "战斗中水伤害+1",
            main: "振气",
            mainNeed: 3,
            pu1: "强水",
            pu1Need: 3.0,
            pu2: "混元",
            pu2Need: 3.0,
            leadIn: 3
        },
        {
            ind: 17,
            name: "三阳丹",
            level: 2,
            info: "战斗中火伤害+1",
            main: "振气",
            mainNeed: 3,
            pu1: "强火",
            pu1Need: 3.0,
            pu2: "混元",
            pu2Need: 3.0,
            leadIn: 3
        },
        {
            ind: 18,
            name: "厚土丹",
            level: 2,
            info: "战斗中土伤害+1",
            main: "振气",
            mainNeed: 3,
            pu1: "强土",
            pu1Need: 3.0,
            pu2: "混元",
            pu2Need: 3.0,
            leadIn: 3
        },
        {
            ind: 19,
            name: "净血丹",
            level: 2,
            info: "丹毒-2",
            main: "净血",
            mainNeed: 9,
            pu1: "解毒",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 20,
            name: "明心丹",
            level: 2,
            info: "心境+4",
            main: "聚元",
            mainNeed: 9,
            pu1: "清心",
            pu1Need: 12.0,
            pu2: "调和",
            pu2Need: 6.0,
            leadIn: 3
        },
        {
            ind: 21,
            name: "御剑丹",
            level: 2,
            info: "下场战斗获得剑气*1",
            main: "振气",
            mainNeed: 6,
            pu1: "剑意",
            pu1Need: 12.0,
            leadIn: 3
        },
        {
            ind: 22,
            name: "真金丹",
            level: 2,
            info: "金灵根权重+10获得易伤*1",
            main: "振气",
            mainNeed: 9,
            pu1: "强金",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 23,
            name: "森木丹",
            level: 2,
            info: "木灵根权重+10获得易伤*1",
            main: "振气",
            mainNeed: 9,
            pu1: "强木",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 24,
            name: "生水丹",
            level: 2,
            info: "水灵根权重+10获得易伤*1",
            main: "振气",
            mainNeed: 9,
            pu1: "强水",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 25,
            name: "聚火丹",
            level: 2,
            info: "火灵根权重+10获得易伤*1",
            main: "振气",
            mainNeed: 9,
            pu1: "强火",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 26,
            name: "玄土丹",
            level: 2,
            info: "土灵根权重+10获得易伤*1",
            main: "振气",
            mainNeed: 9,
            pu1: "强土",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 27,
            name: "续命丹",
            level: 2,
            info: "寿元+5",
            main: "聚元",
            mainNeed: 9,
            pu1: "益寿",
            pu1Need: 27.0,
            leadIn: 3
        },
        {
            ind: 28,
            name: "炼甲丹",
            level: 2,
            info: "下场战斗获得5点护罩",
            main: "御气",
            mainNeed: 9,
            pu1: "固元",
            pu1Need: 9.0,
            leadIn: 3
        },
        {
            ind: 29,
            name: "龟甲丹",
            level: 2,
            info: "战斗中受到的技能伤害-1",
            main: "御气",
            mainNeed: 6,
            pu1: "混元",
            pu1Need: 9.0,
            pu2: "混元",
            pu2Need: 3.0,
            leadIn: 3
        },
        {
            ind: 30,
            name: "回元丹",
            level: 3,
            info: "150血",
            main: "活血",
            mainNeed: 6,
            pu1: "固元",
            pu1Need: 6.0,
            leadIn: 3
        },
        {
            ind: 31,
            name: "九转丹",
            level: 3,
            info: "修为+5940（境界不足筑基期时服用，丹毒+30）",
            main: "生息",
            mainNeed: 36,
            pu1: "养气",
            pu1Need: 45.0,
            pu2: "炼气",
            pu2Need: 18.0,
            leadIn: 9
        },
        {
            ind: 32,
            name: "清蕴丹",
            level: 3,
            info: "免毒",
            main: "御气",
            mainNeed: 18,
            pu1: "解毒",
            pu1Need: 9.0,
            leadIn: 9
        },
        {
            ind: 33,
            name: "冰元丹",
            level: 3,
            info: "免烧",
            main: "御气",
            mainNeed: 18,
            pu1: "强水",
            pu1Need: 9.0,
            leadIn: 9
        },
        {
            ind: 34,
            name: "筑基丹",
            level: 3,
            info: "筑基",
            main: "振气",
            mainNeed: 27,
            pu1: "定煞",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 35,
            name: "养魂丹",
            level: 3,
            info: "神识+1",
            main: "聚元",
            mainNeed: 18,
            pu1: "养魂",
            pu1Need: 18.0,
            leadIn: 36
        },
        {
            ind: 36,
            name: "启灵丹",
            level: 3,
            info: "悟性+1",
            main: "聚元",
            mainNeed: 36,
            pu1: "开窍",
            pu1Need: 36.0,
            pu2: "开窍",
            pu2Need: 27.0,
            leadIn: 9
        },
        {
            ind: 37,
            name: "草还丹",
            level: 3,
            info: "资质+1",
            main: "聚元",
            mainNeed: 36,
            pu1: "洗髓",
            pu1Need: 36.0,
            pu2: "洗髓",
            pu2Need: 18.0,
            leadIn: 9
        },
        {
            ind: 38,
            name: "煅体丹",
            level: 3,
            info: "血量上限+3",
            main: "聚元",
            mainNeed: 27,
            pu1: "煅体",
            pu1Need: 27.0,
            leadIn: 9
        },
        {
            ind: 39,
            name: "御风丹",
            level: 3,
            info: "遁速+1",
            main: "聚元",
            mainNeed: 27,
            pu1: "神行",
            pu1Need: 18.0,
            leadIn: 3
        },
        {
            ind: 40,
            name: "延寿丹",
            level: 3,
            info: "寿元+10",
            main: "聚元",
            mainNeed: 54,
            pu1: "益寿",
            pu1Need: 36.0,
            leadIn: 3
        },
        {
            ind: 41,
            name: "清脉丹",
            level: 3,
            info: "丹毒-10",
            main: "净血",
            mainNeed: 27,
            pu1: "解毒",
            pu1Need: 21.0,
            leadIn: 3
        },
        {
            ind: 42,
            name: "幻心玄丹",
            level: 3,
            info: "心境+6",
            main: "聚元",
            mainNeed: 27,
            pu1: "清心",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 43,
            name: "溯金丹",
            level: 3,
            info: "下场战斗 金灵根权重+30",
            main: "振气",
            mainNeed: 9,
            pu1: "强金",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 44,
            name: "万木丹",
            level: 3,
            info: "下场战斗 木灵根权重+30",
            main: "振气",
            mainNeed: 9,
            pu1: "强木",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 45,
            name: "玄水丹",
            level: 3,
            info: "下场战斗 水灵根权重+30",
            main: "振气",
            mainNeed: 9,
            pu1: "强水",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 46,
            name: "真阳丹",
            level: 3,
            info: "下场战斗 火灵根权重+30",
            main: "振气",
            mainNeed: 9,
            pu1: "强火",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 47,
            name: "地元丹",
            level: 3,
            info: "下场战斗 土灵根权重+30",
            main: "振气",
            mainNeed: 9,
            pu1: "强土",
            pu1Need: 9.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 48,
            name: "奕剑丹",
            level: 3,
            info: "下场战斗获得剑气*5",
            main: "振气",
            mainNeed: 12,
            pu1: "剑意",
            pu1Need: 18.0,
            leadIn: 9
        },
        {
            ind: 49,
            name: "凝金丹",
            level: 3,
            info: "结丹时 金灵根权重+20",
            main: "振气",
            mainNeed: 9,
            pu1: "强金",
            pu1Need: 18.0,
            pu2: "凝液",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 50,
            name: "凝木丹",
            level: 3,
            info: "结丹时 木灵根权重+20",
            main: "振气",
            mainNeed: 9,
            pu1: "强木",
            pu1Need: 18.0,
            pu2: "凝液",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 51,
            name: "凝水丹",
            level: 3,
            info: "结丹时 水灵根权重+20",
            main: "振气",
            mainNeed: 9,
            pu1: "强水",
            pu1Need: 18.0,
            pu2: "凝液",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 52,
            name: "凝火丹",
            level: 3,
            info: "结丹时 火灵根权重+20",
            main: "振气",
            mainNeed: 9,
            pu1: "强火",
            pu1Need: 18.0,
            pu2: "凝液",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 53,
            name: "凝土丹",
            level: 3,
            info: "结丹时 土灵根权重+20",
            main: "振气",
            mainNeed: 9,
            pu1: "强土",
            pu1Need: 18.0,
            pu2: "凝液",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 54,
            name: "玄武丹",
            level: 3,
            info: "战斗中受到的技能伤害-4",
            main: "御气",
            mainNeed: 27,
            pu1: "混元",
            pu1Need: 12.0,
            leadIn: 3
        },
        {
            ind: 55,
            name: "金元丹",
            level: 3,
            info: "永久提升金系权重+2",
            main: "聚元",
            mainNeed: 36,
            pu1: "强金",
            pu1Need: 36.0,
            leadIn: 9
        },
        {
            ind: 56,
            name: "木元丹",
            level: 3,
            info: "永久提升木系权重+2",
            main: "聚元",
            mainNeed: 36,
            pu1: "强木",
            pu1Need: 36.0,
            leadIn: 9
        },
        {
            ind: 57,
            name: "水元丹",
            level: 3,
            info: "永久提升水系权重+2",
            main: "聚元",
            mainNeed: 36,
            pu1: "强水",
            pu1Need: 36.0,
            leadIn: 9
        },
        {
            ind: 58,
            name: "火元丹",
            level: 3,
            info: "永久提升火系权重+2",
            main: "聚元",
            mainNeed: 36,
            pu1: "强火",
            pu1Need: 36.0,
            leadIn: 9
        },
        {
            ind: 59,
            name: "土元丹",
            level: 3,
            info: "永久提升土系权重+2",
            main: "聚元",
            mainNeed: 36,
            pu1: "强土",
            pu1Need: 36.0,
            leadIn: 9
        },
        {
            ind: 60,
            name: "回春丹",
            level: 4,
            info: "250血",
            main: "活血",
            mainNeed: 9,
            pu1: "固元",
            pu1Need: 1.0,
            leadIn: 1
        },
        {
            ind: 61,
            name: "养元丹",
            level: 4,
            info: "400血",
            main: "活血",
            mainNeed: 9,
            pu1: "培元",
            pu1Need: 3.0,
            pu2: "培元",
            pu2Need: 6.0,
            leadIn: 3
        },
        {
            ind: 62,
            name: "易经丹",
            level: 4,
            info: "修为+15840（境界不足金丹期时服用，丹毒+30）",
            main: "生息",
            mainNeed: 72,
            pu1: "炼气",
            pu1Need: 72.0,
            pu2: "炼气",
            pu2Need: 36.0,
            leadIn: 36
        },
        {
            ind: 63,
            name: "血煞丹",
            level: 4,
            info: "伤害+3，使用技能生命-1",
            main: "振气",
            mainNeed: 18,
            pu1: "混元",
            pu1Need: 18.0,
            leadIn: 9
        },
        {
            ind: 64,
            name: "补灵丹",
            level: 4,
            info: "每回合抽2牌",
            main: "振气",
            mainNeed: 18,
            pu1: "聚灵",
            pu1Need: 18.0,
            pu2: "调和",
            pu2Need: 12.0,
            leadIn: 9
        },
        {
            ind: 65,
            name: "灵魄丹",
            level: 4,
            info: "神识+2",
            main: "聚元",
            mainNeed: 72,
            pu1: "养魂",
            pu1Need: 108.0,
            leadIn: 9
        },
        {
            ind: 66,
            name: "金刚铁骨丹",
            level: 4,
            info: "7血上限",
            main: "聚元",
            mainNeed: 45,
            pu1: "煅体",
            pu1Need: 36.0,
            pu2: "煅体",
            pu2Need: 36.0,
            leadIn: 9
        },
        {
            ind: 67,
            name: "神行丹",
            level: 4,
            info: "遁速+3",
            main: "聚元",
            mainNeed: 36,
            pu1: "神行",
            pu1Need: 45.0,
            leadIn: 9
        },
        {
            ind: 68,
            name: "青冥丹",
            level: 4,
            info: "寿元+20",
            main: "聚元",
            mainNeed: 54,
            pu1: "益寿",
            pu1Need: 36.0,
            pu2: "益寿",
            pu2Need: 180.0,
            leadIn: 9
        },
        {
            ind: 69,
            name: "鬼面炼心丹",
            level: 4,
            info: "心境+7",
            main: "聚元",
            mainNeed: 54,
            pu1: "清心",
            pu1Need: 72.0,
            pu2: "调和",
            pu2Need: 9.0,
            leadIn: 36
        },
        {
            ind: 70,
            name: "九转再造丹",
            level: 4,
            info: "资质+3",
            main: "聚元",
            mainNeed: 252,
            pu1: "洗髓",
            pu1Need: 36.0,
            leadIn: 36
        },
        {
            ind: 71,
            name: "化毒丹",
            level: 4,
            info: "丹毒-20",
            main: "净血",
            mainNeed: 45,
            pu1: "解毒",
            pu1Need: 45.0,
            leadIn: 3
        },
        {
            ind: 72,
            name: "天鑫丹",
            level: 4,
            info: "每回合抽1张金系牌",
            main: "振气",
            mainNeed: 36,
            pu1: "强金",
            pu1Need: 18.0,
            pu2: "聚灵",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 73,
            name: "森芒丹",
            level: 4,
            info: "每回合抽1张木系牌",
            main: "振气",
            mainNeed: 36,
            pu1: "强木",
            pu1Need: 18.0,
            pu2: "聚灵",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 74,
            name: "浩淼丹",
            level: 4,
            info: "每回合抽1张水系牌",
            main: "振气",
            mainNeed: 36,
            pu1: "强水",
            pu1Need: 18.0,
            pu2: "聚灵",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 75,
            name: "阳焱丹",
            level: 4,
            info: "每回合抽1张火系牌",
            main: "振气",
            mainNeed: 36,
            pu1: "强火",
            pu1Need: 18.0,
            pu2: "聚灵",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 76,
            name: "磊叠丹",
            level: 4,
            info: "每回合抽1张土系牌",
            main: "振气",
            mainNeed: 36,
            pu1: "强土",
            pu1Need: 18.0,
            pu2: "聚灵",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 77,
            name: "聚顶丹",
            level: 4,
            info: "结丹时 初始手牌+1",
            main: "振气",
            mainNeed: 36,
            pu1: "凝液",
            pu1Need: 18.0,
            pu2: "聚灵",
            pu2Need: 9.0,
            leadIn: 3
        },
        {
            ind: 78,
            name: "诱妖液",
            level: 4,
            info: "吸引周围的妖兽（持续1年）",
            main: "诱妖",
            mainNeed: 36,
            pu1: "调和",
            pu1Need: 18.0,
            leadIn: 36
        },
        {
            ind: 79,
            name: "驱妖液",
            level: 4,
            info: "驱赶周围的妖兽（持续1年）",
            main: "驱妖",
            mainNeed: 36,
            pu1: "调和",
            pu1Need: 18.0,
            leadIn: 36
        },
        {
            ind: 80,
            name: "玄元丹",
            level: 4,
            info: "悟性+2",
            main: "聚元",
            mainNeed: 108,
            pu1: "洗髓",
            pu1Need: 36.0,
            pu2: "洗髓",
            pu2Need: 36.0,
            leadIn: 36
        },
        {
            ind: 81,
            name: "九转灵蛇丹",
            level: 5,
            info: "血量全回复",
            main: "活血",
            mainNeed: 9,
            pu1: "固元",
            pu1Need: 9.0,
            pu2: "培元",
            pu2Need: 9.0,
            leadIn: 9
        },
        {
            ind: 82,
            name: "天尘丹",
            level: 5,
            info: "修为+118800（境界不足元婴期时服用，丹毒+30）",
            main: "生息",
            mainNeed: 360,
            pu1: "炼气",
            pu1Need: 360.0,
            leadIn: 36
        },
        {
            ind: 83,
            name: "长生丹",
            level: 5,
            info: "寿元+30",
            main: "聚元",
            mainNeed: 288,
            pu1: "益寿",
            pu1Need: 360.0,
            leadIn: 36
        },
        {
            ind: 84,
            name: "厉魄丹",
            level: 5,
            info: "神识+4",
            main: "聚元",
            mainNeed: 216,
            pu1: "养魂",
            pu1Need: 180.0,
            leadIn: 9
        },
        {
            ind: 85,
            name: "朝元丹",
            level: 5,
            info: "五气朝元阶段 每回合抽牌+1",
            main: "振气",
            mainNeed: 18,
            pu1: "凝液",
            pu1Need: 72.0,
            pu2: "聚灵",
            pu2Need: 36.0,
            leadIn: 9
        },
        {
            ind: 86,
            name: "鐾金元丹",
            level: 5,
            info: "提升金之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "强金",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 87,
            name: "森檀元丹",
            level: 5,
            info: "提升木之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "强木",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 88,
            name: "浩淼元丹",
            level: 5,
            info: "提升水之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "强水",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 89,
            name: "芒焰元丹",
            level: 5,
            info: "提升火之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "强火",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 90,
            name: "无垠元丹",
            level: 5,
            info: "提升土之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "强土",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 91,
            name: "天剑元丹",
            level: 5,
            info: "提升剑之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "剑意",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 92,
            name: "炼魂元丹",
            level: 5,
            info: "提升神之道悟道经验600点",
            main: "聚元",
            mainNeed: 180,
            pu1: "凝神",
            pu1Need: 540.0,
            pu2: "道蕴",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 93,
            name: "道源丹",
            level: 5,
            info: "增加悟道点1点",
            main: "聚元",
            mainNeed: 360,
            pu1: "开悟",
            pu1Need: 1260.0,
            leadIn: 180
        },
        {
            ind: 94,
            name: "玉清昊元丹",
            level: 5,
            info: "悟性+4",
            main: "聚元",
            mainNeed: 180,
            pu1: "开窍",
            pu1Need: 180.0,
            pu2: "调和",
            pu2Need: 180.0,
            leadIn: 36
        },
        {
            ind: 95,
            name: "修髓丹",
            level: 5,
            info: "资质+9",
            main: "聚元",
            mainNeed: 180,
            pu1: "洗髓",
            pu1Need: 180.0,
            leadIn: 180
        },
        {
            ind: 96,
            name: "赤阳丹",
            level: 5,
            info: "生命值上限+20",
            main: "聚元",
            mainNeed: 180,
            pu1: "煅体",
            pu1Need: 180.0,
            leadIn: 180
        },
        {
            ind: 97,
            name: "青灵丹",
            level: 5,
            info: "遁速+9",
            main: "聚元",
            mainNeed: 108,
            pu1: "神行",
            pu1Need: 36.0,
            pu2: "神行",
            pu2Need: 72.0,
            leadIn: 36
        },
        {
            ind: 98,
            name: "少阴清灵丹",
            level: 5,
            info: "心境+9",
            main: "聚元",
            mainNeed: 108,
            pu1: "清心",
            pu1Need: 36.0,
            pu2: "清心",
            pu2Need: 72.0,
            leadIn: 36
        },
        {
            ind: 99,
            name: "太乙降尘丹",
            level: 5,
            info: "丹毒-30",
            main: "净血",
            mainNeed: 108,
            pu1: "解毒",
            pu1Need: 36.0,
            pu2: "解毒",
            pu2Need: 72.0,
            leadIn: 36
        },
        {
            ind: 100,
            name: "大活络丹",
            level: 5,
            info: "结婴中回合结束时，若经脉低于50，立刻恢复自身5点经脉。（效果不可叠加）",
            main: "振气",
            mainNeed: 108,
            pu1: "凝婴",
            pu1Need: 180.0,
            pu2: "煅体",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 101,
            name: "大醒神丹",
            level: 5,
            info: "结婴中回合结束时，若意志低于50，立刻恢复自身5点意志。（效果不可叠加）",
            main: "振气",
            mainNeed: 108,
            pu1: "凝婴",
            pu1Need: 180.0,
            pu2: "定煞",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 102,
            name: "护脉丹",
            level: 5,
            info: "碎丹阶段，每回合开始时经脉恢复1",
            main: "御气",
            mainNeed: 108,
            pu1: "凝婴",
            pu1Need: 180.0,
            pu2: "煅体",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 103,
            name: "黄泉再生丹",
            level: 5,
            info: "当结婴因意志溃散而失败时，可以避免死亡，并永久提升自身意志。",
            main: "御气",
            mainNeed: 108,
            pu1: "凝婴",
            pu1Need: 180.0,
            pu2: "定煞",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 104,
            name: "天元神丹",
            level: 6,
            info: "修为+594000（境界不足化神期时服用，丹毒+30）",
            main: "生息",
            mainNeed: 81,
            pu1: "炼气",
            pu1Need: 2160.0,
            leadIn: 36
        },
        {
            ind: 105,
            name: "三阳锻魄丹",
            level: 6,
            info: "神识+12",
            main: "聚元",
            mainNeed: 180,
            pu1: "养魂",
            pu1Need: 1080.0,
            leadIn: 9
        },
        {
            ind: 106,
            name: "鎏鑫神丹",
            level: 6,
            info: "提升金之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "强金",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 107,
            name: "檀芒神丹",
            level: 6,
            info: "提升木之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "强木",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 108,
            name: "坎水神丹",
            level: 6,
            info: "提升水之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "强水",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 109,
            name: "离火神丹",
            level: 6,
            info: "提升火之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "强火",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 110,
            name: "尘磊神丹",
            level: 6,
            info: "提升土之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "强土",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 111,
            name: "浩剑神丹",
            level: 6,
            info: "提升剑之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "剑意",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 112,
            name: "炼魂神丹",
            level: 6,
            info: "提升神之道悟道经验1000点",
            main: "聚元",
            mainNeed: 1080,
            pu1: "凝神",
            pu1Need: 3240.0,
            pu2: "道蕴",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 113,
            name: "天道源丹",
            level: 6,
            info: "增加悟道点3点",
            main: "聚元",
            mainNeed: 2160,
            pu1: "开悟",
            pu1Need: 7560.0,
            leadIn: 1080
        },
        {
            ind: 114,
            name: "太上玄门丹",
            level: 6,
            info: "悟性+6",
            main: "聚元",
            mainNeed: 180,
            pu1: "开窍",
            pu1Need: 180.0,
            pu2: "开窍",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 115,
            name: "太乙炼髓丹",
            level: 6,
            info: "资质+12",
            main: "聚元",
            mainNeed: 180,
            pu1: "洗髓",
            pu1Need: 180.0,
            pu2: "洗髓",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 116,
            name: "天命血凝丹",
            level: 6,
            info: "生命值上限+40",
            main: "聚元",
            mainNeed: 180,
            pu1: "煅体",
            pu1Need: 180.0,
            pu2: "煅体",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 117,
            name: "太乙碧莹丹",
            level: 6,
            info: "遁速+12",
            main: "聚元",
            mainNeed: 252,
            pu1: "神行",
            pu1Need: 180.0,
            leadIn: 36
        },
        {
            ind: 118,
            name: "六阳长生丹",
            level: 6,
            info: "寿元+50",
            main: "聚元",
            mainNeed: 180,
            pu1: "益寿",
            pu1Need: 720.0,
            pu2: "益寿",
            pu2Need: 180.0,
            leadIn: 180
        },
        {
            ind: 119,
            name: "天命炼心丹",
            level: 6,
            info: "心境+11",
            main: "聚元",
            mainNeed: 252,
            pu1: "清心",
            pu1Need: 180.0,
            leadIn: 36
        },
        {
            ind: 120,
            name: "太素祛邪丹",
            level: 6,
            info: "丹毒-50",
            main: "净血",
            mainNeed: 180,
            pu1: "解毒",
            pu1Need: 252.0,
            leadIn: 36
        },
        {
            ind: 121,
            name: "锻脉丹",
            level: 5,
            info: "结婴血量+200",
            main: "生息",
            mainNeed: 180,
            pu1: "凝婴",
            pu1Need: 180.0,
            pu2: "煅体",
            pu2Need: 360.0,
            leadIn: 180
        },
        {
            ind: 122,
            name: "天命淬体丹",
            level: 6,
            info: "突破化神时，每次淬体效果+1（效果无法叠加）",
            main: "振气",
            mainNeed: 2160,
            pu1: "化神",
            pu1Need: 2160.0,
            pu2: "煅体",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 123,
            name: "澄心塑魂丹",
            level: 6,
            info: "突破化神时，每次塑魂效果+1（效果无法叠加）",
            main: "振气",
            mainNeed: 2160,
            pu1: "化神",
            pu1Need: 2160.0,
            pu2: "养魂",
            pu2Need: 1080.0,
            leadIn: 1080
        },
        {
            ind: 124,
            name: "混元仙体丹",
            level: 6,
            info: "突破化神时，若处于仙胎状态下，每回合【仙性】提升额外+1（效果无法叠加）",
            main: "振气",
            mainNeed: 2160,
            pu1: "化神",
            pu1Need: 2160.0,
            pu2: "开窍",
            pu2Need: 1080.0,
            leadIn: 1080
        },
    ];
    const material = [
        { ind: 0, name: "宁神花(一阶)", main: "无", pu: "凝神", lead: "性寒", power: 1 },
        { ind: 1, name: "天青花(一阶)", main: "活血", pu: "凝神", lead: "性热", power: 1 },
        { ind: 2, name: "银月花(一阶)", main: "活血", pu: "固元", lead: "性寒", power: 1 },
        { ind: 3, name: "流莹草(一阶)", main: "生息", pu: "培元", lead: "性热", power: 1 },
        { ind: 4, name: "凝血草(一阶)", main: "生息", pu: "混元", lead: "平", power: 1 },
        { ind: 5, name: "恒心草(一阶)", main: "聚元", pu: "养气", lead: "平", power: 1 },
        { ind: 6, name: "宁心草(一阶)", main: "振气", pu: "清心", lead: "性寒", power: 1 },
        { ind: 7, name: "二阶妖丹·金(二阶)", main: "聚元", pu: "强金", lead: "性热", power: 3 },
        { ind: 8, name: "二阶妖丹·木(二阶)", main: "聚元", pu: "强木", lead: "平", power: 3 },
        { ind: 9, name: "二阶妖丹·水(二阶)", main: "聚元", pu: "强水", lead: "性寒", power: 3 },
        { ind: 10, name: "二阶妖丹·火(二阶)", main: "聚元", pu: "强火", lead: "性热", power: 3 },
        { ind: 11, name: "二阶妖丹·土(二阶)", main: "聚元", pu: "强土", lead: "平", power: 3 },
        { ind: 12, name: "二阶妖丹·混元(二阶)", main: "聚元", pu: "炼气", lead: "平", power: 3 },
        { ind: 13, name: "二阶妖丹·神(二阶)", main: "聚元", pu: "养魂", lead: "平", power: 3 },
        { ind: 14, name: "七星草(二阶)", main: "无", pu: "清心", lead: "性热", power: 3 },
        { ind: 15, name: "罗犀草(二阶)", main: "活血", pu: "强金", lead: "平", power: 3 },
        { ind: 16, name: "龙葵(二阶)", main: "活血", pu: "解毒", lead: "性寒", power: 3 },
        { ind: 17, name: "轻灵草(二阶)", main: "活血", pu: "养气", lead: "性寒", power: 3 },
        { ind: 18, name: "何首乌(二阶)", main: "生息", pu: "固元", lead: "性热", power: 3 },
        { ind: 19, name: "风灵花(二阶)", main: "生息", pu: "强木", lead: "平", power: 3 },
        { ind: 20, name: "红绫草(二阶)", main: "生息", pu: "培元", lead: "平", power: 3 },
        { ind: 21, name: "天元果(二阶)", main: "聚元", pu: "炼气", lead: "性热", power: 3 },
        { ind: 22, name: "弗兰草(二阶)", main: "聚元", pu: "强水", lead: "性寒", power: 3 },
        { ind: 23, name: "夜交藤(二阶)", main: "聚元", pu: "凝神", lead: "性寒", power: 3 },
        { ind: 24, name: "火精枣(二阶)", main: "振气", pu: "强火", lead: "性热", power: 3 },
        { ind: 25, name: "夏枯草(二阶)", main: "振气", pu: "神行", lead: "性热", power: 3 },
        { ind: 26, name: "剑芦(二阶)", main: "振气", pu: "剑意", lead: "平", power: 3 },
        { ind: 27, name: "百草露(二阶)", main: "振气", pu: "调和", lead: "平", power: 3 },
        { ind: 28, name: "地黄参(二阶)", main: "御气", pu: "强土", lead: "性热", power: 3 },
        { ind: 29, name: "蛇涎果(二阶)", main: "御气", pu: "聚灵", lead: "性热", power: 3 },
        { ind: 30, name: "玄参(二阶)", main: "净血", pu: "混元", lead: "平", power: 3 },
        { ind: 31, name: "三阶妖丹·金(三阶)", main: "聚元", pu: "强金", lead: "性热", power: 9 },
        { ind: 32, name: "三阶妖丹·木(三阶)", main: "聚元", pu: "强木", lead: "平", power: 9 },
        { ind: 33, name: "三阶妖丹·水(三阶)", main: "聚元", pu: "强水", lead: "性寒", power: 9 },
        { ind: 34, name: "三阶妖丹·火(三阶)", main: "聚元", pu: "强火", lead: "性热", power: 9 },
        { ind: 35, name: "三阶妖丹·土(三阶)", main: "聚元", pu: "强土", lead: "平", power: 9 },
        { ind: 36, name: "三阶妖丹·混元(三阶)", main: "聚元", pu: "炼气", lead: "平", power: 9 },
        { ind: 37, name: "三阶妖丹·神(三阶)", main: "聚元", pu: "养魂", lead: "平", power: 9 },
        { ind: 38, name: "凌风花(三阶)", main: "无", pu: "神行", lead: "性热", power: 9 },
        { ind: 39, name: "紫猴花(三阶)", main: "无", pu: "解毒", lead: "性寒", power: 9 },
        { ind: 40, name: "剑心竹(三阶)", main: "活血", pu: "剑意", lead: "性热", power: 9 },
        { ind: 41, name: "伏龙参(三阶)", main: "活血", pu: "强金", lead: "平", power: 9 },
        { ind: 42, name: "龙纹草(三阶)", main: "活血", pu: "培元", lead: "性寒", power: 9 },
        { ind: 43, name: "伴妖草(三阶)", main: "活血", pu: "固元", lead: "性寒", power: 9 },
        { ind: 44, name: "穿心莲(三阶)", main: "活血", pu: "凝神", lead: "性寒", power: 9 },
        { ind: 45, name: "补天芝(三阶)", main: "生息", pu: "养气", lead: "性热", power: 9 },
        { ind: 46, name: "菩提花(三阶)", main: "生息", pu: "炼气", lead: "平", power: 9 },
        { ind: 47, name: "枫香脂(三阶)", main: "生息", pu: "强木", lead: "性寒", power: 9 },
        { ind: 48, name: "天灵果(三阶)", main: "聚元", pu: "定煞", lead: "性热", power: 9 },
        { ind: 49, name: "龙鳞果(三阶)", main: "聚元", pu: "煅体", lead: "平", power: 9 },
        { ind: 50, name: "雪凝花(三阶)", main: "聚元", pu: "强水", lead: "性寒", power: 9 },
        { ind: 51, name: "乌椆木(三阶)", main: "聚元", pu: "凝液", lead: "性寒", power: 9 },
        { ind: 52, name: "灯心草(三阶)", main: "振气", pu: "强火", lead: "性热", power: 9 },
        { ind: 53, name: "五柳根(三阶)", main: "振气", pu: "聚灵", lead: "平", power: 9 },
        { ind: 54, name: "玄冰花(三阶)", main: "振气", pu: "清心", lead: "性寒", power: 9 },
        { ind: 55, name: "冰灵果(三阶)", main: "振气", pu: "开窍", lead: "性寒", power: 9 },
        { ind: 56, name: "幻心草(三阶)", main: "御气", pu: "调和", lead: "性热", power: 9 },
        { ind: 57, name: "石龙芮(三阶)", main: "御气", pu: "强土", lead: "性寒", power: 9 },
        { ind: 58, name: "九叶芝(三阶)", main: "御气", pu: "洗髓", lead: "性寒", power: 9 },
        { ind: 59, name: "锦地罗(三阶)", main: "净血", pu: "混元", lead: "性热", power: 9 },
        { ind: 60, name: "玉龙参(三阶)", main: "净血", pu: "益寿", lead: "性寒", power: 9 },
        { ind: 61, name: "炼魂珠(三阶)", main: "炼魔", pu: "养魂", lead: "性寒", power: 9 },
        { ind: 62, name: "炼血珠(三阶)", main: "炼魔", pu: "炼气", lead: "性寒", power: 9 },
        { ind: 63, name: "鬼臼草(三阶)", main: "生息", pu: "养魂", lead: "平", power: 9 },
        { ind: 64, name: "四阶妖丹·金(四阶)", main: "聚元", pu: "强金", lead: "性热", power: 36 },
        { ind: 65, name: "四阶妖丹·木(四阶)", main: "聚元", pu: "强木", lead: "平", power: 36 },
        { ind: 66, name: "四阶妖丹·水(四阶)", main: "聚元", pu: "强水", lead: "性寒", power: 36 },
        { ind: 67, name: "四阶妖丹·火(四阶)", main: "聚元", pu: "强火", lead: "性热", power: 36 },
        { ind: 68, name: "四阶妖丹·土(四阶)", main: "聚元", pu: "强土", lead: "平", power: 36 },
        { ind: 69, name: "四阶妖丹·混元(四阶)", main: "聚元", pu: "炼气", lead: "平", power: 36 },
        { ind: 70, name: "四阶妖丹·神(四阶)", main: "聚元", pu: "养魂", lead: "平", power: 36 },
        { ind: 71, name: "白沉脂(四阶)", main: "无", pu: "益寿", lead: "性寒", power: 36 },
        { ind: 72, name: "混元果(四阶)", main: "无", pu: "混元", lead: "平", power: 36 },
        { ind: 73, name: "凤血果(四阶)", main: "净血", pu: "解毒", lead: "性热", power: 36 },
        { ind: 74, name: "玉髓芝(四阶)", main: "净血", pu: "凝液", lead: "平", power: 36 },
        { ind: 75, name: "血菩提(四阶)", main: "活血", pu: "洗髓", lead: "性热", power: 36 },
        { ind: 76, name: "血莲精(四阶)", main: "活血", pu: "固元", lead: "平", power: 36 },
        { ind: 77, name: "天剑笋(四阶)", main: "活血", pu: "强金", lead: "性寒", power: 36 },
        { ind: 78, name: "苦蔓藤(四阶)", main: "生息", pu: "强木", lead: "性热", power: 36 },
        { ind: 79, name: "鸡冠草(四阶)", main: "生息", pu: "培元", lead: "性寒", power: 36 },
        { ind: 80, name: "狼桃(四阶)", main: "生息", pu: "煅体", lead: "性寒", power: 36 },
        { ind: 81, name: "银精芝(四阶)", main: "聚元", pu: "炼气", lead: "性热", power: 36 },
        { ind: 82, name: "阴凝草(四阶)", main: "聚元", pu: "开窍", lead: "性寒", power: 36 },
        { ind: 83, name: "冰精芝(四阶)", main: "聚元", pu: "强水", lead: "性寒", power: 36 },
        { ind: 84, name: "火灵芝(四阶)", main: "振气", pu: "强火", lead: "性热", power: 36 },
        { ind: 85, name: "鬼面花(四阶)", main: "振气", pu: "养魂", lead: "平", power: 36 },
        { ind: 86, name: "绝魂草(四阶)", main: "振气", pu: "清心", lead: "性寒", power: 36 },
        { ind: 87, name: "黑天麻(四阶)", main: "御气", pu: "神行", lead: "性热", power: 36 },
        { ind: 88, name: "地龙干(四阶)", main: "御气", pu: "强土", lead: "性热", power: 36 },
        { ind: 89, name: "万魂晶(四阶)", main: "炼魔", pu: "养魂", lead: "性寒", power: 36 },
        { ind: 90, name: "冥胎骨(四阶)", main: "炼魔", pu: "炼气", lead: "性寒", power: 36 },
        { ind: 91, name: "月灵花(四阶)", main: "无", pu: "凝液", lead: "平", power: 36 },
        { ind: 92, name: "血玉竹(四阶)", main: "无", pu: "聚灵", lead: "性寒", power: 36 },
        { ind: 93, name: "诱妖草(四阶)", main: "诱妖", pu: "无", lead: "性寒", power: 36 },
        { ind: 94, name: "霸王花(四阶)", main: "驱妖", pu: "无", lead: "性热", power: 36 },
        { ind: 95, name: "太清玄灵草(四阶)", main: "无", pu: "洗髓", lead: "平", power: 36 },
        { ind: 96, name: "五阶妖丹·金(五阶)", main: "聚元", pu: "强金", lead: "性热", power: 180 },
        { ind: 97, name: "五阶妖丹·木(五阶)", main: "聚元", pu: "强木", lead: "平", power: 180 },
        { ind: 98, name: "五阶妖丹·水(五阶)", main: "聚元", pu: "强水", lead: "性寒", power: 180 },
        { ind: 99, name: "五阶妖丹·火(五阶)", main: "聚元", pu: "强火", lead: "性热", power: 180 },
        { ind: 100, name: "五阶妖丹·土(五阶)", main: "聚元", pu: "强土", lead: "平", power: 180 },
        { ind: 101, name: "五阶妖丹·混元(五阶)", main: "聚元", pu: "炼气", lead: "平", power: 180 },
        { ind: 102, name: "五阶妖丹·神(五阶)", main: "聚元", pu: "养魂", lead: "平", power: 180 },
        { ind: 103, name: "地心火芝(五阶)", main: "聚元", pu: "炼气", lead: "性热", power: 180 },
        { ind: 104, name: "天蝉灵叶(五阶)", main: "振气", pu: "混元", lead: "平", power: 180 },
        { ind: 105, name: "雪玉骨参(五阶)", main: "御气", pu: "益寿", lead: "性寒", power: 180 },
        { ind: 106, name: "腐骨灵花(五阶)", main: "炼魔", pu: "养魂", lead: "性热", power: 180 },
        { ind: 107, name: "三叶青芝(五阶)", main: "生息", pu: "定煞", lead: "平", power: 180 },
        { ind: 108, name: "七彩月兰(五阶)", main: "振气", pu: "清心", lead: "性寒", power: 180 },
        { ind: 109, name: "三尾风叶(五阶)", main: "无", pu: "凝婴", lead: "性热", power: 180 },
        { ind: 110, name: "冰灵焰草(五阶)", main: "生息", pu: "道蕴", lead: "平", power: 180 },
        { ind: 111, name: "厉魂血珀(五阶)", main: "炼魔", pu: "养魂", lead: "性寒", power: 180 },
        { ind: 112, name: "渊血冥花(五阶)", main: "炼魔", pu: "炼气", lead: "性寒", power: 180 },
        { ind: 113, name: "龙皇果(五阶)", main: "生息", pu: "开悟", lead: "性热", power: 180 },
        { ind: 114, name: "鐾金灵花(五阶)", main: "聚元", pu: "强金", lead: "平", power: 180 },
        { ind: 115, name: "森檀木(五阶)", main: "聚元", pu: "强木", lead: "平", power: 180 },
        { ind: 116, name: "浩淼水藤(五阶)", main: "聚元", pu: "强水", lead: "性寒", power: 180 },
        { ind: 117, name: "芒焰果(五阶)", main: "聚元", pu: "强火", lead: "性热", power: 180 },
        { ind: 118, name: "无垠灵参(五阶)", main: "聚元", pu: "强土", lead: "平", power: 180 },
        { ind: 119, name: "剑魄灵叶(五阶)", main: "无", pu: "剑意", lead: "性寒", power: 180 },
        { ind: 120, name: "炼心芝(五阶)", main: "无", pu: "凝神", lead: "性热", power: 180 },
        { ind: 121, name: "道蕴花(五阶)", main: "无", pu: "道蕴", lead: "平", power: 180 },
        { ind: 122, name: "问道花(五阶)", main: "无", pu: "开悟", lead: "平", power: 180 },
        { ind: 123, name: "太玄问心果(五阶)", main: "无", pu: "开窍", lead: "性寒", power: 180 },
        { ind: 124, name: "炼髓藤(五阶)", main: "聚元", pu: "洗髓", lead: "平", power: 180 },
        { ind: 125, name: "重元换血草(五阶)", main: "聚元", pu: "煅体", lead: "平", power: 180 },
        { ind: 126, name: "太乙碧莹花(五阶)", main: "聚元", pu: "神行", lead: "性寒", power: 180 },
        { ind: 127, name: "阴阳黄泉花(五阶)", main: "无", pu: "益寿", lead: "性热", power: 180 },
        { ind: 128, name: "天问花(五阶)", main: "无", pu: "清心", lead: "平", power: 180 },
        { ind: 129, name: "太素清灵芝(五阶)", main: "净血", pu: "调和", lead: "平", power: 180 },
        { ind: 130, name: "六阶妖丹·金(六阶)", main: "聚元", pu: "强金", lead: "性热", power: 1080 },
        { ind: 131, name: "六阶妖丹·木(六阶)", main: "聚元", pu: "强木", lead: "平", power: 1080 },
        { ind: 132, name: "六阶妖丹·水(六阶)", main: "聚元", pu: "强水", lead: "性寒", power: 1080 },
        { ind: 133, name: "六阶妖丹·火(六阶)", main: "聚元", pu: "强火", lead: "性热", power: 1080 },
        { ind: 134, name: "六阶妖丹·土(六阶)", main: "聚元", pu: "强土", lead: "平", power: 1080 },
        { ind: 135, name: "六阶妖丹·混元(六阶)", main: "聚元", pu: "炼气", lead: "平", power: 1080 },
        { ind: 136, name: "六阶妖丹·神(六阶)", main: "聚元", pu: "养魂", lead: "平", power: 1080 },
        { ind: 137, name: "地心淬灵乳(六阶)", main: "振气", pu: "炼气", lead: "性热", power: 1080 },
        { ind: 138, name: "天麻翡石精(六阶)", main: "御气", pu: "益寿", lead: "性寒", power: 1080 },
        { ind: 139, name: "八角玄冰草(六阶)", main: "聚元", pu: "凝婴", lead: "性寒", power: 1080 },
        { ind: 140, name: "奇茸通天菊(六阶)", main: "御气", pu: "养魂", lead: "平", power: 1080 },
        { ind: 141, name: "木灵三针花(六阶)", main: "生息", pu: "避劫", lead: "性寒", power: 1080 },
        { ind: 142, name: "鎏鑫天晶草(六阶)", main: "聚元", pu: "强金", lead: "平", power: 1080 },
        { ind: 143, name: "檀芒九叶花(六阶)", main: "聚元", pu: "强木", lead: "平", power: 1080 },
        { ind: 144, name: "坎水玄冰果(六阶)", main: "聚元", pu: "强水", lead: "性寒", power: 1080 },
        { ind: 145, name: "离火梧桐芝(六阶)", main: "聚元", pu: "强火", lead: "性热", power: 1080 },
        { ind: 146, name: "尘磊岩麟果(六阶)", main: "聚元", pu: "强土", lead: "平", power: 1080 },
        { ind: 147, name: "剑魄竹笋(六阶)", main: "无", pu: "剑意", lead: "性热", power: 1080 },
        { ind: 148, name: "明心问道果(六阶)", main: "生息", pu: "凝神", lead: "性寒", power: 1080 },
        { ind: 149, name: "道蕴果(六阶)", main: "无", pu: "道蕴", lead: "平", power: 1080 },
        { ind: 150, name: "天道果(六阶)", main: "无", pu: "开悟", lead: "平", power: 1080 },
        { ind: 151, name: "丹灵果(六阶)", main: "无", pu: "化神", lead: "性热", power: 1080 },
    ];
    const formulaMap = new Map();
    const mainMaterMap = new Map();
    const puMap = new Map();
    const leadMap = new Map();
    formulaList.forEach(item => {
        if (formulaMap.has(item.level)) {
            formulaMap.get(item.level)?.push(item);
        }
        else {
            formulaMap.set(item.level, [item]);
        }
    });
    material.forEach(item => {
        if (mainMaterMap.has(item.main)) {
            mainMaterMap.get(item.main)?.push(item);
        }
        else {
            mainMaterMap.set(item.main, [item]);
        }
    });
    material.forEach(item => {
        if (puMap.has(item.pu)) {
            puMap.get(item.pu)?.push(item);
        }
        else {
            puMap.set(item.pu, [item]);
        }
    });
    material.forEach(item => {
        if (leadMap.has(item.lead)) {
            leadMap.get(item.lead)?.push(item);
        }
        else {
            leadMap.set(item.lead, [item]);
        }
    });
    let formulaOpt = "";
    formulaMap.forEach((formulaArr, level) => {
        formulaOpt += `<optgroup label="${level}阶">`;
        formulaArr.forEach(item => {
            formulaOpt += `<option value="${item.ind}">${item.name}</option>`;
        });
        formulaOpt += '</optgroup>';
    });
    let formula = formulaList[0];
    const formulaData = document.getElementById("formulaData");
    const formulaInfo = document.getElementById("formulaInfo");
    const mainMater = document.getElementById("mainMater");
    const mainTit = document.getElementById("mainTit");
    const mainP = document.getElementById("mainP");
    const pu1Div = document.getElementById("pu1Div");
    const pu1Mater = document.getElementById("pu1Mater");
    const pu1Tit = document.getElementById("pu1Tit");
    const pu1p = document.getElementById("pu1p");
    const pu2Div = document.getElementById("pu2Div");
    const pu2Mater = document.getElementById("pu2Mater");
    const pu2Tit = document.getElementById("pu2Tit");
    const pu2p = document.getElementById("pu2p");
    const leadMater = document.getElementById("leadMater");
    const leadTit = document.getElementById("leadTit");
    const leadP1 = document.getElementById("leadP1");
    const leadP2 = document.getElementById("leadP2");
    const leadBtn = document.getElementById("leadBtn");
    formulaData.innerHTML = formulaOpt;
    formulaData.onchange = () => {
        formula = formulaList[parseInt(formulaData.value)];
        let formulaText = `名称：${formula.name}(${formula.level}阶)
<br>效果: ${formula.info}
<br>主药: ${formula.main} ${formula.mainNeed}`;
        if (formula.pu1 !== undefined)
            formulaText += `<br>辅药1: ${formula.pu1} ${formula.pu1Need}`;
        if (formula.pu2 !== undefined)
            formulaText += `<br>辅药2: ${formula.pu2} ${formula.pu2Need}`;
        formulaText += `<br>药引需求: ${formula.leadIn}`;
        formulaInfo.innerHTML = formulaText;
        mainMater.value = "";
        mainP.innerText = "";
        pu1Mater.value = "";
        pu1p.innerText = "";
        pu2Mater.value = "";
        pu2p.innerText = "";
        leadP1.innerText = "";
        leadP2.innerText = "";
        let mainMaterOpt = "";
        mainTit.innerText = `主药(${formula.main} ${formula.mainNeed})`;
        mainMaterMap.get(formula.main)?.forEach(item => {
            mainMaterOpt += `<option value="${item.ind}">${item.name}</option>`;
        });
        mainMater.innerHTML = mainMaterOpt;
        let pu1MaterOpt = "";
        if (formula.pu1 === undefined) {
            pu1Div.style.display = 'none';
        }
        else {
            pu1Div.style.display = 'block';
            pu1Tit.innerText = `辅药(${formula.pu1} ${formula.pu1Need})`;
            puMap.get(formula.pu1)?.forEach(item => {
                pu1MaterOpt += `<option value="${item.ind}">${item.name}</option>`;
            });
            pu1Mater.innerHTML = pu1MaterOpt;
        }
        let pu2MaterOpt = "";
        if (formula.pu2 === undefined) {
            pu2Div.style.display = 'none';
        }
        else {
            pu2Div.style.display = 'block';
            pu2Tit.innerText = `辅药(${formula.pu2} ${formula.pu2Need})`;
            puMap.get(formula.pu2)?.forEach(item => {
                pu2MaterOpt += `<option value="${item.ind}">${item.name}</option>`;
            });
            pu2Mater.innerHTML = pu2MaterOpt;
        }
        leadTit.innerText = `药引 需求${formula.leadIn}`;
    };
    mainMater.onchange = () => {
        const item = material[parseInt(mainMater.value)];
        const needNum = Math.ceil(formula.mainNeed / item.power);
        mainP.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`;
    };
    pu1Mater.onchange = () => {
        if (formula.pu1Need === undefined)
            return;
        const item = material[parseInt(pu1Mater.value)];
        const needNum = Math.ceil(formula.pu1Need / item.power);
        pu1p.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`;
    };
    pu2Mater.onchange = () => {
        if (formula.pu2Need === undefined)
            return;
        const item = material[parseInt(pu2Mater.value)];
        const needNum = Math.ceil(formula.pu2Need / item.power);
        pu2p.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`;
    };
    const tranLeadToNumber = (lead) => {
        if (lead === "性寒")
            return -1;
        else if (lead === "性热")
            return 1;
        else
            return 0;
    };
    leadBtn.onclick = () => {
        let isFire = 0;
        if (mainMater.value !== "")
            isFire += tranLeadToNumber(material[parseInt(mainMater.value)].lead);
        if (formula.pu1 !== undefined && pu1Mater.value !== "")
            isFire += tranLeadToNumber(material[parseInt(pu1Mater.value)].lead);
        if (formula.pu2 !== undefined && pu2Mater.value !== "")
            isFire += tranLeadToNumber(material[parseInt(pu2Mater.value)].lead);
        let leadMaterOpt = "";
        if (isFire > 0) {
            leadP1.innerText = "性寒";
            leadMap.get("性寒")?.forEach(item => {
                leadMaterOpt += `<option value="${item.ind}">${item.name}</option>`;
            });
        }
        else if (isFire < 0) {
            leadP1.innerText = "性热";
            leadMap.get("性热")?.forEach(item => {
                leadMaterOpt += `<option value="${item.ind}">${item.name}</option>`;
            });
        }
        else {
            leadP1.innerText = "平";
            leadMap.get("平")?.forEach(item => {
                leadMaterOpt += `<option value="${item.ind}">${item.name}</option>`;
            });
        }
        leadMater.innerHTML = leadMaterOpt;
    };
    leadMater.onchange = () => {
        const item = material[parseInt(leadMater.value)];
        const needNum = Math.ceil(formula.leadIn / item.power);
        leadP2.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`;
    };
})();
