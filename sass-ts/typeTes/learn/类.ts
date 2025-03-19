class Person {
    readonly name: string
    age: number
    sex: string

    constructor(name: string, age: number, sex: boolean) {
        this.name = name;
        this.age = age;
        this.sex = sex ? "男" : "女";
    }

    say():void{
        console.log(`名字：${this.name}，年龄：${this.age}`)
    }
}

interface PersonMsg {
    name: string
    age: number
    sex: string
}

const setMsg = (msg: PersonMsg):string => `姓名:${msg.name},年龄:${msg.age},性别${msg.sex}`
const person = new Person("张三", 23, true);
console.log(setMsg(person))
person.say()