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