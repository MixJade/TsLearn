<template>
  <ReportBtn text="收支记录" type="success" @click="toMonthPayRecords"/>
  <ReportBtn text="消费分析" type="danger" @click="toMonthReport"/>
  <CheckBtn style="float: right" v-model="isYear" left="年" right="月" @click="toBack"/>
  <table class="monthCalendar">
    <caption>
      <span v-if="selDate.year>2022" class="monthBtn" @click="addMonth(false)">&lt;</span>
      {{ selDate.year }}-{{ selDate.month }}
      <span v-if="selDate.year<2035" class="monthBtn" @click="addMonth(true)">&gt;</span>
    </caption>
    <thead>
    <tr>
      <th>一</th>
      <th>二</th>
      <th>三</th>
      <th>四</th>
      <th>五</th>
      <th>六</th>
      <th>七</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="dayPayVos in dayPayVoss">
      <td v-for="item in dayPayVos" :key="item.payDate">
        <div v-if="item.currentMonth" :class="getSeasonClass(selDate.month)"
             :style="{ backgroundColor: calcOutBgColor(item.moneyOut) }"
             :title="item.payDate"
             class="dayCard" @click="toDayPayRecords(item.payDate)">
          <span class="dayH">{{ item.dayNum }}<br></span>
          <ul>
            <li class="payCount">{{ item.payCount }}rec</li>
            <li :class="{ noShow: item.moneyIn===0}">
              <MoneyTag :income="true" :money="item.moneyIn"/>
            </li>
            <li :class="{ noShow: item.moneyOut===0}">
              <MoneyTag :income="false" :money="item.moneyOut"/>
            </li>
          </ul>
          <svg v-if="item.moneyIn!==0" :style="{ opacity: calcInOpacity(item.moneyIn) }" class="in-angle" height="28"
               width="28" xmlns="http://www.w3.org/2000/svg">
            <polygon fill="#c45656" points="2,2 26,26 2,26" stroke="#c45656" stroke-width="2"/>
          </svg>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import {reqCalendarDay} from "@/request/chartApi";
import ReportBtn from "@/components/button/ReportBtn.vue";
import CheckBtn from "@/components/button/CheckBtn.vue";
import {DayPayVo} from "@/model/chart/DayPayVo";
import {useRouter} from "vue-router";
import {DateStore, sharedDate} from "@/store/shareDate";

const isYear = ref(false);
const dayPayVoss = ref<DayPayVo[][]>([])
onMounted(() => {
  reqCalendarDay(sharedDate.year, sharedDate.month).then(resp => dayPayVoss.value = resp)
})
// 当前选中年月
const selDate: DateStore = reactive({year: sharedDate.year, month: sharedDate.month})

const addMonth = (isAdd: boolean) => {
  if (isAdd) {
    if (selDate.month === 12) {
      selDate.month = 1
      selDate.year++;
    } else selDate.month++;
  } else {
    if (selDate.month === 1) {
      selDate.month = 12
      selDate.year--;
    } else selDate.month--;
  }
  sharedDate.year = selDate.year
  sharedDate.month = selDate.month
  // 重新请求
  reqCalendarDay(selDate.year, selDate.month).then(resp => dayPayVoss.value = resp)
}

// 四季月份的动态class
const getSeasonClass = (month: number): string => {
  if ([3, 4, 5].includes(month)) {
    return 'spring';
  } else if ([6, 7, 8].includes(month)) {
    return 'summer';
  } else if ([9, 10, 11].includes(month)) {
    return 'autumn';
  } else {
    return 'winter';
  }
};

/**
 * 动态设置背景颜色深浅
 * @param money 支出的钱(绝对值)
 */
const calcOutBgColor = (money: number): string => {
  // 如果数字超过 600，将其设为 600
  const cappedNum = Math.min(money, 600);
  // 保留两位小数
  const factor = parseFloat((cappedNum / 600).toFixed(2));
  return `rgb(115, 118, 122, ${factor})`;
}
/**
 * 动态设置透明度
 * @param money 收入的钱
 */
const calcInOpacity = (money: number): number => {
  return parseFloat((Math.min(money, 2000) / 2000).toFixed(2));
}

/**
 * ==================================[路由跳转]===============================
 */
const router = useRouter();
const toMonthPayRecords = (): void => {
  router.push({name: "payRecords", query: {month: `${selDate.year}-${selDate.month}`}})
}
const toDayPayRecords = (day: string): void => {
  router.push({name: "payRecords", query: {month: day}})
}
const toMonthReport = (): void => {
  router.push("/monthReport")
}
const toBack = (): void => {
  router.push("/")
}
</script>

<style lang="sass" scoped>
.monthCalendar
  width: 100%
  border-collapse: collapse

  td
    border: 2px solid #909399

  th
    border: 2px solid #909399
    color: #f8f9fa
    padding: 4px
    background-color: #409eff

  tr th:nth-last-child(-n + 2)
    background-color: #67c23a

  caption
    margin-bottom: 6px
    font-weight: bolder


.dayCard
  position: relative
  min-height: 48px
  min-width: 108px
  //子元素右对齐
  display: flex
  justify-content: flex-end
  //背景图片
  background-repeat: no-repeat
  background-position: center

  .dayH
    //标题挂在左上角
    position: absolute
    top: 4px
    left: 4px
    //标题字号
    font:
      size: large
      weight: bolder

ul
  //收支列表
  padding: 4px
  margin: 4px
  list-style: none
  text-align: right

  .payCount
    font-size: smaller
    font-weight: bolder
    color: #e6a23c

  .noShow
    // 不展示收入支出
    opacity: 0

//四季月份
.spring:hover
  background-image: url('/icon/spring.svg')

.summer:hover
  background-image: url('/icon/summer.svg')

.autumn:hover
  background-image: url('/icon/autumn.svg')

.winter:hover
  background-image: url('/icon/winter.svg')

.in-angle
  //收入指示器定位
  position: absolute
  bottom: 0
  left: 0
</style>
