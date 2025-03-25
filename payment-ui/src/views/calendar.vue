<template>
  <h1>{{ selectYear }}-{{ selectMonth }}</h1>
  <ReportBtn type="primary">消费分析</ReportBtn>
  <ReportBtn type="success">收支记录</ReportBtn>
  <ReportBtn type="warning">年度报告</ReportBtn>
  <YearCalendar :year="selectYear" :month="selectMonth" @upYear="upYear" @upMonth="upMonth"/>
</template>

<script lang="ts" setup>
import YearCalendar from "@/components/show/YearCalendar.vue";
import {ref} from "vue";
import ReportBtn from "@/components/button/ReportBtn.vue";

const selectYear = ref<number>(2024);
const selectMonth = ref<number>(1);

const upYear = (newYear: number): void => {
  selectYear.value = newYear;
}
const upMonth = (newMonth: number): void => {
  selectMonth.value = newMonth;
}
</script>

<style lang="sass" scoped>

</style>