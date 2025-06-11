<template>
  <!--搜索框-->
  <section class="mySearch">
    <form onsubmit="return false" role="search">
      <slot name="searchForm"></slot>
      <button class="btn-line-suc" type="submit" @click="emits('pageChange')">Search</button>
    </form>
    <div>
      <slot name="searchBtn"></slot>
    </div>
  </section>
  <!-- 表格-->
  <table class="my-table">
    <caption>{{ caption }}</caption>
    <thead>
    <tr>
      <th v-for="th in thead">{{ th }}</th>
    </tr>
    </thead>
    <tbody>
    <slot></slot>
    </tbody>
  </table>
  <!-- 分页条 -->
  <nav class="pageNav">
    <label class="paTxt">
      <select v-model="tbPage.size" @change="emits('pageChange')">
        <option value="10">10</option>
        <option value="13">13</option>
        <option value="16">16</option>
      </select>
      <small>条/页</small>
    </label>
    <span v-if="tbPage.current>1" class="pa-btn pa1" @click="addPage(false)">&lt;</span>
    <span class="pa2" @click="jumpPage">{{ tbPage.current }}/{{ tbPage.pages }}</span>
    <span v-if="tbPage.current<tbPage.pages" class="pa-btn pa3" @click="addPage(true)">&gt;</span>
    <small class="paTxt">共{{ tbPage.total }}条数据</small>
  </nav>
</template>

<script lang="ts" setup>

const props = defineProps<{
  caption: string;
  thead: string[];
  tbPage: TbPage;
}>()

/**
 * ==========================[分页条代码聚合]========================
 */
export interface TbPage {
  total: number;
  current: number;
  pages: number;
  size: number;
}

const emits = defineEmits<{
  (e: "pageChange"): void;
}>();

const addPage = (isAdd: boolean) => {
  if (isAdd) props.tbPage.current++;
  else props.tbPage.current--;
  emits('pageChange')
}
/**
 * 点击页码的输入框
 */
const jumpPage = (): void => {
  let num = prompt(`输入要跳转页码(最大${props.tbPage.pages})`, "1");
  if (num == null || num === '0') return;
  props.tbPage.current = Number(num); // 将输入的字符串转换为数字格式
  emits('pageChange')
}
</script>

<style lang="sass" scoped>
// =============================[搜索框样式]==============================
.mySearch
  /*搜索栏目*/
  display: flex
  justify-content: space-between
  background-color: #F3F3F3
  border: 2px dashed #909399
  border-radius: 12px
  padding: 6px 12px

  > * > *
    height: 36px
    box-sizing: border-box

  > form > .btn-line-suc
    /*搜索按钮*/
    padding: 3px 10px 3px 5px
    color: #67C23A
    background-color: #f0f9eb
    border: 2px solid #67C23A
    border-radius: 8px

    &:hover
      /*搜索按钮*/
      color: white
      background-color: #67C23A
// =============================[表格样式]==============================
.my-table
  width: 100%
  margin-bottom: 1rem
  //文字居中
  text-align: center
  //单元格之间空隙
  border-collapse: separate
  border-spacing: 1px

  > :not(caption) > * > *
    //单元格大小、背景色
    padding: 0.3rem 0.3rem

  > thead > tr > th
    //表头样式
    background-color: #67C23A
    border-bottom: #529b2e 3px solid
    color: #fff

  > caption
    //表标题
    padding-top: 0.5rem
    padding-bottom: 0.5rem
    font-size: small
    color: #606266

// 处理插槽内样式
:deep(tr)
  &:nth-of-type(odd) > *
    // 奇数表格行样式
    background-color: #f0f9eb

  &:hover > *
    // 所有表格行悬停
    background-color: #d1edc4
//===============================[分页条样式]=============================
.pageNav
  $page-color: #67C23A
  text-align: center
  color: $page-color

  .paTxt
    margin: 0 16px 0 16px

  select
    border: none
    border-bottom: 2px solid $page-color
    color: $page-color
    outline: none

  span
    //设置span宽高需要先设置display
    display: inline-block
    width: 24px
    height: 24px
    //文字居中
    line-height: 24px
    text-align: center
    margin: 4px
    //边框样式
    border: 2px solid $page-color
    border-radius: 50%
    background-color: white
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5)
    //鼠标小手
    cursor: pointer

    &.pa-btn
      background-color: $page-color
      color: white
      font-weight: bolder

    &.pa1
      border-radius: 50% 0 0 50%

    &.pa2
      width: 64px
      border-radius: 12px

    &.pa3
      border-radius: 0 50% 50% 0
</style>