import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {SourceImage} from "@/model/entity/SourceImage";
import {SourceImgDto} from "@/model/dto/SourceImgDto";
import {SourceImgVo} from "@/model/vo/SourceImgVo";


/**
 * 查询图源表
 */
export const reqImgSourcePage = (pageNum: number, pageSize: number, data: SourceImgDto): Promise<IPage<SourceImgVo>> =>
    myReq.post<IPage<SourceImgVo>>(`/api/sourceImage/page?pageNum=${pageNum}&pageSize=${pageSize}`, data)

/**
 * 查询单个图片
 * @param id 记录主键
 */
export const reqOneImg = (id: number): Promise<SourceImage> =>
    myReq.get<SourceImage>(`/api/sourceImage/${id}`)

/**
 * 向图源表新增
 * @param data 请求体
 */
export const reqAddImg = (data: SourceImage): Promise<Result> =>
    myReq.post<Result>(`/api/sourceImage`, data)

/**
 * 向图源表修改
 * @param data 请求体
 */
export const reqUpdImg = (data: SourceImage): Promise<Result> =>
    myReq.put<Result>(`/api/sourceImage`, data)

/**
 * 向图源表删除
 * @param id 记录主键
 */
export const reqDelImg = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/sourceImage/${id}`)

/**
 * 上传图片
 * @param file 图片数据
 * @param cateId 文件夹主键
 */
export const reqUploadImg = (file: FormData, cateId: number): Promise<Result> =>
    myReq.upload<Result>(`/api/sourceImage/uploadImg?cateId=${cateId}`, file)

/**
 * ocr识别
 * @param id 记录主键
 */
export const reqOcrImg = (id: number): Promise<Result> =>
    myReq.get<Result>(`/api/sourceImage/ocr/${id}`)
