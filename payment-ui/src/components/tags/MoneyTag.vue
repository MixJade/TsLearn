<template>
  <span :class="[income ? 'in' : 'out']">{{ label }} {{ income ? '+' : '-' }}{{ money }}</span>
</template>

<script lang="ts" setup>
defineProps<{
  readonly money: number,
  readonly income: boolean,
  readonly label?: string;
}>()
</script>

<style scoped lang="sass">
.in
  //收入的字体
  color: #c45656
  font-weight: bolder

.out
  //支出的字体
  color: #17bd17
  font-weight: bolder
</style>