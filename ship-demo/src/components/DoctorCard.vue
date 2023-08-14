<template>
  <el-row :gutter="12">
    <el-col
        v-for="doctor in cardList"
        :key="doctor.doctorId"
        :md="6" :sm="12" :xs="24"
        style="margin-bottom: 10px"
    >
      <MyCard :data='{
        photo: "doctor-ex.jpg",
        tit: doctor.doctorName,
        age: getAge(doctor.doctorAge)+"岁",
        sex: doctor.doctorGender ? "男" : "女",
        job: doctor.doctorJob,
        info1: doctor.doctorInfo,
        info2: doctor.doctorCode,
        link:"/reception/doctorOne/"+doctor.doctorId
      }' :type="'primary'"/>
    </el-col>
  </el-row>

</template>

<script lang="ts" setup>
import {getAge} from "@/utils/TimeUtil";
import {DoctorDto} from "@/modal/DO/DoctorDto";
import MyCard from "@/components/MyCard.vue";
// 接收参数：医生卡片
defineProps<{
  readonly cardList: DoctorDto[]
}>()
</script>

<style scoped src="public/css/pet-info.css"/>