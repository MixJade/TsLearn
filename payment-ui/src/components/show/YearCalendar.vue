<template>
  <table class="yearCalendar">
    <tbody>
    <tr v-for="monthPayVos in monthPayVoss">
      <td v-for="item in monthPayVos" :key="item.month">
        <div :class="{ selected: selectedMonth === item.month }" class="monthCard" @click="selectCard(item.month)">
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

let year = 2024;
const monthPayVoss = ref<MonthPayVo[][]>([])
reqCalendarMonth(year).then(resp => {
  monthPayVoss.value = resp;
})
// 当前选中月份
const selectedMonth = ref<number>(-1)
const selectCard = (month: number) => {
  selectedMonth.value = month
}
</script>

<style lang="sass" scoped>
//表格样式
.yearCalendar
  width: 100%

//月份卡片
.monthCard
  $monthCard-padding: 12px
  $monthCard-color: #73767a
  border: $monthCard-color solid 3px
  border-radius: $monthCard-padding
  position: relative
  padding: $monthCard-padding
  // 设置最小宽度
  box-sizing: border-box
  min-width: 256px
  color: $monthCard-color

  .monthH
    font:
      size: large
      weight: bolder
    //标题挂在左上角
    position: absolute
    top: 4px
    left: 4px

  .inOutUl
    //收支详情挂在右上角
    position: absolute
    right: $monthCard-padding
    top: $monthCard-padding
    font-size: smaller

.selected
  //选中的卡片
  $selected-color: #409eff
  color: $selected-color
  border-color: $selected-color
  box-shadow: inset 0 0 12px #9fceff
</style>
