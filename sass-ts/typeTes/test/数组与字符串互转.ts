(() => {
    // 代码背景：有一个值，可能是字符串数组，也可能是字符串，甚至是逗号分割的字符串
    /**
     * 将str(逗号分割)转化为List
     * 将List转化为逗号分割的str
     * @param strOrListVar
     */
    const checkStrOrList = (strOrListVar: string | string[]) => {
        // 先使用typeof判断数据类型
        console.log("传值类型为：", typeof strOrListVar, "传值为:", strOrListVar);
        if (typeof strOrListVar === 'string') {
            // 使用split转为列表(哪怕其中没有逗号,也会转为列表)
            if (strOrListVar.includes(",")) console.log("没有逗号")
            console.log("str转数组:", strOrListVar.split(','))
        } else if (typeof strOrListVar === 'object') {
            // 直接转为逗号分割列表
            console.log("数组转str:", strOrListVar.toString())
        }
    }
    // 开始测试
    checkStrOrList(['1', '4', '5'])
    checkStrOrList("1")
    checkStrOrList("1,9,9,2")
})()