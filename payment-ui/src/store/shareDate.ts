export interface DateStore {
    month: number;
    year: number;
}

// 这是一个全局共享变量
export const sharedDate: DateStore = {year: 2026, month: 1}