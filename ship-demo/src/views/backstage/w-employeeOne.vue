<template>
  <el-button plain style="position: absolute;margin-left: 24px" type="warning" @click="isShow=!isShow">
    {{ isShow ? "隐藏" : "显示" }}面板
  </el-button>
  <LightBox v-show="isShow">
    <router-link to="/doctorPage">
      <el-button style="position: absolute" type="success">悬壶济世</el-button>
    </router-link>
    <DetailTable
        :tab-con="em"
        role-photo="/picture/lei-jun.jpg"
        @upPwd="updatePwd"
        @upRole="updateRole"
    />
  </LightBox>
</template>

<script lang="ts" setup>
import DetailTable, {DetailTabType} from "@/components/card/DetailTable.vue";
import {Employee, exampleEmployee} from "@/modal/entiy/Employee";
import {getJob} from "@/utils/JobUtil";
import {getAge, getDaysFromToday} from "@/utils/TimeUtil";
import {computed, reactive, ref} from "vue";
import LightBox from "@/components/card/LightBox.vue";
// 设置展示信息
const isShow = ref<boolean>(true)
const employee: Employee = reactive(exampleEmployee())
const em = computed((): DetailTabType[] => [
  {tit: "账号", con: employee.employeeUsername},
  {tit: "姓名", con: employee.employeeName},
  {tit: "性别", con: "男"},
  {tit: "职位", con: getJob(employee.employeeLevel)},
  {tit: "科室", con: "犬猫科"},
  {tit: "联系方式", con: employee.employeeTel},
  {tit: "年龄", con: getAge("1990-10-10")},
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

<style scoped></style>
