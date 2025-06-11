<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['分类名','文件夹','文件数','备注','创建时间','操作']"
           caption="题源分类表"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="添加分类" type="success" @click="openAddForm"/>
    </template>
    <tr v-for="td in tableData" :key="td.categoryId">
      <td>{{ td.categoryName }}</td>
      <td>{{ td.folderName }}</td>
      <td>{{ td.recordNum }}</td>
      <td>{{ td.remark }}</td>
      <td>{{ formatDateTime(td.createTime) }}</td>
      <td>
        <TbBtn type="ent" text="进入" @click="toImg(td.categoryId)"/>
        <TbBtn type="upd" text="修改" @click="openUpdForm(td)"/>
        <TbBtn type="del" text="删除" @click="deleteById(td.categoryId)"/>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ isAddForm ? "新增" : "修改" }}分类</legend>
        <div class="form-row">
          <label for="remark">分类名</label>
          <input id="remark" v-model="sourceCategory.categoryName" type="text">
        </div>
        <div class="form-row">
          <label for="remark">文件夹</label>
          <input id="remark" v-model="sourceCategory.folderName" type="text">
        </div>
        <div class="form-row">
          <label for="remark">备注</label>
          <input id="remark" v-model="sourceCategory.remark" type="text">
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
import {SourceCategory} from "@/model/entity/SourceCategory";
import {reqAddCate, reqDelCate, reqSourceCatePage, reqUpdCate} from "@/request/sourceCateApi";
import {formatDateTime} from "@/utils/TimeUtil";
import TbBtn from "@/components/button/TbBtn.vue";
import {useRouter} from "vue-router";
import {SourceCateVo} from "@/model/vo/SourceCateVo";

onMounted(() => {
  getAll();
})

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
const tableData = ref<SourceCateVo[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
const getAll = () => {
  reqSourceCatePage(tablePage.current, tablePage.size).then(resp => {
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
    if (resp) reqDelCate(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const sourceCategory: SourceCategory = reactive({
  categoryId: 0, categoryName: "", createTime: "", folderName: "", remark: ""
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const isAddForm = ref<boolean>(false)
const openAddForm = () => {
  isAddForm.value = true;
  sourceCategory.categoryId = 0
  sourceCategory.categoryName = ""
  sourceCategory.folderName = ""
  sourceCategory.remark = ""
  myShow.value?.showMe();
}
const openUpdForm = (data: SourceCategory) => {
  isAddForm.value = false;
  sourceCategory.categoryId = data.categoryId
  sourceCategory.categoryName = data.categoryName
  sourceCategory.folderName = data.folderName
  sourceCategory.remark = data.remark
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (sourceCategory.categoryName === "") {
    tesTus("err", "请填写名称");
    return;
  } else if (sourceCategory.folderName === "") {
    tesTus("err", "请填写文件夹名称");
    return;
  }
  // 开始提交
  closeDialog()
  if (isAddForm.value)
    reqAddCate(sourceCategory).then(resp => commonResp(resp))
  else
    reqUpdCate(sourceCategory).then(resp => commonResp(resp))
}
/**
 * ===================================[路由跳转]============================================
 */
const router = useRouter();
// 跳转路由
const toImg = (id: string) => {
  router.push({path: '/imgSource', query: {cateId: id}})
}
</script>

<style lang="sass" scoped>
</style>