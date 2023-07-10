/**
 * 宠物详情
 */
export interface pet {
    petId: number;
    petName: string;
    petVariety: string;
    petSex: boolean;
    petAge: string;
    petStatus: string;
    petInfo: string;
    clientId?: number | null;
    petPhoto: string;
    createTime: string;
    updateTime: string;
    isDel: string;
}

/**
 * 宠物详情的示例
 */
export const examplePetDetail = (petId: number): pet => {
    console.log("所接收的宠物ID是", petId)
    return {
        "petId": 7,
        "petName": "波一斯",
        "petVariety": "波斯猫",
        "petSex": false,
        "petAge": "2016-12-15",
        "petStatus": "频繁掉毛",
        "petInfo": "等待有缘人领养",
        "clientId": null,
        "petPhoto": "boss-cat.jpg",
        "createTime": "2022-12-23T11:03:06",
        "updateTime": "2023-02-18T14:28:14",
        "isDel": "0"
    }
}