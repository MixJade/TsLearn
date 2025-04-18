<template>
  <div id="chatMain">
    <header>
      <button class="header1" type="button" @click="$router.push('/')">返回</button>
      <h3 class="header2">聊天页面</h3>
      <button class="header3" type="button">在线人员</button>
    </header>
    <main>
      <Msg v-for="ms in myMsg" :is-me="username===ms.userVo.username" :ms="ms"/>
    </main>
    <footer>
      <label for="msgTextArea">
        消息
      </label>
      <textarea id="msgTextArea" cols="70" placeholder="请输入待发送的消息" rows="6"></textarea>
      <button type="button">发送</button>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Message} from "@/model/Message";
import Msg from "@/components/Msg.vue";

const username = ref<string>("活阎罗阮小七")
const myMsg = ref<Message[]>([
  {
    isSystem: true,
    userVo: {username: "没面目焦挺", imgColor: "#576842", simpleNm: "挺"},
    message: "没面目焦挺上线",
    sendTime: "16:38:24"
  }, {
    isSystem: false,
    userVo: {username: "没面目焦挺", imgColor: "#576842", simpleNm: "挺"},
    message: "顶顶顶顶",
    sendTime: "16:38:24"
  }, {
    isSystem: true,
    userVo: {username: "活阎罗阮小七", imgColor: "#5b3c02", simpleNm: "七"},
    message: "活阎罗阮小七上线",
    sendTime: "16:38:24"
  },
  {
    isSystem: false,
    userVo: {username: "活阎罗阮小七", imgColor: "#5b3c02", simpleNm: "七"},
    message: "京口瓜洲一水间，\n钟山只隔数重山。\n春风又绿江南岸，\n明月何时照我还。",
    sendTime: "16:39:13"
  }
])
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
  $backColor: #5b88ea
  //子元素高度
  $headerHeight: 6%
  $footerHeight: 20%

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

    .header1
      align-self: flex-start

    .header2
      align-self: center
      color: white

    .header3
      align-self: flex-end

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
    padding: 12px
    display: flex
    justify-content: center

    > *
      //文字样式
      font-size: 20px


button
  padding: 6px 16px 6px 16px
  color: white
  background-color: #67C23A
  border: 2px solid #529b2e
  border-radius: 12px
  font-weight: bolder

  &:hover
    //表中按钮
    box-shadow: 0 0 8px 0 #73767a
</style>