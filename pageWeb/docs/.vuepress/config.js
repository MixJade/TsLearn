import {defaultTheme} from 'vuepress'
import {registerComponentsPlugin} from '@vuepress/plugin-register-components'
import {getDirname, path} from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)
export default ({
    lang: 'zh-CN',
    title: 'MixJade',
    description: '这是我的第一个 VuePress 站点',
    port: 8081,
    markdown: {},
    theme: defaultTheme({
        logo: "/my-logo.png",
        logoDark: "/black-logo.jpg",
        navbar: [{text: '测试', link: '/myTest/测试页面.md'},
            {text: '笔记', link: '/note/n2022/MdTest.md'},],
        sidebar: {
            "/myTest/": [{
                text: '一、测试导航', // 标题
                collapsible: true,
                children: [ // 下级列表
                    '/myTest/测试页面.md',
                    '/myTest/Vue测试.md',]
            },], "/note/": [{
                text: '二、学习笔记2022', // 标题
                collapsible: true,
                children: [
                    '/note/n2022/Git笔记.md',
                    '/note/n2022/html学习笔记.md',
                    '/note/n2022/MdTest.md',
                    '/note/n2022/MyBatis笔记.md',
                    '/note/n2022/数据查表记录.md',
                ]
            }, {
                text: '三、学习笔记2023', // 标题
                collapsible: true,
                children: [
                    '/note/n2023/TS学习笔记.md',
                    '/note/n2023/VUE学习笔记.md',
                    '/note/n2023/模糊查询，笔记.md',
                    '/note/n2023/公司代码学习笔记.md',
                ]
            },],
        },
    }),
    plugins: [registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, './components'),
    }),],
})