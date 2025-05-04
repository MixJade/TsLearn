"use strict";
const pwdBak = (() => {
    const softMagList = [
        { name: "少时诵诗书", remark: "每日签到送1个小时" },
        { name: "少时诵诗书", remark: "每日签到送1个小时" },
        { name: "少时诵诗书", remark: "每日签到送1个小时" },
        { name: "少时诵诗书", remark: "每日签到送1个小时" },
        { name: "少时诵诗书", remark: "每日签到送1个小时" },
    ];
    const pwdMagList = [
        { href: "#", name: "少时诵诗1", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗2", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗3", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗4", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗5", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗6", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗7", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗8", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗9", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗10", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗11", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗12", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
        { href: "#", name: "少时诵诗13", remark: "每日签到送1个小时", pwd: "撒阿达大大" },
    ];
    const pwdSay = ["长铗归来兮！食无鱼", "长铗归来兮！出无车", "长铗归来兮！无以为家"];
    window.onload = () => {
        firstDataLoad();
    };
    const firstDataLoad = () => {
        const softUl = document.getElementById("soft-ul");
        if (softUl !== null) {
            softMagList.forEach(item => {
                softUl.innerHTML += `<li class="tooltip"><span>${item.name}</span> <div class="tip-text">✨ ${item.remark}</div></li>`;
            });
        }
        firstLoadPa(pwdMagList.length);
        const hideTxt = document.getElementById("hide-txt");
        if (hideTxt !== null) {
            pwdSay.forEach(item => {
                hideTxt.innerHTML += item + "&nbsp;&nbsp;";
            });
        }
    };
    const writeValToTbMain = (nowPaIndex, pageSize) => {
        const tbMain = document.getElementById("tb-main2");
        if (tbMain === null)
            return;
        tbMain.innerHTML = '';
        pwdMagList.slice(nowPaIndex * pageSize, (nowPaIndex + 1) * pageSize).forEach(item => {
            tbMain.innerHTML += `
            <tr>
                <td><a href="${item.href}">${item.name}</a></td>
                <td>${item.remark}</td>
                <td><button type="button" onclick="pwdBak.getCopy(this)" data-text="${item.pwd}">点击复制</button></td>
            </tr>`;
        });
    };
    const getCopy = (e) => {
        const text = e.getAttribute("data-text");
        if (text !== null) {
            navigator.clipboard.writeText(text).then(() => {
                alert("复制成功");
            });
        }
    };
    const paSize = document.getElementById("paSize");
    const pageStrip = document.getElementById("pageStrip");
    let nowPage = 0;
    const firstLoadPa = (dataNum) => {
        const dataNumEle = document.getElementById("dataNum");
        if (dataNumEle !== null) {
            dataNumEle.innerText = String(dataNum);
        }
        if (paSize !== null && pageStrip !== null) {
            const pageSize = Number(paSize.value);
            const pageNum = Math.ceil(dataNum / pageSize);
            for (let i = 0; i < pageNum; i++) {
                pageStrip.innerHTML += `<span onclick="pwdBak.cutPage(${i})">${i + 1}</span>`;
            }
            nowPage = 0;
            const paOneList = pageStrip.getElementsByTagName("span");
            paOneList[0].classList.add("active");
            writeValToTbMain(0, pageSize);
        }
    };
    const cutPage = (paNum) => {
        if (pageStrip === null || paSize === null)
            return;
        const paOneList = pageStrip.getElementsByTagName("span");
        paOneList[nowPage].classList.remove("active");
        paOneList[paNum].classList.add("active");
        nowPage = paNum;
        writeValToTbMain(paNum, Number(paSize.value));
    };
    const addPaNum = (isLeft) => {
        if (pageStrip === null)
            return;
        if (isLeft) {
            if (nowPage === 0)
                return;
            cutPage(nowPage - 1);
        }
        else {
            if (nowPage === pageStrip.getElementsByTagName("span").length - 1)
                return;
            cutPage(nowPage + 1);
        }
    };
    const paSizeChange = () => {
        if (pageStrip === null)
            return;
        pageStrip.innerHTML = '';
        firstLoadPa(pwdMagList.length);
    };
    return {
        getCopy,
        cutPage,
        addPaNum,
        paSizeChange
    };
})();
