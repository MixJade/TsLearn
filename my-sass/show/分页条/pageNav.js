window.onload = () => {
    firstLoadPa(29)
}
const $ = id => document.getElementById(id);
const paSize = $("paSize") // 调整大小的选择框
const pageStrip = $("pageStrip") // 分页条(存储页码)
let nowPage = 1; // 当前页码
/**
 * 初始化分页条
 * @param dataNum 数据长度
 */
const firstLoadPa = (dataNum) => {
    console.log("初始化")
    $("dataNum").innerText = dataNum;
    const pageSize = paSize.value;
    const pageNum = Math.ceil(dataNum / pageSize); // 向上取整
    for (let i = 1; i < pageNum + 1; i++) {
        pageStrip.innerHTML += `<span onclick="cutPage(${i})">${i}</span>`
    }
    // 选中第一个子元素
    nowPage = 1
    const paOneList = pageStrip.getElementsByTagName("span");
    paOneList[0].classList.add("active")
}

/**
 * 点击页码操作(也是分页条核心方法)
 * @param paNum 当前页码的索引
 */
const cutPage = (paNum) => {
    const paOneList = pageStrip.getElementsByTagName("span");
    paOneList[nowPage - 1].classList.remove("active")
    paOneList[paNum - 1].classList.add("active")
    nowPage = paNum
    console.log(nowPage, paSize.value)
}

/**
 * 向前后翻页
 * @param isLeft
 */
const addPaNum = (isLeft) => {
    if (isLeft) {
        if (nowPage === 1) return;
        cutPage(nowPage - 1)
    } else {
        if (nowPage === pageStrip.getElementsByTagName("span").length) return;
        cutPage(nowPage + 1)
    }
}

/**
 * 分页大小变化
 */
const paSizeChange = () => {
    pageStrip.innerHTML = ''
    firstLoadPa(29)
}
