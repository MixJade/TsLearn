<template>
  <el-row :gutter="12">
    <el-col
        v-for="pet in cardList"
        :key="pet.petId"
        :md="6" :sm="12" :xs="24"
        style="margin-bottom: 10px"
    >
      <MyCard :data='{
        photo: "pet-ex.jpg",
        tit: pet.petName,
        age: getAge(pet.petAge)+"岁",
        sex: pet.petSex ? "公" : "母",
        job: pet.petVariety,
        info1: pet.petStatus,
        info2: pet.petInfo,
        link:"/reception/petOne/"+pet.petId
      }' :type="'success'"/>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import MyCard from "@/components/MyCard.vue";
import {getAge} from "@/utils/TimeUtil";
import {Pet} from "@/modal/entiy/Pet";
// 接收参数：宠物卡片
defineProps<{
  readonly cardList: Pet[]
}>()
</script>

<style scoped src="public/css/pet-info.css"/>