<template>
  <div>
    <PageHead>查看全部医生</PageHead>
    <el-space direction="vertical">
      <DoctorCard :card-list="doctorCardTxt.data"/>
      <el-pagination background layout="prev, pager, next" :page-size="8" :total="7"/>
    </el-space>
  </div>
</template>

<script setup lang="ts">
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {exampleDoctor2, DoctorCardType} from "@/modal/VO/HomeVO";
import DoctorCard from "@/components/DoctorCard.vue";
import {reactive} from "vue";
import PageHead from "@/components/PageHead.vue";

const doctorCardTxt: Page<DoctorCardType> = reactive(exampleDoctor2())
</script>

<style scoped>
</style>