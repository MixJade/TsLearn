<template>
  <div id="chatMain">
    <header>
      <a href="#/">返回</a>
      <span>{{ username }}({{ isOn ? "在线" : "离线" }})</span>
      <button type="button" @click="clickLoginUser">在线人员</button>
    </header>
    <main ref="chatContent">
      <Msg v-for="ms in myMsg" :is-me="!ms.isSystem && username===ms.userVo.username" :ms="ms"/>
    </main>
    <footer>
      <label for="msgTextArea">
        消息
      </label>
      <textarea id="msgTextArea" v-model="sendMsg" cols="70" placeholder="请输入待发送的消息" rows="6"></textarea>
      <button type="button" @click="clickSend">发送</button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {Message} from "@/model/Message";
import Msg from "@/components/Msg.vue";
import {reqLoginUserList, reqSyncHistoryMsg, reqUsername} from "@/request/chatApi";

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
const ws = new WebSocket("ws://" + window.location.host + "/ws/chat");  // 建立WebSocket对象
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
  // 1000是关闭代码，表示正常关闭连接，'正常关闭连接'是一个可选的文字描述
  ws.close(1000, '正常关闭连接');
})
</script>

<style lang="sass" scoped>
#chatMain
  //页面必须刚好填满屏幕
  position: absolute
  top: 0
  bottom: 0
  left: 0
  right: 0
  width: 100%
  height: 100%
  //主题颜色
  $backColor: #409eff
  //子元素高度
  $headerHeight: 6%
  $footerHeight: 12%

  header
    width: 100%
    height: $headerHeight
    //定位
    position: absolute
    top: 0
    //背景颜色
    background-color: $backColor
    //内部样式
    box-sizing: border-box
    padding: 6px
    display: flex
    justify-content: space-between
    align-items: center

    a, span
      //字体颜色
      font-size: smaller
      color: white
      font-weight: bolder

  main
    width: 90%
    height: 100%-$headerHeight - $footerHeight
    //定位
    position: absolute
    left: 5%
    top: $headerHeight
    bottom: $footerHeight
    //滚轮
    overflow-y: auto
    //内部样式
    box-sizing: border-box
    padding: 12px
    //背景颜色
    background-color: #F0F2F5

  footer
    width: 100%
    height: $footerHeight
    //定位
    position: absolute
    bottom: 0
    //背景颜色
    background-color: $backColor
    border-top: 2px solid #3c3c3c
    //内部样式
    box-sizing: border-box
    padding: 4px 6px
    display: flex
    justify-content: center

    label
      font-weight: bolder
      color: white

    textarea
      margin: 0 4px

button
  padding: 2px 6px
  color: white
  background-color: #67C23A
  border: 2px solid #529b2e
  border-radius: 6px
  font-weight: bolder

  &:hover
    //表中按钮
    box-shadow: 0 0 8px 0 #73767a
</style>