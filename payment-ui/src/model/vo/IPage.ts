// 分页对象
export interface IPage<T> {
    records: Array<T>;
    total: number;
    current: number;
    pages: number;
}