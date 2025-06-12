<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['科目名','正式考试日期','文件夹','创建时间','操作']"
           caption="科目表"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="添加科目" type="success" @click="openAddForm"/>
      <MyBtn text="返回上级" type="secondary" @click="toUp"/>
    </template>
    <tr v-for="td in tableData" :key="td.subjectId">
      <td>{{ td.subjectName }}</td>
      <td>{{ td.examStartDate }}</td>
      <td>{{ td.folderName }}</td>
      <td>{{ td.createDate }}</td>
      <td>
        <TbBtn type="ent" text="进入"/>
        <TbBtn type="upd" text="修改" @click="openUpdForm(td)"/>
        <TbBtn type="del" text="删除" @click="deleteById(td.subjectId)"/>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ isAddForm ? "新增" : "修改" }}科目</legend>
        <div class="form-row">
          <label for="remark">科目名</label>
          <input id="remark" v-model="examSubject.subjectName" type="text">
        </div>
        <div class="form-row">
          <label for="remark">文件夹</label>
          <input id="remark" v-model="examSubject.folderName" type="text">
        </div>
        <div class="form-row">
          <label for="remark">正式考试时间</label>
          <input id="remark" v-model="examSubject.examStartDate" type="date">
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
import {ExamSubject} from "@/model/entity/ExamSubject";
import {reqAddSubject, reqDelSubject, reqSubjectPage, reqUpdSubject} from "@/request/examSubjectApi";
import TbBtn from "@/components/button/TbBtn.vue";
import {useRouter} from "vue-router";

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
const tableData = ref<ExamSubject[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
const getAll = () => {
  reqSubjectPage(tablePage.current, tablePage.size).then(resp => {
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
    if (resp) reqDelSubject(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const examSubject: ExamSubject = reactive({
  createDate: "", examStartDate: "", folderName: "", subjectId: 0, subjectName: ""
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const isAddForm = ref<boolean>(false)
const openAddForm = () => {
  isAddForm.value = true;
  examSubject.subjectId = 0
  examSubject.examStartDate = ""
  examSubject.folderName = ""
  myShow.value?.showMe();
}
const openUpdForm = (data: ExamSubject) => {
  isAddForm.value = false;
  examSubject.subjectId = data.subjectId
  examSubject.examStartDate = data.examStartDate
  examSubject.folderName = data.folderName
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (examSubject.subjectName === "") {
    tesTus("err", "请填写科目名称");
    return;
  } else if (examSubject.folderName === "") {
    tesTus("err", "请填写文件夹名称");
    return;
  } else if (examSubject.examStartDate === "") {
    tesTus("err", "请填写考试时间");
    return;
  }
  // 开始提交
  closeDialog()
  if (isAddForm.value)
    reqAddSubject(examSubject).then(resp => commonResp(resp))
  else
    reqUpdSubject(examSubject).then(resp => commonResp(resp))
}
/**
 * ===================================[路由跳转]============================================
 */
const router = useRouter();
// 返回上级页面
const toUp = () => {
  router.push('/')
}
</script>

<style lang="sass" scoped>
</style>