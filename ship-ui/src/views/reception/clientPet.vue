<template>
  <div class="base-page">
    <el-card v-for="pet in petList" :key="pet.petId">
      <el-row :gutter="12" class="my-pet-card">
        <el-col
            :xs="24" :sm="7" :md="5"
        ><img src="/picture/pet-ex.jpg" alt="宠物"/>
        </el-col>
        <el-col
            :xs="24" :sm="12" :md="12"
        >
          <ul>
            <li><span style="font-weight: bolder">{{ pet.petName }}</span></li>
            <li>品种：{{ pet.petVariety }}</li>
            <li>健康状况：{{ pet.petStatus }}</li>
            <li>{{ getAge(pet.petAge) }}岁&nbsp;{{ pet.petSex ? "公" : "母" }}</li>
            <li>简介：&nbsp;{{ pet.petInfo }}</li>
            <li>
              <el-button type="success" @click="this.$router.push('/reception/petOne/'+pet.petId)">详情
              </el-button>
            </li>
          </ul>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {exampleClientPet} from "@/modal/entiy/Pet";
import {getAge} from "@/utils/TimeUtil";

const petList = exampleClientPet()
</script>

<style scoped lang="scss">
.base-page {
  position: fixed;
  width: 50vw;
  left: 25vw;
  top: 15vh;
  background-color: whitesmoke;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.5);

  .el-card {
    margin-bottom: 8px;
    .my-pet-card {
      img {
        width: 128px;
        height: 128px;
      }
      ul {
        list-style: none;
        text-align: center;
        li {
          font-size: small;
        }
      }
    }
  }
}
</style>