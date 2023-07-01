<template>
  <el-card>
    <div class="my-pet-card">
      <img src="/picture/doctor-ex.jpg" alt="医生"/>
      <div class="my-pet-info">
        <strong>{{ doctor.doctorName }}</strong>
        <br>
        {{ getAge(doctor.doctorAge) }}岁，&nbsp;{{ doctor.doctorGender ? "男" : "女" }}
        <br>
        {{ doctor.doctorJob }}
        <p>{{ doctor.doctorInfo }}</p>
        <el-button type="primary">详情</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {DoctorCardType} from "@/modal/VO/HomeVO";
import {getAge} from "@/utils/TimeUtil";
// 接收参数：医生卡片
defineProps<{
  readonly doctor: DoctorCardType
}>()
</script>

<style scoped lang="scss">
.my-pet-card {
  display: flex;

  img {
    width: 128px;
    height: 128px;
  }

  .my-pet-info {
    padding-left: 10px;
    text-align: center;
    font-size: small;
  }
}
</style>