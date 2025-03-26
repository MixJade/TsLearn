<template>
  <h1>{{ selectYear }}-{{ selectMonth }}</h1>
  <button type="button" @click="callChildMethod">调用父组件</button>
  <YearCalendar :year="selectYear" :month="selectMonth" @upYear="upYear" @upMonth="upMonth"/>
</template>

<script lang="ts" setup>
import YearCalendar from "@/components/show/YearCalendar.vue";
import {inject, ref} from "vue";

// 获取当前年份
const selectYear = ref<number>(new Date().getFullYear());
const selectMonth = ref<number>(1);

const upYear = (newYear: number): void => {
  selectYear.value = newYear;
}
const upMonth = (newMonth: number): void => {
  selectMonth.value = newMonth;
}

// 注入父组件提供的函数
const countSymbol = inject('countSymbol');
const callChildMethod = () => {
  // 使用注入的函数
  if (countSymbol) {
    countSymbol("123");
  }
};
</script>

<style lang="sass" scoped>

</style>