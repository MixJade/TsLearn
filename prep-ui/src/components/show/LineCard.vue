<template>
  <header class="card-head">{{ tit }}
    <MyBtn text="返回上级" type="secondary" @click="toBack"/>
  </header>
  <div class="card-container">
    <div class="card-co" v-for="cd in cardDataList" :key="cd.dataId">
      <div class="card">
        <div>
          <h3>{{ cd.tit }}</h3>
          <p>{{ cd.remark }}</p>
          <footer>
            <span v-for="foot in cd.footer">{{ foot }}</span>
          </footer>
        </div>
        <div class="btn-group">
          <TbBtn type="ent" text="进入" @click="enterChild(cd.childPath)"/>
          <TbBtn type="upd" text="修改" @click="openUpdForm(cd.data)"/>
          <TbBtn type="del" text="删除" @click="deleteById(cd.dataId)"/>
        </div>
      </div>
    </div>
    <button class="add-btn" type="button" @click="openAddForm">+</button>
  </div>
</template>

<script lang="ts" setup>
import MyBtn from "@/components/button/MyBtn.vue";
import TbBtn from "@/components/button/TbBtn.vue";
import {useRouter} from "vue-router";

defineProps<{
  tit: string;
  cardDataList: CardData[];
}>()

const emits = defineEmits<{
  (e: "openAddForm"): void;
  (e: "openUpdForm", data: any): void;
  (e: "deleteById", dataId: number): void;
}>();


/**
 * ==========================[卡片代码聚合]========================
 */
export interface CardData {
  tit: string;
  remark: string;
  footer: string[];
  dataId: number;
  data: any;
  childPath: string;
}

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
  router.push("/")
}
const enterChild = (path: string) => {
  router.push(path)
}
</script>

<style lang="sass" scoped>
@use "sass:math"
// 连接线颜色
$line-color: #67c23a
$main-line-width: 6px
$main-line-padding: 12px
$main-line-left: 20px
// 连接线长度
$line-length: $main-line-width + $main-line-padding +  $main-line-left

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

// 卡片容器
.card-container
  position: relative
  border-left: $line-color $main-line-width double
  margin-left: 128px
  padding: $main-line-padding

  .add-btn
    $btn-width: 48px
    $btn-pos: -(math.div($btn-width, 2) + math.div($main-line-width, 2))
    position: absolute
    width: $btn-width
    height: $btn-width
    border-radius: 50%
    bottom: $btn-pos
    left: $btn-pos
    //边框与文字颜色
    border: $line-color 3px solid
    color: $line-color
    font-size: 24px
    background-color: white

    &:hover
      box-shadow: 0 0 16px $line-color
// 卡片包装
.card-co
  margin-bottom: 24px
  margin-left: $main-line-left

// 卡片
.card
  width: 70%
  background: #ffffff
  border: $line-color 2px solid
  border-radius: 8px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
  padding: 16px
  position: relative

  &:hover
    box-shadow: 0 0 16px $line-color

    .btn-group
      display: block

  // 连接线：刚好碰到竖轴
  &::before
    content: ""
    position: absolute
    left: -#{$line-length}
    top: 50%
    transform: translateY(-50%)
    width: $line-length
    height: 2px
    background-color: $line-color

  h3
    margin: 0

  .btn-group
    position: absolute
    right: 24px
    top: 12px
    display: none

  footer
    font-style: italic
    font-size: small
    color: #606266
    display: flex
    gap: 16px
</style>