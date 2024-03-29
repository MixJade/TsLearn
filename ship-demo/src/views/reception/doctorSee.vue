<template>
  <div class="my-space">
    <PageHead>查看全部医生</PageHead>
    <DoctorCard :card-list="doctorCardTxt.records"/>
    <el-pagination :page-size="8" :total="7" background hide-on-single-page layout="prev, pager, next"/>
  </div>
</template>

<script lang="ts" setup>
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import DoctorCard from "@/components/zoneView/DoctorCard.vue";
import {reactive} from "vue";
import PageHead from "@/components/row/PageHead.vue";
import {DoctorDto, exampleDoctorSee} from "@/modal/DO/DoctorDto";

const doctorCardTxt: Page<DoctorDto> = reactive(exampleDoctorSee())
</script>

<style scoped src="public/css/my-space.css"/>
