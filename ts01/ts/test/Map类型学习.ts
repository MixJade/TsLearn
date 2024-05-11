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
    console.log("当前Map大小", map.size) //输出: 1
})()
