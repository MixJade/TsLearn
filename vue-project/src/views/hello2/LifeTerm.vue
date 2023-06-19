<template>
  <h3>生命周期{{ a }}</h3>
  <button @click="a++">更新</button>
</template>

<script setup lang="ts">
// 使用生命周期钩子
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref} from "vue";
// 使用引用函数
import usePopText from "@/hook/usePopText";
usePopText()
// 下面注释的是配置项写法，要在setup外面生效
/*beforeCreate() {
  console.log('---beforeCreate---')
},
created() {
  console.log('---created---')
},*/
onBeforeMount(() => {
  console.log('---beforeMount，挂载之前---')
})
onMounted(() => {
  console.log('---mounted，挂载完成---')
})
onBeforeUpdate(() => {
  console.log('---beforeUpdate，更新前---')
})
onUpdated(() => {
  console.log('---updated，更新完成---')
})
onBeforeUnmount(() => {
  console.log('---beforeUnmount，卸载前---')
})
onUnmounted(() => {
  console.log('---unmounted，卸载完成---')
})
const a = ref(1)
</script>

<style scoped>

</style>