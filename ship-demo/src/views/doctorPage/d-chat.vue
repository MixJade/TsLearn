<template>
  <ChatPanel :groupList="groupList" :msg-list="msgList" opType="用户" @sendMsg="sendMsg"/>
</template>

<script lang="ts" setup>
import {exampleDChatGroup} from "@/modal/VO/ChatGroup";
import {exampleDMsg} from "@/modal/VO/MsgVo";
import ChatPanel from "@/components/chat/ChatPanel.vue";

const props = defineProps<{
  clientId?: string
}>()
// 当前医生的ID
let clientId: number;
if (props.clientId == null || props.clientId == '') {
  // 没有收到ID，执行ID的初始化逻辑
  clientId = 1;
} else {
  clientId = parseInt(props.clientId)
}
// 得到分组与聊天记录
const groupList = exampleDChatGroup(clientId);
const msgList = exampleDMsg(clientId);
// 发送消息
const sendMsg = (val: string): void => {
  console.log(val)
}
</script>

<style scoped>
</style>
