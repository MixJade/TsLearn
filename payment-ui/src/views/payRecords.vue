<template>
  <h2>PayRecords</h2>
  <button @click="tesTus('suc','正确消息')">测试图示</button>
  <button @click="tesTus('err','错误消息')">测试图示2</button>
  <ToastBox ref="childRef"/>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {ref} from "vue";

// 引用子组件
const childRef: ToastBox = ref(null);
// 调用子组件暴露的方法
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};
</script>

<style scoped lang="sass">

</style>