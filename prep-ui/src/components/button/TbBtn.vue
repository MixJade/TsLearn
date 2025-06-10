<template>
  <span :class="type+'-btn'" class="tb-btn">
    {{ text }}
  </span>
</template>

<script lang="ts" setup>
// 表格中的按钮，有功能、修改、删除
defineProps<{
  readonly type: "ent" | "upd" | "del"
  readonly text: string;
}>()
</script>

<style lang="sass" scoped>
// ========================[表格中的按钮样式]===============================
.tb-btn
  //表中按钮
  padding: 2px 5px 2px 5px
  border-radius: 4px
  font-size: small
  margin: 2px
  cursor: pointer

  &:hover
    box-shadow: 0 0 8px 0 #73767a

.ent-btn
  //表中功能按钮
  color: #67c23a
  background-color: #f0f9eb

.upd-btn
  //表中修改按钮
  color: #409eff
  background-color: #ebf5ff

.del-btn
  //表中删除按钮
  color: #f56c6c
  background-color: #fef0f0
</style>