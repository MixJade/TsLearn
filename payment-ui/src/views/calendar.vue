<template>
  <h1>{{ selectYear }}-{{ selectMonth }}</h1>
  <YearCalendar :year="selectYear" :month="selectMonth" @upYear="upYear" @upMonth="upMonth"/>
</template>

<script lang="ts" setup>
import YearCalendar from "@/components/show/YearCalendar.vue";
import {ref} from "vue";

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