(() => {
    /**
     * 测试使用findIndex查找、splice删除
     * <p>删除列表中的某个元素</p>
     * <p>以及splice、find的补充用法</p>
     */
    interface Human3 {
        id: number;
        name: string;
    }

    // 待删除列表
    const human1: Human3[] = [
        {id: 5, name: "王五"},
        {id: 6, name: "赵六"},
        {id: 7, name: "阿七"},
        {id: 6, name: "乱入老六"},
    ]
    console.log("待删除列表：", human1)

    // 使用findIndex查找，得到匹配的第一个值的索引
    const humanIndex = human1.findIndex(item => item.id === 6);
    console.log("findIndex查找结果：", humanIndex)
    // 使用splice(index, 1)从从索引index开始，移除1个元素
    human1.splice(humanIndex, 1)
    console.log("splice删除后列表:", human1)

    // 补充1：如果只是单纯的查找,可以用find,也是返回匹配的第一个元素
    const human2 = human1.find(item => item.id === 6);
    console.log("find查找结果：", human2)
    // 补充2：splice添加元素
    const human3: Human3 = {id: 6, name: "新的老六"}
    human1.splice(2, 0, human3) // 在索引2的位置删除0个元素，添加元素3
    console.log("splice添加后列表:", human1)
})()
