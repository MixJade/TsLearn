<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#545c64"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
  >
    <el-menu-item index="/">
      <el-icon>
        <UserFilled/>
      </el-icon>
      登录
    </el-menu-item>
    <el-menu-item index="/hello2">
      <el-icon>
        <House/>
      </el-icon>
      主页
    </el-menu-item>
    <el-sub-menu index="/demo">
      <template #title>小Demo</template>
      <el-menu-item index="/demo/testScss">Scss初探</el-menu-item>
      <el-menu-item index="/demo/hello">Element按钮</el-menu-item>
      <el-menu-item index="/demo/lifeTerm">生命周期</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>小Demo</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>不可点击</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
  <router-view></router-view>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {UserFilled, House} from "@element-plus/icons-vue"

console.log(import.meta.env.VITE_BACK_URL)
// 页面路由
const router = useRouter()
// 导航条
const activeIndex = ref('/')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push(key)
}
</script>
<style scoped>
</style>
