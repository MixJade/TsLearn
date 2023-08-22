function dds() {
    pageStripWrite(50)
}

function ddsq() {
    pageStripWrite(70)
}
// 分页条设置长度
const pageStrip = document.getElementById("pageStrip");
function pageStripWrite(itemNum) {
    var pageNum = itemNum / (getPageSize())
    pageStrip.innerHTML = '<li class="page-item active"><a class="page-link" onclick="cutP(1)">1</a></li>'
    for (let i = 2; i < pageNum + 1; i++) {
        pageStrip.innerHTML += '<li class="page-item"><a class="page-link" onclick="cutP(' + i + ')">' + i + '</a></li>'
    }
}
// 分页条设置选中效果
const pageLA = pageStrip.getElementsByTagName("a");
function cutP(numPage) {
    pageStrip.querySelector(".active").classList.remove("active");
    pageLA[numPage - 1].parentNode.classList.add("active");
    alert(numPage + ',' + getPageSize());
}
// 获取分页大小下拉表选中值
const pageSize = document.getElementById("pageSize");
function getPageSize() {
    var index = pageSize.selectedIndex;
    return pageSize.options[index].value;
}
// 向前翻页操作
function addPageNum() {
    var currentPage = pageStrip.querySelector(".active").getElementsByTagName("a")[0].innerHTML
    if (currentPage != 1) {
        cutP(currentPage - 1)
    }
}
// 向后翻页操作
function reducePageNum() {
    var currentPageLength = pageStrip.getElementsByTagName("li").length;
    var currentPage02 = pageStrip.querySelector(".active").getElementsByTagName("a")[0].innerHTML
    if (currentPage02 != currentPageLength) {
        cutP(parseInt(currentPage02) + 1)
    }
}
// 改变每页条数
function refreshPage() {
    pageStripWrite(50)
}
