import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                comments: false, // 生成的文件中，去除注释
            },
        },
    })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5956, // 端口号
        proxy: {  // 跨域代理
            '/api': {
                target: "http://localhost:23046",
                changeOrigin: true,
            },
        }
    },
})
