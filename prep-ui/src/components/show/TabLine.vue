<template>
  <header class="tab-line">
    <div class="tab-tit" :class="type">{{ tit }}</div>
    <div>
      <slot></slot>
    </div>
  </header>
</template>

<script lang="ts" setup>
// 编辑题目时，标题的左右布局
defineProps<{
  readonly type: "primary" | "success" | "warning";
  readonly tit: string;
}>()
</script>

<style lang="sass" scoped>
.tab-line
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  box-sizing: border-box
  padding: 0 24px

.tab-tit
  font-weight: 700
  font-size: large

  &.primary
    color: #409EFF

  &.success
    color: #67C23A

  &.warning
    color: #e6a23c
</style>