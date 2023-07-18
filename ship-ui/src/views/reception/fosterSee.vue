<template>
  <div>
    <PageHead>查看全部寄养订单</PageHead>
    <el-space direction="vertical">
      <FosterCard :card-list="fosterCardTxt.records"/>
      <el-pagination background hide-on-single-page layout="prev, pager, next" :page-size="6" :total="20"/>
    </el-space>
  </div>
</template>

<script setup lang="ts">
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {exampleFoster, FosterCardDto} from "@/modal/DO/FosterCardDto";
import {reactive} from "vue";
import FosterCard from "@/components/FosterCard.vue";
import PageHead from "@/components/PageHead.vue";

// 寄养宠物的卡片信息
const fosterCardTxt: Page<FosterCardDto> = reactive(exampleFoster())
</script>

<style scoped>
</style>