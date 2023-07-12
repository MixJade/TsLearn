<template>
  <el-avatar src="/picture/lei-jun.jpg"/>
  <!-- 右边div，宠物信息-->
  <table class="myTable">
    <tr>
      <td class="bold">账号</td>
      <td>{{ client.clientUsername }}</td>
    </tr>
    <tr>
      <td class="bold">姓名</td>
      <td>{{ client.clientName }}</td>
    </tr>
    <tr>
      <td class="bold">性别</td>
      <td>{{ client.clientGender ? "男" : "女" }}</td>
    </tr>
    <tr>
      <td class="bold">联系方式</td>
      <td>{{ client.clientPhoto }}</td>
    </tr>
    <tr>
      <td class="bold">出生日期</td>
      <td>{{ client.clientAge }}</td>
    </tr>
    <tr>
      <td class="bold">简介</td>
      <td>{{ client.clientInfo }}</td>
    </tr>
    <tr>
      <td class="bold">操作</td>
      <td>
        <el-button type="primary">修改资料</el-button>
        &nbsp;
        <el-button type="danger">重置密码</el-button>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import {Client, exampleClient} from "@/modal/entiy/Client";
import {reactive} from "vue";

const client: Client = reactive(exampleClient())
</script>

<style scoped lang="scss">
.el-avatar {
  width: 128px;
  height: 128px;
  position: relative;
  left: 50%;
  margin-left: -64px;
}

/*设置信息展示表格*/
.myTable {
  border-collapse: collapse;
  text-align: center;
  /*设置定位*/
  position: relative;
  width: 60%;
  left: 20%;
  margin-bottom: 20px;

  td {
    border: none;
    padding: 2px;
  }

  .bold {
    text-align: right;
    font-weight: bold;
  }

  .bold + td {
    text-align: left;
    padding-left: 50px;
  }
}
</style>