const hedBtn = document.getElementById("headNav")?.getElementsByTagName("button") as HTMLCollectionOf<HTMLElement>;
const tabDiv = document.getElementsByClassName("tableDiv") as HTMLCollectionOf<HTMLElement>;

let nowSelNav = 0;

/**
 * 点击导航栏
 * @param dataIndex 数据的索引值
 */
const cikNav = (dataIndex: number) => {
    if (dataIndex === nowSelNav) return;
    hedBtn[dataIndex].classList.add("selectNav")
    hedBtn[nowSelNav].classList.remove("selectNav")
    tabDiv[dataIndex].style.display = 'block'
    tabDiv[nowSelNav].style.display = 'none'
    nowSelNav = dataIndex
}

/**
 * 点击复制
 * @param text 字符串
 */
const geCopy = (text: string) => {
    if (text !== "") {
        navigator.clipboard.writeText(text).then(() =>
            alert("复制成功")
        )
    }
}