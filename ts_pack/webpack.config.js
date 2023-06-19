const path = require("path"); // 拼接路径所需
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = { // webpack中的所有的配置信息都应该写在module.exports中
    optimization: {
        minimize: true, // 代码压缩，可选
    },
    mode: "production",// 指定生产环境，它编译的文件没有注释
    entry: "./src/index.ts", // 指定入口文件
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'), // 服务器所用的目录
        },
        compress: true,
        port: 8081, // 服务器端口
    },

    output: { // 指定打包后的目录
        path: path.resolve(__dirname, "dist"), // 指定打包文件所在目录
        filename: "bundle.js",  // 打包后文件的文件名
        clean: true, // 每次编译都清除上次的文件
    },

    resolve: {
        extensions: [".ts", ".js"] // 用来设置引用模块，这两个文件都能被作为模块被其它引用
    },

    module: { // 指定webpack打包时要使用模块
        rules: [ // 指定要加载的规则
            {
                test: /\.ts$/, // test指定的是规则生效的文件
                use: {
                    loader: "ts-loader" // 必须指定ts加载器
                },
                exclude: /node_modules/ // 要排除的文件
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ // 可以在这里配置生成的html
            template: "./template/ts-1.html" // 模板文件
        }),
    ]

}