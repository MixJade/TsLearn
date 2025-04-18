import {myReq} from "./myReq";
import {FileInfo} from "@/model/FileInfo";

/**
 * 获取可下载的文件列表
 */
export const reqFileList = (): Promise<FileInfo[]> =>
    myReq.get<FileInfo[]>(`/api/file/getFileList`)