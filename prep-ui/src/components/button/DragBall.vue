<template>
  <div :style="`right:${elRight}px;bottom:${elBottom}px`" class="drag-ball" draggable="true" @dragend="dragend($event)"
       @dragstart="dragstart($event)">
    <span>新增</span>
  </div>
</template>
<script lang="ts" setup>
import {ref} from "vue";
// 可拖动的按钮，用于收支记录新增
let startX = 0; //记录开始的横坐标位置
let startY = 0; //记录开始的纵坐标位置
const elRight = ref<number>(50); //定位-初始位置
const elBottom = ref<number>(70); //定位-初始位置
// 拖拽开始事件
const dragstart = (e: DragEvent): void => {
  // 记录拖拽元素初始位置
  startX = e.clientX;
  startY = e.clientY;
};
// 拖拽完成事件
const dragend = (e: DragEvent): void => {
  let x = startX - e.clientX; // 计算偏移量
  let y = startY - e.clientY;
  elRight.value += x; // 实现拖拽元素随偏移量移动
  elBottom.value += y;
};
</script>
<style lang="sass" scoped>
$ball-weight: 48px
.drag-ball
  cursor: pointer
  position: absolute
  width: $ball-weight
  height: $ball-weight
  background: #67c23a
  box-shadow: 0 0 12px 0 #606266
  border-radius: calc($ball-weight / 2)
  //文字样式
  line-height: $ball-weight
  font-weight: bolder
  font-size: smaller
  text-align: center
  color: #f0f9eb
</style>