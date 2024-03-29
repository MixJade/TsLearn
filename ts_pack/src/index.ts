console.log("Bih")
const fun1 = (x:string):string => x+"World"
console.log(fun1("a")) // 这是注释
console.log(fun1("sds"))
class Person {
    name: string
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
const person = new Person("张三", 23, true);
person.say()