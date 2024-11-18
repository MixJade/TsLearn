/**
 * 前排提示：这里的丹方数据与药材数据可去python文件夹中用脚本读取
 */
(() => {
    // 丹方对象
    interface Formula {
        ind: number;
        name: string;
        level: number;
        info: string;
        main: string;
        mainNeed: number;
        pu1?: string;
        pu1Need?: number;
        pu2?: string;
        pu2Need?: number;
        leadIn: number;
    }

    // 药材对象
    interface Material {
        ind: number;
        name: string;
        main: string;
        pu: string;
        lead: string; // 药性寒热
        power: number;
    }

    const formulaList: Formula[] = [
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
    ];

    const material: Material[] = [
        {ind: 0, name: "宁神花(一阶)", main: "无", pu: "凝神", lead: "性寒", power: 1},
        {ind: 1, name: "天青花(一阶)", main: "活血", pu: "凝神", lead: "性热", power: 1},
        {ind: 3, name: "凝血草(一阶)", main: "生息", pu: "混元", lead: "平", power: 1},
    ];

    const formulaMap: Map<number, Formula[]> = new Map<number, Formula[]>();
    const mainMaterMap: Map<string, Material[]> = new Map();
    const puMap: Map<string, Material[]> = new Map();
    const leadMap: Map<string, Material[]> = new Map();

    formulaList.forEach(item => {
        if (formulaMap.has(item.level)) {
            // 注意get后面的问号，表示如果获取值为undefined则不进行push
            formulaMap.get(item.level)?.push(item);
        } else {
            // 将book1转为列表
            formulaMap.set(item.level, [item]);
        }
    })

    material.forEach(item => {
        if (mainMaterMap.has(item.main)) {
            // 注意get后面的问号，表示如果获取值为undefined则不进行push
            mainMaterMap.get(item.main)?.push(item);
        } else {
            // 将book1转为列表
            mainMaterMap.set(item.main, [item]);
        }
    })

    material.forEach(item => {
        if (puMap.has(item.pu)) {
            // 注意get后面的问号，表示如果获取值为undefined则不进行push
            puMap.get(item.pu)?.push(item);
        } else {
            // 将book1转为列表
            puMap.set(item.pu, [item]);
        }
    })

    material.forEach(item => {
        if (leadMap.has(item.lead)) {
            // 注意get后面的问号，表示如果获取值为undefined则不进行push
            leadMap.get(item.lead)?.push(item);
        } else {
            // 将book1转为列表
            leadMap.set(item.lead, [item]);
        }
    })

    let formulaOpt = ""
    formulaMap.forEach((formulaArr, level) => {
        formulaOpt += `<optgroup label="${level}阶">`
        formulaArr.forEach(item => {
            formulaOpt += `<option value="${item.ind}">${item.name}</option>`
        })
        formulaOpt += '</optgroup>'
    })

    // 全局变量：丹方
    let formula = formulaList[0]

    // 选择丹方
    const formulaData = document.getElementById("formulaData") as HTMLInputElement;
    const formulaInfo = document.getElementById("formulaInfo") as HTMLElement

    // 主药的HTML对象
    const mainMater = document.getElementById("mainMater") as HTMLInputElement;
    const mainTit = document.getElementById("mainTit") as HTMLElement
    const mainP = document.getElementById("mainP") as HTMLElement

    // 辅药1的HTML对象
    const pu1Div = document.getElementById("pu1Div") as HTMLElement
    const pu1Mater = document.getElementById("pu1Mater") as HTMLInputElement;
    const pu1Tit = document.getElementById("pu1Tit") as HTMLElement
    const pu1p = document.getElementById("pu1p") as HTMLElement

    // 辅药2的HTML对象
    const pu2Div = document.getElementById("pu2Div") as HTMLElement
    const pu2Mater = document.getElementById("pu2Mater") as HTMLInputElement;
    const pu2Tit = document.getElementById("pu2Tit") as HTMLElement
    const pu2p = document.getElementById("pu2p") as HTMLElement

    // 药引的HTML对象
    const leadMater = document.getElementById("leadMater") as HTMLInputElement;
    const leadTit = document.getElementById("leadTit") as HTMLElement
    const leadP1 = document.getElementById("leadP1") as HTMLElement
    const leadP2 = document.getElementById("leadP2") as HTMLElement
    const leadBtn = document.getElementById("leadBtn") as HTMLButtonElement

    // 丹方的下拉框选中事件
    formulaData.innerHTML = formulaOpt;
    formulaData.onchange = () => {
        formula = formulaList[parseInt(formulaData.value)];
        let formulaText = `名称：${formula.name}(${formula.level}阶)
<br>效果: ${formula.info}
<br>主药: ${formula.main} ${formula.mainNeed}`
        if (formula.pu1 !== undefined)
            formulaText += `<br>辅药1: ${formula.pu1} ${formula.pu1Need}`
        if (formula.pu2 !== undefined)
            formulaText += `<br>辅药2: ${formula.pu2} ${formula.pu2Need}`
        formulaText += `<br>药引需求: ${formula.leadIn}`
        formulaInfo.innerHTML = formulaText

        // 重置所有的计算对象
        mainMater.value = ""
        mainP.innerText = ""
        pu1Mater.value = ""
        pu1p.innerText = ""
        pu2Mater.value = ""
        pu2p.innerText = ""
        leadP1.innerText = ""
        leadP2.innerText = ""

        // 重设主药待选项
        let mainMaterOpt = ""
        mainTit.innerText = `主药(${formula.main} ${formula.mainNeed})`
        mainMaterMap.get(formula.main)?.forEach(item => {
            mainMaterOpt += `<option value="${item.ind}">${item.name}</option>`
        })
        mainMater.innerHTML = mainMaterOpt;

        // 重设辅药1待选项
        let pu1MaterOpt = ""
        if (formula.pu1 === undefined) {
            pu1Div.style.display = 'none'
        } else {
            pu1Div.style.display = 'block'
            pu1Tit.innerText = `辅药(${formula.pu1} ${formula.pu1Need})`
            puMap.get(formula.pu1)?.forEach(item => {
                pu1MaterOpt += `<option value="${item.ind}">${item.name}</option>`
            })
            pu1Mater.innerHTML = pu1MaterOpt;
        }

        // 重设辅药2待选项
        let pu2MaterOpt = ""
        if (formula.pu2 === undefined) {
            pu2Div.style.display = 'none'
        } else {
            pu2Div.style.display = 'block'
            pu2Tit.innerText = `辅药(${formula.pu2} ${formula.pu2Need})`
            puMap.get(formula.pu2)?.forEach(item => {
                pu2MaterOpt += `<option value="${item.ind}">${item.name}</option>`
            })
            pu2Mater.innerHTML = pu2MaterOpt;
        }

        // 重设药引提示
        leadTit.innerText = `药引 需求${formula.leadIn}`
    }

    // 主药的下拉框选中事件
    mainMater.onchange = () => {
        const item = material[parseInt(mainMater.value)];
        const needNum = Math.ceil(formula.mainNeed / item.power)
        mainP.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`
    }

    // 辅药1的下拉框选中事件
    pu1Mater.onchange = () => {
        if (formula.pu1Need === undefined) return;
        const item = material[parseInt(pu1Mater.value)];
        const needNum = Math.ceil(formula.pu1Need / item.power)
        pu1p.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`
    }

    // 辅药2的下拉框选中事件
    pu2Mater.onchange = () => {
        if (formula.pu2Need === undefined) return;
        const item = material[parseInt(pu2Mater.value)];
        const needNum = Math.ceil(formula.pu2Need / item.power)
        pu2p.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`
    }

    // 将药材寒热转换成数字
    const tranLeadToNumber = (lead: string): number => {
        if (lead === "性寒") return -1;
        else if (lead === "性热") return 1;
        else return 0;
    }

    // 药引按钮的点击事件(计算寒热)
    leadBtn.onclick = () => {
        let isFire = 0;
        // 主药
        if (mainMater.value !== "")
            isFire += tranLeadToNumber(material[parseInt(mainMater.value)].lead);
        // 辅药1
        if (formula.pu1 !== undefined && pu1Mater.value !== "")
            isFire += tranLeadToNumber(material[parseInt(pu1Mater.value)].lead);
        // 辅药2
        if (formula.pu2 !== undefined && pu2Mater.value !== "")
            isFire += tranLeadToNumber(material[parseInt(pu2Mater.value)].lead);
        // 最后计算,为药引下拉框赋值
        let leadMaterOpt = ""
        if (isFire > 0) {
            leadP1.innerText = "性寒"
            leadMap.get("性寒")?.forEach(item => {
                leadMaterOpt += `<option value="${item.ind}">${item.name}</option>`
            })
        } else if (isFire < 0) {
            leadP1.innerText = "性热"
            leadMap.get("性热")?.forEach(item => {
                leadMaterOpt += `<option value="${item.ind}">${item.name}</option>`
            })
        } else {
            leadP1.innerText = "平"
            leadMap.get("平")?.forEach(item => {
                leadMaterOpt += `<option value="${item.ind}">${item.name}</option>`
            })
        }
        leadMater.innerHTML = leadMaterOpt;
    }

    // 药引的下拉框选中事件
    leadMater.onchange = () => {
        const item = material[parseInt(leadMater.value)];
        const needNum = Math.ceil(formula.leadIn / item.power)
        leadP2.innerText = `(药力:${item.power} 寒热:${item.lead}) 需 ${needNum} 个`
    }
})();