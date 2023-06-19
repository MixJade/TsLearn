"use strict";
class Person {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex ? "男" : "女";
    }
    say() {
        console.log(`名字：${this.name}，年龄：${this.age}`);
    }
}
const setMsg = (msg) => `姓名:${msg.name},年龄:${msg.age},性别${msg.sex}`;
const person = new Person("张三", 23, true);
console.log(setMsg(person));
person.say();
