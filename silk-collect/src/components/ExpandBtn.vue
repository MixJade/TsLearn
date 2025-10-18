<template>
  <button class="expend-btn" type="button">{{ expend ? "点击收起" : "点击展开" }}</button>
</template>

<script lang="ts" setup>
// 点击展开按钮
defineProps<{
  readonly expend: boolean;
}>()
</script>

<style lang="sass">
.expend-btn
  $button-color: #73767a
  $button-back-color: #f4f4f5
  $button-width: 90px
  $button-height: 28px
  display: inline-block
  width: $button-width
  height: $button-height
  background-color: $button-back-color
  border: 2px solid $button-color
  border-radius: 4px
  font-weight: bolder
  color: $button-color
  line-height: calc($button-height - 10px)
</style>