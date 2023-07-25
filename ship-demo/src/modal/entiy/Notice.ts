export interface Notice {
    noticeId: number;
    noticeTitle: string;
    noticeFile: string;
    creatId?: number;
    createTime?: string;
    updateId?: number;
    updateTime?: string;
    isDisable?: boolean;
    isDel?: string;
}