<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['试卷名','文件夹','总分','考试时长(秒)','创建日期','操作']"
           caption="试卷表"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="添加试卷" type="success" @click="openAddForm"/>
      <MyBtn text="返回上级" type="secondary" @click="toUp"/>
    </template>
    <tr v-for="td in tableData" :key="td.paperId">
      <td>{{ td.paperName }}</td>
      <td>{{ td.folderName }}</td>
      <td>{{ td.totalScore }}</td>
      <td>{{ td.duration }}</td>
      <td>{{ td.createDate }}</td>
      <td>
        <TbBtn type="ent" text="进入" @click="toQuest(td.paperId)"/>
        <TbBtn type="upd" text="修改" @click="openUpdForm(td)"/>
        <TbBtn type="del" text="删除" @click="deleteById(td.paperId)"/>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ isAddForm ? "新增" : "修改" }}试卷</legend>
        <div class="form-row">
          <label for="paperName">试卷名</label>
          <input id="paperName" v-model="examPaper.paperName" type="text">
        </div>
        <div class="form-row">
          <label for="folderName">文件夹</label>
          <input id="folderName" v-model="examPaper.folderName" type="text">
        </div>
        <div class="form-row">
          <label for="duration">考试时长(秒)</label>
          <input id="duration" v-model="examPaper.duration" type="number">
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
import {ExamPaper} from "@/model/entity/ExamPaper";
import {reqAddPaper, reqDelPaper, reqPaperPage, reqUpdPaper} from "@/request/examPaperApi";
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
const tableData = ref<ExamPaper[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
const getAll = () => {
  reqPaperPage(tablePage.current, tablePage.size).then(resp => {
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
    if (resp) reqDelPaper(id).then(resp => commonResp(resp))
  })
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const examPaper: ExamPaper = reactive({
  createDate: "", duration: 0, folderName: "", paperId: 0, paperName: "", totalScore: 0
})

// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const isAddForm = ref<boolean>(false)
const openAddForm = () => {
  isAddForm.value = true;
  examPaper.paperId = 0
  examPaper.paperName = ""
  examPaper.folderName = ""
  examPaper.duration = 0
  myShow.value?.showMe();
}
const openUpdForm = (data: ExamPaper) => {
  isAddForm.value = false;
  examPaper.paperId = data.paperId
  examPaper.paperName = data.paperName
  examPaper.folderName = data.folderName
  examPaper.duration = data.duration
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (examPaper.paperName === "") {
    tesTus("err", "请填写试卷名称");
    return;
  } else if (examPaper.folderName === "") {
    tesTus("err", "请填写文件夹名称");
    return;
  }
  // 开始提交
  closeDialog()
  if (isAddForm.value)
    reqAddPaper(examPaper).then(resp => commonResp(resp))
  else
    reqUpdPaper(examPaper).then(resp => commonResp(resp))
}
/**
 * ===================================[路由跳转]============================================
 */
const router = useRouter();
// 返回上级页面
const toUp = () => {
  router.push('/')
}
// 进入题目管理
const toQuest = (id: number) => {
  router.push({path: '/dealQuest', query: {paperID: id}})
}
</script>

<style lang="sass" scoped>
</style>