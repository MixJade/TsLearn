// 时间展示格式化
export const formatDateTime = (str: string | null): string => {
    if (str == null) return "未知";
    // 解析时间字符串
    const date = new Date(str);
    // 提取各时间部分并格式化为两位数字
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    // 拼接成所需格式
    return `${year}${month}${day}_${hour}:${minute}`;
}