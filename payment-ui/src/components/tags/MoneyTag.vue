<template>
  <span class="moneyTag" :class="[income ? 'in' : 'out']">{{ label }} {{ income ? '+' : '-' }}{{ money }}</span>
</template>

<script lang="ts" setup>
defineProps<{
  readonly money: number,
  readonly income: boolean,
  readonly label?: string;
}>()
</script>

<style scoped lang="sass">
.moneyTag
  font-weight: bolder
  //文字白边
  text-shadow: -2px -2px 2px white, 2px -2px 2px white, -2px 2px 2px white, 2px 2px 2px white

.in
  //收入的字体
  color: #c45656

.out
  //支出的字体
  color: #17bd17
</style>