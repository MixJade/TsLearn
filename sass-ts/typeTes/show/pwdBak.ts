const pwdBak = (() => {
    // 待下载软件的对象
    interface SoftMag {
        name: string;
        remark: string;
    }

    // 密码备份对象
    interface PwdMag extends SoftMag {
        href: string;
        pwd: string;
    }

    // 数据：待下载软件列表
    const softMagList: SoftMag[] = [
        {name: "少时诵诗书", remark: "每日签到送1个小时"},
        {name: "少时诵诗书", remark: "每日签到送1个小时"},
        {name: "少时诵诗书", remark: "每日签到送1个小时"},
        {name: "少时诵诗书", remark: "每日签到送1个小时"},
        {name: "少时诵诗书", remark: "每日签到送1个小时"},
    ]
    // 数据：密码备份列表
    const pwdMagList: PwdMag[] = [
        {href: "#", name: "少时诵诗1", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗2", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗3", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗4", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗5", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗6", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗7", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗8", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗9", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗10", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗11", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗12", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
        {href: "#", name: "少时诵诗13", remark: "每日签到送1个小时", pwd: "撒阿达大大"},
    ]
    // 数据：密语列表
    const pwdSay: string[] = ["长铗归来兮！食无鱼", "长铗归来兮！出无车", "长铗归来兮！无以为家"]

    window.onload = () => {
        firstDataLoad()
    }

    /**
     * 第一次加载
     * 向软件列表、密码表格中写入
     */
    const firstDataLoad = () => {
        // 向软件列表中写入
        const softUl = document.getElementById("soft-ul");
        if (softUl !== null) {
            softMagList.forEach(item => {
                softUl.innerHTML += `<li class="tooltip"><span>${item.name}</span> <div class="tip-text">✨ ${item.remark}</div></li>`
            })
        }
        // 向密码备份列表中写入
        // 分页条初始化,并写入tbMain
        firstLoadPa(pwdMagList.length)
        // 向密语列表写入
        const hideTxt = document.getElementById("hide-txt")
        if (hideTxt !== null) {
            pwdSay.forEach(item => {
                hideTxt.innerHTML += item + "&nbsp;&nbsp;";
            })
        }
    }

    /**
     * 向tbMain写入数据
     * @param nowPaIndex 当前页码的索引,从0开始
     * @param pageSize 页面大小
     */
    const writeValToTbMain = (nowPaIndex: number, pageSize: number): void => {
        const tbMain = document.getElementById("tb-main2");
        if (tbMain === null) return;
        tbMain.innerHTML = ''
        pwdMagList.slice(nowPaIndex * pageSize, (nowPaIndex + 1) * pageSize).forEach(item => {
            tbMain.innerHTML += `
            <tr>
                <td><a href="${item.href}">${item.name}</a></td>
                <td>${item.remark}</td>
                <td><button type="button" onclick="pwdBak.getCopy(this)" data-text="${item.pwd}">点击复制</button></td>
            </tr>`
        })
    }

    /**
     * 点击复制
     * @param e 传参div本身
     */
    const getCopy = (e: HTMLElement) => {
        const text = e.getAttribute("data-text")
        if (text !== null) {
            navigator.clipboard.writeText(text).then(() => {
                alert("复制成功")
            })
        }
    }

    // 分页条相关
    const paSize = document.getElementById("paSize") as HTMLInputElement | null; // 调整大小的选择框
    const pageStrip = document.getElementById("pageStrip") // 分页条(存储页码)
    let nowPage = 0; // 当前页码
    /**
     * 初始化页面(并写入tbMain)
     * @param dataNum 数据长度
     */
    const firstLoadPa = (dataNum: number) => {
        // 设置数据总量显示
        const dataNumEle = document.getElementById("dataNum")
        if (dataNumEle !== null) {
            dataNumEle.innerText = String(dataNum);
        }
        // 设置分页的选中
        if (paSize !== null && pageStrip !== null) {
            const pageSize: number = Number(paSize.value);
            const pageNum = Math.ceil(dataNum / pageSize); // 向上取整
            for (let i = 0; i < pageNum; i++) {
                pageStrip.innerHTML += `<span onclick="pwdBak.cutPage(${i})">${i + 1}</span>`
            }
            // 选中第一个子元素
            nowPage = 0
            const paOneList = pageStrip.getElementsByTagName("span");
            paOneList[0].classList.add("active")
            // 正式向密码备份表中写入
            writeValToTbMain(0, pageSize)
        }
    }

    /**
     * 点击页码操作(也是分页条核心方法)
     * @param paNum 当前页码的索引,从0开始
     */
    const cutPage = (paNum: number): void => {
        if (pageStrip === null || paSize === null) return;
        const paOneList = pageStrip.getElementsByTagName("span");
        paOneList[nowPage].classList.remove("active")
        paOneList[paNum].classList.add("active")
        nowPage = paNum
        // 数据翻页
        writeValToTbMain(paNum, Number(paSize.value))
    }

    /**
     * 向前后翻页
     * @param isLeft
     */
    const addPaNum = (isLeft: boolean): void => {
        if (pageStrip === null) return;
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
        if (pageStrip === null) return;
        pageStrip.innerHTML = ''
        firstLoadPa(pwdMagList.length)
    }

    return {
        getCopy,
        cutPage,
        addPaNum,
        paSizeChange
    }
})();
