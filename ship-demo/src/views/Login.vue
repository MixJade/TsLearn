<template>
  <div class="login-page">
    <el-tabs type="border-card">
      <el-tab-pane label="用户">
        <LoginForm role="USER"/>
        <el-col>
          <el-button round type="success" @click="this.$router.push('/reception')">游客登录</el-button>
          <el-button round type="warning">账号注册</el-button>
          <el-button round type="danger">找回密码</el-button>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="管理员">
        <LoginForm role="ADMIN"/>
      </el-tab-pane>
      <el-tab-pane label="医生">
        <LoginForm role="DOCTOR"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from "@/components/LoginForm.vue";</script>

<style lang="scss" scoped>
/*整个登录组件*/
.login-page {
  background: {
    color: #ccc;
    size: cover;
    repeat: no-repeat;
  };
  width: 98vw;
  height: 90vh;
  position: fixed;
}

/*登录的标签栏*/
.el-tabs {
  position: absolute;
  margin-top: 5%;
  left: 50%;
  transform: translateX(-50%);

  .el-tab-pane {
    background-color: #cccccc;
  }
}

.el-col {
  padding-top: 10px;
  text-align: center;
}
</style>