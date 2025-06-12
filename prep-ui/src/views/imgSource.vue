<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['文件名','文件夹','备注','上传时间','识别时间','操作']"
           caption="题源图片表"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="添加图片" type="success" @click="openAddForm"/>
      <MyBtn text="返回上级" type="secondary" @click="toUp"/>
    </template>
    <tr v-for="td in tableData" :key="td.sourceId">
      <td>{{ td.fileName }}</td>
      <td>{{ td.folderName }}</td>
      <td>{{ td.remark }}</td>
      <td>{{ formatDateTime(td.uploadTime) }}</td>
      <td>{{ formatDateTime(td.ocrTime) }}</td>
      <td>
        <TbBtn text="编辑" type="upd" @click="openUpdForm(td.sourceId)"/>
        <TbBtn text="删除" type="del" @click="deleteById(td.sourceId)"/>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>添加图片</legend>
        <div class="form-row">
          <label for="myImg">文件</label>
          <input id="myImg" accept="image/*" type="file" @change="handleFileChange"/>
        </div>
        <span class="form-info">{{ imageSource.fileName }}</span>
        <div class="form-row">
          <label for="remark">备注</label>
          <input id="remark" v-model="imageSource.remark" type="text">
        </div>
      </fieldset>
      <div class="form-footer">
        <MyBtn text="关闭" type="secondary" @click="closeDialog"/>
        <MyBtn text="确认提交" type="primary" @click="submitForm"/>
      </div>
    </form>
  </MyDialog>
  <!--识别结果弹窗-->
  <MyDialog ref="myShow2">
    <label for="remark2"><strong>{{ imageSource2.fileName }}</strong></label>
    <input id="remark2" v-model="imageSource2.remark" placeholder="备注" type="text">
    <div class="parent">
      <label for="ocrResult2" class="child-img">
        <img class="ocr-img" :src="'/api/imageSource/img/'+imageSource2.sourceId" alt="题目图片">
      </label>
      <textarea id="ocrResult2" class="ocr-res" v-model="imageSource2.ocrResult"/>
    </div>
    <div class="ocr-foot">
      <MyBtn text="关闭" type="secondary" @click="closeDialog2"/>
      <MyBtn text="图片识别" type="success" @click="handleOcrImg"/>
      <MyBtn text="确认提交" type="primary" @click="submitForm2"/>
    </div>
  </MyDialog>
  <!-- 吐司组件-->
  <ToastBox ref="childRef"/>
  <SureDelModal ref="sureDelModal"/>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {onMounted, reactive, ref} from "vue";
import MyTable, {TbPage} from "@/components/show/MyTable.vue";
import MyDialog from "@/components/message/MyDialog.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import {ImageSource} from "@/model/entity/ImageSource";
import {
  reqAddImg,
  reqDelImg,
  reqImgSourcePage,
  reqOcrImg,
  reqOneImg,
  reqUpdImg,
  reqUploadImg
} from "@/request/imgSourceApi";
import {formatDateTime} from "@/utils/TimeUtil";
import TbBtn from "@/components/button/TbBtn.vue";
import {useRoute, useRouter} from "vue-router";
import {ImgSourceDto} from "@/model/dto/ImgSourceDto";
import {ImgSourceVo} from "@/model/vo/ImgSourceVo";

let cateId = 0;
onMounted(() => {
  setRouteData()
  getAll();
})

/**
 * ===================================[路由跳转]============================================
 */
// 如此获取路由传参
const route = useRoute();
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0)
    cateId = parseInt(route.query.cateId as string)
  // 给增删实体类设置值
  imageSource.categoryId = cateId;
  imageSource2.categoryId = cateId;
  paData.categoryId = cateId;
}
const router = useRouter();
// 返回上级页面
const toUp = () => {
  router.push('/')
}

/**
 * =======================================[吐司消息]=======================================
 */
// 引用子组件
const childRef = ref<InstanceType<typeof ToastBox> | null>(null);
// 调用子组件暴露的方法
const tesTus = (type: "suc" | "err", msg: string) => {
  if (childRef.value) {
    childRef.value.showToast(type, msg);
  }
};

// 删改增操作通用解析
const commonResp = (resp: Result): void => {
  if (resp.code === 1) {
    tesTus("suc", resp.msg);
    getAll();
  } else if (resp.code === 0) {
    tesTus("err", resp.msg);
  } else {
    tesTus("err", "服务器无响应");
  }
}

/**
 * ===================================[表格数据]============================================
 */
// 表格数据
const tableData = ref<ImgSourceVo[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
const paData: ImgSourceDto = {categoryId: 0}
const getAll = () => {
  reqImgSourcePage(tablePage.current, tablePage.size, paData).then(resp => {
    tableData.value = resp.records
    tablePage.current = resp.current;
    tablePage.pages = resp.pages
    tablePage.total = resp.total
    tablePage.size = resp.size
  })
}

// 确认删除框
const sureDelModal = ref<InstanceType<typeof SureDelModal> | null>(null);
const deleteById = (id: number): void => {
  sureDelModal.value?.confirmDel("确定删除？删除后数据无法找回").then((resp: boolean) => {
    if (resp) reqDelImg(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const imageSource: ImageSource = reactive({
  categoryId: 0, fileName: "", ocrResult: "", ocrTime: "", remark: "", sourceId: 0, uploadTime: ""
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const openAddForm = () => {
  imageSource.sourceId = 0
  imageSource.fileName = ""
  imageSource.remark = ""
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 开始提交
  closeDialog()
  uploadFile()
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
const uploadFile = (): void => {
  if (!file.value) {
    tesTus("err", '请选择一个图片');
    return;
  }
  const formData = new FormData() as FormData;
  formData.append('file', file.value);
  reqUploadImg(formData, cateId).then(resp => {
    if (resp.code === 1) {
      imageSource.fileName = resp.msg
      reqAddImg(imageSource).then(resp => commonResp(resp))
    } else if (resp.code === 0) {
      tesTus("err", resp.msg);
    } else {
      tesTus("err", "服务器无响应");
    }
  });
  file.value = null;
};

/**
 * ===================================[识别结果数据]============================================
 */
// 添加的实体类
const imageSource2: ImageSource = reactive({
  categoryId: 0, fileName: "", ocrResult: "", ocrTime: "", remark: "", sourceId: 0, uploadTime: ""
})

// 表单弹出框
const myShow2 = ref<InstanceType<typeof MyDialog> | null>(null)
const openUpdForm = (id: number) => {
  reqOneImg(id).then(resp => {
    imageSource2.sourceId = resp.sourceId
    imageSource2.ocrResult = resp.ocrResult
    imageSource2.remark = resp.remark
    imageSource2.fileName = resp.fileName
  })
  myShow2.value?.showMe();
}
const closeDialog2 = () => myShow2.value?.closeMe();

const handleOcrImg = (): void => {
  if (imageSource2.ocrResult.length > 6) {
    sureDelModal.value?.confirmDel("识别后现有结果将丢失").then((resp: boolean) => {
      if (resp) {
        ocrImg()
      }
    })
  } else ocrImg();
}

const ocrImg = (): void => {
  reqOcrImg(imageSource2.sourceId).then(resp => {
    if (resp.code === 1) {
      tesTus("suc", "识别成功");
      imageSource2.ocrResult = resp.msg
    } else if (resp.code === 0) {
      tesTus("err", resp.msg);
    } else {
      tesTus("err", "服务器无响应");
    }
  })
}

// 提交表单
const submitForm2 = (): void => {
  // 开始提交
  closeDialog2()
  // 修改
  reqUpdImg(imageSource2).then(resp => commonResp(resp))
}
</script>

<style lang="sass" scoped>
.form-info
  // 表单中的介绍文本
  color: #909399
  margin-left: 10ch
  font-size: small

.parent
  display: flex
  //子元素间距
  gap: 10px
  margin: 10px 0
  border: 1px solid #ddd
  padding: 10px

.ocr-img
  width: 400px
  flex: 1

.ocr-res
  background-color: #f8f9fa
  padding: 4px
  //结果换行
  white-space: pre-wrap
  word-break: break-all
  max-height: 70vh
  min-height: 200px
  width: 650px
  overflow-y: auto
  //flex布局的子元素
  flex: 1

.ocr-foot
  //表单底部按钮组
  padding-top: 8px
  text-align: right
</style>