<template>
  <span :class="[income ? 'in' : 'out']" class="moneyTag">{{ label }} {{ income ? '+' : '-' }}{{
      Math.abs(money)
    }}</span>
</template>

<script lang="ts" setup>
// 日历图上展示收支样式
defineProps<{
  readonly money: number,
  readonly income: boolean,
  readonly label?: string;
}>()
</script>

<style lang="sass" scoped>
.moneyTag
  font-weight: bolder
  //文字白边
  $replace-shadow: 0 0 2px white
  text-shadow: $replace-shadow, $replace-shadow, $replace-shadow, $replace-shadow

.in
  //收入的字体
  color: #c45656

.out
  //支出的字体
  color: #17bd17
</style>