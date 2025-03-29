<template>
  <div :class="['tus', `tus-${type}`]">
    <svg v-if="type === 'suc'" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="8" cy="8" r="7" fill="#67C23A"/>
      <path d="M5 8 L8 11 L11 5" stroke="#e1f3d8" stroke-width="2" fill="none"/>
    </svg>
    <svg v-if="type === 'err'" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
      <circle cx="8" cy="8" r="7" fill="#F56C6C"/>
      <line x1="11" y1="5" x2="5" y2="11" stroke="#fde2e2" stroke-width="2"/>
      <line x1="11" y1="11" x2="5" y2="5" stroke="#fde2e2" stroke-width="2"/>
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

<style scoped lang="sass">
.tus
  top: -100%
  opacity: 0
  /*动画持续时间3秒*/
  animation: moveAndFade 3s
  /*元素居中*/
  position: absolute
  left: 50%
  transform: translateX(-50%)
  /*吐司样式*/
  width: 250px
  height: 40px
  border-radius: 6px
  border: 2px solid
  /*内容空隙*/
  box-sizing: border-box
  padding-left: 32px
  /*文字样式*/
  line-height: 36px
  -webkit-user-select: none
  user-select: none

  > svg
    position: absolute
    top: 10px
    left: 10px

  &.tus-suc
    color: #67C23A
    border-color: #e1f3d8
    background: #e1f3d8

  &.tus-err
    color: #F56C6C
    border-color: #fde2e2
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