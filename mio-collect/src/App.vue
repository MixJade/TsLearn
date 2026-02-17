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
        {{ '支持格式: ' + accept.replace(/,/g, ', ') }}
      </p>
    </div>

    <!-- 文件内容区域 -->
    <div v-if="showContentModal">
      <h5>当前文件：{{ selectFileName }}</h5>
      <ShowCard type="metal" title="老旧核心" :show="showOldCoreList"/>
      <ShowCard type="heart" title="镀层部件" :show="showHeartList"/>
      <ShowCard type="silk" title="先祖遗产" :show="showElderList"/>
      <ShowCard type="metal" title="蜡烛" :show="showGiftList"/>
      <ShowCard type="box" title="序列号" :show="showSerialList"/>
    </div>
    <div v-else>
      <h4>MIO存档路径:</h4>
      <ul>
        <li>Windows
          <p class="code">%userprofile%/AppData/Local/MIO/Saves/Steam/{一串数字}/slot_0.save</p>
        </li>
        <li>Xbox（仅作参考，将存档文件复制一份，后缀改为save）
          <p class="code">%LOCALAPPDATA%/Packages/FocusHomeInteractiveSA.MioMemoriesinOrbit_4hny5m903y3g0/SystemAppData/wgs/{一串字母}/{按时间排序最新的文件夹}/{一串字母}</p>
        </li>
      </ul>
      <details class="intro">
        <summary>（点击查看）关于本网站的说明</summary>
        <ol>
          <li><b>【开发过程参考】：</b>
            <ul>
              <li>B站up：<a href="https://space.bilibili.com/426475408">老陌GAME</a>的视频：<a href="https://www.bilibili.com/video/BV1LczTBVE35">【秘奥】全收集丨序列号丨蜡烛丨元件丨老旧核心丨镀层部件...</a></li>
              <li>B站up：<a href="https://space.bilibili.com/3804625">好吃的香草雪球</a>的网站：<a href="https://xueqiumaps.cn/">雪球的地图工坊</a></li>
            </ul>
          </li>
          <li><b>【问题反馈】</b>
            <ul>
              <li>关于存档解析方面的问题可前往这个视频的评论区反馈：<a href="https://www.bilibili.com/video/BV1S6Z5BeEjM">【秘奥】存档解析</a></li>
            </ul>
          </li>
        </ol>
      </details>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import {CollectInf, parseSaveData} from './utils/parseSaveData';
import ShowCard from "./components/ShowCard.vue";

// 文件输入框引用
const fileInput = ref<HTMLInputElement | null>(null);
const accept = ".save,.txt"

// 状态管理
const showContentModal = ref<boolean>(false);
const selectFileName = ref<string>("");
// 各收集品数据
const showOldCoreList = ref<CollectInf[]>([]);
const showHeartList = ref<CollectInf[]>([]);
const showElderList = ref<CollectInf[]>([]);
const showGiftList = ref<CollectInf[]>([]);
const showSerialList = ref<CollectInf[]>([]);

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

// 设置收集品的数据
const putCollectNum = (fileContent: string): void => {
  // 展示列表
  showContentModal.value = true;
  // 分析存档数据
  const parseRes = parseSaveData(fileContent);
  showOldCoreList.value = parseRes.oldCoreList
  showHeartList.value = parseRes.heartList
  showElderList.value = parseRes.elderList
  showGiftList.value = parseRes.giftList
  showSerialList.value = parseRes.serialList
}

// 读取文件内容
const readFileContent = (file: File | undefined): void => {
  if (file === undefined) {
    return;
  }

  // 提取文件后缀
  const fileName = file.name;
  const lastDotIndex = fileName.lastIndexOf('.');
  const fileExt = lastDotIndex > -1 ? fileName.slice(lastDotIndex + 1).toLowerCase() : '';

  const reader = new FileReader();
  if (fileExt === "txt" || fileExt === "save") {
    reader.readAsText(file);
    selectFileName.value = fileName; // 展示文件名
    // 读取成功
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      // 确保结果存在且为字符串
      if (typeof e.target?.result === 'string') {
        const fileContent = e.target.result;
        putCollectNum(fileContent);
      }
    };
  } else {
    alert(`【${fileName}】读取失败：后缀只能是save、txt`)
  }
};
</script>
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
  // 背景图片
  background-image: url("/mio.svg")
  background-position: center
  background-repeat: no-repeat

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

.code
  // 存档地址样式
  background-color: #e9e9eb
  padding: 8px 4px
  // 自动换行
  white-space: normal
  word-wrap: break-word

.intro
  // 说明书
  border-top: 2px solid #ccc
  padding: 4px
  margin-top: 36px

  b
    color: #dc3545
</style>
