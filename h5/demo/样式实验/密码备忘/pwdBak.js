"use strict";
(() => {
    const softMagList = [
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时" },
    ];
    const pwdMagList = [
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗书", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
    ];
    const softUl = document.getElementById("soft-ul");
    if (softUl !== null) {
        softMagList.forEach(item => {
            if (item.remark === "") {
                softUl.innerHTML += `<li><a href="${item.href}">${item.name}</a></li>`;
            }
            else {
                softUl.innerHTML += `<li><a href="${item.href}" class="tooltip">${item.name}<span class="tip-text">${item.remark}</span></a></li>`;
            }
        });
    }
    const tbMain = document.getElementById("tb-main2");
    if (tbMain !== null) {
        pwdMagList.forEach(item => {
            tbMain.innerHTML += `
            <tr>
                <td><a href="${item.href}">${item.name}</a></td>
                <td>${item.remark}</td>
                <td><button type="button" onclick="getCopy(this)" data-text="${item.pwd}">点击复制</button></td>
            </tr>`;
        });
    }
})();
const getCopy = (e) => {
    const text = e.getAttribute("data-text");
    if (text !== null) {
        navigator.clipboard.writeText(text).then(() => {
            alert("复制成功");
        });
    }
};
