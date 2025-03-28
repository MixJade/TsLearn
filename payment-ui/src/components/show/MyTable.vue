<template>
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
  <nav id="pageNav">
    <label id="paTex1" class="paTxt" for="paSize">
      <small>页面大小</small>
      <select id="paSize">
        <option selected value="10">10</option>
        <option value="13">13</option>
        <option value="16">16</option>
      </select>
    </label>
    <ul>
      <li>
        <span id="addPa" class="pa-btn" @click="addPaNum(true)">&lt;</span>
      </li>
      <li id="paNum">
      </li>
      <li>
        <span id="reducePa" class="pa-btn" @click="addPaNum(false)">&gt;</span>
      </li>
    </ul>
    <small class="paTxt">共<span id="dataNum">0</span>条数据</small>
  </nav>
</template>

<script lang="ts" setup>
defineProps<{
  caption: string;
  thead: string[];
}>()

const addPaNum = (isAdd: boolean) => {

}

</script>

<style lang="sass" scoped>
// 强制使用子组件样式
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
    background-color: #F3F4F4

  > thead > tr > th
    //表头样式
    background-color: #909399
    border-bottom: #73757a 3px solid
    color: #fff

  > caption
    //表标题
    padding-top: 0.5rem
    padding-bottom: 0.5rem
    color: #606266

//===============================[分页条样式]=============================
#pageNav
  display: flex
  //设置主轴为水平方向，起点在左端
  flex-direction: row
  //在主轴线上的多个项目之间留有空白
  justify-content: space-between
  //对齐交叉轴
  align-items: center

  ul
    flex: 1
    //用于元素居中
    display: flex
    //对齐主轴
    align-items: center
    justify-content: center

    li
      //移除列表默认样式
      list-style: none
      //按钮与页数的空隙
      margin: 2px

      span
        //设置span宽高需要先设置display
        display: inline-block
        width: 24px
        height: 24px
        //文字居中
        line-height: 24px
        text-align: center
        margin: 2px
        //边框样式
        border: 2px solid #67C23A
        border-radius: 50%
        background-color: white
        color: #67C23A
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.5)
        //鼠标小手
        cursor: pointer

  .paTxt
    flex: 1
    //用于元素居中
    color: #67C23A

  #paTex1
    //内容靠右
    display: flex
    justify-content: end


  span
    &.pa-btn
      background-color: #67C23A
      color: white
      font-weight: bolder

    &#addPa
      border-radius: 50% 0 0 50%


    &#reducePa
      border-radius: 0 50% 50% 0


    &.active
      color: white
      background-color: #67C23A
      //鼠标禁止
      cursor: not-allowed

// 处理插槽内样式
:deep(tr)
  &:nth-of-type(odd) > *
    // 奇数表格行样式
    background-color: #E8E9EA
  &:hover > *
    // 所有表格行悬停
    background-color: #C7C9CC
</style>