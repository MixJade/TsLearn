<template>
  <el-form
      :label-position="'right'"
      label-width="80px"
      :model="formLogin"
      class="login-card"
  >
    <h3>{{ getRoleName }}登录</h3>
    <el-form-item label="用户名">
      <el-input type="text" v-model="formLogin.username" :prefix-icon="User"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" show-password v-model="formLogin.password" :prefix-icon="Lock"/>
    </el-form-item>
    <el-form-item label="记住我">
      <el-switch v-model="formLogin.remember"/>
    </el-form-item>
    <el-button :type="btnType" round style="width: 80%" @click="toLogin">{{ getRoleName }}登录</el-button>
  </el-form>
</template>

<script setup lang="ts">
import {computed, reactive, Ref, ref} from "vue";
import {User, Lock} from "@element-plus/icons-vue"
import {ElMessage, buttonTypes} from "element-plus"
// 定义登录的角色
const prop = defineProps(['role'])
// 根据登录角色不同使用不同按钮
const btnType: Ref<"primary" | "success" | "info"> = ref(buttonTypes[1])
// 根据传来的角色设置展示
const getRoleName = computed(() => {
  switch (prop.role) {
    case "ADMIN":
      btnType.value = buttonTypes[2]
      return "管理员";
    case "DOCTOR":
      btnType.value = buttonTypes[4]
      return "医生";
    default:
      return "用户";
  }
})
// 登录的数据
const formLogin = reactive({
  username: "",
  password: "",
  remember: true
})
// 点击登录之后
const toLogin = () => {
  ElMessage({
    showClose: true,
    message: `登录成功!账号:${formLogin.username},密码:${formLogin.password},记住我:${formLogin.remember}`,
    type: 'success',
  })
}
</script>

<style scoped>
/*登录的小卡片*/
.login-card {
  background-color: #e9e9f5;
  max-width: 460px;
  text-align: center;
}
</style>