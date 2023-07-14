<template>
  <BackOpCol @query="queryB" @addRole="addRoleB" @delBatch="delBatchB">
    <el-input v-model="qp.petName" placeholder="宠物姓名" size="large"/>
    <el-input v-model="qp.clientName" placeholder="用户姓名" size="large"/>
  </BackOpCol>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import BackOpCol from "@/components/BackOpCol.vue";

const qp = reactive({
  petName: '',
  clientName: ''
})
const queryB = (): void => {
  console.log("查询，参数1：", qp.petName, "参数2", qp.clientName)
}
const addRoleB = (): void => {
  console.log("添加宠物")
}
const delBatchB = (): void => {
  console.log("批量删除")
}
</script>

<style scoped>

</style>