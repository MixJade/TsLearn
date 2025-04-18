<template>
  <span v-if="ms.isSystem" class="noticeMsg">{{ ms.message }}</span>
  <div v-else class="msgDiv" :class="isMe?'selfMsg':''">
    <span class="msgUser">{{ ms.userVo.username }}{{ ms.sendTime }}</span>
    <div class="msgImg">{{ ms.userVo.simpleNm }}</div>
    <div class="msgContent">{{ ms.message }}</div>
  </div>
</template>

<script setup lang="ts">
import {Message} from "@/model/Message";

defineProps<{
  readonly ms: Message;
  readonly isMe: boolean;
}>()
</script>

<style lang="sass" scoped>
.msgDiv
  //聊天消息的样式
  padding: 12px

.msgUser
  height: 24px
  display: inline-block
  //文字样式
  font-size: small
  font-weight: bold
  color: #909399

.msgImg
  $msgImgHeight: 46px
  height: $msgImgHeight
  width: $msgImgHeight
  //大致样式
  background-color: #8047b2
  border-radius: 12px
  //字体样式
  text-align: center
  font-weight: bolder
  color: white
  font-size: larger
  line-height: $msgImgHeight

.msgContent
  //定位
  margin-left: 64px
  margin-top: -32px
  //大体样式
  padding: 8px
  border-radius: 12px
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.7)
  // 为内部文本宽度
  display: table
  max-width: 70%
  //换行
  white-space: pre-wrap
  word-break: break-all
  background-color: #FAFAFA
  //允许文字选中
  -webkit-user-select: text
  user-select: text

.noticeMsg
  @extend .msgUser
  //系统通知消息需居中
  display: block
  width: 100%
  text-align: center

.selfMsg
  // 自己的消息,整个左右翻转
  transform: scaleX(-1)
  // 子元素再翻回去
  > *
    transform: scaleX(-1)

  .msgContent
    background-color: #67c23a
    color: white
    text-align: right
</style>