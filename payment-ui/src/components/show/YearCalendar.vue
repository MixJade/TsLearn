<template>
  <ReportBtn type="success" text="收支记录" @click="toYearPayRecords"/>
  <ReportBtn type="primary" text="年度报告" @click="toYearReport"/>
  <ReportBtn type="info" text="导出sql" @click="downInsertSql(0)"/>
  <ReportBtn type="warning" text="页面简化" @click="isShowUl = !isShowUl"/>
  <table class="yearCalendar">
    <caption>
      <span v-if="selectedYear>2023" class="yearBtn" @click="addYear(false)">&lt;</span>
      {{ selectedYear }}
      <span v-if="selectedYear<2035" class="yearBtn" @click="addYear(true)">&gt;</span>
    </caption>
    <tbody>
    <tr v-for="monthPayVos in monthPayVoss">
      <td v-for="item in monthPayVos" :key="item.month" class="monthTd">
        <div v-if="item.moneyOut > 0"
             :class="{ selected: selectedMonth === item.month ,[getSeasonClass(item.month)]:isShowUl}" class="monthCard"
             @click="selectCard(item.month)">
          <span class="monthH">{{ item.month }}月</span>
          <p>
            <MoneyTag :income="item.money>0" :money="item.money" label="盈余"/>
          </p>
          <ul class="inOutUl" v-if="isShowUl">
            <li>
              <MoneyTag :income="true" :money="item.moneyIn" label="收"/>
            </li>
            <li>
              <MoneyTag :income="false" :money="item.moneyOut" label="支"/>
            </li>
          </ul>
        </div>
        <div v-else class="monthCard">
          <span class="monthH">{{ item.month }}月</span>
        </div>
        <div class="tooltip-content">
          <div class="sci-btns">
            <button class="sci-btn" type="button" @click="toMonthPayRecords(item.month)">账单</button>
            <button class="sci-btn" type="button" @click="toMonthReport(item.month)">分析</button>
            <button class="sci-btn" type="button" @click="downInsertSql(item.month)">导出</button>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import {MonthPayVo} from "@/model/chart/MonthPayVo";
import {onMounted, ref} from "vue";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import {reqCalendarMonth} from "@/request/chartApi";
import ReportBtn from "@/components/button/ReportBtn.vue";
import {reqDownInsertSql} from "@/request/payRecordApi";
import {useRouter} from "vue-router";

const props = defineProps<{
  year: number;
  month: number;
}>()
const emits = defineEmits<{
  (e: "upYear", year: number): void;
  (e: "upMonth", month: number): void;
}>();
const monthPayVoss = ref<MonthPayVo[][]>([])
onMounted(() => {
  reqCalendarMonth(props.year).then(resp => monthPayVoss.value = resp)
})
// 当前选中月份
const selectedMonth = ref<number>(props.month)
const selectCard = (month: number) => {
  selectedMonth.value = month
  emits('upMonth', month);
}
// 当前选中年份
const selectedYear = ref<number>(props.year)
const addYear = (isAdd: boolean) => {
  if (isAdd) selectedYear.value++;
  else selectedYear.value--
  emits('upYear', selectedYear.value);
  // 重新请求
  reqCalendarMonth(selectedYear.value).then(resp => {
    monthPayVoss.value = resp;
  })
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
// 是否复杂页面
const isShowUl = ref<boolean>(true)
/**
 * ==================================[路由跳转]===============================
 */
const router = useRouter();
const toYearPayRecords = (): void => {
  router.push({name: "payRecords", query: {month: selectedYear.value}})
}
const toMonthPayRecords = (month: number): void => {
  router.push({name: "payRecords", query: {month: `${selectedYear.value}-${month}`}})
}
const toYearReport = (): void => {
  router.push({name: "yearReport", query: {year: selectedYear.value}})
}
const toMonthReport = (month: number): void => {
  router.push({name: "monthReport", query: {year: selectedYear.value, month}})
}

/**
 * ==================================[提示框按钮]===============================
 */
/**
 * 导出对应月份的sql文件
 * @param month 月份
 */
const downInsertSql = (month: number): void => {
  const answer = confirm("确认下载？");
  if (answer) {
    reqDownInsertSql(selectedYear.value, month);
  }
}
</script>

<style lang="sass" scoped>
//表格样式
.yearCalendar
  width: 100%

  caption
    margin-bottom: 6px
    font-weight: bolder

.yearBtn
  //加减年份按钮
  padding: 0 16px
  cursor: pointer

//月份卡片
.monthCard
  $monthCard-padding: 12px
  border: #73767a solid 2px
  border-radius: $monthCard-padding
  position: relative
  padding: $monthCard-padding
  //背景图片
  background-repeat: no-repeat
  background-position: center
  // 设置最小宽度
  box-sizing: border-box
  min-width: 256px
  min-height: 80px
  overflow: hidden

  &:hover
    //悬停时播放波纹动画
    animation: pulse 2s infinite

  .monthH
    //标题挂在左上角
    font:
      size: large
      weight: bolder
    position: absolute
    top: 4px
    left: 4px

  .inOutUl
    //收支详情挂在右上角
    position: absolute
    right: $monthCard-padding
    top: $monthCard-padding
    font-size: smaller


@keyframes pulse
  //悬停动画
  0%
    box-shadow: 0 0 0 0 rgba(110, 142, 251, 0.4)
  70%
    box-shadow: 0 0 0 20px rgba(110, 142, 251, 0)
  100%
    box-shadow: 0 0 0 0 rgba(110, 142, 251, 0)

@mixin selected-card($color, $shadow-color, $bg-color)
  color: $color
  border-color: $color
  box-shadow: inset 0 0 12px $shadow-color
  background-color: $bg-color

.selected
  //选中的卡片
  &.spring
    @include selected-card(#67c23a, #b3e19d, #f0f9eb)

  &.summer
    @include selected-card(#f56c6c, #fab6b6, #fef0f0)

  &.autumn
    @include selected-card(#e6a23c, #f8e3c5, #fdf6ec)

  &.winter
    @include selected-card(#409eff, #9fceff, #ebf5ff)

//四季月份
.spring
  background-image: url('/icon/spring.svg')

.summer
  background-image: url('/icon/summer.svg')

.autumn
  background-image: url('/icon/autumn.svg')

.winter
  background-image: url('/icon/winter.svg')

//==========================================[提示框样式]=====================================
.monthTd
  //提示框样式
  position: relative
  overflow: visible

  $tooltip-color: white

  .tooltip-content
    //提示框
    position: absolute
    top: 70%
    left: 50%
    transform: translateX(-50%) scale(0.8)
    background: $tooltip-color
    border-radius: 15px
    padding: 8px
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2)
    opacity: 0
    visibility: hidden
    transition: opacity 0.5s
    z-index: 100

    &::before
      //提示框箭头
      content: ""
      position: absolute
      top: -8px
      left: 50%
      transform: translateX(-50%)
      //上右下左
      border-width: 0 10px 10px 10px
      border-style: solid
      border-color: transparent transparent $tooltip-color transparent

  &:hover .tooltip-content
    opacity: 1
    visibility: visible
    transform: translateX(-50%) scale(1)

.sci-btns
  display: flex
  justify-content: space-between
  gap: 8px

  :nth-child(1)
    background-color: #67c23a

  :nth-child(2)
    background-color: #409eff

  :nth-child(3)
    background-color: #909399

  .sci-btn
    width: 42px
    height: 42px
    border-radius: 50%
    border: none
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
    color: #f0f0f0
    font-weight: bold

    &:hover
      transform: translateY(-5px) scale(1.2)
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3)
</style>
