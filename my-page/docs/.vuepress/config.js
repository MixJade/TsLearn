import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {searchPlugin} from '@vuepress/plugin-search'

// 安全导入JSON
const myNavbar = require('./myNavbar.json')
const mySidebar = require('./mySidebar.json')
export default defineUserConfig({
    lang: 'zh-CN',
    title: 'MixJade',
    description: '这是我的第一个 VuePress 站点',
    port: 8081,
    theme: defaultTheme({
        logo: "/my-logo.png",
        logoDark: "/black-logo.jpg",
        // 导航栏配置
        navbar: myNavbar,
        // 侧边栏配置
        sidebar: mySidebar,
    }),
    plugins: [
        searchPlugin({
            maxSuggestions: 10,
            hotKeys: ['ctrl+k'],
        }),
    ],
    bundler: viteBundler({
        viteOptions: {
            css: {
                preprocessorOptions: {
                    scss: {
                        // 关闭 Dart Sass 弃用警告
                        silenceDeprecations: ['legacy-js-api'],
                    },
                },
            },
        },
    }),
})
