<template>
  <h3>文件上传</h3>
  <input type="file" id="fileInput">
  <button type="button" id="uploadBtn">确认上传</button>
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
      <img id="qrCode" src="http://localhost:9527/public/avatar/touhou/touhou025.png" alt="qrCode">
      <figcaption>下载链接二维码</figcaption>
    </figure>
  </MyDialog>
</template>

<script setup lang="ts">
import MyDialog from "@/components/MyDialog.vue";
import {ref} from "vue";

const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const showDialog = () => {
  myShow.value?.showMe();
}
</script>

<style lang="sass" scoped>

</style>