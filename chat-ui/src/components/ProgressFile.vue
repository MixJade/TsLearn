<template>
  <input id="fileInput" type="file" @change="handleFileChange">
  <button type="button" @click="uploadFile">确认上传</button>
  <div v-if="progressBar.show">
    <progress :value="progressBar.val" max="100"/>
    <span>{{ progressBar.text }}</span>kb
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {Result} from "@/model/Result";

const {url} = defineProps<{
  readonly url: string;
}>()

const emits = defineEmits<{
  (e: "upSuc"): void;
}>();

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

const uploadFile = async () => {
  if (!file.value) {
    alert('请选择文件');
    return;
  }
  uploadFileWithProgress(file.value)
};

interface PreBar {
  show: boolean;
  val: number,
  text: string
}

const progressBar = reactive({show: false, val: 0, text: ""}) as PreBar
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
      if (xhr.status >= 200 && xhr.status < 300) {
        // 请求成功
        const res = JSON.parse(xhr.responseText) as Result
        progressBar.show = false; // 隐藏上传进度条
        alert(res.msg)
        // 上传成功之后刷新
        if (res.flag) emits('upSuc')
      }
    }
  });

  xhr.open('POST', url, true);
  xhr.send(formData);
}
</script>

<style lang="sass" scoped>

</style>