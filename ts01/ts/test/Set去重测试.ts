(() => {
    // 代码背景：需要校验两个列表的角色号只有一种，用set比较合适
    // 第一个列表(已经选择的角色)
    const list01: string[] = ["1", "1", "1"]
    // 第二个列表(需要添加的角色)
    const list02: string[] = ["1", "2", "1"]
    // 不可重复列表
    const set01: Set<string> = new Set()
    list01.forEach(i => {
        set01.add(i)
    })
    list02.forEach(i => {
        set01.add(i)
    })
    console.log("最终有这几种角色:", set01)
    console.log("最终角色是否不唯一:", set01.size !== 1)
})()
