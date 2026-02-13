import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                comments: false, // 生成的文件中，去除注释
            },
        },
    })],
    base: '', // 引用资源路径以相对路径生成，而不是根路径
    server: {
        port: 25905, // 端口号
    },
    esbuild: {
        // 移除所有版权注释（包括第三方依赖的注释）
        legalComments: 'none'
    },
    build: {
        // 自定义构建输出规则：不加哈希码
        rollupOptions: {
            output: {
                entryFileNames: 'index.js', // 入口 JS 固定为 index.js（无哈希）
                assetFileNames: '[name].[ext]' // 所有静态资源（CSS、图片等）按原名称输出
            }
        }
    }
})
