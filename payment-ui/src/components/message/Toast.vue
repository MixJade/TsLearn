<template>
  <div :class="['tus', `tus-${type}`]">
    <svg v-if="type === 'suc'" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" fill="#67C23A" r="9"/>
      <path d="M5 9 L9 13 L13 5" fill="none" stroke="#e1f3d8" stroke-width="2"/>
    </svg>
    <svg v-if="type === 'err'" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" fill="#F56C6C" r="9"/>
      <line stroke="#fde2e2" stroke-width="2" x1="13" x2="5" y1="5" y2="13"/>
      <line stroke="#fde2e2" stroke-width="2" x1="13" x2="5" y1="13" y2="5"/>
    </svg>
    <span>{{ msg }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  type: "suc" | "err";
  msg: string;
}>()
</script>

<style lang="sass" scoped>
.tus
  $tus-height: 38px
  $border-weight: 1px
  $svg-height: 18px
  $svg-margin: calc(($tus-height - 2 * $border-weight - $svg-height) / 2)
  top: -100%
  opacity: 0
  //动画持续时间3秒
  animation: moveAndFade 3s
  //元素居中
  position: fixed
  left: 50%
  transform: translateX(-50%)
  //吐司样式
  width: 250px
  height: $tus-height
  border-radius: 6px
  border: $border-weight solid
  box-shadow: 0 8px 28px #909399
  //内容空隙
  box-sizing: border-box
  padding-left: calc($svg-margin * 2 + $svg-height)
  //文字样式
  line-height: calc($tus-height - 2 * $border-weight)
  font-size: small
  font-weight: bold
  -webkit-user-select: none
  user-select: none

  > svg
    position: absolute
    top: $svg-margin
    left: $svg-margin

  &.tus-suc
    color: #67C23A
    border-color: #67C23A
    background: #e1f3d8

  &.tus-err
    color: #F56C6C
    border-color: #F56C6C
    background: #fde2e2

@keyframes moveAndFade
  0%
    top: -100%
    opacity: 0
  15%
    top: 5vh
    opacity: 1
  65%
    top: 5vh
    opacity: 1
  100%
    top: 10vh
    opacity: 0
</style>