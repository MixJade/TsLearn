<template>
  <div class="login-page">
    <!-- 定义了此图形，宽1000，高200 -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
      <!-- 定义填充色-->
      <defs>
        <linearGradient id="Gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="MediumVioletRed"/>
          <stop offset="100%" stop-color="MediumOrchid"/>
        </linearGradient>
      </defs>
      <!-- 长方形区域，宽1000，高30，淡蓝色  -->
      <rect width="1000" height="80" fill="url(#Gradient)"/>
      <!-- 弧形区域，从(0,30)出发，低谷点为(500,130)，到(1000,30)结束 -->
      <path d="M0 80 Q500 280 ,1000 80" stroke="transparent" fill="url(#Gradient)"/>
    </svg>
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
  /* 背景的svg */
  svg {
    position: fixed;
    height: 50vh;
    width: 98vw;
  }
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