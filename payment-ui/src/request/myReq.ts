export const myReq = {
    get<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    delete<T>(url: string): Promise<T> {
        return fetch(url, {method: 'DELETE'})
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    post<T>(url: string, data: any): Promise<T> {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    put<T>(url: string, data: any): Promise<T> {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    },

    async down(url: string, fileName: string): Promise<void> {
        try {
            // 发起 fetch 请求
            const response = await fetch(url);
            // 检查响应状态
            if (!response.ok) {
                console.error('Error:', response.status);
            }
            // 获取响应的二进制数据
            const blob = await response.blob();
            // 创建临时 URL
            const urlObject = URL.createObjectURL(blob);
            // 创建 a 元素
            const link = document.createElement('a');
            link.href = urlObject;
            // 设置下载文件名
            link.download = fileName;
            // 模拟点击下载
            link.click();
            // 释放临时 URL
            URL.revokeObjectURL(urlObject);
        } catch (error) {
            console.error('下载文件时出错:', error);
        }
    },
    upload<T>(url: string, file: FormData): Promise<T> {
        // 浏览器会自动为FormData设置正确的Content-Type头，且会包含一个边界字符串
        return fetch(url, {
            method: 'POST',
            body: file,
        })
            .then(response => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }
};