const mealLayout = (() => {
    // 默认链接
    interface defA {
        type: string;
        href: string;
        name: string;
        remark: string;
    }

    // 链接分组
    interface aGroup {
        longNav: string;
        mainBox: defA[];
        bigSide: defA[];
        bottom1: defA[];
        bottom2: defA[];
        bottom3: defA[];
        updateTime: string;
    }

    // 初始数据
    const myData: aGroup[] = [{
        longNav: "初始教程",
        mainBox: [{
            type: "VUE",
            href: "https://cn.vuejs.org/guide/quick-start.html",
            name: "Vue上手",
            remark: "一切根基"
        }, {
            type: "组件",
            href: "https://element-plus.org/zh-CN/",
            name: "Element-Plus",
            remark: "项目组件库"
        }, {
            type: "图标",
            href: "https://element-plus.org/zh-CN/component/icon.html",
            name: "Element的Icon",
            remark: "美化图标"
        },],
        bigSide: [{
            type: "样式",
            href: "https://www.sass.hk/docs/",
            name: "Sass官网教程",
            remark: "但不建议看这个"
        }, {
            type: "样式",
            href: "https://www.runoob.com/sass/sass-install.html",
            name: "Sass菜鸟教程",
            remark: "这个写的不错"
        }, {
            type: "格式",
            href: "https://zh-hans.eslint.org/docs/latest/use/getting-started",
            name: "ESLint官网",
            remark: "格式化工具"
        }, {
            type: "样式",
            href: "https://www.bootstrap.cn/doc/read/113.html",
            name: "bootstrap官网",
            remark: "一些样式要从这里来"
        }, {type: "请求", href: "https://www.axios-http.cn/docs/intro", name: "Axios官网", remark: "前端请求"},],
        bottom1: [],
        bottom2: [],
        bottom3: [],
        updateTime: "2024-6-11 16:32"
    }, {
        longNav: "补充知识",
        mainBox: [{
            type: "样式",
            href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties",
            name: "CSS自定属性",
            remark: "方便调配色"
        }, {
            type: "样式",
            href: "https://www.jianshu.com/p/d875f680fc6b",
            name: "CSS波浪加号大于号",
            remark: "一个有用的语法"
        }, {
            type: "样式",
            href: "https://zhuanlan.zhihu.com/p/96721026",
            name: "前端尺寸vw、vh、rem、em",
            remark: "了解即可"
        }, {
            type: "前端知识",
            href: "https://blog.csdn.net/qq_42231156/article/details/124506627",
            name: "计算属性传参",
            remark: ""
        }, {
            type: "前端知识",
            href: "https://blog.csdn.net/GraySakura/article/details/104821218",
            name: "div换行设置",
            remark: ""
        }, {
            type: "前端知识",
            href: "https://juejin.cn/post/7074448287352225823",
            name: "Vue3关于路由动画的注意事项",
            remark: ""
        }, {
            type: "前端知识",
            href: "https://juejin.cn/post/7137460519497105439",
            name: "Vue3关于滚动条的细节",
            remark: "包括flex翻转，用做聊天页面"
        }, {type: "前端知识", href: "https://juejin.cn/post/7132656370901336101", name: "Vue3的h函数", remark: ""},],
        bigSide: [],
        bottom1: [{
            type: "后端",
            href: "https://blog.csdn.net/hunt_er/article/details/81427804",
            name: "无Java环境下运行jar文件",
            remark: "感觉不如IDE"
        }],
        bottom2: [{
            type: "别人仓库",
            href: "https://gitee.com/haojunchuan/web_every_day/tree/master/parallax_website",
            name: "别人的仓库",
            remark: "我会吸收一些东西"
        }],
        bottom3: [],
        updateTime: "2024-6-11 17:52"
    },]
    // 获取dom元素
    const longNavUl = document.getElementById("long-nav-ul");
    const mainBoxUl = document.getElementById("main-box-ul");
    const bigSideUl = document.getElementById("big-side-ul");
    const bottom1Ul = document.getElementById("bottom1-ul");
    const bottom2Ul = document.getElementById("bottom2-ul");
    const bottom3Ul = document.getElementById("bottom3-ul");
    const updateTime = document.getElementById("updateTime");

    // 正式初始化
    window.onload = () => {
        loadLongNavUl()
        loadData(0)
    };
    let nowSelectNav = 0;
    /**
     * 初始化导航栏
     */
    const loadLongNavUl = () => {
        if (longNavUl == null) return
        longNavUl.innerHTML = ""
        for (let i = 0; i < myData.length; i++) {
            longNavUl.innerHTML += `<div class="item" onclick="mealLayout.setLongNavUl(${i})">${myData[i].longNav}</div>`
        }
        longNavUl.getElementsByTagName("div")[0].classList.add("selectNav")
    }

    /**
     * 点击导航栏
     * @param dataIndex 数据的索引值
     */
    const setLongNavUl = (dataIndex: number) => {
        if (longNavUl == null) return
        longNavUl.getElementsByTagName("div")[dataIndex].classList.add("selectNav")
        longNavUl.getElementsByTagName("div")[nowSelectNav].classList.remove("selectNav")
        nowSelectNav = dataIndex
        loadData(dataIndex)
    }

    /**
     * 初始化页面数据
     * @param dataIndex 数据的索引值
     */
    const loadData = (dataIndex: number) => {
        if (mainBoxUl == null || bigSideUl == null
            || bottom1Ul == null || bottom2Ul == null || bottom3Ul == null
            || updateTime == null) return;
        const aGroup = myData[dataIndex];
        // 开始设置值
        // 上面两个
        mainBoxUl.innerHTML = '';
        aGroup.mainBox.forEach(item => mainBoxUl.innerHTML += getUlStr(item))
        bigSideUl.innerHTML = '';
        aGroup.bigSide.forEach(item => bigSideUl.innerHTML += getUlStr2(item))
        // 下面三个
        bottom1Ul.innerHTML = '';
        aGroup.bottom1.forEach(item => bottom1Ul.innerHTML += getUlStr2(item))
        bottom2Ul.innerHTML = '';
        aGroup.bottom2.forEach(item => bottom2Ul.innerHTML += getUlStr2(item))
        bottom3Ul.innerHTML = '';
        aGroup.bottom3.forEach(item => bottom3Ul.innerHTML += getUlStr2(item))
        // 更新时间
        updateTime.innerText = aGroup.updateTime
    }

    const getUlStr = (defA: defA): string => {
        return `<li>${defA.type}:<a href="${defA.href}">【${defA.name}】</a>${defA.remark}</li>`
    }

    const getUlStr2 = (defA: defA): string => {
        if (defA.remark === "") {
            return `<li>${defA.type}:<a href="${defA.href}">【${defA.name}】</a></li>`
        } else {
            return `<li>${defA.type}:<a href="${defA.href}" class="tooltip">【${defA.name}】<span class="tip-text">${defA.remark}</span></a></li>`
        }
    }

    return {
        setLongNavUl
    }
})();
