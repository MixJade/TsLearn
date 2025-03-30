export interface PaymentRecord {
    recordId: number;
    paymentType: number;
    isIncome: boolean;
    money: number;
    payDate: string;
    remark: string;
}