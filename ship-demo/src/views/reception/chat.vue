<template>
  <ChatPanel :groupList="groupList" :msg-list="msgList" opType="医生" @sendMsg="sendMsg"/>
</template>

<script lang="ts" setup>
import {exampleClientChat} from "@/modal/VO/ChatGroup";
import {exampleMsg} from "@/modal/VO/MsgVo";
import ChatPanel from "@/components/chat/ChatPanel.vue";

const props = defineProps<{
  doctorId?: string
}>()
// 当前医生的ID
let doctorId: number;
if (props.doctorId == null || props.doctorId == '') {
  // 没有收到ID，执行ID的初始化逻辑
  doctorId = 1;
} else {
  doctorId = parseInt(props.doctorId)
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
