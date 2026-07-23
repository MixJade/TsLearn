<template>
  <span v-if="ms.isSystem" class="noticeMsg">{{ ms.message }}</span>
  <div v-else :class="isMe ? 'selfMsg' : 'otherMsg'" class="msgRow">
    <div class="msgImg" :style="{backgroundColor: ms.userVo.imgColor}">{{ ms.userVo.simpleNm }}</div>
    <div class="msgBody">
      <span class="msgUser">{{ ms.userVo.username }} {{ ms.sendTime }}</span>
      <div v-if="ms.isHtml" class="msgBubble" v-html="ms.message"></div>
      <div v-else class="msgBubble">{{ ms.message }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Message} from "@/model/Message";

defineProps<{
  readonly ms: Message;
  readonly isMe: boolean;
}>()
</script>

<style lang="sass" scoped>
.msgRow
  display: flex
  align-items: flex-start
  margin: 10px 0
  gap: 10px

.otherMsg
  // 别人的消息靠左
  flex-direction: row

.selfMsg
  // 自己的消息靠右，头像放右边
  flex-direction: row-reverse

  .msgBubble
    background-color: #95ec69
    color: #1a1a1a
    border-radius: 12px 4px 12px 12px

  .msgUser
    text-align: right

.msgImg
  width: 40px
  height: 40px
  border-radius: 50%
  text-align: center
  font-weight: bolder
  color: white
  font-size: 15px
  line-height: 40px
  flex-shrink: 0

.msgBody
  display: flex
  flex-direction: column
  max-width: 70%

.msgUser
  font-size: 12px
  color: #b0b0b0
  margin-bottom: 4px

.msgBubble
  padding: 10px 14px
  border-radius: 4px 12px 12px 12px
  background-color: #ffffff
  color: #1a1a1a
  display: table
  white-space: pre-wrap
  word-break: break-all
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08)
  -webkit-user-select: text
  user-select: text
  font-size: 14px
  line-height: 1.5

.noticeMsg
  display: block
  width: 100%
  text-align: center
  font-size: 12px
  color: #b0b0b0
  margin: 8px 0
  padding: 4px 0
</style>