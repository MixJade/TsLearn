<template>
  <div class="hello">
    <MyBtn @click="x">你好啊</MyBtn>
    <div class="frame">
      <MyInput/>
    </div>
    <VueFoot/>
  </div>
</template>

<script lang="ts" setup>
import MyBtn from "@/components/button/MyBtn.vue";
import MyInput from "@/components/MyInput.vue";
import VueFoot from "@/components/VueFoot.vue";

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
  /* 输入框外面的元素 */
  .frame {
    background-color: white;
    border: 2px solid #17a2b8;
    width: 250px;
    position: relative;
    left: 50%;
    margin-left: -125px;
    margin-top: 30px;
    padding: 5px;
  }
}
</style>