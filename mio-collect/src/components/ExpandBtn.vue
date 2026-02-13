<template>
  <svg class="arrow-icon" :class="{ 'arrow-up': expend }" height="20" width="30" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3 L15 15 L27 3" fill="none" :stroke="color" stroke-width="2"/>
  </svg>
</template>

<script lang="ts" setup>
// 点击展开按钮
defineProps<{
  readonly expend: boolean;
  readonly color: string;
}>()
</script>

<style lang="sass">
.arrow-icon
  padding: 0 12px
  display: inline-block
  // 关键：添加transition实现平滑旋转过渡
  transition: transform 0.3s ease-in-out
  // 关键：设置变换原点（箭头中心），避免旋转偏移
  transform-origin: center center

// 动态样式：expend为true时，顺时针旋转180°
.arrow-up
  transform: rotate(180deg)
</style>