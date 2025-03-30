<template>
  <div class="toggle">
    <input id="toggle-1" type="checkbox" v-model="checked" @change="changeVal">
    <label :class="checked?'on-label':'off-label'" for="toggle-1">
      <span class="toggle-off">支</span>
      <span class="toggle-on">收</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
// 新增修改表单的收入、支出选择框

// 定义接收的属性
// v-model 本质上是 :modelValue 和 @update:modelValue 的组合
const props = defineProps<{
  modelValue: boolean; //是否选中
}>()

const emits = defineEmits<{
  (e: "update:modelValue", checked: boolean): void;
}>();

// 监听 showVal 属性的变化
watch(() => props.modelValue,
    (newValue) => {
      checked.value = newValue
    },
);

const checked = ref<boolean>(props.modelValue)

const changeVal = () => emits('update:modelValue', checked.value);
</script>

<style lang="sass" scoped>
$label-weight: 26px
$off-color: #f0f9eb
$off-bg-color: #67c23a
$on-color: #fef0f0
$on-bg-color: #f56c6c
.toggle
  display: inline-block
  position: relative
  width: 2*$label-weight

  label
    display: block
    position: relative
    margin-bottom: calc(-1 * $label-weight / 2)
    width: 2*$label-weight
    height: $label-weight
    border-radius: $label-weight
    cursor: pointer

    span
      //span为两个标签的公共样式
      display: block
      //设置大小
      border-radius: calc($label-weight + 2px / 2)
      width: $label-weight + 2px
      height: $label-weight + 2px
      //文字居中
      line-height: $label-weight + 2px
      font-size: small
      font-weight: bolder
      text-align: center
      //动画设置
      animation-name: toggle-size
      animation-duration: 0.15s
      animation-timing-function: ease-out
      animation-iteration-count: 1
      animation-play-state: running
      transition: left 0.15s ease-in-out, background-color 0.2s ease-out, width 0.15s ease-in-out, height 0.15s ease-in-out, opacity 0.15s ease-in-out
      //定位
      position: absolute
      top: 50%
      left: 25%
      transform: translateY(-50%) translateX(-50%)
      opacity: 1
      z-index: 2

    .toggle-on
      background-color: $on-bg-color
      color: $on-color

    .toggle-off
      background-color: $off-bg-color
      color: $off-color

  input
    display: none

    &:checked
      + label
        span
          //选中时两个按钮都在右边
          left: 75%

        .toggle-off
          //选中时隐藏关闭按钮
          width: 0
          height: 0
          opacity: 0

    &:not(:checked) + label .toggle-on
      //未选中时隐藏开启按钮
      background-color: #f56c6c
      color: #fef0f0
      width: 0
      height: 0
      opacity: 0


@keyframes toggle-size
  0%, 100%
    width: 26px
    height: 26px

  50%
    width: 20px
    height: 20px

.on-label
  border: 1px solid $on-bg-color
  background-color: $on-color

.off-label
  border: 1px solid $off-bg-color
  background-color: $off-color
</style>