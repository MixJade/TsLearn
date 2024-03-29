<template>
  <div class="my-space">
    <PageHead>查看全部寄养订单</PageHead>
    <FosterCard :card-list="fosterCardTxt.records"/>
    <el-pagination :page-size="6" :total="20" background hide-on-single-page layout="prev, pager, next"/>
  </div>
</template>

<script lang="ts" setup>
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {exampleFoster, FosterCardDto} from "@/modal/DO/FosterCardDto";
import {reactive} from "vue";
import FosterCard from "@/components/card/FosterCard.vue";
import PageHead from "@/components/row/PageHead.vue";

// 寄养宠物的卡片信息
const fosterCardTxt: Page<FosterCardDto> = reactive(exampleFoster())
</script>

<style scoped src="public/css/my-space.css"/>
