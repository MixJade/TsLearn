# Nginx部署

> 2025-10-27 10:13:01

在 Windows 上用 Nginx 部署静态网站（如 HTML、CSS、JS、图片等）非常简单，步骤如下：


## 前提：安装 Nginx
1. 下载 Nginx for Windows 
   官网地址：[nginx.org/en/download.html](https://nginx.org/en/download.html)，选择稳定版（Stable version）的 `nginx-x.x.x.zip`（比如 `nginx-1.28.0.zip`）
2. 解压到本地目录 
   比如解压到 `D:\nginx`（路径尽量不要有中文或空格，避免冲突）。
   解压后目录结构大致如下：  
   
   ```
   nginx/
   ├─ conf/         # 配置文件目录（核心是 nginx.conf）
   ├─ html/         # 样例静态文件目录
   ├─ logs/         # 日志文件
   └─ nginx.exe     # 启动程序
   ```


## 步骤1：准备静态网站文件
把你的静态网站文件（如 `index.html`、`css/`、`js/`、`images/` 等）放到一个目录下，比如：
`D:\rainincat`（假设里面有 `index.html` 作为首页）。


## 步骤2：修改 Nginx 配置文件
1. 打开配置文件 
   进入 `D:\nginx\conf` 目录，打开 `nginx.conf`。  
2. 找到 `server` 配置块，修改静态文件路径 
   默认配置中，Nginx 会加载 `html` 目录下的文件，我们需要改为自己的网站目录：  
   
   ```nginx
   server {
       listen       25905;  # 监听端口（默认80）
    	server_name  localhost;  # 访问域名（本地用localhost或127.0.0.1）
   
       # 核心：指定静态文件目录
       location / {
           root   D:/rainincat;  # 你的网站根目录（注意用 / 分隔路径）
           index  index.html index.htm;  # 默认首页文件
    	}
       # 其他默认配置保持不变（如错误页面等）
   }
   ```
   - **注意**：`root` 后的路径要用 `/` 而非 Windows 的 `\`（比如 `D:/rainincat` 而非 `D:/rainincat`）。  
   - 如果需要用其他端口（比如 8080），把 `listen 25905;` 改成 `listen 8080;` 即可。


## 步骤3：启动 Nginx 并访问网站
1. 启动 Nginx  
   - 打开 **命令提示符（CMD）** 或 **PowerShell**，进入 Nginx 目录：  
     ```cmd
     cd D:\nginx
     ```
   - 启动 Nginx：  
     ```cmd
     start nginx.exe
     ```
   - 检查是否启动成功：
     打开任务管理器，查看是否有 `nginx.exe` 进程；或访问 `http://localhost`（如果改了端口，用 `http://localhost:8080`）。  

2. 访问网站
   打开浏览器，输入 `http://localhost:25905`（配置的端口），即可看到你的静态网站首页。


## 常用 Nginx 命令（Windows）
在 Nginx 目录下执行：  

| 功能 | 命令 | 备注 |
| ---- | ---- | ---- |
| 启动 |  `start nginx.exe`    | 直接双击exe就行 |
| 强行停止 | `.\nginx.exe -s stop` | 注意加`.\`前缀 |
| 优雅停止 | `.\nginx.exe -s quit` | 处理完当前请求再停 |
| 重新加载配置 | `.\nginx.exe -s reload` | 修改 `nginx.conf` 后无需重启，执行此命令 |
| 指定配置文件 | `.\nginx -c /your/path/nginx-dev.conf` | 部分前端项目有定制化nginx配置 |
| 查看版本 | `.\nginx.exe -v` |      |


## 常见问题
### 1. 启动后访问空白/404
   - 检查 `nginx.conf` 中 `root` 路径是否正确（目录是否存在，文件是否在该目录下）。  
   - 检查端口是否被占用（比如 80 端口可能被 IIS 或其他程序占用，换个端口即可）。  

### 2. 修改配置后不生效
   - 执行 `.\nginx.exe -s reload` 重新加载配置。  
   - 如果`server_name`不是`localhost`而是其它`somename`，若不修改本机host文件，默认还是`localhost`

### 3. 如何部署多个静态网站
   - 可以在 `nginx.conf` 中配置多个 `server` 块，用不同的 `listen` 端口或 `server_name` 区分（比如一个用 80 端口，一个用 8080 端口）。
