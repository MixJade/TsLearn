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
      <h5>当前文件：{{ selectFileName }}</h5>
      <ShowCard type="heart" title="面具碎片" :show="showHeartList" :quantity="showHeartNum"/>
      <ShowCard type="metal" title="制造金属" :show="showMetalList"/>
      <ShowCard type="box" title="忆境纪念盒" :show="showBoxList" :quantity="showBoxNum"/>
      <ShowCard type="silk" title="丝轴碎片" :show="showSilkList" :quantity="showSilkNum"/>
      <ShowCard type="heart" title="苔莓" :show="showBerryList"/>
      <ShowCard type="metal" title="跳蚤旅团" :show="showFleaList"/>
      <ShowCard type="box" title="古董" :show="showRelicList"/>
    </div>
    <div v-else>
      <h4>丝之歌存档路径:</h4>
      <ul>
        <li>Steam（Windows）
          <p class="code">%userprofile%/AppData/LocalLow/Team Cherry/Hollow Knight Silksong/{一串数字}/user1.dat</p>
        </li>
      </ul>
      <details class="intro">
        <summary>（点击查看）关于本网站的说明</summary>
        <ol>
          <li><b>【解析异常】说明：</b>
            <ul>
              <li>如果出现解析异常，先确认是否拖错文件（比如把前作的存档给拖进去了）</li>
              <li>只支持 user1~4.dat 文件，对应1~4号存档。其它诸如 user1_1.0.28891.dat 这种格式都不是最新存档</li>
              <li>部分系统（如ns）其存档是不加密的，复制存档，把后缀改成json即可解析</li>
              <li>部分系统（如xgp）其存档名称是乱码，复制一份并把名称改为user1.dat即可</li>
            </ul>
          </li>
          <li><b>【疑似bug】说明：</b>
            <ul>
              <li>意为：可能是非正常流程获取（比如在小偷处购买），也可能是卡bug给永久卡没了</li>
              <li>如果面具或丝轴的解析中出现【疑似bug】，请先计算实际拥有数量，确认是否真的丢失</li>
            </ul>
          </li>
          <li><b>【完成度】说明：</b>
            <ul>
              <li>解析项与完成度直接相关的只有面具碎片（占5%）、丝轴碎片（占9%）</li>
              <li>其余完成度相关物品，可直接使用小黑盒存档解析</li>
              <li>
                本网站只查游戏中不能直接定位的物品（如面具、丝轴、纪念盒、金属、苔莓）,<br>或定位比较麻烦的（如跳蚤需花费念珠，古董需回钟心镇确认）
              </li>
            </ul>
          </li>
        </ol>
      </details>
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
const selectFileName = ref<string>("");
// 各收集品数据
const showBoxList = ref<CollectInf[]>([]);
const showBoxNum = ref<number>(0);
const showSilkList = ref<CollectInf[]>([]);
const showSilkNum = ref<number>(0);
const showHeartList = ref<CollectInf[]>([]);
const showHeartNum = ref<number>(0);
const showMetalList = ref<CollectInf[]>([]);
const showBerryList = ref<CollectInf[]>([]);
const showFleaList = ref<CollectInf[]>([]);
const showRelicList = ref<CollectInf[]>([]);

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
  const parseRes = parseJsonData(fileContent);
  showBoxList.value = parseRes.boxList
  showBoxNum.value = parseRes.boxNum
  showSilkList.value = parseRes.silkList
  showSilkNum.value = parseRes.silkNum
  showHeartList.value = parseRes.heartList
  showHeartNum.value = parseRes.heartNum
  showMetalList.value = parseRes.metalList
  showBerryList.value = parseRes.berryList
  showFleaList.value = parseRes.fleaList
  showRelicList.value = parseRes.relicList
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
  if (fileExt === "txt" || fileExt === "json") {
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
  } else if (fileExt === "dat") {
    // 使用readAsArrayBuffer读取文件为二进制数据
    reader.readAsArrayBuffer(file);
    selectFileName.value = fileName; // 展示文件名
    // 读取成功
    reader.onload = (e: ProgressEvent<FileReader>): void => {
      // 确保结果存在且为ArrayBuffer
      if (e.target?.result instanceof ArrayBuffer) {
        // 将ArrayBuffer转换为Uint8Array（字节数组）
        const byteArray = new Uint8Array(e.target.result);
        // 传入decode函数（该函数需要接收Uint8Array参数）
        const fileContent = decode(byteArray);
        putCollectNum(fileContent);
      }
    };
  } else {
    alert(`【${fileName}】读取失败：后缀只能是json、dat、txt`)
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

.code
  // 存档地址样式
  white-space: nowrap
  background-color: #e9e9eb
  padding: 8px 4px

.intro
  // 说明书
  font-size: small
  border-top: 2px solid #ccc
  padding: 4px
  margin-top: 36px

  b
    color: #dc3545
</style>
