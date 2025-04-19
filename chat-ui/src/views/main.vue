<template>
  <div id="login-form">
    <label for="user">账号</label>
    <input id="user" v-model="username" name="user" type="text">
    <img id="touZi" alt="骰子" src="/icon/touzi.png" @click="randomName">
    <div id="container">
      <div style="background-color: #5b88ea" @click="loginChat">在线聊天页面</div>
      <div style="background-color: #c45656" @click="toRoute('/fileUp')">文件上传下载</div>
      <div style="background-color: #198754" @click="toRoute('/qrCode')">二维码处理器</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {reqRandomName, reqToLogin} from "@/request/loginApi";

onMounted(() => {
  randomName();
})

const router = useRouter();
// 跳转路由
const toRoute = (url: string) => {
  router.push(url)
}

// 登录聊天页面
const username = ref<string>("")
const randomName = () => {
  reqRandomName().then(res => {
    username.value = res
  })
}

const loginChat = () => {
  reqToLogin(username.value).then(res => {
    if (res.flag) {
      router.push("/chat")
    }
  })
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
</style>