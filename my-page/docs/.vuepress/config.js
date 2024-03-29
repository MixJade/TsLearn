import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'MixJade',
    description: '这是我的第一个 VuePress 站点',
    port: 8081,
    theme: defaultTheme({
        logo: "/my-logo.png",
        logoDark: "/black-logo.jpg",
        navbar: [{text: 'Java', link: '/javaLearn/测试页面.md'},
            {text: 'TS', link: '/tsLearn/测试页面.md'},
            {text: 'Python', link: '/pyLearn/测试页面.md'},
        ],
        // 天地自然，秽炁分散。
        sidebar: {
            "/javaLearn/": [{
                text: 'Java学习笔记', // 标题
                collapsible: true,
                children: [ // 下级列表
                    '/javaLearn/测试页面.md',
                ]
            },],

            "/tsLearn/": [{
                text: 'TS学习笔记', // 标题
                collapsible: true,
                children: [
                    '/tsLearn/测试页面.md',
                ]
            },],

            "/pyLearn/": [{
                text: 'Python学习笔记', // 标题
                collapsible: true,
                children: [
                    '/pyLearn/测试页面.md',
                ]
            }, ],
        },
        // 乾罗答那，洞罡太玄；
    }),

    bundler: viteBundler(),
})
