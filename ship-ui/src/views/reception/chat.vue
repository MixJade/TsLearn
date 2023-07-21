<template>
  <ChatPanel opType="医生" :groupList="groupList" :msg-list="msgList" @sendMsg="sendMsg"/>
</template>

<script setup lang="ts">
import {exampleClientChat} from "@/modal/VO/ChatGroup";
import {exampleMsg} from "@/modal/VO/MsgVo";
import ChatPanel from "@/components/ChatPanel.vue";

const props = defineProps<{
  doctorId?: Number
}>()
// 当前医生的ID
let doctorId;
if (props.doctorId == null || props.doctorId == '') {
  // 没有收到ID，执行ID的初始化逻辑
  doctorId = 1;
} else {
  doctorId = props.doctorId
}
// 得到分组与聊天记录
const groupList = exampleClientChat(doctorId);
const msgList = exampleMsg(doctorId);
// 发送消息
const sendMsg = (val: string): void => {
  console.log(val)
}
</script>

<style scoped>
</style>
