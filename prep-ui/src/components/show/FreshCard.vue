<template>
  <header class="card-head" :style="themeVars">
    <span class="head-tit">{{ tit }}</span>
    <MyBtn text="返回上级" type="secondary" @click="toBack"/>
  </header>
  <div class="card-container" :style="themeVars">
    <div class="card-co" v-for="cd in cardDataList" :key="cd.dataId">
      <div class="card">
        <!--装饰圆点-->
        <div class="decoration"></div>
        <div class="decoration-small"></div>
        <!--图标：点击进入下一级-->
        <div class="icon" @click="handleEnterChild(cd)">{{ ICON }}</div>
        <h3 class="card-title" @click="handleEnterChild(cd)">{{ cd.tit }}</h3>
        <p class="card-remark" @click="handleEnterChild(cd)">{{ cd.remark }}</p>
        <div v-if="SHOW_IMAGE && cd.imageUrl" class="card-image">
          <img :src="cd.imageUrl" :alt="cd.tit">
        </div>
        <footer class="card-footer">
          <span v-for="foot in cd.footer" :key="foot">{{ foot }}</span>
        </footer>
        <div class="footer-line"></div>
        <!--悬停浮出：编辑 / 删除-->
        <div class="hover-actions">
          <button class="icon-btn" type="button" title="编辑" @click="openUpdForm(cd.data)">
            <img src="/editBtn.svg" alt="编辑">
          </button>
          <button class="icon-btn" type="button" title="删除" @click="deleteById(cd.dataId)">
            <img src="/delBtn.svg" alt="删除">
          </button>
        </div>
      </div>
    </div>
    <button class="add-btn" type="button" @click="openAddForm">+</button>
  </div>
</template>

<script lang="ts" setup>
import MyBtn from "@/components/button/MyBtn.vue";
import {useRouter} from "vue-router";
import {CardData} from "@/model/dto/CardData";

// 卡片只需要入参：标题 + 数据列表
defineProps<{
  tit: string;
  cardDataList: CardData[];
}>()

const emits = defineEmits<{
  (e: "openAddForm"): void;
  (e: "openUpdForm", data: any): void;
  (e: "deleteById", dataId: number): void;
  (e: "enterChild", data: any): void;
}>();

/**
 * ==========================[卡片外观变量，需要调整直接改这里]========================
 */
const THEME = "#5BBFA3"       // 主题色：清新绿
const ICON = "📄"             // 卡片右上角图标
const SHOW_IMAGE = false      // 是否展示卡片图片
const PARENT_PATH = "/"       // 返回上级页面路径

/**
 * ==========================[卡片代码聚合]========================
 */
const openAddForm = () => {
  emits('openAddForm')
}
const openUpdForm = (data: any) => {
  emits('openUpdForm', data)
}
const deleteById = (dataId: number) => {
  emits('deleteById', dataId)
}

/**
 * ===================================[主题色]============================================
 */
// 颜色混合，ratio 为 mixColor 的占比
const mixColor = (color: string, mixWith: string, ratio: number): string => {
  const toRgb = (hex: string): number[] => {
    const str = hex.replace("#", "");
    const full = str.length === 3 ? str.split("").map(c => c + c).join("") : str;
    return [0, 2, 4].map(i => parseInt(full.slice(i, i + 2), 16));
  }
  const base = toRgb(color);
  const mix = toRgb(mixWith);
  return `rgb(${base.map((v, i) => Math.round(v * (1 - ratio) + mix[i] * ratio)).join(", ")})`;
}
// 由主题色推导整套配色，注入为 css 变量供样式使用
const themeVars: Record<string, string> = {
  "--theme": THEME,
  "--theme-rgb": THEME.replace("#", "").match(/.{2}/g)!.map(v => parseInt(v, 16)).join(", "),
  "--theme-light": mixColor(THEME, "#ffffff", 0.2),
  "--theme-deep": mixColor(THEME, "#000000", 0.12),
  "--theme-title": mixColor(THEME, "#000000", 0.45),
  "--theme-title-hover": mixColor(THEME, "#000000", 0.28),
  "--theme-text": mixColor(THEME, "#34403f", 0.55),
  "--theme-text-hover": mixColor(THEME, "#34403f", 0.68),
  "--theme-foot": mixColor(THEME, "#8a9c99", 0.72),
  "--theme-soft": mixColor(THEME, "#ffffff", 0.85),
  "--theme-softer": mixColor(THEME, "#ffffff", 0.93)
}

/**
 * ===================================[路由跳转]============================================
 */
const router = useRouter();
// 返回上级页面
const toBack = () => {
  router.push(PARENT_PATH)
}
const handleEnterChild = (cd: CardData) => {
  emits('enterChild', cd)
  if (cd.childPath) {
    router.push(cd.childPath)
  }
}
</script>

<style lang="sass" scoped>
// ==================[清新风格卡片，配色由组件内 THEME 常量推导为 css 变量]==================
.card-head
  display: flex
  align-items: center
  justify-content: space-between
  padding: 6px 16px
  border-bottom: 1px solid var(--theme)
  color: var(--theme-title)
  font-weight: 600
  letter-spacing: 0.02em

  .head-tit
    //标题前的小装饰条
    &::before
      content: ""
      display: inline-block
      width: 4px
      height: 14px
      margin-right: 8px
      border-radius: 2px
      vertical-align: -2px
      background: linear-gradient(180deg, var(--theme-light), var(--theme))

// 卡片容器 - 自适应网格布局，卡片尺寸与 ces卡片.html 一致（宽 20rem）
.card-container
  position: relative
  display: grid
  grid-template-columns: repeat(auto-fill, 20rem)
  justify-content: start
  align-content: start
  gap: 20px
  padding: 24px
  max-width: 1200px

  .add-btn
    $btn-size: 48px
    width: $btn-size
    height: $btn-size
    border-radius: 50%
    border: 3px solid var(--theme-deep)
    color: var(--theme-deep)
    font-size: 24px
    background-color: white
    cursor: pointer
    transition: all 0.3s ease

    &:hover
      transform: translateY(-2px)
      box-shadow: 0 0 16px rgba(var(--theme-rgb), 0.6)

// 卡片包装
.card-co
  display: flex
  min-width: 0

// 卡片 - 宽 20rem、高度由内容撑开的长方形
.card
  display: flex
  flex-direction: column
  position: relative
  width: 100%
  padding: 1.5rem
  overflow: hidden
  font-size: 16px
  background: rgba(255, 255, 255, 0.95)
  backdrop-filter: blur(10px)
  border-radius: 1.25rem
  border: 1px solid rgba(var(--theme-rgb), 0.25)
  box-shadow: 0 4px 24px rgba(var(--theme-rgb), 0.15), 0 1px 3px rgba(0, 0, 0, 0.05)
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)

  // 左侧装饰条
  &::before
    content: ""
    position: absolute
    left: 0
    top: 0
    bottom: 0
    width: 4px
    background: linear-gradient(180deg, var(--theme-light), var(--theme), var(--theme-deep))
    transition: width 0.3s ease

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 12px 40px rgba(var(--theme-rgb), 0.3), 0 4px 12px rgba(0, 0, 0, 0.08)

    &::before
      width: 6px

    .card-title
      transform: translateX(4px)
      color: var(--theme-title-hover)

    .card-remark
      transform: translateX(6px)
      color: var(--theme-text-hover)

    .icon
      transform: scale(1.1) rotate(10deg)
      background: linear-gradient(135deg, var(--theme-soft), var(--theme-softer))

    .footer-line::before
      width: 60px

    // 悬停时浮出编辑 / 删除按钮
    .hover-actions
      opacity: 1
      visibility: visible

  // 装饰圆点
  .decoration
    position: absolute
    top: -20px
    right: -20px
    width: 80px
    height: 80px
    border-radius: 50%
    background: linear-gradient(135deg, rgba(var(--theme-rgb), 0.3), rgba(var(--theme-rgb), 0.1))
    pointer-events: none

  .decoration-small
    position: absolute
    bottom: -10px
    right: 40px
    width: 40px
    height: 40px
    border-radius: 50%
    background: linear-gradient(135deg, rgba(var(--theme-rgb), 0.12), rgba(var(--theme-rgb), 0.04))
    pointer-events: none

  // 图标装饰
  .icon
    position: absolute
    top: 1.2rem
    right: 1.2rem
    width: 36px
    height: 36px
    display: flex
    align-items: center
    justify-content: center
    font-size: 1.1rem
    border-radius: 50%
    background: linear-gradient(135deg, var(--theme-softer), var(--theme-soft))
    box-shadow: 0 2px 8px rgba(var(--theme-rgb), 0.2)
    transition: all 0.3s ease
    cursor: pointer
    z-index: 1

  .card-title
    position: relative
    z-index: 1
    margin: 0 0 0.5rem 0
    padding-left: 1rem
    padding-right: 3.5rem
    font-size: 1.15rem
    font-weight: 600
    letter-spacing: 0.02em
    color: var(--theme-title)
    cursor: pointer
    transition: all 0.3s ease

  .card-remark
    position: relative
    z-index: 1
    margin: 0
    padding-left: 1rem
    font-size: 0.95rem
    line-height: 1.6
    color: var(--theme-text)
    cursor: pointer
    overflow: hidden
    display: -webkit-box
    -webkit-line-clamp: 2
    -webkit-box-orient: vertical
    transition: all 0.3s ease

  .card-image
    position: relative
    z-index: 1
    width: 100%
    height: 80px
    margin-top: 0.75rem
    overflow: hidden
    border-radius: 0.75rem

    img
      width: 100%
      height: 100%
      object-fit: cover

  .card-footer
    position: relative
    z-index: 1
    margin-top: 0.75rem
    padding-left: 1rem
    display: flex
    flex-wrap: wrap
    gap: 8px
    font-style: italic
    font-size: 12px
    color: var(--theme-foot)

  // 底部装饰线
  .footer-line
    position: relative
    z-index: 1
    margin-top: auto
    padding-top: 0.75rem
    padding-left: 1rem

    &::before
      content: ""
      display: block
      width: 40px
      height: 3px
      border-radius: 2px
      background: linear-gradient(90deg, var(--theme-light), var(--theme))
      transition: width 0.3s ease

  // 悬停浮出的编辑 / 删除按钮
  .hover-actions
    position: absolute
    right: 14px
    bottom: 12px
    z-index: 2
    display: flex
    gap: 6px
    // 默认隐藏，避免遮挡卡片内容
    opacity: 0
    visibility: hidden
    transition: opacity 0.25s ease, visibility 0.25s ease

    .icon-btn
      width: 24px
      height: 24px
      padding: 0
      display: flex
      align-items: center
      justify-content: center
      border: none
      border-radius: 4px
      background-color: var(--theme-softer)
      cursor: pointer
      transition: background-color 0.2s, box-shadow 0.2s

      img
        width: 100%
        height: 100%

      &:hover
        background-color: var(--theme-soft)
        box-shadow: 0 1px 4px rgba(var(--theme-rgb), 0.45)

      &:active
        background-color: var(--theme-light)
</style>
