<template>
  <div class="dropdown" @click="optShow = !optShow">
    <span>类别</span>
    <span class="dropInput">{{ inputVal }}</span>
    <ul v-if="optShow" class="dropdown-menu">
      <li @click="clickDrop(0,'无')">无</li>
      <li v-for="selectVo in optionData" :key="selectVo.oneKey">
        <span @click="clickDrop(selectVo.oneKey,selectVo.oneValue)">{{ selectVo.oneValue }}</span>
        <ul class="submenu">
          <li v-for="twoSel in selectVo.twoList" :key="twoSel.twoKey" @click="clickDrop(twoSel.twoKey,twoSel.twoValue)">
            {{ twoSel.twoValue }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";

// 二级下拉框列表
defineProps<{
  readonly optionData: TypeSelectVo[];
}>()

const optShow = ref<boolean>(false);
const inputVal = ref<string>("无");

const clickDrop = (opKey: number, opVal: string): void => {
  inputVal.value = opVal;
};
</script>

<style lang="sass" scoped>
$border-color: #67c23a
$hover-color: #f0f9eb
.dropdown
  display: contents
  color: $border-color
  font-size: smaller
  text-align: center

.dropInput
  //下拉框样式
  border-bottom: $border-color solid 2px
  cursor: pointer
  background-color: white
  //调整大小
  display: inline-block
  padding: 8px
  margin: 0 6px 0 6px
  min-width: 32px
  transition: background-color 0.3s ease

.dropdown-menu
  //抹去列表样式
  list-style-type: none
  margin: 0
  padding: 0
  // 列表定位
  position: absolute
  left: 48px
  //下拉菜单样式
  min-width: 60px
  background-color: #f9f9f9
  box-shadow: 0 8px 16px 0 #909399
  z-index: 1
  border-radius: 5px

  li
    //下拉菜单选项样式
    color: black
    padding: 6px 12px
    text-decoration: none
    display: block
    transition: background-color 0.3s ease
    position: relative

    &:not(:last-child)
      border-bottom: #95d475 dashed 2px

    &:hover
      //鼠标悬停时显示子菜单
      background-color: $hover-color

      .submenu
        display: block

/* 子菜单样式 */
.submenu
  display: none
  list-style-type: none
  margin: 0
  padding: 0
  position: absolute
  left: 90%
  top: 0
  background-color: #f9f9f9
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
  z-index: 1
  border-radius: 5px

  li
    color: black
    padding: 6px 8px
    text-decoration: none
    display: block
    transition: background-color 0.3s ease
    min-width: 60px

    &:hover
      background-color: $hover-color
</style>