<template>
  <LineCard tit="试卷列表" :card-data-list="listCardData" @openAddForm="openAddForm" @openUpdForm="openUpdForm"
            @deleteById="deleteById"/>
  <!--添加修改的对话框-->
  <MyDialog ref="myShow">
    <form class="myForm">
      <fieldset>
        <legend>{{ isAddForm ? "新增" : "修改" }}试卷</legend>
        <div class="form-row">
          <label for="paperName">试卷名</label>
          <input id="paperName" v-model="paperData.paperName" type="text">
        </div>
        <div class="form-row">
          <label for="categoryId">题源</label>
          <select id="categoryId" v-model="paperData.categoryId">
            <option v-for="op in cateLabel" :key="op.categoryId" :value="op.categoryId">{{ op.categoryName }}</option>
          </select>
        </div>
        <div class="form-row">
          <label for="duration">考试时长(秒)</label>
          <input id="duration" v-model="paperData.duration" type="number">
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
import MyDialog from "@/components/message/MyDialog.vue";
import MyBtn from "@/components/button/MyBtn.vue";
import {Result} from "@/model/vo/Result";
import SureDelModal from "@/components/message/SureDelModal.vue";
import {ExamPaper} from "@/model/entity/ExamPaper";
import {reqAddPaper, reqDelPaper, reqPaperList, reqUpdPaper} from "@/request/examPaperApi";
import {CateLabelVo} from "@/model/vo/CateLabelVo";
import {reqCateLabel} from "@/request/sourceCateApi";
import LineCard, {CardData} from "@/components/show/LineCard.vue";

onMounted(() => {
  getAll();
  reqCateLabel().then(resp => cateLabel.value = resp)
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
const listCardData = ref<CardData[]>([])
const getAll = () => {
  reqPaperList().then(resp => {
    const cardData: CardData[] = [];
    resp.forEach(item => {
      cardData.push({
        remark: `总分：${item.totalScore}分`,
        childPath: `/examQuest?paperId=${item.paperId}`,
        data: item,
        dataId: item.categoryId,
        footer: [`题源：${item.categoryName}`, `时长：${item.duration}秒`, `创建日期：${item.createDate}`],
        tit: item.paperName
      })
    })
    listCardData.value = cardData;
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
const paperData: ExamPaper = reactive({
  categoryId: 0, createDate: "", duration: 0, paperId: 0, paperName: "", totalScore: 0
})
// 题源的下拉框
const cateLabel = ref<CateLabelVo[]>([])
// 表单弹出框
const myShow = ref<InstanceType<typeof MyDialog> | null>(null)
const isAddForm = ref<boolean>(false)
const openAddForm = () => {
  isAddForm.value = true;
  paperData.paperId = 0
  paperData.paperName = ""
  paperData.categoryId = 0
  paperData.duration = 0
  myShow.value?.showMe();
}
const openUpdForm = (data: ExamPaper) => {
  isAddForm.value = false;
  paperData.paperId = data.paperId
  paperData.paperName = data.paperName
  paperData.categoryId = data.categoryId
  paperData.duration = data.duration
  myShow.value?.showMe();
}
const closeDialog = () => myShow.value?.closeMe();

// 提交表单
const submitForm = (): void => {
  // 校验
  if (paperData.paperName === "") {
    tesTus("err", "请填写试卷名称");
    return;
  }
  // 开始提交
  closeDialog()
  if (isAddForm.value)
    reqAddPaper(paperData).then(resp => commonResp(resp))
  else
    reqUpdPaper(paperData).then(resp => commonResp(resp))
}
</script>

<style lang="sass" scoped>
</style>