# JS的Map函数

> 2024年5月7日17:04:48

有一个对象列表，每个对象都有一个名为"age"的属性，提取这个属性的值并组成新的列表：

```javascript
const list = [
    {name: 'John', age: 23},
    {name: 'Amy', age: 25},
    {name: 'Emily', age: 28},
];

const ageList = list.map(item => item.age);

console.log(ageList);  // Output: [23, 25, 28]
```

在本例中，ageList将是新的列表，其中包含原始列表中每个对象的age属性的值。
