<template>
  <h3>文件上传</h3>
  <input id="fileInput" type="file" @change="handleFileChange">
  <button type="button" @click="uploadFile">确认上传</button>
  <div v-if="progressBar.show">
    <progress max="100" :value="progressBar.val"/>
    <span>{{ progressBar.text }}</span>kb
  </div>
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
      <img id="qrCode" alt="qrCode" :src="qrcodeSrc">
      <figcaption>下载链接二维码</figcaption>
    </figure>
  </MyDialog>
</template>

<script lang="ts" setup>
import MyDialog from "@/components/MyDialog.vue";
import {onMounted, reactive, ref} from "vue";
import {reqFileList} from "@/request/fileApi";
import {FileInfo} from "@/model/FileInfo";
import {Result} from "@/model/Result";

onMounted(() => {
  getFileList();
})

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
  uploadFileWithProgress(file.value)
};

const progressBar = reactive({show: false, val: 0, text: ""}) as { show: boolean; val: number, text: string }
const uploadFileWithProgress = (file: File) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', file);

  // 监听上传进度
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      const per = (e.loaded / e.total) * 100; // 计算进度百分比
      progressBar.show = true;
      // 更新 UI（如进度条）
      progressBar.val = per
      progressBar.text = (e.loaded >> 10) + "/" + (e.total >> 10)
    }
  });

  // 监听请求完成事件
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      // 请求成功
      const res = JSON.parse(xhr.responseText) as Result
      progressBar.show = false; // 隐藏上传进度条
      alert(res.msg)
      // 上传成功之后刷新
      if (res.flag) getFileList()
    }
  });

  xhr.open('POST', '/api/file/upload', true);
  xhr.send(formData);
}
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