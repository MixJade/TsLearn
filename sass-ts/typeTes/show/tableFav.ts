// 默认链接
interface defA {
    href: string;
    name: string;
    remark: string;
    img: string;
    pwd?: string;
}

// 链接小组
interface aGroup {
    title: string;
    ul: defA[];
}

// 链接大组
interface dataGroup {
    nav: string;
    group: aGroup[];
    updateTime: string;
}

// 初始数据
const myData: dataGroup[] = [{
    nav: "初始教程",
    updateTime: "2024-6-11 16:32",
    group: [{
        title: "参考网站",
        ul: [{
            href: "https://cn.vuejs.org/guide/quick-start.html",
            name: "Vue上手",
            img: "vue.svg",
            remark: "一切根基",
            pwd: "测试复制"
        }, {
            href: "https://element-plus.org/zh-CN/",
            name: "Element-Plus",
            img: "element-plus.svg",
            remark: "项目组件库"
        }, {
            href: "https://element-plus.org/zh-CN/component/icon.html",
            name: "Element的Icon",
            img: "element-plus.svg",
            remark: "美化图标"
        },]
    }, {
        title: "样式参考",
        ul: [{
            href: "https://www.sass.hk/docs/",
            name: "Sass官网教程",
            img: "sass.png",
            remark: "但不建议看这个"
        }, {
            href: "https://www.runoob.com/sass/sass-install.html",
            name: "Sass菜鸟教程",
            img: "sass.png",
            remark: "这个写的不错"
        }, {
            href: "https://www.bootstrap.cn/doc/read/113.html",
            name: "bootstrap官网",
            img: "Bootstrap.png",
            remark: "一些样式要从这里来"
        },]
    }, {
        title: "框架官网",
        ul: [{
            href: "https://www.axios-http.cn/docs/intro",
            name: "Axios官网",
            img: "axios.png",
            remark: "前端请求"
        }, {
            href: "https://zh-hans.eslint.org/docs/latest/use/getting-started",
            name: "ESLint官网",
            img: "Eslint.png",
            remark: "格式化工具"
        },]
    },]
}, {
    nav: "补充知识",
    updateTime: "2024-6-11 17:52",
    group: [{
        title: "前端知识",
        ul: [{
            href: "https://blog.csdn.net/qq_42231156/article/details/124506627",
            name: "计算属性传参",
            img: "csdn.png",
            remark: ""
        }, {
            href: "https://blog.csdn.net/GraySakura/article/details/104821218",
            name: "div换行设置",
            img: "csdn.png",
            remark: ""
        }, {
            href: "https://juejin.cn/post/7074448287352225823",
            name: "Vue3关于路由动画的注意事项",
            img: "juejin.png",
            remark: ""
        }, {
            href: "https://juejin.cn/post/7137460519497105439",
            name: "Vue3关于滚动条的细节",
            img: "juejin.png",
            remark: "包括flex翻转，用做聊天页面"
        }, {
            href: "https://juejin.cn/post/7132656370901336101",
            name: "Vue3的h函数",
            img: "juejin.png",
            remark: ""
        },]
    }, {
        title: "样式知识",
        ul: [{
            href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties",
            name: "CSS自定属性",
            img: "webPage.png",
            remark: "方便调配色"
        }, {
            href: "https://www.jianshu.com/p/d875f680fc6b",
            name: "CSS波浪加号大于号",
            img: "webPage.png",
            remark: "一个有用的语法"
        }, {
            href: "https://zhuanlan.zhihu.com/p/96721026",
            name: "前端尺寸vw|vh|rem|em",
            img: "webPage.png",
            remark: "了解即可"
        },]
    }, {
        title: "杂项",
        ul: [{
            href: "https://blog.csdn.net/hunt_er/article/details/81427804",
            name: "无Java环境下运行jar文件",
            img: "csdn.png",
            remark: "感觉不如IDE"
        }, {
            href: "https://gitee.com/haojunchuan/web_every_day/tree/master/parallax_website",
            name: "别人的仓库",
            img: "webPage.png",
            remark: "我会吸收一些东西"
        }]
    }]
}, {
    nav: "小小工具",
    group: [{
        title: "配色",
        ul: [{
            href: "https://element-plus.gitee.io/zh-CN/component/color.html",
            name: "ElementPlus配色",
            img: "element-plus.svg",
            remark: "一个规范"
        }, {
            href: "https://www.cnblogs.com/5H5H/p/9784015.html",
            name: "颜色代码",
            img: "webPage.png",
            remark: "各种颜色的英文名称"
        },]
    }, {
        title: "样式",
        ul: [{
            href: "https://uiverse.io/cards",
            name: "UI_Verse",
            img: "webPage.png",
            remark: "不错的css样式库，但代码有冗余，记得清理"
        }, {
            href: "https://cdn.bootcdn.net/ajax/libs/bootstrap/5.2.3/css/bootstrap.css",
            name: "BootStrap的css",
            img: "Bootstrap.png",
            remark: "老大哥，直接copy"
        }]
    }, {
        title: "工具",
        ul: [{
            href: "https://tooltt.com/json2typescript/",
            name: "Json转Ts接口",
            img: "webPage.png",
            remark: "在线网站，JSON键要加双引号"
        }]
    }],
    updateTime: "2024-6-11 21:26"
}]

const headNav = document.getElementById("headNav") as HTMLElement
const tableDiv = document.getElementById("tableDiv") as HTMLElement
const timeFoot = document.getElementById("timeFoot") as HTMLElement

// 正式初始化
window.onload = () => {
    loadHeadNav()
    loadData(0)
};
let nowSelectNav = 0;

/**
 * 初始化导航栏
 */
const loadHeadNav = () => {
    headNav.innerHTML = ""
    for (let i = 0; i < myData.length; i++) {
        headNav.innerHTML += `<button type="button" onclick="clickNav(${i})">${myData[i].nav}</button></div>`
    }
    headNav.getElementsByTagName("button")[0].classList.add("selectNav")
}

/**
 * 点击导航栏
 * @param dataIndex 数据的索引值
 */
const clickNav = (dataIndex: number) => {
    if (dataIndex === nowSelectNav) return;
    headNav.getElementsByTagName("button")[dataIndex].classList.add("selectNav")
    headNav.getElementsByTagName("button")[nowSelectNav].classList.remove("selectNav")
    nowSelectNav = dataIndex
    loadData(dataIndex)
}

/**
 * 初始化页面数据
 * @param dataIndex 数据的索引值
 */
const loadData = (dataIndex: number) => {
    const datum = myData[dataIndex];
    // 开始设置值
    tableDiv.innerHTML = ""
    datum.group.forEach(i => {
        // 先设置表头
        let groupTxt = `<table>
        <caption>${i.title}</caption>
        <tbody><tr>`
        // 设置表内链接
        let ulNum = 0; // 元素计数器
        i.ul.forEach(j => {
            // 正常内容
            groupTxt += `<td>
                <img src="icoLogo/${j.img}" alt="ico">
                <a href="${j.href}">${j.name}</a>
                <span class="remark">${j.remark}</span>
                ${getBtnTxt(j)}
            </td>`
            // 四个一行
            ulNum += 1
            if (ulNum % 4 === 0)
                groupTxt += '</tr><tr>'
        })
        // 补上空的单元格
        if (ulNum % 4 !== 0) {
            const cirNum = 4 - ulNum % 4;
            for (let k = 0; k < cirNum; k++) {
                groupTxt += `<td class="emptyTd">飞雪连天射白鹿笑书神侠倚碧鸳</td>`
            }
        }
        groupTxt += `</tr> </tbody></table>`
        tableDiv.innerHTML += groupTxt;
    })
    // 更新时间
    timeFoot.innerText = datum.updateTime
}

const getBtnTxt = (defA: defA): string => {
    if (defA.pwd !== undefined && defA.pwd !== "") {
        return `<button type="button" onclick="getCopy(this)" data-text="${defA.pwd}">复制密码</button>
        <span class="btnDot"></span>`
    } else return "";
}

/**
 * 点击复制
 * @param e 传参div本身
 */
const getCopy = (e: HTMLElement) => {
    const text = e.getAttribute("data-text") as string
    if (text !== "") {
        navigator.clipboard.writeText(text).then(() =>
            baseTus.showTus()
        )
    }
}