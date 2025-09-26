<template>
  <div class="file-upload-container">
    <!-- 上传区域 -->
    <div
        class="upload-area"
        @click="triggerFileSelect"
        @dragover.prevent
        @dragleave.prevent
        @drop.prevent="handleDrop"
    >
      <input
          ref="fileInput"
          type="file"
          class="file-input"
          @change="handleFileChange"
          :accept="accept"
      >
      <h3 class="upload-tit">点击或拖拽文件到此处</h3>
      <p class="upload-sub">
        {{ accept ? '支持格式: ' + accept.replace(/,/g, ', ') : '支持所有文件格式' }}
      </p>
    </div>

    <!-- 文件内容区域 -->
    <div v-if="showContentModal">
      <ShowCard type="heart" title="面具碎片" :show="showHeartList"/>
      <ShowCard type="metal" title="制造金属" :show="showMetalList"/>
      <ShowCard type="box" title="忆境纪念盒" :show="showBoxList"/>
      <ShowCard type="silk" title="丝轴碎片" :show="showSilkList"/>
      <ShowCard type="heart" title="苔莓" :show="showBerryList"/>
    </div>
    <div v-else>
      丝之歌存档路径:
      <p class="no-wrap">%userprofile%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/{一串数字}/user1.dat</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {decode} from './utils/silkAES';
import {CollectInf, parseJsonData} from './utils/parseSaveData';
import ShowCard from "./components/ShowCard.vue";

// 文件输入框引用
const fileInput = ref<HTMLInputElement | null>(null);
const accept = ".json,.dat,.txt"

// 状态管理
const showContentModal = ref<boolean>(false);
const showBoxList = ref<CollectInf[]>([]);
const showSilkList = ref<CollectInf[]>([]);
const showHeartList = ref<CollectInf[]>([]);
const showMetalList = ref<CollectInf[]>([]);
const showBerryList = ref<CollectInf[]>([]);

// 触发文件选择对话框
const triggerFileSelect = (): void => {
  const fileInputRel = fileInput.value as HTMLInputElement;
  fileInputRel?.click();
};

// 处理文件选择
const handleFileChange = (e: Event): void => {
  // 断言事件目标为HTMLInputElement
  const input = e.target as HTMLInputElement;
  // 读取第一个文件
  if (input.files && input.files.length > 0) {
    readFileContent(input.files![0]);
  }
};

// 处理拖拽文件
const handleDrop = (e: DragEvent): void => {
  e.preventDefault(); // 阻止默认行为
  e.stopPropagation(); // 阻止事件冒泡

  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    readFileContent(files[0]);
  }
};

// 读取文件内容
const readFileContent = (file: File | undefined): void => {
  if (file === undefined) {
    return;
  }
  // 重置状态
  showContentModal.value = true;

  // 提取文件后缀
  const fileName = file.name;
  const lastDotIndex = fileName.lastIndexOf('.');
  const fileExt = lastDotIndex > -1 ? fileName.slice(lastDotIndex + 1).toLowerCase() : '';

  const reader = new FileReader();
  if (fileExt === "txt" || fileExt === "json") {
    reader.readAsText(file);
    // 读取成功
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      // 确保结果存在且为字符串
      if (typeof e.target?.result === 'string') {
        const fileContent = e.target.result;
        const parseRes = parseJsonData(fileContent);
        showBoxList.value = parseRes.boxList
        showSilkList.value = parseRes.silkList
        showHeartList.value = parseRes.heartList
        showMetalList.value = parseRes.metalList
        showBerryList.value = parseRes.berryList
      }
    };
  } else if (fileExt === "dat") {
    // 使用readAsArrayBuffer读取文件为二进制数据
    reader.readAsArrayBuffer(file);
    // 读取成功
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      // 确保结果存在且为ArrayBuffer
      if (e.target?.result instanceof ArrayBuffer) {
        // 将ArrayBuffer转换为Uint8Array（字节数组）
        const byteArray = new Uint8Array(e.target.result);
        // 传入decode函数（该函数需要接收Uint8Array参数）
        const fileContent = decode(byteArray);
        const parseRes = parseJsonData(fileContent);
        showBoxList.value = parseRes.boxList
        showSilkList.value = parseRes.silkList
        showHeartList.value = parseRes.heartList
        showMetalList.value = parseRes.metalList
        showBerryList.value = parseRes.berryList
      }
    };
  }
};
</script>
<!--去掉scoped作用域，这样生成的css就没有`[data-v-34552472]`标识-->
<style lang="sass">
.file-upload-container
  max-width: 800px
  margin: 20px auto
  padding: 0 15px

.upload-area
  border: 2px dashed #ccc
  border-radius: 8px
  padding: 40px 20px
  text-align: center
  cursor: pointer
  transition: all 0.3s ease
  background-color: #f9f9f9

  &:hover
    border-color: #42b983
    background-color: #f0fdf4

.file-input
  display: none

.upload-tit
  margin: 0 0 10px 0
  color: #333
  font-size: 1.2rem

.upload-sub
  margin: 0
  color: #666
  font-size: 0.9rem

.no-wrap
  white-space: nowrap
</style>
