<template>
  <PageHead>查看全部宠物</PageHead>
  <el-space direction="vertical">
    <PetCard :card-list="petCardTxt.data"/>
    <el-pagination background layout="prev, pager, next" :page-size="8" :total="20"/>
  </el-space>
</template>

<script setup lang="ts">
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {examplePet2, PetCardType} from "@/modal/VO/HomeVO";
import PetCard from "@/components/PetCard.vue";
import {reactive} from "vue";
import PageHead from "@/components/PageHead.vue";

const petCardTxt: Page<PetCardType> = reactive(examplePet2())
</script>

<style scoped>
</style>