<template>
  <h3>上传二维码进行解析</h3>
  <input id="fileInput" accept="image/*" type="file" @change="handleFileChange">
  <button type="button" @click="uploadFile">确认上传</button>
  <section id="parseQRCodeText">{{ parseQRCodeText }}</section>
  <hr>
  <h3>生成二维码</h3>
  <label for="qrCodeText">输入内容</label>
  <input id="qrCodeText" v-model="qrCodeText" type="text">
  <button id="qrCodeTextBtn" type="button" @click="getQRCode">生成二维码</button>
  <div>
    <img id="qrCodeImg" :src="qrCodeImgSrc" alt="二维码">
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";

const qrCodeText = ref<string>("") // 二维码值的输入框
const qrCodeImgSrc = ref<string>("") // 二维码图片
const parseQRCodeText = ref<string>("") // 二维码解析内容
onMounted(() => {
  // 获取协议+主机名和端口
  const urlText = window.location.protocol + '//' + window.location.host;
  qrCodeText.value = urlText
  qrCodeImgSrc.value = '/api/qrcode?url=' + urlText;
})

// 生成二维码
const getQRCode = () => {
  qrCodeImgSrc.value = '/api/qrcode?url=' + qrCodeText.value;
}

const file = ref<File | null>(null);
// 处理文件选择事件
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const selectedFile = target.files![0];
  if (selectedFile) {
    file.value = selectedFile;
  } else {
    file.value = null;
  }
};

// 上传文件
const uploadFile = async () => {
  if (!file.value) {
    alert('请选择文件');
    return;
  }
  const formData = new FormData() as FormData;
  formData.append('qrFile', file.value);
  fetch("/api/qrcode", {
    method: 'POST',
    body: formData,
  }).then(res => res.text())
      .then(res => parseQRCodeText.value = res)
};
</script>

<style lang="sass" scoped>
#parseQRCodeText
  border: 3px solid #008a5b
  padding: 8px
  width: 375px
</style>