export const myReq = {
    text(url: string): Promise<string> {
        return fetch(url)
            .then(response => response.text())
    },
    get<T>(url: string): Promise<T> {
        return fetch(url)
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