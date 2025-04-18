<template>
  <h3>文件上传</h3>
  <input id="fileInput" type="file">
  <button id="uploadBtn" type="button">确认上传</button>
  <div id="progressDiv" style="display: none;">
    <progress id="progressBar" max="100" value="0">0%</progress>
    <span id="progressTxt">上传进度</span>kb
  </div>
  <hr>
  <h3>文件下载</h3>
  <ul id="downUl">
    <li><a href="#">下载xxx.jpg</a> (3994.23KB)
      <button type="button" @click="showDialog">二维码</button>
    </li>
    <li><a href="#">下载xxx.jpg</a> (3.90MB)
      <button type="button" @click="showDialog">二维码</button>
    </li>
    <li><a href="#">下载xxx.jpg</a> (399B)
      <button type="button" @click="showDialog">二维码</button>
    </li>
  </ul>
  <MyDialog ref="myShow">
    <figure>
      <img id="qrCode" alt="qrCode" src="http://localhost:9527/public/avatar/touhou/touhou025.png">
      <figcaption>下载链接二维码</figcaption>
    </figure>
  </MyDialog>
</template>

<script lang="ts" setup>
import MyDialog from "@/components/MyDialog.vue";
import {ref} from "vue";

const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const showDialog = () => {
  myShow.value?.showMe();
}
</script>

<style lang="sass" scoped>
#downUl
  font-size: larger

  li
    padding: 6px

    a
      text-decoration: none

    button
      opacity: 0
      //设置过渡效果
      transition: all 1s

    &:hover button
      //鼠标悬浮时按钮出现
      opacity: 1

figcaption
  text-align: center

footer
  position: absolute
  bottom: 0
  width: 100%
  overflow: auto
</style>