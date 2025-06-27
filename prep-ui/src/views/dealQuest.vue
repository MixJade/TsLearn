<template>
  <header class="header">
    <MyBtn text="跳转题源" type="primary" @click="toImg"/>
    <span>第一题</span>
    <MyBtn text="返回上级" type="secondary" @click="toBack"/>
  </header>

  <main class="main-content">
    <aside class="sidebar">
      <span class="content-tit">图片20250626</span>
      <BlockBtn style="float: right" text="切换图片" type="primary"/>
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
      <BlockBtn type="success" text="添加选项"/>
      <BlockBtn type="warning" text="编辑解析"/>
      <div class="quest">
        <h4>解析</h4>
        <pre class="new-line">{{ ocrRes }}</pre>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import BlockBtn from "@/components/button/BlockBtn.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {reqCateImg} from "@/request/examQuestApi";

onMounted(() => {
  setRouteData()
})

const ocrRes = ref<string>("Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n" +
    "Accusantium architecto cumque explicabo maxime molestias nemo nisi quis veritatis vitae voluptas.\n" +
    "Exercitationem ipsum magni numquam perferendis quis quisquam similique unde velit.")

/**
 * ===================================[路由跳转]============================================
 */
let cateId = 0;
let questId = 0;
// 如此获取路由传参
const route = useRoute();
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0) {
    questId = parseInt(route.query.questId as string)
  }
  reqCateImg(questId).then(resp => {
    cateId = resp.categoryId
  })
}
const router = useRouter();
// 返回上级页面
const toBack = () => {
  router.back()
}
// 进入题源图片
const toImg = () => {
  router.push({path: '/sourceImg', query: {cateId: cateId}})
}
</script>

<style lang="sass" scoped>
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


    h4
      font-weight: 600
      color: #111827
      margin-top: 0

    .grid
      display: grid
      grid-template-columns: repeat(2, 1fr)
      gap: $spacing-md
      margin-bottom: 1.5rem

      .card
        background-color: white
        padding: $spacing-md
        border-radius: 8px
        box-shadow: $shadow-md

        p
          font-size: 0.875rem
          color: #4B5563
</style>