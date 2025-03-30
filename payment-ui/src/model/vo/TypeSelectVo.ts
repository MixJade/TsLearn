import {TypeSelectTwoVo} from "@/model/vo/TypeSelectTwoVo";

export interface TypeSelectVo {
    oneKey: number;
    oneValue: string;
    twoList: Array<TypeSelectTwoVo>;
}