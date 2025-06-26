<template>
  <button type="button">{{ text }}</button>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const props = defineProps<{
  readonly type: "primary" | "success" | "warning";
  readonly text: string;
}>()

const myColorTxt = ref<string>("#409eff")
const myColorBac = ref<string>("#ebf5ff")
if (props.type === "success") {
  myColorTxt.value = "#67c23a"
  myColorBac.value = "#f0f9eb"
} else if (props.type === "warning") {
  myColorTxt.value = "#e6a23c"
  myColorBac.value = "#fdf6ec"
}
</script>

<style lang="sass" scoped>
button
  $button-color: v-bind(myColorTxt)
  $button-back-color: v-bind(myColorBac)
  $button-width: 90px
  $button-height: 32px
  display: inline-block
  width: $button-width
  height: $button-height
  background-color: $button-back-color
  margin: 8px 4px
  position: relative
  overflow: hidden
  border: 2px solid $button-color
  transition: color 0.5s
  z-index: 1
  border-radius: 4px
  font-weight: bolder
  color: $button-color
  line-height: calc($button-height - 10px)

  &:before
    content: ""
    position: absolute
    z-index: -1
    background: $button-color
    height: calc($button-height * 3)
    width: calc($button-width * 2)
    border-radius: 50%
    top: 100%
    left: 100%
    transition: all 0.7s

  &:hover
    color: #fff

    &:before
      top: -30px
      left: -30px
</style>