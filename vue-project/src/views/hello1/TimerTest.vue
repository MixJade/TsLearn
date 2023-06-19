<template>
  <p>组件已激活时间：{{ actionNum }}</p>
</template>

<script setup lang="ts">
import {onActivated, onDeactivated, ref} from "vue";
// 设置计时器
const actionNum = ref(0)
let timer:number
// 设置路由激活函数
onActivated(()=>{
  console.log("路由被激活")
  timer=setInterval(() => {
    actionNum.value++
  }, 1000)
})
// 设置路由取消激活函数
onDeactivated(()=>{
  console.log("路由被取消激活")
  clearInterval(timer)
})
</script>

<style scoped>

</style>