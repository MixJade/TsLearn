(() => {
    // 待下载软件的对象
    interface SoftMag {
        href: string;
        name: string;
        remark: string;
    }

    // 密码备份对象
    interface PwdMag extends SoftMag {
        pwd: string;
    }

    // 数据：待下载软件列表
    const softMagList: SoftMag[] = [
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时"},
    ]
    // 数据：密码备份列表
    const pwdMagList: PwdMag[] = [
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
    ]
    // 向软件列表中写入
    const softUl = document.getElementById("soft-ul");
    if (softUl !== null) {
        softMagList.forEach(item => {
            if (item.remark === "") {
                softUl.innerHTML += `<li><a href="${item.href}">${item.name}</a></li>`
            } else {
                softUl.innerHTML += `<li><a href="${item.href}" class="tooltip">${item.name}<span class="tip-text">${item.remark}</span></a></li>`
            }
        })
    }
    // 向密码备份列表中写入
    const tbMain = document.getElementById("tb-main2");
    if (tbMain !== null) {
        pwdMagList.forEach(item => {
            tbMain.innerHTML += `
            <tr>
                <td><a href="${item.href}">${item.name}</a></td>
                <td>${item.remark}</td>
                <td><button type="button" onclick="getCopy(this)" data-text="${item.pwd}">点击复制</button></td>
            </tr>`
        })
    }
})();
// 点击复制
const getCopy = (e: HTMLElement) => {
    const text = e.getAttribute("data-text")
    if (text !== null) {
        navigator.clipboard.writeText(text).then(() => {
            alert("复制成功")
        })
    }
}
