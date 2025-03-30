<template>
  <label class="rocker">
    <input v-model="checked" type="checkbox">
    <span class="switch-left">{{ left }}</span>
    <span class="switch-right">{{ right }}</span>
  </label>
</template>

<script lang="ts" setup>

// 日历图的“年月”开关按钮
defineProps<{
  readonly left: string;
  readonly right: string;
}>()
const checked = defineModel<boolean>()
</script>

<style lang="sass" scoped>
.rocker
  display: inline-block
  position: relative
  //靠右
  float: right
  font-weight: bold
  text-align: center
  text-transform: uppercase
  color: #888
  width: 7em
  height: 4em
  overflow: hidden
  border-bottom: 0.5em solid #eee
  font-size: 0.75em
  margin: 1em

  &::before
    content: ""
    position: absolute
    top: 0.5em
    left: 0
    right: 0
    bottom: 0
    background-color: #999
    border: 0.5em solid #eee
    border-bottom: 0

  input
    opacity: 0
    width: 0
    height: 0

.switch-left,
.switch-right
  cursor: pointer
  position: absolute
  display: flex
  align-items: center
  justify-content: center
  height: 2.5em
  width: 3em
  transition: 0.2s

.switch-left
  height: 2.4em
  width: 2.75em
  left: 0.85em
  bottom: 0.4em
  background-color: #ddd
  transform: rotate(15deg) skewX(15deg)

  &::before
    content: ""
    position: absolute
    width: 0.4em
    height: 2.45em
    bottom: -0.45em
    background-color: #ccc
    transform: skewY(-65deg)
    left: -0.4em


.switch-right
  right: 0.5em
  bottom: 0
  background-color: #bd5757
  color: #fff

  &::before
    content: ""
    position: absolute
    width: 0.4em
    height: 2.45em
    bottom: -0.45em
    right: -0.375em
    background-color: transparent
    transform: skewY(65deg)

input
  &:checked
    & + .switch-left
      background-color: #0084d0
      color: #fff
      bottom: 0
      left: 0.5em
      height: 2.5em
      width: 3em
      transform: rotate(0deg) skewX(0deg)

      &::before
        background-color: transparent
        width: 3.0833em

      & + .switch-right
        background-color: #ddd
        color: #888
        bottom: 0.4em
        right: 0.8em
        height: 2.4em
        width: 2.75em
        transform: rotate(-15deg) skewX(-15deg)

        &::before
          background-color: #ccc
</style>