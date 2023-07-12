import {Page} from "@/modal/DO/Page";

// 主页轮播图
export interface Lun {
    image: string;
    tit: string;
    text: string;
}

// 主页的公告
export interface Notice {
    noticeId: number;
    noticeTitle: string;
    textNotice: string;
}

// 常量：用户卡片
export interface UserCard {
    tit: string;
    describe: string;
    btnType: "primary" | "success" | "info";
    btnText: string;
    routerPath: string;
}

// 主页的医生卡片
export interface DoctorCardType {
    doctorId: number;
    departmentId: number;
    doctorCode: string;
    doctorName: string;
    doctorGender: boolean;
    doctorAge: string;
    doctorPhoto: string;
    doctorTel: string;
    doctorJob: string;
    doctorInfo: string;
    departmentName: string;
}

/**
 * 寄养宠物的卡片信息
 */
export interface FosterCardVO {
    fosterId: number;
    fosterCode: string;
    petId: number;
    clientId: number;
    fosterTerm: string;
    fosterMoney: number;
    fosterInfo: string;
    petName: string;
    clientName: string;
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
export const exampleFoster = (): Page<FosterCardVO> => {
    return {
        "data": [
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
            }
        ],
        "len": 20
    }
}

// 样例：公告
export const exampleNotice = (): Notice[] => {
    return [
        {
            "noticeId": 1,
            "noticeTitle": "宠物医院开业公告",
            "textNotice": "尊敬的客户，我们非常高兴地宣布宠物医院正式开业！\n作为专业的宠物健康护理机构，我们致力于提供最优质的服务。无论您需要给爱宠接种疫苗、进行体检还是治疗疾病，我们都将竭诚为您服务。\n此外，本医院还提供方便快捷的在线咨询，让您随时随地向专业兽医咨询问题，并得到及时解决。\n感谢您的信任与支持，期待在未来的日子里，能够为您和您的宝贝们带来更多的关爱和帮助。"
        },
        {
            "noticeId": 5,
            "noticeTitle": "做好宠物的疾病防治",
            "textNotice": "尊敬的宠物主人们，近期我院发现多例疾病病例，为保障您的爱宠健康，特向广大宠主发出以下防治提示：\n\n1、定期接种疫苗：请务必按时为您的宠物接种各类疫苗，包括犬、猫等常用疫苗，以免感染疾病。\n\n2、定期体检：每年至少带宠物进行一次体检，及时发现疾病问题，采取有效措施。\n\n3、干净卫生：家庭环境及饮食卫生十分重要，不要给宠物乱喂食，经常清洁宠物周围环境，避免细菌繁殖。\n\n4、慎选宠物美容店：选择正规合法的宠物美容店，确保使用安全卫生的美容器具和产品。\n\n5、注意传染性疾病：狗瘟、犬小病毒等具有较高传染性的疾病，请尽量避免带宠物到人流密集区域或与患病动物接触。\n\n我们将始终致力于为您的爱宠提供最优质的医疗服务，感谢您的支持。"
        },
        {
            "noticeId": 7,
            "noticeTitle": "开始采用宠物医院管理系统",
            "textNotice": "尊敬的宠物主人们：\n\n为了更好地服务广大宠物主人，我们宠物医院将于本周开始实施全新的管理系统。该系统旨在提高宠物就诊效率、加强医患沟通与管理，并保障宠物隐私安全。\n\n具体实施方案如下：\n\n1.采用电子病历，全面记录宠物健康档案，便于医生追踪诊疗进程和制定个性化治疗方案。\n2.增设医生挂号信息查看，方便宠物主人预约医生门诊时间，避免排队等候。\n3.加强信息安全保护，确保宠物隐私安全。\n希望广大宠物主人积极配合和支持，如有任何问题或建议，请随时联系我们的客服人员。感谢您对我们工作的信任和支持！\n\n\n重塑宠物医院\n\n日期：2023年4月4日"
        }
    ]
}

// 样例：医生卡片
export const exampleDoctor = (): Page<DoctorCardType> => {
    return {
        "data": [
            {
                "doctorId": 1,
                "departmentId": 1,
                "doctorCode": "32312221",
                "doctorName": "童德统",
                "doctorGender": true,
                "doctorAge": "1990-10-10",
                "doctorPhoto": "doctor-1.jpg",
                "doctorTel": "1114185977@qq.com",
                "doctorJob": "副院长",
                "doctorInfo": "国内著名医学专家，擅长绝育",
                "departmentName": "犬猫科"
            },
            {
                "doctorId": 2,
                "departmentId": 4,
                "doctorCode": "32301062",
                "doctorName": "爱丽丝",
                "doctorGender": false,
                "doctorAge": "2003-02-01",
                "doctorPhoto": "doctor-2.jpg",
                "doctorTel": "mix_pet_doctor@sina.com",
                "doctorJob": "麻醉科主任",
                "doctorInfo": "擅长麻醉",
                "departmentName": "美容室"
            },
            {
                "doctorId": 4,
                "departmentId": 8,
                "doctorCode": "32301063",
                "doctorName": "汤姆",
                "doctorGender": true,
                "doctorAge": "2000-01-11",
                "doctorPhoto": "doctor-3.jpg",
                "doctorTel": "1114185977@qq.com",
                "doctorJob": "医生",
                "doctorInfo": "擅长x光拍片",
                "departmentName": "中兽科"
            },
            {
                "doctorId": 5,
                "departmentId": 4,
                "doctorCode": "32301064",
                "doctorName": "张大嘴",
                "doctorGender": false,
                "doctorAge": "2002-01-05",
                "doctorPhoto": "doctor-4.jpg",
                "doctorTel": "mix_pet_doctor@sina.com",
                "doctorJob": "医生",
                "doctorInfo": "著名宠物医美专家",
                "departmentName": "美容室"
            }
        ],
        "len": 7
    }
}

// 样例2：医生全部卡片
export const exampleDoctor2 = (): Page<DoctorCardType> => {
    return {
        "data": [
            {
                "doctorId": 1,
                "departmentId": 1,
                "doctorCode": "32312221",
                "doctorName": "童德统",
                "doctorGender": true,
                "doctorAge": "1990-10-10",
                "doctorPhoto": "doctor-1.jpg",
                "doctorTel": "1114185977@qq.com",
                "doctorJob": "副院长",
                "doctorInfo": "国内著名医学专家，擅长绝育",
                "departmentName": "犬猫科"
            },
            {
                "doctorId": 2,
                "departmentId": 4,
                "doctorCode": "32301062",
                "doctorName": "爱丽丝",
                "doctorGender": false,
                "doctorAge": "2003-02-01",
                "doctorPhoto": "doctor-2.jpg",
                "doctorTel": "mix_pet_doctor@sina.com",
                "doctorJob": "麻醉科主任",
                "doctorInfo": "擅长麻醉",
                "departmentName": "美容室"
            },
            {
                "doctorId": 4,
                "departmentId": 8,
                "doctorCode": "32301063",
                "doctorName": "汤姆",
                "doctorGender": true,
                "doctorAge": "2000-01-11",
                "doctorPhoto": "doctor-3.jpg",
                "doctorTel": "1114185977@qq.com",
                "doctorJob": "医生",
                "doctorInfo": "擅长x光拍片",
                "departmentName": "中兽科"
            },
            {
                "doctorId": 7,
                "departmentId": 1,
                "doctorCode": "32312221",
                "doctorName": "童德统",
                "doctorGender": true,
                "doctorAge": "1990-10-10",
                "doctorPhoto": "doctor-1.jpg",
                "doctorTel": "1114185977@qq.com",
                "doctorJob": "副院长",
                "doctorInfo": "国内著名医学专家，擅长绝育",
                "departmentName": "犬猫科"
            },
            {
                "doctorId": 8,
                "departmentId": 4,
                "doctorCode": "32301062",
                "doctorName": "爱丽丝",
                "doctorGender": false,
                "doctorAge": "2003-02-01",
                "doctorPhoto": "doctor-2.jpg",
                "doctorTel": "mix_pet_doctor@sina.com",
                "doctorJob": "麻醉科主任",
                "doctorInfo": "擅长麻醉",
                "departmentName": "美容室"
            },
            {
                "doctorId": 9,
                "departmentId": 8,
                "doctorCode": "32301063",
                "doctorName": "汤姆",
                "doctorGender": true,
                "doctorAge": "2000-01-11",
                "doctorPhoto": "doctor-3.jpg",
                "doctorTel": "1114185977@qq.com",
                "doctorJob": "医生",
                "doctorInfo": "擅长x光拍片",
                "departmentName": "中兽科"
            },
            {
                "doctorId": 5,
                "departmentId": 4,
                "doctorCode": "32301064",
                "doctorName": "张大嘴",
                "doctorGender": false,
                "doctorAge": "2002-01-05",
                "doctorPhoto": "doctor-4.jpg",
                "doctorTel": "mix_pet_doctor@sina.com",
                "doctorJob": "医生",
                "doctorInfo": "著名宠物医美专家",
                "departmentName": "美容室"
            }
        ],
        "len": 7
    }
}