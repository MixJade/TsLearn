<template>
  <div id="chatMain">
    <header>
      <a href="#/" class="backBtn">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        返回
      </a>
      <span class="statusInfo">
        <span class="dot" :class="isOn ? 'dotOn' : 'dotOff'"></span>
        {{ username }}
      </span>
      <button type="button" class="onlineBtn" @click="clickLoginUser">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        在线人员
      </button>
    </header>
    <main ref="chatContent">
      <Msg v-for="ms in myMsg" :is-me="!ms.isSystem && username===ms.userVo.username" :ms="ms"/>
    </main>
    <footer>
      <textarea v-model="sendMsg" placeholder="输入消息或粘贴图片..."
                @paste="handlePaste" @keydown.enter.exact="clickSend"></textarea>
      <button type="button" class="sendBtn" @click="clickSend">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {Message} from "@/model/Message";
import Msg from "@/components/Msg.vue";
import {reqLoginUserList, reqSyncHistoryMsg, reqUsername} from "@/request/chatApi";
import {reqUpPasteImg} from "@/request/fileApi";

onMounted(() => {
  reqUsername().then(res => {
    username.value = res
  })
  reqSyncHistoryMsg().then(res => {
    res.forEach(i => myMsg.value.push(JSON.parse(i) as Message))
    rollBottom()
  })
})
const username = ref<string>("")
const isOn = ref<boolean>(false)
const myMsg = ref<Message[]>([])
const chatContent = ref<HTMLDivElement>()
// 向下滑动
const rollBottom = () => {
  setTimeout(() => {
    chatContent.value!.scrollTop = chatContent.value!.scrollHeight
  }, 500)
}

// 链接webSocket
const ws = new WebSocket("ws://" + window.location.host + "/ws/chat");
if (typeof (ws) === "undefined") {
  alert("您的浏览器不支持socket")
}
ws.onopen = () => { // 通过对象建立ws链接
  isOn.value = true;
}
//接受消息
ws.onmessage = (ev) => {
  myMsg.value.push(JSON.parse(ev.data) as Message)
  rollBottom()
}
// 关闭链接
ws.onclose = () => {
  isOn.value = false;
}
//发送消息
const sendMsg = ref<string>("")
const clickSend = () => {
  if (sendMsg.value === "") return;
  ws.send(sendMsg.value);
  sendMsg.value = ""
}

//获取登录人列表
const clickLoginUser = () => {
  reqLoginUserList().then(res => {
    if (res.length === 0) alert("无人在线")
    else alert(res)
  })
}
/**
 ┌───────────────────────────────────┐
 │=============退出时的操作============│
 └───────────────────────────────────┘
 */
onBeforeUnmount(() => {
  ws.close(1000, '正常关闭连接');
})
/**
 ┌───────────────────────────────────┐
 │=============图片粘贴操作============│
 └───────────────────────────────────┘
 */
const handlePaste = async (e: ClipboardEvent) => {
  const items = e.clipboardData?.items;
  if (!items) return;

  for (const item of items) {
    if (item.type.indexOf('image') !== -1) {
      e.preventDefault();
      const blob = item.getAsFile();
      if (blob) {
        try {
          const formData = new FormData() as FormData;
          formData.append('file', blob);
          reqUpPasteImg(formData).then(resp => {
            if (resp.flag) {
              ws.send("我上传了图片：" + resp.msg);
            } else {
              alert("图片上传失败")
            }
          });
        } catch (error) {
          console.error('图片上传失败:', error);
          alert('图片上传失败');
        }
      }
      break;
    }
  }
};
</script>

<style lang="sass" scoped>
#chatMain
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  width: 100%
  height: 100%
  display: flex
  flex-direction: column
  background-color: #f5f5f5
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

  header
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 16px
    height: 52px
    background: rgba(255, 255, 255, 0.85)
    backdrop-filter: blur(10px)
    border-bottom: 1px solid rgba(0, 0, 0, 0.06)
    z-index: 10

    .backBtn
      display: flex
      align-items: center
      gap: 4px
      color: #576b95
      font-size: 14px
      font-weight: 500
      &:hover
        color: #3a5a8c

    .statusInfo
      display: flex
      align-items: center
      gap: 6px
      font-size: 15px
      font-weight: 600
      color: #1a1a1a

    .dot
      width: 8px
      height: 8px
      border-radius: 50%
      display: inline-block

    .dotOn
      background-color: #07c160

    .dotOff
      background-color: #ccc

    .onlineBtn
      display: flex
      align-items: center
      gap: 4px
      padding: 6px 12px
      font-size: 13px
      color: #576b95
      background: rgba(87, 107, 149, 0.08)
      border: none
      border-radius: 8px
      cursor: pointer
      font-weight: 500
      &:hover
        background: rgba(87, 107, 149, 0.15)

  main
    flex: 1
    overflow-y: auto
    padding: 16px 24px
    background-color: #f5f5f5
    // 自定义滚动条
    &::-webkit-scrollbar
      width: 4px
    &::-webkit-scrollbar-thumb
      background-color: rgba(0, 0, 0, 0.12)
      border-radius: 4px

  footer
    display: flex
    align-items: flex-end
    gap: 10px
    padding: 12px 16px
    background: rgba(255, 255, 255, 0.92)
    backdrop-filter: blur(10px)
    border-top: 1px solid rgba(0, 0, 0, 0.06)
    z-index: 10

    textarea
      flex: 1
      resize: none
      border: none
      outline: none
      background-color: transparent
      font-size: 14px
      line-height: 1.5
      padding: 8px 0
      color: #1a1a1a
      min-height: 40px
      max-height: 120px
      font-family: inherit
      &::placeholder
        color: #b0b0b0

    .sendBtn
      width: 40px
      height: 40px
      border-radius: 50%
      border: none
      background: #07c160
      color: white
      cursor: pointer
      display: flex
      align-items: center
      justify-content: center
      flex-shrink: 0
      transition: background 0.2s
      &:hover
        background: #06ad56
      &:active
        background: #059648
</style>
