<template>
  <ul>
    <li :style="{opacity:b}">数字增加:</li>
    <li>{{ a }}</li>
    <li>
      <button @click="a++">点击增加</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {onActivated, onDeactivated, ref} from "vue";

const a = ref(1)
// 定义透明度
const b = ref(1)
// 设置定时器，让透明度变化
let isAdd = false
let timer: number
// 设置路由激活函数
onActivated(() => {
  console.log("路由2被激活")
  timer = setInterval(() => {
    if (isAdd) b.value += 0.1
    else b.value -= 0.1
    if (b.value <= 0 || b.value >= 1) isAdd = !isAdd
  }, 100)
})
// 设置路由取消激活函数
onDeactivated(() => {
  console.log("路由2被取消激活")
  clearInterval(timer)
})
</script>