<template>
  <div :class="type" class="show-card">
    <header>
      <h3>{{ title }}（{{ completeStr(show, quantity) }}）</h3>
      <ExpandBtn :expend="btnExpand" @click="btnExpand=!btnExpand"/>
    </header>
    <ol v-if="btnExpand">
      <li v-for="td in show" :key="td.cId">
        <span :class="td.resStr==='已完成'?'s-green':'s-red'" :title="td.axis">【{{ td.resStr }}】</span>{{ td.scene }}
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import {CollectInf} from '../utils/parseSaveData';
import ExpandBtn from "./ExpandBtn.vue";
import {ref} from "vue";
// 展示收集进度的卡片
defineProps<{
  readonly type: "box" | "silk" | "heart" | "metal";
  readonly title: string;
  readonly show: CollectInf[];
  readonly quantity?: number;
}>()

// 点击展开按钮
const btnExpand = ref<boolean>(false);

// 计算完成数量
const completeStr = (collectInfList: CollectInf[], enNum: number | undefined): string => {
  const cifLength = collectInfList.length;
  // 防止因为解析的文件不对导致异常显示
  if (cifLength === 0)
    return "解析异常"
  // 如果是面具、丝轴、盒子，则使用存档中的数量
  if (enNum !== undefined)
    return `${enNum}/${cifLength}`
  // 否则就手动计算已完成数量
  let completeNum = 0;
  for (const cil of collectInfList) {
    if (cil.resStr === "已完成")
      completeNum++;
  }
  return `${completeNum}/${cifLength}`
}
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
  position: relative

  header
    display: flex
    justify-content: space-between
    align-items: center
    margin: 0
    border-bottom: 1px solid #ccc

// 设置各类型的卡片颜色
@mixin box-color($color1: #909399,$color2: #f4f4f5)
  border-color: $color1
  background-color: $color2

  header
    border-color: $color1

.box
  @include box-color()

.metal
  @include box-color(#e6a23c, #fdf6ec)

.heart
  @include box-color(#67c23a, #f0f9eb)

.silk
  @include box-color(#409eff, #ebf5ff)
</style>