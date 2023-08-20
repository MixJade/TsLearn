<template>
  <div class="one-basePage">
    <div class="really">
      <DetailTable
          :tab-con="em"
          role-photo="/picture/lei-jun.jpg"
          @upPwd="updatePwd"
          @upRole="updateRole"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DetailTable, {DetailTabType} from "@/components/card/DetailTable.vue";
import {Employee, exampleEmployee} from "@/modal/entiy/Employee";
import {getJob} from "@/utils/JobUtil";
import {getDaysFromToday} from "@/utils/TimeUtil";
import {computed, reactive} from "vue";
// 设置展示信息
const employee: Employee = reactive(exampleEmployee())
const em = computed((): DetailTabType[] => [
  {tit: "账号", con: employee.employeeUsername},
  {tit: "姓名", con: employee.employeeName},
  {tit: "职位", con: getJob(employee.employeeLevel)},
  {tit: "联系方式", con: employee.employeeTel},
  {tit: "在职时长", con: getDaysFromToday(employee.createTime)},
])
// 更新资料与修改密码
const updateRole = () => {
  console.log("修改资料")
}
const updatePwd = () => {
  console.log("修改密码")
}
</script>

<style scoped src="public/css/one-basePage.css"/>