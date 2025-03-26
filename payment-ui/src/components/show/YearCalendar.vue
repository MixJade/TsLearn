<template>
  <ReportBtn type="primary">消费分析</ReportBtn>
  <ReportBtn type="success">收支记录</ReportBtn>
  <ReportBtn type="warning">年度报告</ReportBtn>
  <table class="yearCalendar">
    <caption>
      <span v-if="selectedYear>2023" class="yearBtn" @click="addYear(false)">&lt;</span>
      {{ selectedYear }}
      <span v-if="selectedYear<2035" class="yearBtn" @click="addYear(true)">&gt;</span>
    </caption>
    <tbody>
    <tr v-for="monthPayVos in monthPayVoss">
      <td class="monthTd" v-for="item in monthPayVos" :key="item.month">
        <div v-if="item.moneyOut > 0"
             :class="{ selected: selectedMonth === item.month ,[getSeasonClass(item.month)]:true}" class="monthCard"
             @click="selectCard(item.month)">
          <span class="monthH">{{ item.month }}月</span>
          <p>
            <MoneyTag :income="item.money>0" :money="item.money" label="盈余"/>
          </p>
          <ul class="inOutUl">
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
            <button type="button" class="sci-btn">账单</button>
            <button type="button" class="sci-btn">分析</button>
            <button type="button" class="sci-btn" @click="downInsertSql(item.month)">导出</button>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import {MonthPayVo} from "@/model/vo/MonthPayVo";
import {ref} from "vue";
import MoneyTag from "@/components/tags/MoneyTag.vue";
import {reqCalendarMonth} from "@/request/chartApi";
import ReportBtn from "@/components/button/ReportBtn.vue";
import {reqDownInsertSql} from "@/request/payRecordApi";

const props = defineProps<{
  year: number;
  month: number;
}>()
const emits = defineEmits<{
  (e: "upYear", year: number): void;
  (e: "upMonth", month: number): void;
}>();
const monthPayVoss = ref<MonthPayVo[][]>([])
reqCalendarMonth(props.year).then(resp => {
  monthPayVoss.value = resp;
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
const getSeasonClass = (month) => {
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
 * ==================================[提示框按钮]===============================
 */
/**
 * 导出对应月份的sql文件
 * @param month 月份
 */
const downInsertSql = (month: number): void => {
  reqDownInsertSql(selectedYear.value, month);
}
</script>

<style lang="sass" scoped>
//表格样式
$table-color: #73767a
.yearCalendar
  width: 100%
  cursor: default

  caption
    margin-bottom: 6px
    font-weight: bolder
    color: $table-color

.yearBtn
  //加减年份按钮
  padding: 0 16px
  cursor: pointer

//月份卡片
.monthCard
  $monthCard-padding: 12px
  border: $table-color solid 2px
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
  color: $table-color
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

.selected
  //选中的卡片
  $selected-color: #409eff
  color: $selected-color
  border-color: $selected-color
  box-shadow: inset 0 0 12px #9fceff

//四季月份
.spring
  background-image: url('/icon/spring.svg')
  background-color: #f0f9eb

.summer
  background-image: url('/icon/summer.svg')
  background-color: #fef0f0

.autumn
  background-image: url('/icon/autumn.svg')
  background-color: #fdf6ec

.winter
  background-image: url('/icon/winter.svg')
  background-color: #ebf5ff

//==========================================[提示框样式]=====================================
.monthTd
  //提示框样式
  position: relative
  overflow: visible

  $tooltip-color: white

  .tooltip-content
    //提示框
    position: absolute
    bottom: 90%
    left: 50%
    transform: translateX(-50%) scale(0.8)
    background: $tooltip-color
    border-radius: 15px
    padding: 16px
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2)
    opacity: 0
    visibility: hidden
    transition: opacity 0.5s
    z-index: 100

    &::before
      //提示框箭头
      content: ""
      position: absolute
      bottom: -10px
      left: 50%
      transform: translateX(-50%)
      //上右下左
      border-width: 10px 10px 0 10px
      border-style: solid
      border-color: $tooltip-color transparent transparent transparent

  &:hover .tooltip-content
    opacity: 1
    visibility: visible
    transform: translateX(-50%) scale(1)

.sci-btns
  display: flex
  justify-content: space-between
  gap: 12px

  :nth-child(1)
    background-color: #67c23a

  :nth-child(2)
    background-color: #409eff

  :nth-child(3)
    background-color: #909399

  .sci-btn
    width: 48px
    height: 48px
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
