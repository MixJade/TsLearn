<template>
  <Header/>
  <h3>文件上传</h3>
  <ProgressFile url="/api/file/upload" @upSuc="getFileList"/>
  <hr>
  <h3>文件下载</h3>
  <ul v-if="fileList.length>0">
    <li v-for="fi in fileList" :key="fi.fileName"><a :href="'/api/file/down/'+fi.fileName">{{ fi.fileName }}</a>
      ({{ fi.fileSize }})
      <button type="button" @click="showDialog(fi.fileName)">二维码</button>
    </li>
  </ul>
  <ul v-else>
    <li>暂无可下载资源</li>
  </ul>
  <!--文件提示-->
  <footer>
    <h3>文件提示</h3>
    <ul>
      <li>电脑端可展示文件的下载二维码</li>
      <li>手机QQ接收文件：Android\data\com.tencent.mobileqq\Tencent\QQfile_recv</li>
    </ul>
  </footer>
  <MyDialog ref="myShow">
    <figure>
      <img id="qrCode" :src="qrcodeSrc" alt="qrCode">
      <figcaption>下载链接二维码</figcaption>
    </figure>
  </MyDialog>
</template>

<script lang="ts" setup>
import MyDialog from "@/components/MyDialog.vue";
import {onMounted, ref} from "vue";
import {reqFileList} from "@/request/fileApi";
import {FileInfo} from "@/model/FileInfo";
import Header from "@/components/Header.vue";
import ProgressFile from "@/components/ProgressFile.vue";

onMounted(() => {
  getFileList();
})

// 输出可下载文件的列表
const fileList = ref<FileInfo[]>([]);
const getFileList = () => {
  reqFileList().then(res => {
    fileList.value = res;
  })
}

// 二维码下载框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const qrcodeSrc = ref<string>("")
const showDialog = (url: string) => {
  const urlText = window.location.protocol + '//' + window.location.host;
  qrcodeSrc.value = '/api/qrcode?url=' + urlText + '/api/file/down/' + url;
  myShow.value?.showMe();
}
</script>

<style lang="sass" scoped>
ul
  font-size: larger

  li
    padding: 6px
    word-wrap: break-word
    overflow-wrap: break-word

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
  position: relative
  margin-top: 80px
  bottom: 0
  width: 100%
</style>