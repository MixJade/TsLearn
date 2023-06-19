<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="nav">
    <ul>
      <li @click="router.push('/')">测试路由1</li>
      <li @click="router.push('/test1')">测试路由2</li>
      <li @click="router.replace('/test1/life')">直接子路由</li>
    </ul>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  position: fixed;
  width: 100%;
  top:0;
  left: 0;
  background-color: #282828;
}

ul {
  position: relative;
  display: flex;
}

ul li {
  list-style: none;
  width: 80px;
  color: whitesmoke;
  line-height: 40px;
  text-align: center;
  cursor: default;
}

</style>