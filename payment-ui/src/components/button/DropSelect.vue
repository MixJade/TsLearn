<template>
  <div class="dropSelect">
    <div class="dropdown" @click="optShow = !optShow">
      <span class="dropInput">{{ inputVal }}</span>
      <ul v-if="optShow" class="dropdown-menu">
        <li v-if="!disableOne" @click="clickDrop(0,'无')">无</li>
        <li v-for="selectVo in optionData" :key="selectVo.oneKey">
        <span :class="disableOne?'disable':'active'"
              @click="clickDrop(selectVo.oneKey,selectVo.oneValue)">{{ selectVo.oneValue }}</span>
          <ul class="submenu">
            <li v-for="twoSel in selectVo.twoList" :key="twoSel.twoKey"
                @click="clickDrop2(twoSel.twoKey,twoSel.twoValue)">
              {{ twoSel.twoValue }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {TypeSelectVo} from "@/model/vo/TypeSelectVo";

// 二级下拉框列表
const props = defineProps<{
  readonly optionData: TypeSelectVo[]; //二级下拉框的数据
  readonly disableOne: boolean; //是否禁用一级下拉框的点击事件
  readonly showVal?: string | undefined; //(用于传值时反显)
}>()

const emits = defineEmits<{
  (e: "changeSel", oneKey: number, twoKey: number | null): void;
  (e: "changeSel2", twoKey: number, twoVal: string): void;
}>();

const optShow = ref<boolean>(false);
const inputVal = ref<string>("无");
// 监听 showVal 属性的变化
watch(() => props.showVal,
    (newValue) => {
      if (props.disableOne && newValue !== undefined) {
        inputVal.value = newValue
      }
    }, {
      immediate: true // 可选，若设置为 true，会在组件初始化时立即执行一次回调
    }
);

// 一级下拉框点击
const clickDrop = (opKey: number, opVal: string): void => {
  if (props.disableOne) return;
  inputVal.value = opVal;
  emits('changeSel', opKey, null)
};
// 二级下拉框点击(禁用一级点击事件时返回函数不同)
const clickDrop2 = (opKey: number, opVal: string): void => {
  inputVal.value = opVal;
  if (props.disableOne) {
    emits('changeSel2', opKey, opVal)
  } else {
    emits('changeSel', 0, opKey)
  }
};
</script>

<style lang="sass" scoped>
$border-color: #529b2e
$border-li-color: #95d475
$hover-color: #f0f9eb
.dropSelect
  position: relative
  display: inline-block

.dropdown
  display: contents
  font-size: smaller
  text-align: center
  position: relative

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
  //列表定位
  position: absolute
  //left: 48px
  //下拉菜单样式
  min-width: 60px
  background-color: #f9f9f9
  box-shadow: 0 8px 16px 0 #909399
  z-index: 1
  border: $border-li-color solid 2px
  border-radius: 5px

  li
    //下拉菜单选项样式
    padding: 2px 12px
    text-decoration: none
    display: block
    transition: background-color 0.3s ease
    position: relative

    &:not(:last-child)
      border-bottom: $border-li-color dashed 2px

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
  top: 6px
  background-color: #f9f9f9
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2)
  z-index: 1
  border-radius: 5px

  li
    padding: 6px 8px
    text-decoration: none
    display: block
    transition: background-color 0.3s ease
    min-width: 60px
    //鼠标样式
    cursor: pointer

    &:hover
      background-color: $hover-color

.disable
  //禁用点击
  cursor: not-allowed

.active
  //鼠标样式
  cursor: pointer
</style>