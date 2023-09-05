<template>
  <MyRow>
    <MyCard
        v-for="doctor in cardList"
        :key="doctor.doctorId"
        :data='{
        photo: "doctor-ex.jpg",
        tit: doctor.doctorName,
        age: getAge(doctor.doctorAge)+"岁",
        sex: doctor.doctorGender ? "男" : "女",
        job: doctor.doctorJob,
        info1: doctor.doctorInfo,
        info2: "帐号："+doctor.doctorCode,
        link:"/reception/doctorOne/"+doctor.doctorId
      }' :type="'primary'"/>
  </MyRow>
</template>

<script lang="ts" setup>
import {getAge} from "@/utils/TimeUtil";
import {DoctorDto} from "@/modal/DO/DoctorDto";
import MyCard from "@/components/card/MyCard.vue";
import MyRow from "@/components/row/MyRow.vue";
// 接收参数：医生卡片
defineProps<{
  readonly cardList: DoctorDto[]
}>()
</script>

<style scoped>
</style>
