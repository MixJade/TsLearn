export interface PayRecordVo {
    recordId: number;
    paymentType: number;
    isIncome: boolean;
    money: number;
    payDate: string;
    remark: string;
    keyName: string;
    bigType: number;
}