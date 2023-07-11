<template>
  <h4>用户：个人中心</h4>
  <el-radio-group v-model="radio1" @change="getChange">
    <ul>
      <li>
        <el-radio label="/hello2" size="large" border>返回主页</el-radio>
      </li>
      <li>
        <el-radio label="/reception/clientCenter/clientOne" size="large" border>个人中心</el-radio>
      </li>
      <li>
        <el-radio label="/reception/clientCenter/clientPet" size="large" border>个人宠物</el-radio>
      </li>
      <li>
        <el-radio label="/reception/clientCenter/clientAppoint" size="large" border>个人挂号</el-radio>
      </li>
    </ul>
  </el-radio-group>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import router from "@/router";

const radio1 = ref(router.currentRoute.value.fullPath)
const getChange = (): void => {
  router.push(radio1.value)
}
</script>

<style scoped>

</style>