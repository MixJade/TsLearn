<template>
  <div>
    <p>子组件状态: {{ count }}</p>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

// 定义内部状态
const count = ref<string>("初始值");

// 定义改变状态的方法
const increment = (newStr: string) => {
  count.value = newStr
};

// 暴露方法给父组件
defineExpose({
  increment
});
</script>
<style scoped lang="sass"></style>