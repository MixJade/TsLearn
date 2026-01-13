# Nginx前后端跨域

> 2026-01-12 18:05:02

## 配置参考

* 修改nginx自带的`nginx.conf`文件
* 为了方便参考，放出完整配置文件，实际只更改`server`块
* 启动nginx后，访问`http://localhost:23802/demo-ui`即可实现前后端跨域开发

```nginx
worker_processes  1;
events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    # Nginx服务器配置
    server {
        # 监听端口（与前后端的端口区分开）
        listen 23802;
        # 服务器域名（本地开发可填 localhost 或 127.0.0.1）
        server_name localhost;

        # ******** 核心1：反向代理配置（转发前端请求到后端）********
        location /f-demo/ {
            # 转发到真实的后端服务地址（末尾必须带 /，保持路径拼接一致性）
            proxy_pass http://127.0.0.1:9129/f-demo/;
        }

        location /gate/ {
            proxy_pass http://192.168.1.222:8070/gate/;
        }

        location /f-user/ {
            proxy_pass http://192.168.1.222:8070/f-user/;
        }

        # ******** 核心2：跨域响应头配置（解决OPTIONS预检请求等问题）********
        # 匹配所有请求，添加跨域允许头
        # 允许所有来源跨域（开发环境可用，生产环境建议指定具体域名如 http://localhost:8080）
        add_header Access-Control-Allow-Origin *;
        # 允许的HTTP请求方法
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        # 允许的请求头（如Token、Content-Type等）
        add_header Access-Control-Allow-Headers Content-Type,Authorization;
        # 处理OPTIONS预检请求（浏览器复杂跨域请求会先发送OPTIONS预检，无需转发到后端，直接返回200）
        if ($request_method = OPTIONS) {
            # 204 No Content，快速响应预检请求
            return 204;
        }

        # ******** 核心3：反向代理前端服务********
        location /demo-ui/ {
            proxy_pass http://localhost:8081/demo-ui/;
        }
    }
}

```

## 注意事项

1. 错误日志查看：在`nginx`的`logs`文件夹下的`error.log`
2. 所有命令结尾加分号，不然不会被算结束
3. 转发的地址结尾要有斜杠