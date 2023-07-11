<template>
  <el-card>
    <div class="my-pet-card">
      <img src="/picture/pet-ex.jpg" alt="宠物"/>
      <div class="my-pet-info">
        <ul style="list-style: none;">
          <li><strong>{{ pet.petName }}</strong></li>
          <li>{{ getAge(pet.petAge) }}岁，&nbsp;{{ pet.petSex ? "公" : "母" }}，{{ pet.petVariety }}</li>
          <li>{{ pet.petInfo }}</li>
          <li>订单号：{{ pet.fosterCode }}</li>
          <li>备注：{{ pet.petInfo }}</li>
          <li>寄养人：{{ pet.clientName }}</li>
          <li>到期时间：{{ pet.fosterTerm }}</li>
        </ul>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {getAge} from "@/utils/TimeUtil";
import {FosterCardVO} from "@/modal/VO/HomeVO";
// 接收参数：宠物卡片
defineProps<{
  readonly pet: FosterCardVO
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