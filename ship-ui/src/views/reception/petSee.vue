<template>
  <PageHead>查看全部宠物</PageHead>
  <el-space direction="vertical">
    <el-row :gutter="12">
      <el-col
          v-for="o in petCardTxt.data"
          :key="o.petId"
          :xs="24" :sm="12" :lg="6"
          style="margin-bottom: 10px"
      >
        <PetCard :pet="o"/>
      </el-col>
    </el-row>
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