window.onload = () => {
    firstLoadPa(29)
}
const paSize = document.getElementById("paSize") // 调整大小的选择框
const pageStrip = document.getElementById("pageStrip") // 分页条(存储页码)
let nowPage = 0; // 当前页码
/**
 * 初始化页面
 * @param dataNum 数据长度
 */
const firstLoadPa = (dataNum) => {
    document.getElementById("dataNum").innerText = dataNum;
    const pageSize = paSize.value;
    const pageNum = Math.ceil(dataNum / pageSize); // 向上取整
    for (let i = 0; i < pageNum; i++) {
        pageStrip.innerHTML += `<span onclick="cutPage(${i})">${i + 1}</span>`
    }
    // 选中第一个子元素
    nowPage = 0
    const paOneList = pageStrip.getElementsByTagName("span");
    paOneList[0].classList.add("active")
}

/**
 * 点击页码操作(也是分页条核心方法)
 * @param paNum 当前页码的索引
 */
const cutPage = (paNum) => {
    const paOneList = pageStrip.getElementsByTagName("span");
    paOneList[nowPage].classList.remove("active")
    paOneList[paNum].classList.add("active")
    nowPage = paNum
}

/**
 * 向前后翻页
 * @param isLeft
 */
const addPaNum = (isLeft) => {
    if (isLeft) {
        if (nowPage === 0) return;
        cutPage(nowPage - 1)
    } else {
        if (nowPage === pageStrip.getElementsByTagName("span").length - 1) return;
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
