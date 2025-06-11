import {myReq} from "@/request/myReq";
import {Result} from "@/model/vo/Result";
import {IPage} from "@/model/vo/IPage";
import {ImageSource} from "@/model/entity/ImageSource";
import {ImgSourceDto} from "@/model/dto/ImgSourceDto";
import {ImgSourceVo} from "@/model/vo/ImgSourceVo";


/**
 * 查询图源表
 */
export const reqImgSourcePage = (pageNum: number, pageSize: number, data: ImgSourceDto): Promise<IPage<ImgSourceVo>> =>
    myReq.post<IPage<ImgSourceVo>>(`/api/imageSource/page?pageNum=${pageNum}&pageSize=${pageSize}`, data)

/**
 * 向图源表新增
 * @param data 请求体
 */
export const reqAddImg = (data: ImageSource): Promise<Result> =>
    myReq.post<Result>(`/api/imageSource`, data)

/**
 * 向图源表修改
 * @param data 请求体
 */
export const reqUpdImg = (data: ImageSource): Promise<Result> =>
    myReq.put<Result>(`/api/imageSource`, data)

/**
 * 向图源表删除
 * @param id 记录主键
 */
export const reqDelImg = (id: number): Promise<Result> =>
    myReq.delete<Result>(`/api/imageSource/${id}`)

/**
 * 上传图片
 * @param file 图片数据
 * @param cateId 文件夹主键
 */
export const reqUploadImg = (file: FormData, cateId: number): Promise<Result> =>
    myReq.upload<Result>(`/api/imageSource/uploadImg?cateId=${cateId}`, file)

/**
 * ocr识别
 * @param id 记录主键
 */
export const reqOcrImg = (id: number): Promise<Result> =>
    myReq.get<Result>(`/api/imageSource/ocr/${id}`)
