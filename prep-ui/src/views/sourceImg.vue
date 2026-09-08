<template>
  <CardMain
    tit="题源图片"
    :card-data-list="listCardData"
    :show-image="true"
    parent-path="/sourceCate"
    @openAddForm="openAddForm"
    @openUpdForm="openUpdForm"
    @deleteById="deleteById"
    @enterChild="openUpdForm"
  />
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>添加图片</legend>
        <div class="form-row">
          <label for="myImg">文件</label>
          <input id="myImg" accept="image/*" type="file" @change="handleFileChange"/>
        </div>
        <div class="form-row">
          <label for="remark">备注</label>
          <input id="remark" v-model="sourceImg.remark" type="text">
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
    <div class="parent">
      <label for="ocrResult2" class="child-img">
        <img class="ocr-img" :src="'/api/sourceImage/img/'+sourceImg2.imageId" alt="题目图片">
      </label>
      <textarea id="ocrResult2" class="ocr-res new-line" v-model="sourceImg2.ocrResult"/>
    </div>
    <div class="ocr-foot">
      <MyBtn text="关闭" type="secondary" @click="closeDialog2"/>
      <MyBtn text="图片识别" type="success" @click="handleOcrImg"/>
      <MyBtn text="保存" type="primary" @click="submitForm2"/>
    </div>
  </MyDialog>
  <!-- 吐司组件-->
  <ToastBox ref="childRef"/>
  <SureDelModal ref="sureDelModal"/>
</template>

<script lang="ts" setup>
import ToastBox from "@/components/message/ToastBox.vue";
import {onMounted, reactive, ref} from "vue";
import MyDialog from "@/components/message/MyDialog.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import {SourceImage} from "@/model/entity/SourceImage";
import {reqDelImg, reqImgSourcePage, reqOcrImg, reqOneImg, reqUpdImg, reqUploadImg} from "@/request/sourceImgApi";
import {useRoute} from "vue-router";
import {SourceImgDto} from "@/model/dto/SourceImgDto";
import CardMain from "@/components/show/CardMain.vue";
import {CardData} from "@/model/dto/CardData";

onMounted(() => {
  setRouteData()
  getAll();
})

/**
 * ===================================[路由跳转]============================================
 */
// 如此获取路由传参
const route = useRoute();
let cateId = 0;
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0)
    cateId = parseInt(route.query.cateId as string)
  // 给增删实体类设置值
  sourceImg.categoryId = cateId;
  paData.categoryId = cateId;
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
 * ===================================[卡片数据]============================================
 */
// 表格数据
const listCardData = ref<CardData[]>([])
const paData: SourceImgDto = {categoryId: 0}
const getAll = () => {
  reqImgSourcePage(1, 100, paData).then(resp => {
    const cardData: CardData[] = [];
    resp.records.forEach(item => {
      cardData.push({
        remark: item.remark || '无备注',
        childPath: '',
        data: item,
        dataId: item.imageId,
        footer: [`${item.ocrTime || '未识别'}`],
        tit: `图片 ${item.imageId}`,
        imageUrl: `/api/sourceImage/img/${item.imageId}`
      })
    })
    listCardData.value = cardData;
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
const sourceImg: SourceImage = reactive({
  categoryId: 0, imageId: 0, ocrResult: "", ocrTime: "", remark: ""
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const openAddForm = () => {
  sourceImg.imageId = 0
  sourceImg.remark = ""
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
  reqUploadImg(formData, cateId, sourceImg.remark).then(resp => commonResp(resp));
  file.value = null;
};

/**
 * ===================================[识别结果数据]============================================
 */
// 添加的实体类
const sourceImg2: SourceImage = reactive({
  categoryId: 0, imageId: 0, ocrResult: "", ocrTime: "", remark: ""
})

// 表单弹出框
const myShow2 = ref<InstanceType<typeof MyDialog> | null>(null)
const openUpdForm = (cardData: CardData) => {
  reqOneImg(cardData.dataId).then(resp => {
    sourceImg2.imageId = cardData.dataId
    sourceImg2.ocrResult = resp.ocrResult
  })
  myShow2.value?.showMe();
}
const closeDialog2 = () => myShow2.value?.closeMe();

const handleOcrImg = (): void => {
  if (sourceImg2.ocrResult != null && sourceImg2.ocrResult.length > 6) {
    sureDelModal.value?.confirmDel("识别后现有结果将丢失").then((resp: boolean) => {
      if (resp) {
        ocrImg()
      }
    })
  } else ocrImg();
}

const ocrImg = (): void => {
  reqOcrImg(sourceImg2.imageId).then(resp => {
    if (resp.code === 1) {
      tesTus("suc", "识别成功");
      sourceImg2.ocrResult = resp.msg
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
  reqUpdImg(sourceImg2).then(resp => commonResp(resp))
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

.child-img
  max-height: 70vh
  overflow-y: auto

.ocr-img
  width: 400px
  flex: 1

.ocr-res
  background-color: #f8f9fa
  padding: 4px
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
