export const myReq = {
    get<T>(url: string): Promise<T> {
        return fetch(url)
            .then(response => {
                return response.json();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
};