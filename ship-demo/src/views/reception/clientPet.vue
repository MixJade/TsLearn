<template>
  <el-card v-for="pet in petList" :key="pet.petId">
    <el-row :gutter="20" class="my-pet-card">
      <el-col
          :md="6" :sm="8" :xs="24"
      ><img alt="宠物" src="/picture/pet-ex.jpg"/>
      </el-col>
      <el-col
          :md="18" :sm="14" :xs="24"
      >
        <el-descriptions :column="3" :title="pet.petName" border>
          <el-descriptions-item
              align="center"
              label="品种"
              label-align="right">
            <el-tag>{{ pet.petVariety }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item align="center" label="健康状况" label-align="right">
            <el-tag>{{ pet.petStatus }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item align="center" label="年龄" label-align="right">
            {{ getAge(pet.petAge) }}岁
          </el-descriptions-item>
          <el-descriptions-item align="center" label="性别" label-align="right">
            <TagSex :sex="pet.petSex"/>
          </el-descriptions-item>
          <el-descriptions-item align="center" label="操作" label-align="right">
            <el-button type="success" @click="$router.push('/reception/petOne/'+pet.petId)">详情
            </el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import {exampleClientPet} from "@/modal/entiy/Pet";
import {getAge} from "@/utils/TimeUtil";
import TagSex from "@/components/TagSex.vue";

const petList = exampleClientPet()
</script>

<style scoped>
</style>