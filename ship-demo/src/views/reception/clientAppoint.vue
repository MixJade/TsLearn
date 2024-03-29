<template>
  <div class="pa-card" v-for="a in appointList" :key="a.appointmentId">
    <div class="card-tit">
      <span>单号：{{ a.appointmentId }}</span>
    </div>
    <el-descriptions :column="3" :title="'就诊时间：'+ moveT(a.appointmentDate)" border>
      <el-descriptions-item
          align="center"
          label="宠物"
          label-align="right">
        {{ a.petName }}
      </el-descriptions-item>
      <el-descriptions-item align="center" label="科室" label-align="right">
        <el-tag>{{ a.departmentName }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item align="center" label="医生" label-align="right">
        {{ a.doctorName }}
      </el-descriptions-item>
      <el-descriptions-item align="center" label="描述" label-align="right">
        {{ a.appointmentInfo }}
      </el-descriptions-item>
      <el-descriptions-item align="center" label="挂号时间" label-align="right">
        {{ moveT(a.createTime) }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import {exampleClientAppoint} from "@/modal/DO/AppointDto";
import {moveT} from "@/utils/TimeUtil";

const appointList = exampleClientAppoint()
</script>

<style scoped>
@import url("/css/pa-card.css");
</style>
