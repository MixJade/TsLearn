export interface DateStore {
    month: number;
    year: number;
}

// 这是一个全局共享变量,默认为2025-1
export const sharedDate: DateStore = {year: 2025, month: 1}