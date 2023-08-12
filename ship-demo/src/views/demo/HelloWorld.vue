<template>
  <div class="hello">
    <MyBtn @click="x">你好啊</MyBtn>
  </div>
</template>

<script lang="ts" setup>
import MyBtn from "@/components/MyBtn.vue";

const x = () => {
  alert("你好")
}
</script>

<style lang="scss" scoped>
.hello {
  height: 98vh;
  width: 98vw;
  text-align: center;
  background-color: #909399;
  z-index: 1;
}

</style>