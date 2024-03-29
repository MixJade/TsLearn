// noinspection all

(() => {// 字面量，赋值时，只能是提前设置的值
    let a: "一" | "二"
// a="j" // 会报错
    a = "一"
// any，也是默认的
    let b: any
    b = 1
    b = "ss"
    let b2
    b2 = 3
    b2 = "Ss"
// unknown  为安全的any
    let c: unknown
    c = 1
    c = "Op"
// unknown与any的区别
    let s: string
    s = b2 // any赋值不会报错
// s=c // unknown给有限制的赋值会报错
// 只能类型强转
    s = c as string
// 或者
    s = <string>c
// 再或者，但这样编译的js可能有冗余警告
    if (typeof c == "string") {
        s = c
    }
// 还有两种值的
    let d: string | number
    d = "ss"
    d = 12
// d=false
})()