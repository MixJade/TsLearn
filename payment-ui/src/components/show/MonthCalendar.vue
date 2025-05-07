<template>
  <ReportBtn text="收支记录" type="success" @click="toMonthPayRecords"/>
  <ReportBtn text="消费分析" type="primary" @click="toMonthReport"/>
  <ReportBtn text="导出sql" type="info" @click="downInsertSql"/>
  <table class="monthCalendar">
    <caption>
      <span v-if="selDate.year>2023" class="monthBtn" @click="addMonth(false)">&lt;</span>
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
        <div v-if="item.currentMonth" :class="getSeasonClass(selDate.month)" :title="item.payDate"
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
import {DayPayVo} from "@/model/chart/DayPayVo";
import {useRouter} from "vue-router";
import {reqDownInsertSql} from "@/request/payRecordApi";

const props = defineProps<{
  year: number;
  month: number;
}>()
const emits = defineEmits<{
  (e: "upDate", year: number, month: number): void;
}>();
const dayPayVoss = ref<DayPayVo[][]>([])
onMounted(() => {
  reqCalendarDay(props.year, props.month).then(resp => dayPayVoss.value = resp)
})
// 当前选中年月
const selDate: { year: number; month: number } = reactive({year: props.year, month: props.month})

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
  emits('upDate', selDate.year, selDate.month);
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
 * 导出对应月份的sql文件
 */
const downInsertSql = (): void => {
  const answer = confirm("确认下载？");
  if (answer) {
    reqDownInsertSql(selDate.year, selDate.month);
  }
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
  router.push({name: "monthReport", query: {year: selDate.year, month: selDate.month}})
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
</style>
