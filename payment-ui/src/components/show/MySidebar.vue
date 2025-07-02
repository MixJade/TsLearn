<template>
  <div id="sidebar" :class="isOpen?'open':''">
    <div class="header">
      <h3>更多功能</h3>
      <svg id="closeSidebar" height="24" width="24" xmlns="http://www.w3.org/2000/svg" @click="closeSide">
        <path d="M16 5 L8 12 L16 19" fill="none" stroke="#409eff" stroke-width="3"/>
      </svg>
    </div>
    <ul>
      <li class="li-cache" @click="toRoute('/payCaches')">缓存转正</li>
      <li class="li-dict" @click="toRoute('/payDicts')">收支字典</li>
      <li class="li-in-sql" @click="openForm2">导入SQL</li>
      <li class="li-out-sql" @click="downInsertSql">导出SQL</li>
    </ul>
    <footer>MixJade</footer>
  </div>
  <!-- 遮罩层 -->
  <div id="overlay" :class="isOpen?'open':''" @click="closeSide"></div>

  <!--上传文件的对话框-->
  <MyDialog ref="myShow2">
    <form class="myForm">
      <fieldset>
        <legend>上传sql</legend>
        <div class="form-row">
          <input accept=".sql" type="file" @change="handleFileChange"/>
          <MyBtn text="上传文件" type="success" @click="uploadFile"/>
        </div>
      </fieldset>
    </form>
  </MyDialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MyDialog from "@/components/message/MyDialog.vue";
import {reqDownInsertSql, reqUploadSql} from "@/request/payRecordApi";
import MyBtn from "@/components/button/MyBtn.vue";
import {useRouter} from "vue-router";
import {sharedDate} from "@/store/shareDate";

const isOpen = ref<boolean>(false)

const closeSide = () => {
  isOpen.value = false
}
const openSide = () => {
  isOpen.value = true
}
defineExpose({openSide})
/**
 * ===================================[文件上传下载]============================================
 */
// 表单弹出框(文件)
const myShow2 = ref<InstanceType<typeof MyDialog> | null>(null)
const openForm2 = () => {
  myShow2.value?.showMe();
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
    alert('请选择一个 sql 文件');
    return;
  }
  const formData = new FormData() as FormData;
  formData.append('file', file.value);
  reqUploadSql(formData).then(resp => {
    alert(resp.msg)
  });
  file.value = null;
  myShow2.value?.closeMe();
};
/**
 * ===================================[路由跳转]============================================
 */
const router = useRouter();
// 跳转路由
const toRoute = (url: string) => {
  router.push(url)
}
/**
 * ==================================[导出SQL]===============================
 */
/**
 * 导出对应年份的sql文件
 */
const downInsertSql = (): void => {
  const answer = confirm(`确认下载${sharedDate.year}年数据？`);
  if (answer) {
    reqDownInsertSql(sharedDate.year);
  }
}
</script>

<style lang="sass" scoped>
#sidebar
  position: fixed
  top: 0
  left: 0
  bottom: 0
  width: 200px
  background-color: white
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
  transform: translateX(-100%)
  transition: transform 0.3s ease-in-out
  z-index: 50

  &.open
    transform: translateX(0)

  .header
    padding: 16px
    display: flex
    justify-content: space-between
    align-items: center
    border-bottom: 1px solid #e5e7eb

  h3
    color: #409eff
    margin: 0

  ul
    list-style: none
    padding: 16px
    margin: 0
    display: flex
    flex-direction: column
    gap: 12px

  li
    padding: 8px 12px
    border-radius: 8px
    transition: all 0.2s ease
    text-decoration: none
    cursor: pointer

  footer
    position: absolute
    bottom: 0
    left: 0
    right: 0
    padding: 8px
    border-top: 2px solid #e5e7eb
    //字体颜色
    text-align: center
    color: #606266
    font-size: small

@mixin li-color($txt-color: #e6a23c)
  box-shadow: inset 0 0 12px #e9e9eb
  color: $txt-color
  &:hover
    box-shadow: inset 0 0 12px $txt-color

//导航选项的颜色
.li-dict
  @include li-color(#409eff)

.li-cache
  @include li-color()

.li-in-sql
  @include li-color(#f56c6c)

.li-out-sql
  @include li-color(#67c23a)


#closeSidebar
  //关闭按钮
  border: 3px solid #409eff
  background-color: #ebf5ff
  border-radius: 50%
  cursor: pointer
  transition: color 0.2s ease

#overlay
  //遮罩层样式
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: rgba(0, 0, 0, 0.5)
  opacity: 0
  pointer-events: none
  transition: opacity 0.3s ease-in-out
  z-index: 40

  &.open
    opacity: 1
    pointer-events: auto

</style>