<template>
  <h5>{{ selectYear }}-{{ selectMonth }}</h5>
  <CheckBtn left="年" right="月" @upCheck="changeCheck"/>
  <YearCalendar v-if="checkYear" :year="selectYear" :month="selectMonth" @upYear="upYear" @upMonth="upMonth"/>
</template>

<script lang="ts" setup>
import YearCalendar from "@/components/show/YearCalendar.vue";
import {ref} from "vue";
import CheckBtn from "@/components/button/CheckBtn.vue";

// 获取当前年份
const selectYear = ref<number>(new Date().getFullYear());
const selectMonth = ref<number>(1);

const upYear = (newYear: number): void => {
  selectYear.value = newYear;
}
const upMonth = (newMonth: number): void => {
  selectMonth.value = newMonth;
}

const checkYear = ref<boolean>(true)
const changeCheck = (isYear: boolean): void => {
  checkYear.value = isYear
}
</script>

<style lang="sass" scoped>

</style>