<template>
  <div class="my-space">
    <PageHead>查看全部宠物</PageHead>
    <PetCard :card-list="petCardTxt.records"/>
    <el-pagination :page-size="8" :total="20" background hide-on-single-page layout="prev, pager, next"/>
  </div>
</template>

<script lang="ts" setup>
// 宠物的卡片信息
import {Page} from "@/modal/DO/Page";
import {examplePetSee, Pet} from "@/modal/entiy/Pet";
import PetCard from "@/components/zoneView/PetCard.vue";
import {reactive} from "vue";
import PageHead from "@/components/row/PageHead.vue";

const petCardTxt: Page<Pet> = reactive(examplePetSee())
</script>

<style scoped src="public/css/my-space.css"/>
