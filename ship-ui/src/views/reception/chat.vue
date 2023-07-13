<template>
  <el-container>
    <el-header>
      <PageHead>与{{ groupList[0].doctorName }}医生的聊天</PageHead>
    </el-header>
    <el-container>
      <el-aside>
        <h4>当前聊天</h4>
        <ul>
          <li>{{ groupList[0].doctorName }}</li>
        </ul>
        <h4 v-if="groupList.length>1">其它医生</h4>
        <ul v-if="groupList.length>1">
          <li v-for="gItem in groupList.slice(1)" :key="gItem.doctorId">{{ gItem.doctorName }}</li>
        </ul>
      </el-aside>
      <el-container>
        <el-main>
          <ChatCard :msg-list="msgList"/>
        </el-main>
        <el-footer>
          <el-icon size="36">
            <PictureRounded/>
          </el-icon>
          <el-input
              v-model="textarea1"
              autosize
              type="textarea"
              placeholder="请输入消息"
          />
          <el-button type="success" :icon="Position">发送</el-button>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import {PictureRounded, Position} from "@element-plus/icons-vue"
import PageHead from "@/components/PageHead.vue";
import {ref} from "vue";
import {exampleClientChat} from "@/modal/VO/ClientChatGroup";
import {exampleMsg} from "@/modal/entiy/Msg";
import ChatCard from "@/components/ChatCard.vue";

const props = defineProps<{
  doctorId?: Number
}>()

// 待发送的消息
const textarea1 = ref("")

// 当前医生的ID
let doctorId;
if (props.doctorId == undefined) {
  // 没有收到ID，执行ID的初始化逻辑
  doctorId = 1;
} else {
  doctorId = props.doctorId
}
// 得到分组与聊天记录
const groupList = exampleClientChat(doctorId);
const msgList = exampleMsg(doctorId);
</script>

<style scoped lang="scss">
/*聊天主体页面*/
.el-container {
  width: 98vw;
  height: 88vh;
  /*页头*/
  .el-header {
    height: 40px;
    background-color: #A8ABB2;
  }

  /*页头下面*/
  .el-container {
    .el-aside {
      background-color: lightgray;
      width: 15vw;
      @media (max-width: 576px) {
        width: 0;
      }
      /*人员列表*/
      ul {
        list-style: none;
        cursor: pointer;
        /*设置间距*/
        li {
          padding-bottom: 5px;
        }
      }
    }

    /*侧边栏右边*/
    .el-container {
      /*信息展示区域*/
      .el-main {
        background-color: whitesmoke;
      }

      /*输入区域*/
      .el-footer {
        padding-top: 8px;
        display: flex;
        height: 50px;
        background-color: #909399;
      }
    }
  }
}

</style>