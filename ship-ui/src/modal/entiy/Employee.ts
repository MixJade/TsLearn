/**
 * 管理员信息表
 */
export interface Employee {
    employeeId: number;
    employeeUsername: string;
    employeePassword: string;
    employeeName: string;
    employeeLevel: number;
    employeeTel: string;
    employeePhoto: string;
    createTime: string;
    updateTime: string;
    isDel: string;
}

/**
 * 登录的管理员信息
 */
export const exampleEmployee = (): Employee => {
    return {
        "employeeId": 2,
        "employeeUsername": "yun",
        "employeePassword": "$2a$10$isx1czTSQaNBZiYiwo/TjuEb40VFhH6VqAXOsHfFK39ls.DxziPye",
        "employeeName": "李云",
        "employeeLevel": 4,
        "employeeTel": "13882244666",
        "employeePhoto": "doctor-1.jpg",
        "createTime": "2023-01-05T21:34:23",
        "updateTime": "2023-03-02T23:01:21",
        "isDel": "0"
    }
}