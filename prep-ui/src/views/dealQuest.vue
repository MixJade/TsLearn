<template>
  <header class="header">
    <MyBtn text="跳转题源" type="primary"/>
    <span>第一题</span>
    <MyBtn text="返回上级" type="secondary"/>
  </header>

  <main class="main-content">
    <aside class="sidebar">
      <span class="content-tit">题源20250626</span>
      <BlockBtn style="float: right" text="切换题源" type="primary"/>
      <pre class="ocr-res new-line">{{ ocrRes }}</pre>
    </aside>

    <section class="content">
      <span class="content-tit">第一题</span>
      <BlockBtn style="float: right" text="编辑题目" type="warning"/>
      <pre class="quest new-line">{{ ocrRes }}</pre>

      <div class="grid">
        <div class="card">
          <h4>特性1</h4>
          <p class="new-line">这个网格布局展示了如何在右侧内容区域中创建更复杂的布局结构。</p>
        </div>
        <div class="card">
          <h4>特性2</h4>
          <p>即使内容不同，两个区域的高度也会保持一致。</p>
        </div>
      </div>
      <ReportBtn type="success" text="添加选项"/>
    </section>
  </main>

</template>

<script lang="ts" setup>
import ReportBtn from "@/components/button/BlockBtn.vue";
import BlockBtn from "@/components/button/BlockBtn.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {ref} from "vue";

const ocrRes = ref<string>("Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n" +
    "Accusantium architecto cumque explicabo maxime molestias nemo nisi quis veritatis vitae voluptas.\n" +
    "Exercitationem ipsum magni numquam perferendis quis quisquam similique unde velit.")
</script>

<style lang="sass" scoped>
$spacing-sm: 0.5rem
$spacing-md: 1rem
$spacing-lg: 1.5rem
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

// 顶部导航栏
.header
  background: linear-gradient(135deg, #409eff, #909399)
  color: #f8f9fa
  font-weight: bold
  height: 36px
  display: flex
  justify-content: space-between
  align-items: center
  padding: 2px $spacing-md
  box-shadow: $shadow-md

// 主内容区
.main-content
  display: flex
  min-height: calc(100vh - 36px)

  //题目或图源标题
  .content-tit
    font-size: 1.25rem
    font-weight: 700
    color: #1F2937
    margin-bottom: $spacing-md

  // 左侧边栏
  .sidebar
    width: 33.333%
    background-color: #e9e9eb
    padding: 16px

    .ocr-res
      background-color: white
      padding: 16px
      border-radius: 8px
      box-shadow: $shadow-md
      margin-top: 16px
      font-size: 1rem


  // 右侧内容区
  .content
    width: 66.666%
    padding: 16px

    .quest
      background-color: white
      padding: 16px
      border-radius: 8px
      box-shadow: $shadow-md
      margin-bottom: 12px
      font-size: 1rem


    .grid
      display: grid
      grid-template-columns: repeat(2, 1fr)
      gap: $spacing-md
      margin-bottom: $spacing-lg

      .card
        background-color: white
        padding: $spacing-md
        border-radius: 8px
        box-shadow: $shadow-md

        h4
          font-weight: 600
          color: #111827
          margin-top: 0
          margin-bottom: $spacing-sm

        p
          font-size: 0.875rem
          color: #4B5563
</style>