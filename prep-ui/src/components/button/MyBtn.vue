<template>
  <button :class="'btn-'+type" class="my-btn" type="button">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
// 我的普通button,用于搜索框
defineProps<{
  readonly type: "secondary" | "primary" | "danger" | "success" | "warning";
  readonly text: string;
}>()
</script>

<style lang="sass" scoped>
.my-btn
  padding: 6px 12px
  margin-right: 6px
  font-size: 12px
  font-weight: bold
  border-radius: 16px
  transition: 0.5s
  cursor: pointer

  &.btn-secondary
    color: white
    background-color: #909399
    border: 2px solid #73767a

  &.btn-primary
    color: white
    background-color: #409EFF
    border: 2px solid #337ecc

  &.btn-danger
    color: white
    background-color: #F56C6C
    border: 2px solid #c45656

  &.btn-success
    color: white
    background-color: #67C23A
    border: 2px solid #529b2e

  &.btn-warning
    color: white
    background-color: #e6a23c
    border: 2px solid #b88230
</style>