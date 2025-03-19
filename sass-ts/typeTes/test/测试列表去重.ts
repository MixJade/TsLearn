/**
 * 测试使用filter过滤、some筛选
 * <p>对列表中的元素进行去重</p>
 */
interface Human {
    name: string;
    age: number;
    money: number;
}

// 列表1
const human1: Human[] = [
    {name: "张三", age: 23, money: 100},
    {name: "李四", age: 14, money: 200},
    {name: "王五", age: 35, money: 1500},
    {name: "赵六", age: 16, money: 500},
    {name: "阿七", age: 27, money: 700},
]
// 列表2
const human2: Human[] = [
    {name: "张三", age: 23, money: 800},
    {name: "李四", age: 14, money: 900},
]

// 使用filter过滤、some筛选
// 注意filter函数不要忘了加return,以及some前面的感叹号
const filterArray = human1.filter(man1 => {
    return !human2.some(man2 => (man1.name === man2.name && man1.age === man2.age));
});

console.log("最终去除结果：", filterArray)

