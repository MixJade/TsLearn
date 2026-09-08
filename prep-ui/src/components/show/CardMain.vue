<template>
  <header class="card-head">{{ tit }}
    <MyBtn text="返回上级" type="secondary" @click="toBack"/>
  </header>
  <div class="card-container">
    <div class="card-co" v-for="cd in cardDataList" :key="cd.dataId">
      <div class="card">
        <div class="card-content">
          <h3 class="card-title" @click="handleEnterChild(cd)">{{ cd.tit }}</h3>
          <p class="card-remark" @click="handleEnterChild(cd)">{{ cd.remark }}</p>
          <div v-if="showImage && cd.imageUrl" class="card-image">
            <img :src="cd.imageUrl" :alt="cd.tit">
          </div>
          <footer class="card-footer">
            <span v-for="foot in cd.footer">{{ foot }}</span>
          </footer>
        </div>
        <div class="btn-group">
          <span class="btn-item btn-upd" @click="openUpdForm(cd.data)"><span>修改</span></span>
          <span class="btn-item btn-del" @click="deleteById(cd.dataId)"><span>删除</span></span>
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

const props = defineProps<{
  tit: string;
  cardDataList: CardData[];
  showImage?: boolean;
  parentPath?: string;
}>()

const emits = defineEmits<{
  (e: "openAddForm"): void;
  (e: "openUpdForm", data: any): void;
  (e: "deleteById", dataId: number): void;
  (e: "enterChild", data: any): void;
}>();


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
 * ===================================[路由跳转]============================================
 */
const router = useRouter();
// 返回上级页面
const toBack = () => {
  router.push(props.parentPath || "/")
}
const enterChild = (path: string) => {
  router.push(path)
}

const handleEnterChild = (cd: CardData) => {
  emits('enterChild', cd)
  if (cd.childPath) {
    router.push(cd.childPath)
  }
}
</script>

<style lang="sass" scoped>
@use "sass:math"
// 连接线颜色
$line-color: #cd5c5c
$main-line-width: 6px
$main-line-padding: 12px
$main-line-left: 20px
// 连接线长度
$line-length: $main-line-width + $main-line-padding +  $main-line-left
// 卡片尺寸（正方形）
$card-width: 200px
$card-height: $card-width

.card-head
  width: 100%
  height: 32px
  line-height: 32px
  border-bottom: $line-color 1px solid
  padding: 4px 12px
  color: $line-color

  button
    position: absolute
    right: 0

// 卡片容器 - 横向flex布局
.card-container
  position: relative
  display: flex
  flex-wrap: wrap
  gap: 20px
  padding: 24px
  max-width: 1200px

  .add-btn
    $btn-size: 48px
    position: relative
    width: $btn-size
    height: $btn-size
    border-radius: 50%
    //边框与文字颜色
    border: $line-color 3px solid
    color: $line-color
    font-size: 24px
    background-color: white
    flex-shrink: 0

    &:hover
      box-shadow: 0 0 16px $line-color

// 卡片包装
.card-co
  flex-shrink: 0

// 卡片 - 横向3:4卡片
.card
  width: $card-width
  height: $card-height
  background: #ffffff
  border: $line-color 2px solid
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
  display: flex
  flex-direction: column
  position: relative
  overflow: hidden
  transition: box-shadow 0.3s ease, transform 0.3s ease

  &:hover
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3)
    transform: translateY(-4px)

    .btn-group
      opacity: 1
      transform: translateY(0) skewX(-20deg)

  .card-content
    flex: 1
    padding: 16px
    display: flex
    flex-direction: column

  .card-title
    margin: 0 0 8px 0
    font-size: 18px
    color: #303133
    cursor: pointer
    text-align: center
    transition: color 0.2s

    &:hover
      color: $line-color

  .card-remark
    flex: 1
    margin: 0
    font-size: 13px
    color: #606266
    overflow: hidden
    cursor: pointer
    display: -webkit-box
    -webkit-line-clamp: 3
    -webkit-box-orient: vertical
    line-height: 1.5

  .card-image
    width: 100%
    height: 80px
    margin-bottom: 8px
    overflow: hidden
    border-radius: 4px

    img
      width: 100%
      height: 100%
      object-fit: cover

  .btn-group
    position: absolute
    bottom: 0
    right: -10px
    display: flex
    opacity: 0
    transform: translateY(24px)
    transition: opacity 0.3s ease, transform 0.3s ease

    .btn-item
      padding: 6px 14px
      font-size: 13px
      font-weight: bold
      color: white
      cursor: pointer
      transform: skewX(-20deg)
      transition: filter 0.2s

      &:hover
        filter: brightness(1.1)

      span
        display: inline-block
        transform: skewX(20deg)

    .btn-upd
      background-color: #409eff
      border-right: 1px solid rgba(255, 255, 255, 0.5)

    .btn-del
      background-color: #f56c6c

  .card-footer
    margin-top: auto
    padding-top: 8px
    font-style: italic
    font-size: 12px
    color: #909399
    display: flex
    flex-wrap: wrap
    gap: 8px
</style>