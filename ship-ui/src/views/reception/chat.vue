<template>
  <el-container>
    <el-header>
      <PageHead>与某医生的聊天</PageHead>
    </el-header>
    <el-container>
      <el-aside>Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import PageHead from "@/components/PageHead.vue";
</script>

<style scoped lang="scss">
/*聊天主体页面*/
.el-container {
  width: 98vw;
  height: 88vh;

  .el-header {
    height: 40px;
    background-color: #67C23A;
  }

  .el-container {
    .el-aside {
      background-color: #213547;
      width: 15vw;
      @media (max-width: 576px) {
        width: 0;
      }
    }

    .el-container {
      .el-main {
        background-color: #cccccc;
      }

      .el-footer {
        height: 50px;
        background-color: #F56C6C;
      }
    }
  }
}
</style>