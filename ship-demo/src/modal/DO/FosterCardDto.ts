import {FosterDto} from "@/modal/DO/FosterDto";
import {Page} from "@/modal/DO/Page";

export interface FosterCardDto extends FosterDto {
    petVariety: string;
    petSex: boolean;
    petAge: string;
    petStatus: string;
    petInfo: string;
    petPhoto: string;
}

/**
 * 样例：寄养宠物
 */
export const exampleFoster = (): Page<FosterCardDto> => {
    return {
        "records": [
            {
                "fosterId": 3,
                "fosterCode": "12301123",
                "petId": 33,
                "clientId": 2,
                "fosterTerm": "2023-07-28",
                "fosterMoney": 20000,
                "fosterInfo": "调教ing",
                "petName": "八重神子",
                "clientName": "雷军",
                "petVariety": "藏狐",
                "petSex": false,
                "petAge": "2013-01-01",
                "petStatus": "需要绝育",
                "petInfo": "这宠物十分开心",
                "petPhoto": "05b8baa0-6488-433b-848b-03bb098b256d.png"
            },
            {
                "fosterId": 4,
                "fosterCode": "12301124",
                "petId": 5,
                "clientId": 4,
                "fosterTerm": "2023-07-13",
                "fosterMoney": 300,
                "fosterInfo": "",
                "petName": "雷电小兵",
                "clientName": "狐狸",
                "petVariety": "吉娃娃",
                "petSex": true,
                "petAge": "1990-08-09",
                "petStatus": "绝育手术",
                "petInfo": "这宠物十分开心",
                "petPhoto": "a78d73bc-a557-41e0-8a8f-8ddc5c22e7ce.png"
            },
            {
                "fosterId": 5,
                "fosterCode": "12301125",
                "petId": 32,
                "clientId": 3,
                "fosterTerm": "2023-09-15",
                "fosterMoney": 200,
                "fosterInfo": "有事外出",
                "petName": "布偶二",
                "clientName": "散玉",
                "petVariety": "布偶猫",
                "petSex": true,
                "petAge": "2012-12-30",
                "petStatus": "良好",
                "petInfo": "这宠物十分开心",
                "petPhoto": "3b5d2e67-8af1-4a58-9bed-91d5876a1d97.png"
            },
            {
                "fosterId": 7,
                "fosterCode": "12301125",
                "petId": 32,
                "clientId": 3,
                "fosterTerm": "2023-09-15",
                "fosterMoney": 200,
                "fosterInfo": "有事外出",
                "petName": "布偶二",
                "clientName": "散玉",
                "petVariety": "布偶猫",
                "petSex": true,
                "petAge": "2012-12-30",
                "petStatus": "良好",
                "petInfo": "这宠物十分开心",
                "petPhoto": "3b5d2e67-8af1-4a58-9bed-91d5876a1d97.png"
            }
        ],
        "total": 20
    }
}
