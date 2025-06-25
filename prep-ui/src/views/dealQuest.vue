<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <span>示例导航</span>
      </div>
      <nav>
        <ul>
          <li><a href="#">首页</a></li>
          <li><a href="#">关于</a></li>
          <li><a href="#">联系</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <aside class="sidebar">
      <h2>左侧内容</h2>
      <div class="card">
        <h3>功能区块</h3>
        <p>这里可以放置侧边栏菜单、工具或其他辅助内容。</p>
      </div>
      <div class="card">
        <h3>信息卡片</h3>
        <p>侧边栏可以包含各种组件，如通知、用户信息等。</p>
      </div>
    </aside>

    <section class="content">
      <h2>右侧内容</h2>
      <article class="article">
        <h3>示例文章标题</h3>
        <p>这是一篇示例文章，展示了如何在右侧内容区域中布局主要内容。这个区域通常包含页面的核心信息和功能。</p>
        <p>您可以在这里放置博客文章、产品展示、用户评论或其他主要内容。布局会根据内容自动调整高度，确保与左侧栏保持一致。</p>
      </article>

      <div class="grid">
        <div class="card">
          <h4>特性1</h4>
          <p>这个网格布局展示了如何在右侧内容区域中创建更复杂的布局结构。</p>
        </div>
        <div class="card">
          <h4>特性2</h4>
          <p>即使内容不同，两个区域的高度也会保持一致。</p>
        </div>
      </div>

      <button>添加内容</button>
    </section>
  </main>

</template>

<script lang="ts" setup>
</script>

<style lang="sass" scoped>
$primary-color: #3B82F6
$secondary-color: #10B981
$neutral-color: #F3F4F6
$text-primary: #1F2937
$text-secondary: #4B5563
$text-light: #F9FAFB
$spacing-sm: 0.5rem
$spacing-md: 1rem
$spacing-lg: 1.5rem
$spacing-xl: 2rem
$border-radius: 0.375rem
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
body
  line-height: 1.5
  color: $text-primary

/* 顶部导航栏 */
.header
  background-color: $primary-color
  color: $text-light
  height: 36px
  display: flex
  align-items: center
  padding: 0 $spacing-md
  box-shadow: $shadow-md

  .container
    width: 100%
    max-width: 1280px
    margin: 0 auto
    display: flex
    justify-content: space-between
    align-items: center

    .logo
      display: flex
      align-items: center
      gap: $spacing-sm

      span
        font-weight: 600

    nav
      ul
        display: flex
        gap: $spacing-xl

        li
          list-style: none

          a
            text-decoration: none
            color: $text-light
            transition: color 0.2s ease

            &:hover
              color: #E5E7EB

/* 主内容区 */
.main-content
  display: flex
  min-height: calc(100vh - 36px)

  // 左侧边栏
  .sidebar
    width: 33.333%
    background-color: $neutral-color
    padding: $spacing-lg

    h2
      font-size: 1.25rem
      font-weight: 700
      color: #1F2937
      margin-bottom: $spacing-md

    .card
      background-color: white
      padding: $spacing-md
      border-radius: $border-radius
      box-shadow: $shadow-sm
      margin-bottom: $spacing-md

      h3
        font-weight: 600
        color: #111827
        margin-bottom: $spacing-sm

      p
        font-size: 0.875rem
        color: $text-secondary


  // 右侧内容区
  .content
    width: 66.666%
    padding: $spacing-lg

    h2
      font-size: 1.25rem
      font-weight: 700
      color: #1F2937
      margin-bottom: $spacing-md

    .article
      background-color: white
      padding: $spacing-xl
      border-radius: $border-radius
      box-shadow: $shadow-md
      margin-bottom: $spacing-lg

      h3
        font-size: 1.125rem
        font-weight: 600
        color: #111827
        margin-bottom: $spacing-sm


      p
        margin-bottom: $spacing-md


    .grid
      display: grid
      grid-template-columns: repeat(2, 1fr)
      gap: $spacing-md
      margin-bottom: $spacing-lg

      .card
        background-color: white
        padding: $spacing-md
        border-radius: $border-radius
        box-shadow: $shadow-sm

        h4
          font-weight: 600
          color: #111827
          margin-bottom: $spacing-sm


        p
          font-size: 0.875rem
          color: $text-secondary


    button
      background-color: $secondary-color
      color: white
      font-weight: 500
      padding: 0.5rem 1rem
      border-radius: $border-radius
      border: none
      cursor: pointer
      transition: background-color 0.2s ease

      i
        margin-right: $spacing-sm


      &:hover
        background-color: #059669


/* 响应式设计 */
@media (max-width: 768px)
  .main-content
    flex-direction: column


  .sidebar, .content
    width: 100%
    min-height: auto


</style>