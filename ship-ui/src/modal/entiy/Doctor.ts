/**
 * 单个医生
 */
export interface Doctor {
    doctorId: number;
    departmentId?: number | null;
    doctorCode: string;
    doctorName: string;
    doctorGender: boolean;
    doctorAge: string;
    doctorPhoto: string;
    doctorTel: string;
    doctorJob: string;
    doctorInfo: string;
    doctorPassword?: any;
    createTime?: any;
    updateTime?: any;
    isDel?: any;
    departmentName: string;
}

/**
 * 医生详情的示例
 */
export const exampleDoctorDetail = (doctorId: number): Doctor => {
    console.log("所接收的医生ID是", doctorId)
    return {
        "doctorId": 1,
        "departmentId": null,
        "doctorCode": "32312221",
        "doctorName": "童德统",
        "doctorGender": true,
        "doctorAge": "1990-10-10",
        "doctorPhoto": "doctor-1.jpg",
        "doctorTel": "1114185977@qq.com",
        "doctorJob": "副院长",
        "doctorInfo": "国内著名医学专家，擅长绝育",
        "doctorPassword": null,
        "createTime": null,
        "updateTime": null,
        "isDel": null,
        "departmentName": "犬猫科"
    }
}