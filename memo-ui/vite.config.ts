import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import prismjs from 'vite-plugin-prismjs';
import {fileURLToPath, URL} from "node:url";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                comments: false, // 生成的文件中，去除注释
            },
        },
    }),
        prismjs({
            languages: ['javascript', 'sql'],
            plugins: [
                'toolbar',
                'show-language',
                'copy-to-clipboard',
                'normalize-whitespace',
                'line-numbers',
                'unescaped-markup'
            ],
            theme: 'tomorrow',
            css: true
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5937, // 端口号
        proxy: {  // 跨域代理
            '/api': {
                target: "http://localhost:23041",
                changeOrigin: true,
            },
        }
    },
})
