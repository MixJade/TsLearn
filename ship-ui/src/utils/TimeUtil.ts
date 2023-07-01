// 根据出生日期算年龄(简化版)
const nowYear: number = new Date().getFullYear()//获取年数差
export const getAge = (birthday: string): number => {
    const birthYear = birthday.split("-")[0] as number
    return nowYear - birthYear
}