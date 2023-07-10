<template>
  <el-card>
    <div class="my-pet-card">
      <img src="/picture/pet-ex.jpg" alt="宠物"/>
      <div class="my-pet-info">
        <strong>{{ pet.petName }}</strong>
        <p>{{ getAge(pet.petAge) }}岁，&nbsp;{{ pet.petSex ? "公" : "母" }}</p>
        <p>{{ pet.petInfo }}</p>
        <el-button type="success" @click="this.$router.push('/reception/petOne/'+pet.petId)">详情
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {PetCardType} from "@/modal/VO/HomeVO";
import {getAge} from "@/utils/TimeUtil";
// 接收参数：宠物卡片
defineProps<{
  readonly pet: PetCardType
}>()
</script>

<style scoped lang="scss">
.my-pet-card {
  display: flex;

  img {
    width: 128px;
    height: 128px;
  }

  .my-pet-info {
    padding-left: 10px;
    text-align: center;
    font-size: small;
  }
}
</style>