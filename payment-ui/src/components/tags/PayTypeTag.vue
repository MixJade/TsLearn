<template>
  <span class="typeTag"> {{ bigType }}.{{ keyName }}</span>
</template>

<script lang="ts" setup>
defineProps<{
  readonly keyName: string;
  readonly bigType: number,
}>()
</script>

<style scoped lang="sass">
.typeTag
  $color-1: #409eff
  $color-2: #ebf5ff
  border: $color-1 solid 1px
  font-size: smaller
  padding: 2px 4px
  color: $color-1
  background-color: $color-2
  border-radius: 4px
</style>