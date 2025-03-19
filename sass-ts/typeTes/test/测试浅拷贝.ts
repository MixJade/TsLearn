(() => {
    /**
     * 测试浅拷贝
     *<p>直接用等于号赋值会导致数组引用,即新数组的变动会影响旧数组</p>
     */
    interface tesArr {
        name: string;
        group: number[]
    }

    // 一、反例，在对象中的数组直接用等号赋值
    console.log("一、反例，在对象中的数组直接用等号赋值")
    const oriArr1: tesArr = {
        name: "原初数组1",
        group: [1, 2, 3, 4, 5]
    };
    console.log("原数组：", oriArr1.group);
    const tagArr1: number[] = oriArr1.group;
    tagArr1.push(6)
    console.log("(新数组修改后,原数组也被改了)")
    console.log("新数组：", tagArr1);
    console.log("原数组：", oriArr1.group);

    // 二、反例，数组直接用等号赋值
    console.log("\n二、反例，数组直接用等号赋值")
    const oriArr2: number[] = [1, 2, 3, 4, 5];
    console.log("原数组：", oriArr2);
    const tagArr2: number[] = oriArr2;
    tagArr2.push(6)
    console.log("(新数组修改后,原数组也被改了)")
    console.log("新数组：", tagArr2);
    console.log("原数组：", oriArr2);

    // 三、正例，使用扩展运算符给数组赋值
    console.log("\n三、正例，使用扩展运算符给数组赋值")
    const oriArr3: tesArr = {
        name: "原初数组3",
        group: [1, 2, 3, 4, 5]
    };
    console.log("原数组：", oriArr3.group);
    // 注意：使用拓展运算符赋值
    const tagArr3: number[] = [...oriArr3.group];
    tagArr3.push(6)
    console.log("(新数组修改后,原数组不会改变)")
    console.log("新数组：", tagArr3);
    console.log("原数组：", oriArr3.group);
})()
