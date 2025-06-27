<template>
  <!-- 表格 -->
  <MyTable :tb-page="tablePage"
           :thead="['序号','类型','分值','操作']"
           caption="题目表"
           @pageChange="getAll">
    <template #searchBtn>
      <MyBtn text="添加题目" type="success" @click="openAddForm"/>
      <MyBtn text="返回上级" type="secondary" @click="toUp"/>
    </template>
    <tr v-for="td in tableData" :key="td.questId">
      <td>{{ td.questNo }}</td>
      <td>{{ getQuestType(td.questType) }}</td>
      <td>{{ td.score }}</td>
      <td>
        <TbBtn type="ent" text="编辑" @click="toQuest(td.questId)"/>
        <TbBtn type="upd" text="修改" @click="openUpdForm(td)"/>
        <TbBtn type="del" text="删除" @click="deleteById(td.questId)"/>
      </td>
    </tr>
  </MyTable>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ isAddForm ? "新增" : "修改" }}题目</legend>
        <div class="form-row">
          <label for="questNo">序号</label>
          <input id="questNo" v-model="questData.questNo" type="number">
        </div>
        <div class="form-row">
          <label for="questType">类型</label>
          <select id="questType" v-model="questData.questType">
            <option :value="1">选择</option>
            <option :value="3">填空</option>
            <option :value="3">大题</option>
          </select>
        </div>
        <div class="form-row">
          <label for="duration">分值</label>
          <input id="duration" v-model="questData.score" type="number">
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
import {ExamQuest} from "@/model/entity/ExamQuest";
import {reqAddQuest, reqDelQuest, reqQuestPage, reqUpdQuest} from "@/request/ExamQuestApi";
import TbBtn from "@/components/button/TbBtn.vue";
import {useRoute, useRouter} from "vue-router";
import {ExamQuestDto} from "@/model/dto/ExamQuestDto";

onMounted(() => {
  setRouteData()
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
const tableData = ref<ExamQuest[]>([])
const tablePage: TbPage = reactive({current: 1, pages: 1, total: 0, size: 10}) as TbPage
const questDto: ExamQuestDto = {paperId: 0}
const getAll = () => {
  reqQuestPage(tablePage.current, tablePage.size, questDto).then(resp => {
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
    if (resp) reqDelQuest(id).then(resp => commonResp(resp))
  })
}

const getQuestType = (tpe: number) => {
  if (tpe == 1) return "选择"
  else if (tpe == 2) return "填空"
  else if (tpe == 3) return "大题"
  else return "其它"
}

/**
 * ===================================[表单数据]============================================
 */
// 添加的实体类
const questData: ExamQuest = reactive({
  haveImg: false,
  imgName: "",
  paperId: 0,
  questAnalysis: "",
  questContent: "",
  questId: 0,
  questNo: 0,
  questType: 0,
  score: 0
})
// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const isAddForm = ref<boolean>(false)
const openAddForm = () => {
  isAddForm.value = true;
  questData.questId = 0
  questData.questType = 0
  questData.questNo = 0
  questData.score = 0
  myShow.value?.showMe();
}
const openUpdForm = (data: ExamQuest) => {
  isAddForm.value = false;
  questData.questId = data.questId
  questData.questType = data.questType
  questData.questNo = data.questNo
  questData.score = data.score
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (questData.questType === 0) {
    tesTus("err", "请填写题目类型");
    return;
  } else if (questData.questNo === 0) {
    tesTus("err", "请填写题目顺序");
    return;
  }
  // 开始提交
  closeDialog()
  if (isAddForm.value)
    reqAddQuest(questData).then(resp => commonResp(resp))
  else
    reqUpdQuest(questData).then(resp => commonResp(resp))
}
/**
 * ===================================[路由跳转]============================================
 */
let paperId = 0;
// 如此获取路由传参
const route = useRoute();
const setRouteData = (): void => {
  if (Object.keys(route.query).length > 0) {
    paperId = parseInt(route.query.paperId as string)
  }
  questData.paperId = paperId
  questDto.paperId = paperId
}
const router = useRouter();
// 返回上级页面
const toUp = () => {
  router.push('/examPaper')
}
// 进入题目管理
const toQuest = (id: number) => {
  router.push({path: '/dealQuest', query: {questId: id}})
}
</script>

<style lang="sass" scoped>
</style>