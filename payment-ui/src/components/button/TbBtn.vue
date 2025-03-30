<template>
  <button class="del-btn" type="button"><img src="/icon/delBtn.svg" alt="del"></button>
  <button class="upd-btn" type="button"><img src="/icon/editBtn.svg" alt="edit"></button>
</template>

<script lang="ts" setup>
// 表格中的按钮,抽离是为了更好管理样式
</script>

<style scoped lang="sass">
button:hover
  //表中按钮
  box-shadow: 0 0 8px 0 #73767a

.del-btn
  //表中删除按钮
  padding: 3px 5px 3px 8px
  font-size: small
  color: white
  background-color: #F56C6C
  border: 2px solid #c45656
  border-radius: 12px 0 0 12px

.upd-btn
  //表中修改按钮
  padding: 3px 8px 3px 5px
  font-size: small
  color: white
  background-color: #409EFF
  border: 2px solid #337ecc
  border-radius: 0 12px 12px 0
</style>