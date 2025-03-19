// noinspection all

(() => {
    let a: object;
    a = {};
    a = function () {

    }
    let b: { name: string, age?: number }
    b = {name: "jjj"}
    // 数组语法
    let c: string[]
    c = ["sss", "Ss"]
    let d: Array<number>
    d = [12, 23]
    // 元组
    let e: [string, number]
    e = ["Ss", 1]
    // 函数返回
    const sd = (id: string): HTMLElement | null => document.getElementById(id)
})()

