import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {SourceCategory} from "@/model/entity/SourceCategory";
import {SourceCateVo} from "@/model/vo/SourceCateVo";
import {CateLabelVo} from "@/model/vo/CateLabelVo";


/**
 * 查询图源文件夹表
 * @param pageNum 页码
 * @param pageSize 页面大小
 */
export const reqSourceCatePage = (pageNum: number, pageSize: number): Promise<IPage<SourceCateVo>> =>
    myReq.get<IPage<SourceCateVo>>(`/api/sourceCategory/page?pageNum=${pageNum}&pageSize=${pageSize}`)

/**
 * 向文件夹表新增
 * @param data 请求体
 */
export const reqAddCate = (data: SourceCategory): Promise<Result> =>
    myReq.post<Result>(`/api/sourceCategory`, data)

/**
 * 向文件夹表修改
 * @param data 请求体
 */
export const reqUpdCate = (data: SourceCategory): Promise<Result> =>
    myReq.put<Result>(`/api/sourceCategory`, data)

/**
 * 向文件夹表删除
 * @param id 记录主键
 */
export const reqDelCate = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/sourceCategory/${id}`)

/**
 * 查询题源分类的下拉框
 */
export const reqCateLabel = (): Promise<CateLabelVo[]> =>
    myReq.get<CateLabelVo[]>('/api/sourceCategory/label')
