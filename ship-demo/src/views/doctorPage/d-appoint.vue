<template>
  <div>
    <PageHead>查看挂号</PageHead>
    <MyRow>
      <AppointCard v-for="a in appoint" :key="a.appointmentId" :a="a" @toSuc="toSuc"/>
    </MyRow>
  </div>
</template>

<script lang="ts" setup>
import PageHead from "@/components/PageHead.vue";
import MyRow from "@/components/show/MyRow.vue";
import {exampleAppointDto2} from "@/modal/DO/AppointDto2";
import AppointCard from "@/components/card/AppointCard.vue";

const appoint = exampleAppointDto2();
const toSuc = () => {
  alert("Good")
}
</script>

<style lang="scss" scoped>
</style>
