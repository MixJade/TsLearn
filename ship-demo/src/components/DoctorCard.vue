<template>
  <el-row :gutter="12">
    <el-col
        v-for="doctor in cardList"
        :key="doctor.doctorId"
        :md="6" :sm="12" :xs="24"
        style="margin-bottom: 10px"
    >
      <el-card>
        <div class="my-pet-card">
          <img alt="医生" src="/picture/doctor-ex.jpg"/>
          <div class="my-pet-info">
            <strong>{{ doctor.doctorName }}</strong>
            <br>
            {{ getAge(doctor.doctorAge) }}岁，&nbsp;{{ doctor.doctorGender ? "男" : "女" }}
            <br>
            {{ doctor.doctorJob }}
            <p>{{ doctor.doctorInfo }}</p>
            <el-button type="primary" @click="this.$router.push('/reception/doctorOne/'+doctor.doctorId)">详情
            </el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import {getAge} from "@/utils/TimeUtil";
import {DoctorDto} from "@/modal/DO/DoctorDto";
// 接收参数：医生卡片
defineProps<{
  readonly cardList: DoctorDto[]
}>()
</script>

<style lang="scss" scoped>
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