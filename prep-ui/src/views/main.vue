<template>
  <h1>做题家</h1>
  <div class="card-grid">
    <!-- 卡片1 -->
    <div class="home-card" style="background-color: #cd5c5c" @click="toView('/sourceCate')">
      <div class="card-bg" style="background-image: url('/imgSee.svg')"></div>
      <div class="card-label">图片识别</div>
    </div>
    <!-- 卡片2 -->
    <div class="home-card" style="background-color: #5b8dd9"
         @click="toView('/examPaper')">
      <div class="card-bg" style="background-image: url('/examUpd.svg')"></div>
      <div class="card-label">试卷编辑</div>
    </div>
    <!-- 卡片3 -->
    <div class="home-card" style="background-color: #1cab69">
      <div class="card-bg" style="background-image: url('/subject.svg')"></div>
      <div class="card-label">开始刷题</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
const toView = (path: string) => {
  router.push(path)
}
</script>

<style scoped lang="sass">
body
  background-color: #f5f5f5
  margin: 0
  padding: 40px
  font-family: sans-serif
  box-sizing: border-box

h1
  text-align: center
  margin-bottom: 40px
  font-size: 2rem
  color: #333
  letter-spacing: 0.05em
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.15)

// 卡片容器 —— 自动换行、居中
.card-grid
  display: flex
  flex-wrap: wrap
  justify-content: center
  gap: 24px

// 单张正方形卡片
$card-size: 240px
$label-height: 48px

.home-card
  position: relative
  width: $card-size
  height: $card-size
  border-radius: 14px
  overflow: hidden
  cursor: pointer
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18)
  transition: transform 0.3s, box-shadow 0.3s
  -webkit-user-select: none
  user-select: none

  &:hover
    transform: translateY(-8px)
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.25)

  // SVG 背景图铺满整张卡片，保持比例居中
  .card-bg
    width: 100%
    height: 100%
    background-size: 60%
    background-position: center 38%
    background-repeat: no-repeat

  // 底部标签条
  .card-label
    position: absolute
    bottom: 0
    width: 100%
    height: $label-height
    display: flex
    align-items: center
    justify-content: center
    color: #ffffff
    font-size: large
    font-weight: bold
    letter-spacing: 0.08em
</style>