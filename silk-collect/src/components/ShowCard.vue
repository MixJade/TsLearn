<template>
  <div :class="type" class="show-card">
    <h3>{{ title }}</h3>
    <ol>
      <li v-for="td in show" :key="td.cId">
        <span :class="td.resStr==='已完成'?'s-green':'s-red'" :title="td.axis">【{{ td.resStr }}】</span>{{ td.scene }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import {CollectInf} from '../utils/parseSaveData';
// 我的普通button,用于搜索框
defineProps<{
  readonly type: "box" | "silk" | "heart" | "metal";
  readonly title: string;
  readonly show: CollectInf[];
}>()
</script>
<!--去掉scoped作用域，这样生成的css就没有`[data-v-34552472]`标识-->
<style lang="sass">
.s-red
  color: red

.s-green
  color: green

.show-card
  border: 2px solid #ccc
  border-radius: 8px
  padding: 0 22px
  margin: 12px 0

  &.box
    border-color: #909399
    background-color: #f4f4f5

  &.metal
    border-color: #e6a23c
    background-color: #fdf6ec

  &.heart
    border-color: #67c23a
    background-color: #f0f9eb

  &.silk
    border-color: #409eff
    background-color: #ebf5ff
</style>