<template>
  <div>
    <PageHead>查看全部宠物</PageHead>
    <el-space direction="vertical">
      <PetCard :card-list="petCardTxt.records"/>
      <el-pagination :page-size="8" :total="20" background hide-on-single-page layout="prev, pager, next"/>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {examplePetSee, Pet} from "@/modal/entiy/Pet";
import PetCard from "@/components/PetCard.vue";
import {reactive} from "vue";
import PageHead from "@/components/PageHead.vue";

const petCardTxt: Page<Pet> = reactive(examplePetSee())
</script>

<style scoped>
</style>