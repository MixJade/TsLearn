<template>
  <div class="hello">
    <MyBtn @click="x">你好啊</MyBtn>
    <VueFoot/>
  </div>
</template>

<script lang="ts" setup>
import MyBtn from "@/components/button/MyBtn.vue";
import VueFoot from "@/components/show/VueFoot.vue";

const x = () => {
  alert("你好")
}
</script>

<style lang="scss" scoped>
.hello {
  height: 98vh;
  width: 98vw;
  text-align: center;
  padding-top: 10px;
  /* 设置z-index,防止遮挡btn的伪元素 */
  position: absolute;
  z-index: -2;
}
</style>
