<template>
  <div>
    <PageHead>查看全部医生</PageHead>
    <el-space direction="vertical">
      <DoctorCard :card-list="doctorCardTxt.records"/>
      <el-pagination background hide-on-single-page layout="prev, pager, next" :page-size="8" :total="7"/>
    </el-space>
  </div>
</template>

<script setup lang="ts">
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import DoctorCard from "@/components/DoctorCard.vue";
import {reactive} from "vue";
import PageHead from "@/components/PageHead.vue";
import {DoctorDto, exampleDoctorSee} from "@/modal/DO/DoctorDto";

const doctorCardTxt: Page<DoctorDto> = reactive(exampleDoctorSee())
</script>

<style scoped>
</style>