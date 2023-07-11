// 根据出生日期算年龄(简化版)
const nowYear: number = new Date().getFullYear()//获取年数差
export const getAge = (birthday: string): number => {
    const birthYear = (birthday.split("-")[0] as unknown) as number
    return nowYear - birthYear
}
// 去除时间中的T
export const moveT = (str: string): string =>
    str.toString().replaceAll("T", ' ')