/**
 * 个人信息
 */
export interface Client {
    clientId: number;
    clientUsername: string;
    clientPassword: string;
    clientName: string;
    clientGender: boolean;
    clientTel: string;
    clientAge: string;
    clientInfo: string;
    clientPhoto: string;
    createTime: string;
    updateTime: string;
    isDel: string;
}

export const exampleClient = ():Client => {
  return {
      "clientId": 1,
      "clientUsername": "ying",
      "clientPassword": "6b6864bf70c40ccbc2752cd9ef11e77b",
      "clientName": "莹",
      "clientGender": false,
      "clientTel": "sanyu0201@163.com",
      "clientAge": "2001-01-03",
      "clientInfo": "来自提瓦特❥(^_-)",
      "clientPhoto": "ying.jpg",
      "createTime": "2022-12-21T19:24:32",
      "updateTime": "2023-03-02T19:52:19",
      "isDel": "0"
  }
}