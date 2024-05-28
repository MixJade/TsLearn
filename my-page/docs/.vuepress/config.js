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
        // 导航栏配置
        navbar: require('./myNavbar.json'),
        // 侧边栏配置
        sidebar: require('./mySidebar.json'),
    }),

    bundler: viteBundler(),
})
