<template>
  <el-card shadow="always" v-for="a in appointList" :key="a.appointmentId">
    <template #header>
      <div>
        <span>单号：{{ a.appointmentId }}</span>
      </div>
    </template>
    <ul style="list-style: none">
      <li><span>就诊时间：</span>{{ moveT(a.appointmentDate) }}</li>
      <li><span>就诊宠物：</span>{{ a.petName }}</li>
      <li><span>科室：</span>{{ a.departmentName }}&nbsp;<span>医生：</span>{{ a.doctorName }}</li>
      <li><span>描述：</span>{{ a.appointmentInfo }}</li>
      <li><span>挂号时间:{{ moveT(a.createTime) }}</span></li>
    </ul>
  </el-card>
</template>

<script setup lang="ts">
import {exampleClientAppoint} from "@/modal/entiy/Appoint";
import {moveT} from "@/utils/TimeUtil";

const appointList = exampleClientAppoint()
</script>

<style scoped lang="scss">
.el-card {
  margin-left: 5px;

  span {
    font-size: small;
  }
}
</style>