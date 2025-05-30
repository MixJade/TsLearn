import {myReq} from "./myReq";
import {FileInfo} from "@/model/FileInfo";
import {Result} from "@/model/Result";

/**
 * 获取可下载的文件列表
 */
export const reqFileList = (): Promise<FileInfo[]> =>
    myReq.get<FileInfo[]>(`/api/file/getFileList`)

/**
 * 聊天页面粘贴图片触发上传
 * @param file 文件数据
 */
export const reqUpPasteImg = (file: FormData): Promise<Result> =>
    myReq.upload<Result>("/api/file/upPasteImg", file)