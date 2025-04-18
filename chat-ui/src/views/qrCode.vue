<template>
  <h3>上传二维码进行解析</h3>
  <input type="file" id="fileInput" accept="image/*">
  <button type="button" id="uploadBtn">确认上传</button>
  <section id="parseQRCodeText">解析内容</section>
  <hr>
  <h3>生成二维码</h3>
  <label for="qrCodeText">输入内容</label>
  <input id="qrCodeText" type="text">
  <button id="qrCodeTextBtn" type="button" @click="getQRCode">生成二维码</button>
  <div>
    <img id="qrCodeImg" src="" alt="二维码">
  </div>
</template>

<script setup lang="ts">
const getQRCode = () => {
  console.log("生成二维码")
}
</script>

<style lang="sass" scoped>
#parseQRCodeText
  border: 3px solid #008a5b
  padding: 8px
  width: 375px
</style>