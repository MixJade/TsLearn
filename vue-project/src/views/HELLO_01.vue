<template>
  <h1>HELLO_WORLD</h1>
  <ul>
    <li><router-link to="/timer">计时器测试</router-link></li>
    <li><router-link to="/num">数字测试</router-link></li>
    <li><router-link to="/shake">动画Class</router-link></li>
    <li><router-link to="/showDiv">Div颜色展示</router-link></li>
  </ul>

  <router-view v-slot="{ Component }">
    <keep-alive include="TimerTest,NumTest">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">

</script>