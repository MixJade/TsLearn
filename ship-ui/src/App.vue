<template>
  <el-button type="success" @click="isShow=!isShow" style="position: fixed;z-index: 100;right: 0">显现</el-button>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      background-color="#545c64"
      mode="horizontal"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      v-show="isShow"
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
    </el-sub-menu>
  </el-menu>
  <router-view v-slot="{ Component }">
    <transition name="flip">
      <component :is="Component"/>
    </transition>
  </router-view>
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
// 设置显示与隐藏
const isShow = ref(true)
</script>
<style scoped lang="scss">
.flip-enter-active {
  animation: flip-in 0.5s;
}

.flip-leave-active {
  animation: flip-out 0.5s;
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}
</style>
