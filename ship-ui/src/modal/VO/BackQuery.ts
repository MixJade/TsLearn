/**
 * 查询时的分页参数
 */
interface PageQuery {
    numPage: number
    pageSize: number
}

/**
 * 宠物列表的查询参数
 */
export interface YPetList extends PageQuery {
    petName: string
    clientName: string
}

/**
 * 用户列表的查询参数
 */
export interface YClientList extends PageQuery {
    clientName: string
}