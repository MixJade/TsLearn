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
    server: {
        port: 25904, // 端口号
    },
    build: {
        minify: 'terser', // 显式指定使用terser压缩
        terserOptions: {
            format: {
                comments: false, // 移除所有注释
            },
        },
        // 自定义构建输出规则：不加哈希码
        rollupOptions: {
            output: {
                entryFileNames: 'index.js', // 入口 JS 固定为 index.js（无哈希）
                assetFileNames: '[name].[ext]' // 所有静态资源（CSS、图片等）按原名称输出
            }
        }
    }
})
