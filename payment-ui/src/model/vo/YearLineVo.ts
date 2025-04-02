export interface YearLineVo {
    yearMoney: YearPayDo;
    moneyOut: number[];
    moneyIn: number[];
    money: number[];
}

export interface YearPayDo {
    moneyOut: number;
    moneyIn: number;
    money: number;
    monthAvgMoneyIn: number;
    monthAvgMoneyOut: number;
    monthAvgMoney: number;
}