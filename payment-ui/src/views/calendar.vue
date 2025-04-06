<template>
  <CheckBtn v-model="checkYear" left="年" right="月"/>
  <YearCalendar v-if="checkYear" :month="selectMonth" :year="selectYear" @upMonth="upMonth" @upYear="upYear"/>
  <MonthCalendar v-else :month="selectMonth" :year="selectYear" @upDate="upDate"/>
</template>

<script lang="ts" setup>
import {defineAsyncComponent, onMounted, ref} from "vue";
import CheckBtn from "@/components/button/CheckBtn.vue";
import {useRoute} from "vue-router";
import MonthCalendar from "@/components/show/MonthCalendar.vue";
// 延迟加载组件
const YearCalendar = defineAsyncComponent(() => import("@/components/show/YearCalendar.vue"));

onMounted(() => {
  // 如此获取路由传参
  const route = useRoute();
  if (typeof route.query.date === 'string') {
    selectYear.value = parseInt(route.query.date, 10);
    const dateStr: string[] = route.query.date.split("-");
    if (dateStr.length === 2) {
      // 有年+月
      selectMonth.value = parseInt(dateStr[1])
    } else if (dateStr.length === 3) {
      // 有年+月+日
      selectMonth.value = parseInt(dateStr[1])
      checkYear.value = false;
    }
  }
})

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