<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['文件名','备注','上传时间','识别时间','操作']"
           caption="题源图片表"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="添加图片" type="success" @click="openAddForm"/>
    </template>
    <tr v-for="td in tableData" :key="td.sourceId">
      <td>{{ td.fileName }}</td>
      <td>{{ td.remark }}</td>
      <td>{{ formatDateTime(td.uploadTime) }}</td>
      <td>{{ formatDateTime(td.ocrTime) }}</td>
      <td>
        <TbBtn text="编辑" type="ent"/>
        <TbBtn text="修改" type="upd" @click="openUpdForm(td)"/>
        <TbBtn text="删除" type="del" @click="deleteById(td.sourceId)"/>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ formTit }}</legend>
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
import {reqAddImg, reqDelImg, reqImgSourcePage, reqUpdImg, reqUploadImg} from "@/request/imgSourceApi";
import {formatDateTime} from "@/utils/TimeUtil";
import TbBtn from "@/components/button/TbBtn.vue";
import {useRoute} from "vue-router";
import {ImgSourceDto} from "@/model/dto/ImgSourceDto";

let cateId = 0;
onMounted(() => {
  setRouteData()
  getAll();
})
// 如此获取路由传参
const route = useRoute();
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0)
    cateId = parseInt(route.query.cateId as string)
  // 给增删实体类设置值
  imageSource.categoryId = cateId;
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
 * ===================================[表格数据]============================================
 */
// 表格数据
const tableData = ref<ImageSource[]>([])
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
const formTit = ref<"添加图片" | "修改图片">("添加图片")
const openAddForm = () => {
  formTit.value = "添加图片";
  imageSource.sourceId = 0
  imageSource.fileName = ""
  imageSource.remark = ""
  myShow.value?.showMe();
}
const openUpdForm = (data: ImageSource) => {
  formTit.value = "修改图片";
  imageSource.sourceId = data.sourceId
  imageSource.fileName = data.fileName
  imageSource.remark = data.remark
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 开始提交
  closeDialog()
  if (formTit.value === "修改图片") {
    // 校验
    if (imageSource.fileName === "") {
      tesTus("err", "请填写文件名");
      return;
    }
    reqUpdImg(imageSource).then(resp => commonResp(resp))
  } else {
    uploadFile()
  }
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

</script>

<style lang="sass" scoped>
.form-info
  color: #909399
  margin-left: 10ch
  font-size: small
</style>