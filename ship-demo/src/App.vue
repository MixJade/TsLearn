<template>
  <el-button style="position: fixed;z-index: 100;right: 0" type="success" @click="isShow=!isShow">
    {{ isShow ? "隐藏导航栏" : "凤凰显形" }}
  </el-button>
  <el-menu
      v-show="isShow"
      :default-active="activeIndex"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#fff"
      @select="handleSelect"
  >
    <el-menu-item index="/">
      <el-icon>
        <UserFilled/>
      </el-icon>
      登录
    </el-menu-item>
    <el-menu-item index="/reception">
      <el-icon>
        <House/>
      </el-icon>
      主页
    </el-menu-item>
    <el-menu-item index="/backstage">
      <el-icon>
        <Setting/>
      </el-icon>
      后台
    </el-menu-item>
    <el-menu-item index="/doctorPage">
      <el-icon>
        <Avatar/>
      </el-icon>
      医生
    </el-menu-item>
    <el-sub-menu index="/demo">
      <template #title>小Demo</template>
      <el-menu-item index="/demo/testScss">Scss初探</el-menu-item>
      <el-menu-item index="/demo/hello">流光按钮</el-menu-item>
      <el-menu-item index="/demo/lifeTerm">生命周期</el-menu-item>
      <el-menu-item index="/demo/strataCard">卡片布局</el-menu-item>
      <el-menu-item index="/demo/testRoll">滚动测试</el-menu-item>
      <el-menu-item index="/demo/game">游戏DEMO</el-menu-item>
      <el-menu-item index="/demo/threeCircle">三等分圆</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <router-view v-slot="{ Component }">
    <transition name="flip">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref} from "vue";
import {Avatar, House, Setting, UserFilled} from "@element-plus/icons-vue"

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
<style lang="scss" scoped>
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
