import {PaymentDict} from "@/model/entity/PaymentDict";

export interface PaymentDictVo extends PaymentDict {
    recordNum: number;
    bigTypeName: string;
    bigTypeColor: string;
    typeDesc: string;
}