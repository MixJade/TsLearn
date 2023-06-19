<template>
  <p>页面大小:{{ pageImpl.size }}，当前页码:{{ pageImpl.num }}</p>
  <button @click="test">翻页(子组件)</button>
</template>

<script setup lang="ts">
import {reactive} from "vue";
// 定义事件与返回参数
const emit = defineEmits<{
  (e: "hello", value: Page): void
}>()

// 定义返回参数的接口
interface Page {
  size: number,
  num: number
}

// 实际返回参数
const pageImpl = reactive({
  size: 7,
  num: 1
})
// 触发返回参数的事件
const test = () => {
  pageImpl.num++
  emit("hello", pageImpl)
}
</script>

<style scoped>

</style>