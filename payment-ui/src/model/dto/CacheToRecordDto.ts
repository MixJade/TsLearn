import {PaymentRecord} from "@/model/entity/PaymentRecord";

export interface CacheToRecordDto extends PaymentRecord {
    cacheId: number;
}