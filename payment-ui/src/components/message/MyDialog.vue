<template>
  <dialog ref="dialog" class="myDialog">
    <svg class="dialogCloseBtn" height="36" width="36" xmlns="http://www.w3.org/2000/svg" @click="closeMe">
      <line stroke="#fff" stroke-width="4" x1="25" x2="11" y1="11" y2="25"/>
      <line stroke="#fff" stroke-width="4" x1="25" x2="11" y1="25" y2="11"/>
    </svg>
    <slot></slot>
  </dialog>
</template>

<script lang="ts" setup>
import {ref} from "vue";
// 新增修改时的弹出框
const dialog = ref<HTMLDialogElement>()
const showMe = () => {
  dialog.value?.showModal()
}
const closeMe = () => dialog.value?.close()
defineExpose({showMe, closeMe})

</script>

<style lang="sass" scoped>
dialog.myDialog
  border-radius: 20px
  border: 5px solid #b88230
  box-shadow: 0 0 36px 0 #606266
  max-width: 90%
  max-height: 80%
  padding: 24px
  overflow: visible

.dialogCloseBtn
  border: 3px solid #73767a
  background-color: #909399
  border-radius: 50%
  //关闭按钮放在右上角
  position: absolute
  right: -18px
  top: 0

  &:hover
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.8)
</style>
