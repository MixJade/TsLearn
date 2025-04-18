<template>
  <div id="login-form">
    <label for="user">账号</label>
    <input type="text" name="user" id="user">
    <img id="touZi" src="/icon/touzi.png" alt="骰子">
    <div id="container">
      <div id="chatDiv" @click="toRoute('/chat')">在线聊天页面</div>
      <div id="fileDiv" @click="toRoute('/fileUp')">文件上传下载</div>
      <div id="qrCode" @click="toRoute('/qrCode')">二维码处理器</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
// 跳转路由
const toRoute = (url: string) => {
  router.push(url)
}
</script>

<style lang="sass" scoped>
$borderColor: #008A5B
#login-form
  text-align: center

  label
    color: $borderColor


//聊天页面
#user
  border: 3px solid $borderColor
  height: 36px
  width: 108px
  //50%圆角
  border-radius: 36px
  padding-left: 18px

#touZi
  //骰子图片
  $imgSize: 42px
  width: $imgSize
  height: $imgSize
  margin-bottom: - calc($imgSize / 2)

#container
  display: flex
  flex-wrap: wrap
  justify-content: center
  padding: 6px

  > div
    $divSize: 200px
    margin: 6px
    width: $divSize
    height: $divSize
    line-height: $divSize
    //设置字体
    font-size: larger
    color: white
    font-weight: bolder
    //设置圆角阴影
    border-radius: 16px
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.7)

#chatDiv
  background-color: #5b88ea

#fileDiv
  background-color: #c45656

#qrCode
  background-color: #198754
</style>