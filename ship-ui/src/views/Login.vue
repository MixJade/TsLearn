<template>
  <div class="login-page">
    <el-row>
      <el-col :span="8" :xs="2">
        <h2>登录</h2>
      </el-col>
      <el-col :span="8" :xs="20">
        <el-tabs class="login-tabs" type="border-card">
          <el-tab-pane label="用户">
            <LoginForm role="USER"/>
          </el-tab-pane>
          <el-tab-pane label="管理员">
            <LoginForm role="ADMIN"/>
          </el-tab-pane>
          <el-tab-pane label="医生">
            <LoginForm role="DOCTOR"/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

import LoginForm from "@/components/LoginForm.vue";
</script>

<style scoped lang="scss">
/*整个登录组件*/
.login-page {
  background: {
    color: #ccc;
    size: cover;
    repeat: no-repeat;
  };
  width: 98%;
  height: 90vh;
  position: fixed;
}
/*登录的标签栏*/
.login-tabs{
  position: absolute;
  margin-top: 5%;
}
</style>