(() => {
    /**
     * 测试使用map函数提取列表
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
    console.log("原列表：", human1)

    // 使用map函数进行映射
    const justName = human1.map(item => item.name);
    console.log("提取的新列表：", justName)
})()
