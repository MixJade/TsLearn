"use strict";
const mealLayout = (() => {
    const myData = [{
            longNav: "初始教程",
            mainBox: {
                name: "参考网站",
                ul: [{
                        href: "https://cn.vuejs.org/guide/quick-start.html",
                        name: "Vue上手",
                        remark: "一切根基",
                        pwd: "测试复制"
                    }, {
                        href: "https://element-plus.org/zh-CN/",
                        name: "Element-Plus",
                        remark: "项目组件库"
                    }, {
                        href: "https://element-plus.org/zh-CN/component/icon.html",
                        name: "Element的Icon",
                        remark: "美化图标"
                    },]
            },
            bigSide: {
                name: "样式参考",
                ul: [{
                        href: "https://www.sass.hk/docs/",
                        name: "Sass官网教程",
                        remark: "但不建议看这个"
                    }, {
                        href: "https://www.runoob.com/sass/sass-install.html",
                        name: "Sass菜鸟教程",
                        remark: "这个写的不错"
                    }, {
                        href: "https://www.bootstrap.cn/doc/read/113.html",
                        name: "bootstrap官网",
                        remark: "一些样式要从这里来"
                    },]
            },
            bottom1: {
                name: "框架官网",
                ul: [{
                        href: "https://www.axios-http.cn/docs/intro", name: "Axios官网", remark: "前端请求"
                    }, {
                        href: "https://zh-hans.eslint.org/docs/latest/use/getting-started",
                        name: "ESLint官网",
                        remark: "格式化工具"
                    },
                ]
            },
            bottom2: { name: "", ul: [] },
            bottom3: { name: "", ul: [] },
            updateTime: "2024-6-11 16:32"
        }, {
            longNav: "补充知识",
            mainBox: {
                name: "前端知识", ul: [{
                        href: "https://blog.csdn.net/qq_42231156/article/details/124506627",
                        name: "计算属性传参",
                        remark: ""
                    }, {
                        href: "https://blog.csdn.net/GraySakura/article/details/104821218",
                        name: "div换行设置",
                        remark: ""
                    }, {
                        href: "https://juejin.cn/post/7074448287352225823",
                        name: "Vue3关于路由动画的注意事项",
                        remark: ""
                    }, {
                        href: "https://juejin.cn/post/7137460519497105439",
                        name: "Vue3关于滚动条的细节",
                        remark: "包括flex翻转，用做聊天页面"
                    }, { href: "https://juejin.cn/post/7132656370901336101", name: "Vue3的h函数", remark: "" },]
            },
            bigSide: {
                name: "样式知识",
                ul: [{
                        href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties",
                        name: "CSS自定属性",
                        remark: "方便调配色"
                    }, {
                        href: "https://www.jianshu.com/p/d875f680fc6b",
                        name: "CSS波浪加号大于号",
                        remark: "一个有用的语法"
                    }, {
                        href: "https://zhuanlan.zhihu.com/p/96721026",
                        name: "前端尺寸vw|vh|rem|em",
                        remark: "了解即可"
                    },]
            },
            bottom1: {
                name: "后端",
                ul: [{
                        href: "https://blog.csdn.net/hunt_er/article/details/81427804",
                        name: "无Java环境下运行jar文件",
                        remark: "感觉不如IDE"
                    }]
            },
            bottom2: {
                name: "别人仓库",
                ul: [{
                        href: "https://gitee.com/haojunchuan/web_every_day/tree/master/parallax_website",
                        name: "别人的仓库",
                        remark: "我会吸收一些东西"
                    }]
            },
            bottom3: { name: "", ul: [] },
            updateTime: "2024-6-11 17:52"
        }, {
            longNav: "小小工具",
            mainBox: {
                name: "配色", ul: [
                    {
                        href: "https://element-plus.gitee.io/zh-CN/component/color.html",
                        name: "ElementPlus配色",
                        remark: "一个规范"
                    },
                    { href: "https://www.cnblogs.com/5H5H/p/9784015.html", name: "颜色代码", remark: "各种颜色的英文名称" },
                ]
            },
            bigSide: {
                name: "样式",
                ul: [
                    { href: "https://uiverse.io/cards", name: "UI_Verse", remark: "不错的css样式库，但代码有冗余，记得清理" },
                    {
                        href: "https://cdn.bootcdn.net/ajax/libs/bootstrap/5.2.3/css/bootstrap.css",
                        name: "BootStrap的css",
                        remark: "老大哥，直接copy"
                    }
                ]
            },
            bottom1: {
                name: "工具", ul: [
                    { href: "https://tooltt.com/json2typescript/", name: "Json转Ts接口", remark: "在线网站，JSON键要加双引号" }
                ]
            },
            bottom2: { name: "", ul: [] },
            bottom3: { name: "", ul: [] },
            updateTime: "2024-6-11 21:26",
        }];
    const longNavUl = document.getElementById("long-nav-ul");
    const mainBoxUl = document.getElementById("main-box-ul");
    const bigSideUl = document.getElementById("big-side-ul");
    const bottom1Ul = document.getElementById("bottom1-ul");
    const bottom2Ul = document.getElementById("bottom2-ul");
    const bottom3Ul = document.getElementById("bottom3-ul");
    const updateTime = document.getElementById("updateTime");
    const mainBoxH = document.getElementById("main-box-h");
    const bigSideH = document.getElementById("big-side-h");
    const bottom1H = document.getElementById("bottom1-h");
    const bottom2H = document.getElementById("bottom2-h");
    const bottom3H = document.getElementById("bottom3-h");
    window.onload = () => {
        loadLongNavUl();
        loadData(0);
    };
    let nowSelectNav = 0;
    const loadLongNavUl = () => {
        if (longNavUl == null)
            return;
        longNavUl.innerHTML = "";
        for (let i = 0; i < myData.length; i++) {
            longNavUl.innerHTML += `<div class="item" onclick="mealLayout.setLongNavUl(${i})">${myData[i].longNav}</div>`;
        }
        longNavUl.getElementsByTagName("div")[0].classList.add("selectNav");
    };
    const setLongNavUl = (dataIndex) => {
        if (longNavUl == null)
            return;
        if (dataIndex === nowSelectNav)
            return;
        longNavUl.getElementsByTagName("div")[dataIndex].classList.add("selectNav");
        longNavUl.getElementsByTagName("div")[nowSelectNav].classList.remove("selectNav");
        nowSelectNav = dataIndex;
        loadData(dataIndex);
    };
    const loadData = (dataIndex) => {
        if (mainBoxUl == null || bigSideUl == null
            || bottom1Ul == null || bottom2Ul == null || bottom3Ul == null
            || updateTime == null)
            return;
        if (mainBoxH == null || bigSideH == null
            || bottom1H == null || bottom2H == null || bottom3H == null)
            return;
        const datum = myData[dataIndex];
        mainBoxUl.innerHTML = '';
        mainBoxH.innerText = datum.mainBox.name;
        datum.mainBox.ul.forEach(item => mainBoxUl.innerHTML += getMainUlStr(item));
        bigSideUl.innerHTML = '';
        bigSideH.innerText = datum.bigSide.name;
        datum.bigSide.ul.forEach(item => bigSideUl.innerHTML += getUlStr(item));
        bottom1Ul.innerHTML = '';
        bottom1H.innerText = datum.bottom1.name;
        datum.bottom1.ul.forEach(item => bottom1Ul.innerHTML += getUlStr(item));
        bottom2Ul.innerHTML = '';
        bottom2H.innerText = datum.bottom2.name;
        datum.bottom2.ul.forEach(item => bottom2Ul.innerHTML += getUlStr(item));
        bottom3Ul.innerHTML = '';
        bottom3H.innerText = datum.bottom3.name;
        datum.bottom3.ul.forEach(item => bottom3Ul.innerHTML += getUlStr(item));
        updateTime.innerText = datum.updateTime;
    };
    const getMainUlStr = (defA) => {
        if (defA.pwd !== undefined && defA.pwd !== "") {
            return `<li><a href="${defA.href}">【${defA.name}】</a>${defA.remark}<button type="button" onclick="mealLayout.getCopy(this)" data-text="${defA.pwd}">复制密码</button></li>`;
        }
        return `<li><a href="${defA.href}">【${defA.name}】</a>${defA.remark}</li>`;
    };
    const getUlStr = (defA) => {
        if (defA.remark === "")
            return `<li><a href="${defA.href}">【${defA.name}】</a></li>`;
        else
            return `<li><a href="${defA.href}" title="${defA.remark}">【${defA.name}】</a>...</li>`;
    };
    const getCopy = (e) => {
        const text = e.getAttribute("data-text");
        if (text !== null) {
            navigator.clipboard.writeText(text).then(() => {
                console.log("复制成功");
            });
        }
    };
    return {
        setLongNavUl,
        getCopy
    };
})();
