<template>
  <el-page-header @back="this.$router.back()">
    <template #content>
      <span class="text-large font-600 mr-3"> 查看所有待领养宠物 </span>
    </template>
    <div class="mt-4 text-sm font-bold">
      <p></p>
    </div>
  </el-page-header>
  <el-space direction="vertical">
    <el-row :gutter="12">
      <el-col
          v-for="o in doctorCardTxt.data"
          :key="o.doctorId"
          :xs="24" :sm="12" :md="6"
          style="margin-bottom: 10px"
      >
        <DoctorCard :doctor="o"/>
      </el-col>
    </el-row>
    <el-pagination background layout="prev, pager, next" :page-size="8" :total="7"/>
  </el-space>
</template>

<script setup lang="ts">
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {exampleDoctor2, DoctorCardType} from "@/modal/VO/HomeVO";
import DoctorCard from "@/components/DoctorCard.vue";
import {reactive} from "vue";

const doctorCardTxt: Page<DoctorCardType> = reactive(exampleDoctor2())
</script>

<style scoped>
</style>