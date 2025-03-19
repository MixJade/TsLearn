(() => {
    /**
     * 学习Js的Map函数
     */
    interface Book {
        name: string;
        price: number;
    }

    // 1.初始化map
    let map: Map<string, Book> = new Map();
    // 2.添加元素
    map.set('key1', {name: "唐妞不等式", price: 200});
    map.set('key2', {name: "睁眼看世界", price: 388888});
    // 3.获取元素
    console.log("获取key1的值：", map.get('key1'));  // 输出: "value1"
    console.log("获取key2的值：", map.get('key2'));  // 输出: "value2"
    // 4.删除元素
    map.delete('key1');
    // 5.检查元素
    console.log("被删的key1是否存在:", map.has('key1')); // 输出: false
    console.log("key2是否存在:", map.has('key2')); // 输出: true
    // 6.获取Map的大小
    console.log("当前Map大小", map.size); //输出: 1

    // (拓展)7.向map的数组中插入数据
    interface Book2 extends Book {
        owner: string;
    }

    let map2: Map<string, Book[]> = new Map();
    const book2s: Book2[] = [
        {name: "悲惨世界", price: 100, owner: "张三"},
        {name: "射雕英雄传", price: 50, owner: "李四"},
        {name: "富婆通讯录", price: 9, owner: "王五"},
        {name: "如何傍富婆", price: 80, owner: "王五"},
        {name: "连城诀", price: 20, owner: "李四"},
        {name: "百年孤独", price: 100, owner: "张三"},
        {name: "三国演义", price: 100, owner: "赵六"},
    ];
    console.log("当前列表：", book2s)
    book2s.forEach(item => {
        const book1: Book = {name: item.name, price: item.price}
        if (map2.has(item.owner)) {
            // 注意get后面的问号，表示如果获取值为undefined则不进行push
            map2.get(item.owner)?.push(book1);
        } else {
            // 将book1转为列表
            map2.set(item.owner, [book1]);
        }
    })
    console.log("转化后的map:", map2);
})()
