<template>
  <el-container>
    <el-header>
      <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          mode="horizontal"
          router
          text-color="#fff"
      >
        <el-menu-item index="/doctorPage/d-appoint">挂号处理</el-menu-item>
        <el-menu-item index="/doctorPage/d-chat">在线咨询</el-menu-item>
        <el-menu-item index="/doctorPage/doctorOne">个人资料</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <h2>此处搬空，样式待定</h2>
    </el-main>
  </el-container>

</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.el-menu {
  justify-content: center;
}
</style>
