<template>
  <CheckBtn v-model="checkYear" left="年" right="月"/>
  <YearCalendar v-if="checkYear" :month="selectMonth" :year="selectYear" @upMonth="upMonth" @upYear="upYear"/>
  <MonthCalendar v-else :month="selectMonth" :year="selectYear" @upDate="upDate"/>
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
</script>

<style lang="sass" scoped>

</style>