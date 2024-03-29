<template>
  <DetailTable
      :tab-con="co"
      role-photo="/picture/lei-jun.jpg"
      @upPwd="updatePwd"
      @upRole="updateRole"
  />
</template>

<script lang="ts" setup>
import {Client, exampleClient} from "@/modal/entiy/Client";
import DetailTable, {DetailTabType} from "@/components/card/DetailTable.vue";
import {computed, reactive} from "vue";
// 设置展示信息
const client: Client = reactive(exampleClient())
const co = computed((): DetailTabType[] => [
  {tit: "账号", con: client.clientUsername},
  {tit: "姓名", con: client.clientName},
  {tit: "性别", con: client.clientGender ? "男" : "女"},
  {tit: "联系方式", con: client.clientTel},
  {tit: "出生日期", con: client.clientAge},
  {tit: "简介", con: client.clientInfo},
])
// 更新资料与修改密码
const updateRole = () => {
  console.log("修改资料")
}
const updatePwd = () => {
  console.log("修改密码")
}
</script>

<style lang="scss" scoped>
</style>