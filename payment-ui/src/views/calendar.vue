<template>
  <CheckBtn left="年" right="月" @upCheck="changeCheck"/>
  <YearCalendar v-if="checkYear" :year="selectYear" :month="selectMonth" @upYear="upYear" @upMonth="upMonth"/>
  <MonthCalendar v-else :year="selectYear" :month="selectMonth" @upDate="upDate"/>
</template>

<script lang="ts" setup>
import YearCalendar from "@/components/show/YearCalendar.vue";
import {ref} from "vue";
import CheckBtn from "@/components/button/CheckBtn.vue";
import MonthCalendar from "@/components/show/MonthCalendar.vue";

// 获取当前年份
const selectYear = ref<number>(new Date().getFullYear());
const selectMonth = ref<number>(1);

// 更新当前年月
const upYear = (newYear: number): void => {
  selectYear.value = newYear;
}
const upMonth = (newMonth: number): void => {
  selectMonth.value = newMonth;
}
const upDate = (newYear: number, newMonth: number): void => {
  selectYear.value = newYear;
  selectMonth.value = newMonth;
}

// 切换年月的日历
const checkYear = ref<boolean>(true)
const changeCheck = (isYear: boolean): void => {
  checkYear.value = isYear
}
</script>

<style lang="sass" scoped>

</style>