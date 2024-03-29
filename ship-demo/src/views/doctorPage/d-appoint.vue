<template>
  <div>
    <PageHead>查看挂号</PageHead>
    <ShakeBtn style="margin-left: 80px">添加挂号</ShakeBtn>
    <MyRow>
      <AppointCard v-for="a in appoint" :key="a.appointmentId" :a="a" @toSuc="toSuc"/>
    </MyRow>
  </div>
</template>

<script lang="ts" setup>
import PageHead from "@/components/row/PageHead.vue";
import MyRow from "@/components/row/MyRow.vue";
import {exampleAppointDto2} from "@/modal/DO/AppointDto2";
import AppointCard from "@/components/card/AppointCard.vue";
import ShakeBtn from "@/components/button/ShakeBtn.vue";

const appoint = exampleAppointDto2();
const toSuc = () => {
  alert("Good")
}
</script>

<style lang="scss" scoped>
</style>
