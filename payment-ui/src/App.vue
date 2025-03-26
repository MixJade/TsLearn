<template>
  <Toast ref="childRef"/>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import Toast from "@/components/pop/Toast.vue";
import {provide, ref} from "vue";

// 引用子组件
const childRef = ref(null);
// 调用子组件暴露的方法
const countSymbol = (ss: number) => {
  if (childRef.value) {
    childRef.value.increment(ss);
  }
};

provide("countSymbol", countSymbol);
</script>
<style scoped>
</style>
