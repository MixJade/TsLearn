<template>
  <LineCard tit="题目列表" :card-data-list="listCardData" :theme="'#5b8dd9'" @openAddForm="openAddForm" @openUpdForm="openUpdForm"
            @deleteById="deleteById"/>
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
          <label for="score">分值</label>
          <input id="score" v-model="questData.score" type="number">
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
import {ExamQuest} from "@/model/entity/ExamQuest";
import {reqAddQuest, reqDelQuest, reqQuestAll, reqUpdQuest} from "@/request/examQuestApi";
import LineCard from "@/components/show/LineCard.vue";
import {CardData} from "@/model/dto/CardData";
import {useRoute} from "vue-router";

onMounted(() => {
  setRouteData()
  getAll();
})

/**
 * ===================================[吐司消息]=======================================
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
// 卡片数据
const listCardData = ref<CardData[]>([])
const getAll = () => {
  reqQuestAll(paperId).then(resp => {
    const cardData: CardData[] = [];
    resp.forEach(item => {
      cardData.push({
        remark: `类型：${getQuestType(item.questType)} | 分值：${item.score}分`,
        childPath: `/dealQuest?questId=${item.questId}`,
        data: item,
        dataId: item.questId,
        footer: [`题目序号：${item.questNo}`],
        tit: `题目 ${item.questNo}`
      })
    })
    listCardData.value = cardData;
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
}
</script>

<style lang="sass" scoped>
</style>